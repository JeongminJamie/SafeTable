import { useEffect, useRef } from "react";

const useIntersectionObserver = ({ onVisibleFn }) => {
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisibleFn();
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

  return targetRef;
};

export default useIntersectionObserver;
