export function scrollToHash(
  hash: string,
  options: { reducedMotion?: boolean; offset?: number } = {},
): void {
  const id = hash.replace(/^#/, "");
  if (!id) {
    return;
  }

  const target = document.getElementById(id);
  if (!target) {
    return;
  }

  const offset = options.offset ?? 72;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: options.reducedMotion ? "auto" : "smooth",
  });

  window.history.replaceState(null, "", `#${id}`);
}
