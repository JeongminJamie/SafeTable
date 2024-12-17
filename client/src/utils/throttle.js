export const throttle = (callback, delay) => {
  let inThrottle = false;

  return (...args) => {
    if (!inThrottle) {
      callback(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, delay);
    }
  };
};
