#!/usr/bin/env node
/**
 * Reads en.json and builds ja.json + fr.json with identical key structure.
 * Run: node scripts/build-ja-fr-locales.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { JA_FLAT, FR_FLAT } from "./locale-flat-translations.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const localesDir = join(__dirname, "../src/i18n/locales");
const enPath = join(localesDir, "en.json");
const jaPath = join(localesDir, "ja.json");
const frPath = join(localesDir, "fr.json");

/** @param {unknown} obj @param {string} [prefix] */
function flattenKeys(obj, prefix = "") {
  /** @type {Set<string>} */
  const keys = new Set();
  if (!obj || typeof obj !== "object") return keys;
  for (const [key, value] of Object.entries(/** @type {Record<string, unknown>} */ (obj))) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      for (const nested of flattenKeys(value, path)) keys.add(nested);
    } else {
      keys.add(path);
    }
  }
  return keys;
}

/**
 * @param {unknown} enNode
 * @param {Record<string, string | string[]>} flatMap
 * @param {string} [prefix]
 */
function applyFlatMap(enNode, flatMap, prefix = "") {
  if (typeof enNode === "string") {
    return flatMap[prefix] ?? enNode;
  }
  if (Array.isArray(enNode)) {
    const translated = flatMap[prefix];
    if (Array.isArray(translated)) return translated;
    return enNode;
  }
  if (enNode && typeof enNode === "object") {
    /** @type {Record<string, unknown>} */
    const out = {};
    for (const [key, value] of Object.entries(enNode)) {
      const path = prefix ? `${prefix}.${key}` : key;
      out[key] = applyFlatMap(value, flatMap, path);
    }
    return out;
  }
  return enNode;
}

/** @param {Set<string>} source @param {Set<string>} target @param {string} label */
function diffKeys(source, target, label) {
  /** @type {string[]} */
  const issues = [];
  for (const key of source) {
    if (!target.has(key)) issues.push(`${label} missing: ${key}`);
  }
  for (const key of target) {
    if (!source.has(key)) issues.push(`${label} extra: ${key}`);
  }
  return issues;
}

const en = JSON.parse(readFileSync(enPath, "utf8"));
const enKeys = flattenKeys(en);

const jaMissing = [...enKeys].filter((k) => !(k in JA_FLAT));
if (jaMissing.length) {
  console.error(`JA translations missing ${jaMissing.length} keys:`);
  jaMissing.slice(0, 10).forEach((k) => console.error(`  ${k}`));
  process.exit(1);
}

/** French locale file: missing keys fall back to English until translated. */
const frFlat = { ...FR_FLAT };
for (const key of enKeys) {
  if (!(key in frFlat)) {
    const parts = key.split(".");
    let current = /** @type {unknown} */ (en);
    for (const part of parts) {
      current = /** @type {Record<string, unknown>} */ (current)[part];
    }
    if (typeof current === "string" || Array.isArray(current)) {
      frFlat[key] = current;
    }
  }
}

const ja = applyFlatMap(en, JA_FLAT);
const fr = applyFlatMap(en, frFlat);

writeFileSync(jaPath, `${JSON.stringify(ja, null, 2)}\n`);
writeFileSync(frPath, `${JSON.stringify(fr, null, 2)}\n`);

const jaKeys = flattenKeys(ja);
const frKeys = flattenKeys(fr);

console.log(`Read: ${enPath}`);
console.log(`Written: ${jaPath}`);
console.log(`Written: ${frPath}`);
console.log(`Key counts: en=${enKeys.size}, ja=${jaKeys.size}, fr=${frKeys.size}`);

const jaIssues = diffKeys(enKeys, jaKeys, "ja");
const frIssues = diffKeys(enKeys, frKeys, "fr");
const allIssues = [...jaIssues, ...frIssues];

if (allIssues.length > 0) {
  console.error("Structure mismatches:");
  for (const issue of allIssues.slice(0, 20)) console.error(`  ${issue}`);
  process.exit(1);
}

console.log("Structure validation: OK (all keys match)");
console.log(
  `Files exist: en=${existsSync(enPath)}, ja=${existsSync(jaPath)}, fr=${existsSync(frPath)}`,
);
