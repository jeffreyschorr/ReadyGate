import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isPathActive(pathname: string, href: string): boolean {
  if (href === "/" || href === "/home") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isSettingsAreaActive(pathname: string): boolean {
  return pathname === "/settings" || pathname.startsWith("/settings/");
}
