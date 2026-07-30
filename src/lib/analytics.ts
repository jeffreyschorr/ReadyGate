/** Analytics stubs. Wire trackPageView and trackEvent when a provider is chosen. */

export function trackPageView(path: string): void {
  void path;
  // No-op until analytics is configured.
}

export function trackEvent(
  name: string,
  properties?: Record<string, string>,
): void {
  void name;
  void properties;
  // No-op until analytics is configured.
}
