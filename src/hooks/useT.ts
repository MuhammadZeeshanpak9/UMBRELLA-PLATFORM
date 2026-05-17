"use client";

import { useTranslations } from "next-intl";
import { useDynamicTranslation } from "@/components/providers/DynamicTranslationProvider";

function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : undefined;
}

function interpolate(str: string, values?: Record<string, string | number>): string {
  if (!values) return str;
  return Object.entries(values).reduce(
    (s, [k, v]) => s.replace(new RegExp(`\\{${k}\\}`, "g"), String(v)),
    str
  );
}

export function useT(namespace: string) {
  const { messages: dynamicMessages } = useDynamicTranslation();
  const t = useTranslations(namespace);

  return (key: string, values?: Record<string, string | number>): string => {
    if (dynamicMessages) {
      const val = getNestedValue(dynamicMessages as Record<string, unknown>, `${namespace}.${key}`);
      if (val) return interpolate(val, values);
    }
    return t(key, values as Parameters<typeof t>[1]);
  };
}
