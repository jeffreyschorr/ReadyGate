export function findVisibleTourTarget(stepId: string): HTMLElement | null {
  const nodes = document.querySelectorAll<HTMLElement>(`[data-tour="${stepId}"]`);

  for (const node of nodes) {
    if (isElementVisible(node)) {
      return node;
    }
  }

  return nodes[0] ?? null;
}

function isElementVisible(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();

  if (rect.width === 0 || rect.height === 0) {
    return false;
  }

  const style = window.getComputedStyle(element);

  return style.display !== "none" && style.visibility !== "hidden";
}

export function getTourSpotlightRect(
  element: HTMLElement,
  padding = 8,
): DOMRect {
  const rect = element.getBoundingClientRect();

  return new DOMRect(
    rect.x - padding,
    rect.y - padding,
    rect.width + padding * 2,
    rect.height + padding * 2,
  );
}
