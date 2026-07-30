/**
 * Semantic typography classes aligned to the ReadyGate type scale.
 *
 * Logo / page titles: 700
 * Section and card headings: 600
 * Buttons: 600
 * Body: 400
 * Labels and metadata: 500
 */
export const typography = {
  logo: "text-sm font-bold tracking-tight",
  pageTitle: "text-2xl font-bold tracking-tight leading-tight md:text-3xl",
  pageTitleLarge: "text-3xl font-bold tracking-tight leading-tight md:text-4xl",
  sectionHeading: "text-base font-semibold leading-snug",
  cardHeading: "text-base font-semibold leading-snug",
  cardHeadingSm: "text-sm font-semibold leading-snug",
  body: "text-base font-normal leading-relaxed",
  bodySm: "text-sm font-normal leading-relaxed",
  label: "text-sm font-medium leading-normal",
  metadata: "text-xs font-medium uppercase tracking-wide leading-normal",
  button: "font-semibold",
} as const;
