import en from "@/i18n/locales/en.json";
import fr from "@/i18n/locales/fr.json";
import ja from "@/i18n/locales/ja.json";

type JsonObject = Record<string, unknown>;

function flattenKeys(object: JsonObject, prefix = ""): Set<string> {
  const keys = new Set<string>();

  for (const [key, value] of Object.entries(object)) {
    const path = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === "object" && !Array.isArray(value)) {
      for (const nested of flattenKeys(value as JsonObject, path)) {
        keys.add(nested);
      }
    } else {
      keys.add(path);
    }
  }

  return keys;
}

function diffKeys(source: Set<string>, target: Set<string>, label: string): string[] {
  const issues: string[] = [];

  for (const key of source) {
    if (!target.has(key)) {
      issues.push(`${label} missing key: ${key}`);
    }
  }

  for (const key of target) {
    if (!source.has(key)) {
      issues.push(`${label} extra key: ${key}`);
    }
  }

  return issues;
}

export function validateLocales(): string[] {
  const enKeys = flattenKeys(en as JsonObject);
  const jaKeys = flattenKeys(ja as JsonObject);
  const frKeys = flattenKeys(fr as JsonObject);

  return [
    ...diffKeys(enKeys, jaKeys, "ja"),
    ...diffKeys(enKeys, frKeys, "fr"),
  ];
}

if (process.env.NODE_ENV === "development") {
  const issues = validateLocales();
  if (issues.length > 0) {
    console.warn("[i18n] Locale structure mismatches:\n" + issues.join("\n"));
  }
}
