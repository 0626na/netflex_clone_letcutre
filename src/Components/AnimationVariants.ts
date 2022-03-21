export const rowVariant = {
  hidden: (direction: boolean) => {
    return {
      x: direction ? -window.outerWidth - 5 : window.outerWidth + 5,
    };
  },
  visible: {
    x: 0,
  },
  exit: (direction: boolean) => {
    return {
      x: direction ? window.outerWidth + 5 : -window.outerWidth - 5,
    };
  },
};

export const boxVariant = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -30,
    transition: { delay: 0.4, type: "tween", duration: 0.2 },
  },
};

export const movieInfoVariant = {
  hover: {
    opacity: 1,
    transition: { delay: 0.4, type: "tween", duration: 0.2 },
  },
};

export const sliderArrowVariant = {
  normal: {
    opacity: 0.5,
    scale: 1,
  },
  hover: {
    opacity: 1,
    scale: 2,
  },
};
