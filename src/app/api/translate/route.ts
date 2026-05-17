import { NextRequest, NextResponse } from "next/server";
import * as deepl from "deepl-node";

// DeepL language code mappings (simple code → DeepL target code)
const DEEPL_LANG_MAP: Record<string, deepl.TargetLanguageCode> = {
  en: "en-US",
  pt: "pt-BR",
  zh: "zh-HANS",
  "zh-tw": "zh-HANT",
};

function flattenMessages(obj: Record<string, unknown>, prefix = ""): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") {
      result[fullKey] = value;
    } else if (typeof value === "object" && value !== null) {
      Object.assign(result, flattenMessages(value as Record<string, unknown>, fullKey));
    }
  }
  return result;
}

function unflattenMessages(flat: Record<string, string>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(flat)) {
    const parts = key.split(".");
    let current = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!(parts[i] in current)) current[parts[i]] = {};
      current = current[parts[i]] as Record<string, unknown>;
    }
    current[parts[parts.length - 1]] = value;
  }
  return result;
}

export async function POST(req: NextRequest) {
  try {
    const { targetLang } = (await req.json()) as { targetLang: string };

    if (!targetLang || typeof targetLang !== "string") {
      return NextResponse.json({ error: "Missing targetLang" }, { status: 400 });
    }

    const apiKey = process.env.DEEPL_API_KEY;
    if (!apiKey || apiKey === "your_deepl_api_key_here") {
      return NextResponse.json({ error: "DEEPL_API_KEY not configured" }, { status: 503 });
    }

    const translator = new deepl.Translator(apiKey);

    const deepLTarget = (DEEPL_LANG_MAP[targetLang.toLowerCase()] ??
      targetLang) as deepl.TargetLanguageCode;

    const { default: enMessages } = (await import("@/messages/en.json")) as {
      default: Record<string, unknown>;
    };

    const flat = flattenMessages(enMessages);
    const keys = Object.keys(flat);
    const values = Object.values(flat);

    const BATCH_SIZE = 50;
    const translated: string[] = [];

    for (let i = 0; i < values.length; i += BATCH_SIZE) {
      const batch = values.slice(i, i + BATCH_SIZE);
      const results = await translator.translateText(batch, null, deepLTarget, {
        preserveFormatting: true,
      });
      translated.push(...results.map((r) => r.text));
    }

    const translatedFlat: Record<string, string> = {};
    keys.forEach((key, i) => {
      translatedFlat[key] = translated[i];
    });

    const messages = unflattenMessages(translatedFlat);
    return NextResponse.json({ messages });
  } catch (err) {
    console.error("Translation API error:", err);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
