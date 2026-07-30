# Internationalisation (i18n)

ReadyGate uses a lightweight typed translation system integrated with `TravellerPreferencesProvider`. No external i18n library is required.

## Locale files

```
src/i18n/locales/
  en.json   # Source structure (Australian English)
  ja.json   # Japanese (enabled)
  fr.json   # French draft (prepared, not enabled)
```

Regenerate `ja.json` and `fr.json` after editing `en.json`:

```bash
node scripts/build-ja-fr-locales.mjs
```

Update flat translations in `scripts/locale-flat-translations.mjs` when adding keys. French keys missing from `FR_FLAT` fall back to English until translated.

## Usage in components

```tsx
import { useTranslation } from "@/i18n/useTranslation";

function MyComponent() {
  const { t, locale, plural } = useTranslation();

  return (
    <p>{t("common.nextAction")}</p>
    <p>{t("format.arriveBy", { time: "10:35" })}</p>
    <p>{plural(2, "format.minute.one", "format.minute.other", { count: 2 })}</p>
  );
}
```

## Usage in data builders

Pass `t` from the caller. Do not import React hooks in data files.

```tsx
const { t, display } = useTravellerPreferences();
const content = getStageContent(stage, display, t);
```

## Adding a translation key

1. Add the key to `en.json` using nested, meaningful paths (not full sentences as keys).
2. Add Japanese to `JA_FLAT` in `scripts/locale-flat-translations.mjs`.
3. Optionally add French to `FR_FLAT` (English is used as draft fallback).
4. Run `node scripts/build-ja-fr-locales.mjs`.
5. Use `t("your.key", { value })` in components or data builders.

## Adding a language

1. Add the locale code to `SupportedLocale` in `src/i18n/types.ts` if enabling it.
2. Add to `ENABLED_LOCALES` in `src/i18n/config.ts`.
3. Create flat translations and extend `scripts/build-ja-fr-locales.mjs`.
4. Add `localeToIntlLocale` mapping for date/time formatting.

## Fallback behaviour

- **English** is always the fallback.
- Missing keys in the active locale return the English string.
- Missing keys entirely log a warning in development only.
- Invalid `localStorage` language values fall back to English via `sanitizePreferences`.

## French

French (`fr.json`) is prepared but **not enabled**. The Preferences UI shows "Français (Coming soon)" as a disabled option. Do not add `"fr"` to `ENABLED_LOCALES` until a native speaker has reviewed `fr.json`.

## Language preference

Changing language in Traveller Preferences updates the app immediately via `TravellerPreferencesProvider`. The HTML `lang` attribute updates on the client. Regional formats (12/24-hour time, metric/imperial, °C/°F) are separate preferences handled by `createFormatters`.
