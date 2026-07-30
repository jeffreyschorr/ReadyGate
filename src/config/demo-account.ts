import { mockJourney } from "@/data/mockJourney";

/** Demo account details for the ReadyGate prototype settings page. */
export const demoAccount = {
  fullName: mockJourney.passenger.fullName,
  email: "alex.morgan@example.com",
  mobile: "+61 412 345 678",
  signInMethod: "Email",
  memberSince: "2024-03-15T00:00:00+10:00",
  lastSignedIn: "2026-07-29T07:45:00+10:00",
} as const;
