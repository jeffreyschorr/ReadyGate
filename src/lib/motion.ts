export const motionDuration = {
  page: 0.25,
  stage: 0.25,
  micro: 0.2,
  expand: 0.25,
  progress: 0.35,
} as const;

export const motionEase = [0.25, 0.1, 0.25, 1] as const;

export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const stageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const cardHover = {
  scale: 1.01,
  boxShadow: "0 8px 24px 0 rgb(26 26 26 / 0.08)",
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};
