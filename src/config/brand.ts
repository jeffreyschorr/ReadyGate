export const brandAssets = {
  logo: {
    /** Dark-coloured lockup for light backgrounds */
    light: "/readygate-logo-dark.png",
    /** White lockup for dark backgrounds */
    dark: "/readygate-logo-white.png",
    width: 800,
    height: 183,
  },
  icon: {
    src: "/favicon.png",
    width: 183,
    height: 183,
  },
} as const;

/** Logo lockup heights (scaled from h-7 / h-8 / h-10). */
export const brandLogoHeights = {
  sm: "h-[2.1rem]",
  md: "h-[2.4rem]",
  lg: "h-12",
} as const;

export const brandLogoIconSizes = {
  sm: "h-[2.1rem] w-[2.1rem]",
  md: "h-[2.4rem] w-[2.4rem]",
  lg: "h-12 w-12",
} as const;

export type BrandLogoSize = keyof typeof brandLogoHeights;
