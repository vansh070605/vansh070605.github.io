export const fadeUp = {
  initial: {
    opacity: 0,
    y: 30,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.7,
    ease: "easeOut",
  },
  viewport: {
    once: true,
  },
};
