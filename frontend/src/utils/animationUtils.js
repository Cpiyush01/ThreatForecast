export const fadeInVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export const slideInVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export const pulseGlowVariants = {
  idle: { boxShadow: '0 0 0px rgba(0, 240, 255, 0)' },
  glow: {
    boxShadow: [
      '0 0 10px rgba(0, 240, 255, 0.2)',
      '0 0 25px rgba(0, 240, 255, 0.6)',
      '0 0 10px rgba(0, 240, 255, 0.2)',
    ],
    transition: { duration: 2, repeat: Infinity },
  },
};
