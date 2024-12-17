import { useEffect, useRef } from "react";

export const useDebounce = (callback, delay) => {
  const timerRef = useRef();

  const debounceCallback = (...args) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return debounceCallback;
};
