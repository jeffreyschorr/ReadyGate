"use client";

import { getImageProps } from "next/image";

import { useTranslation } from "@/i18n/useTranslation";

const APP_PREVIEW_SRC = "/app_screen.png";
const WIDTH = 881;
const HEIGHT = 1600;

export function LandingHeroVisual() {
  const { t } = useTranslation();
  const alt = t("landing.heroVisual.imageAlt");

  const { props: optimized } = getImageProps({
    src: APP_PREVIEW_SRC,
    alt,
    width: WIDTH,
    height: HEIGHT,
    priority: true,
    unoptimized: true,
    sizes: "(max-width: 640px) 300px, (max-width: 1024px) 340px, 380px",
  });

  const { srcSet, ...imgProps } = optimized;

  return (
    <div className="relative w-full max-w-[300px] sm:max-w-[320px] lg:max-w-[340px] xl:max-w-[380px]">
      <picture className="block aspect-[881/1600]">
        {srcSet ? <source srcSet={srcSet} type="image/webp" /> : null}
        <img
          {...imgProps}
          alt={alt}
          onError={(event) => {
            const image = event.currentTarget;

            if (!image.src.endsWith(APP_PREVIEW_SRC)) {
              image.removeAttribute("srcset");
              image.src = APP_PREVIEW_SRC;
            }
          }}
          className="h-full w-full object-contain object-right object-top"
        />
      </picture>
    </div>
  );
}
