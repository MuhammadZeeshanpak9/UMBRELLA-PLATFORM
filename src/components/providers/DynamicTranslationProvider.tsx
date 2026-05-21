"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

type MessagesObj = Record<string, unknown>;

interface DynamicTranslationContextValue {
  messages: MessagesObj | null;
  dynamicLocale: string | null;
  isLoading: boolean;
  setDynamicLocale: (locale: string) => void;
  clearDynamic: () => void;
}

const DynamicTranslationContext = createContext<DynamicTranslationContextValue>({
  messages: null,
  dynamicLocale: null,
  isLoading: false,
  setDynamicLocale: () => {},
  clearDynamic: () => {},
});

const STORAGE_KEY_PREFIX = "elev8_dyn_messages_";
const COOKIE_KEY = "elev8_language";
const RTL_DYNAMIC_LOCALES = new Set(["ar"]);

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, maxAge: number) {
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${maxAge};SameSite=Lax`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=;path=/;max-age=0`;
}

function getCachedMessages(locale: string): MessagesObj | null {
  try {
    const cached = sessionStorage.getItem(`${STORAGE_KEY_PREFIX}${locale}`);
    return cached ? (JSON.parse(cached) as MessagesObj) : null;
  } catch {
    return null;
  }
}

function setCachedMessages(locale: string, messages: MessagesObj) {
  try {
    sessionStorage.setItem(`${STORAGE_KEY_PREFIX}${locale}`, JSON.stringify(messages));
  } catch {
    // quota exceeded — silently ignore
  }
}

export default function DynamicTranslationProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<MessagesObj | null>(null);
  const [dynamicLocale, setDynamicLocaleState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Read cookie on mount
  useEffect(() => {
    const saved = getCookie(COOKIE_KEY);
    if (saved) setDynamicLocaleState(saved);
  }, []);

  const fetchTranslations = useCallback(async (locale: string) => {
    const cached = getCachedMessages(locale);
    if (cached) {
      setMessages(cached);
      return;
    }

    setIsLoading(true);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetLang: locale }),
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (!res.ok) throw new Error("Translation fetch failed");
      const { messages: fetched } = (await res.json()) as { messages: MessagesObj };
      setCachedMessages(locale, fetched);
      setMessages(fetched);
    } catch {
      clearTimeout(timer);
      setMessages(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setDynamicLocale = useCallback((locale: string) => {
    setCookie(COOKIE_KEY, locale, 31536000);
    setDynamicLocaleState(locale);
  }, []);

  const clearDynamic = useCallback(() => {
    deleteCookie(COOKIE_KEY);
    setDynamicLocaleState(null);
    setMessages(null);
  }, []);

  useEffect(() => {
    if (dynamicLocale) {
      fetchTranslations(dynamicLocale);
    } else {
      setMessages(null);
    }
  }, [dynamicLocale, fetchTranslations]);

  // Set dir attribute for dynamic RTL locales
  useEffect(() => {
    if (dynamicLocale && RTL_DYNAMIC_LOCALES.has(dynamicLocale)) {
      document.documentElement.setAttribute("dir", "rtl");
    } else if (dynamicLocale) {
      document.documentElement.setAttribute("dir", "ltr");
    }
  }, [dynamicLocale]);

  return (
    <DynamicTranslationContext.Provider
      value={{ messages, dynamicLocale, isLoading, setDynamicLocale, clearDynamic }}
    >
      {children}
    </DynamicTranslationContext.Provider>
  );
}

export function useDynamicTranslation() {
  return useContext(DynamicTranslationContext);
}
