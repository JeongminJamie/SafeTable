import { useEffect, useRef } from "react";

const useIntersectionObserver = ({ onVisibleFn }) => {
  const targetRef = useRef(null);
  let photoURL = "";

  useEffect(() => {
    if (!onVisibleFn) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          photoURL = onVisibleFn();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.disconnect();
      }
    };
  }, [onVisibleFn]);

  return { photoURL, targetRef };
};

export default useIntersectionObserver;
