import Image from "next/image";

import { brandAssets, brandLogoHeights, brandLogoIconSizes, type BrandLogoSize } from "@/config/brand";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant?: "lockup" | "wordmark" | "icon";
  theme?: "light" | "dark";
  size?: BrandLogoSize;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  variant = "lockup",
  theme = "light",
  size = "md",
  className,
  priority = false,
}: BrandLogoProps) {
  const isDark = theme === "dark";
  const heightClass = brandLogoHeights[size];
  const iconSizeClass = brandLogoIconSizes[size];

  if (variant === "icon") {
    return (
      <Image
        src={brandAssets.icon.src}
        alt="ReadyGate"
        width={brandAssets.icon.width}
        height={brandAssets.icon.height}
        priority={priority}
        className={cn(iconSizeClass, "shrink-0", className)}
      />
    );
  }

  if (variant === "wordmark") {
    return (
      <span
        className={cn(
          typography.logo,
          "text-logo text-[1.35rem]",
          isDark ? "text-white" : "text-accent",
          className,
        )}
        aria-label="ReadyGate"
      >
        ReadyGate
      </span>
    );
  }

  return (
    <Image
      src={isDark ? brandAssets.logo.dark : brandAssets.logo.light}
      alt="ReadyGate"
      width={brandAssets.logo.width}
      height={brandAssets.logo.height}
      priority={priority}
      className={cn(heightClass, "w-auto shrink-0", className)}
    />
  );
}
