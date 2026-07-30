const APP_ROUTE_PREFIXES = [
  "/home",
  "/journey",
  "/flight",
  "/destination",
  "/notifications",
  "/settings",
] as const;

/** Routes inside the interactive demo app (not the marketing site). */
export function isAppRoute(pathname: string): boolean {
  return APP_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
