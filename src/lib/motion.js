/**
 * Shared Framer Motion variants + easing for the whole site.
 * Motion is precise, never bouncy: cubic-bezier easeOut, 200–500ms.
 */

export const EASE = [0.22, 1, 0.36, 1];

// Section wrapper: staggers its children as it scrolls into view.
export const staggerParent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

// Child reveal: opacity + 12px translateY.
export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

// Mask/slide-up used for headline lines (parent clips overflow).
export const lineReveal = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.5, ease: EASE } },
};

// Standard viewport config for scroll-triggered sections.
export const inView = { once: true, amount: 0.25 };
