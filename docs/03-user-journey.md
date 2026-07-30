# User Journey

Maps primary user flows and touchpoints within ReadyGate.

## Journey Simulator (prototype)

ReadyGate adapts the Home screen to the traveller’s **current journey stage** — answering “what matters most right now?” rather than showing a static dashboard.

For the concept prototype, the active stage is controlled manually through the **ReadyGate Demo** panel (bottom-right in development). This lets presenters walk through the full trip without relying on the real calendar date.

### Journey stages

1. **Planning** — trip confirmed, low urgency
2. **Week before** — preparation and outlook
3. **Day before** — packing, documents, check-in timing
4. **Check-in open** — primary action is check-in
5. **Leaving home** — departure time and traffic
6. **At airport** — terminal, security, baggage
7. **After security** — gate walk time, nearby options
8. **Boarding** — focused, essential information only
9. **In flight** — arrival preparation
10. **Arrival** — baggage, transport, weather
11. **After arrival** — completed journey summary

### Production path

In a future product, the stage could be derived from booking data, check-in status, geolocation near the airport, live flight events, and boarding signals — not from a manual selector. The prototype does **not** use real-time data.

## Journey page

The `/journey` route presents a vertical milestone story (Planning through Hotel) driven by the same demo stage as Home. Milestone status, looking-ahead events, and the plan-flow footer are derived from `stageToMilestoneIndex` in the stage configuration layer.

## Status

Draft — Home screen implements stage-adaptive behaviour; other routes remain placeholders.
