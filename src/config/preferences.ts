export const homeToAirportMinuteOptions = [15, 20, 25, 30, 35, 45, 60] as const;

export type HomeToAirportMinutes =
  (typeof homeToAirportMinuteOptions)[number];

export const homeAirportOptions = [
  { code: "BNE", city: "Brisbane", label: "Brisbane (BNE)" },
  { code: "MEL", city: "Melbourne", label: "Melbourne (MEL)" },
  { code: "SYD", city: "Sydney", label: "Sydney (SYD)" },
  { code: "ADL", city: "Adelaide", label: "Adelaide (ADL)" },
  { code: "PER", city: "Perth", label: "Perth (PER)" },
] as const;

export const transportPreferenceOptions = [
  { id: "taxi", label: "Taxi" },
  { id: "rideshare", label: "Ride share" },
  { id: "public", label: "Public transport" },
  { id: "rental", label: "Rental car" },
  { id: "walking", label: "Walking" },
] as const;
