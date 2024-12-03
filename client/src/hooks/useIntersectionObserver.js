import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = ({ onVisibleFn }) => {
  const targetRef = useRef(null);
  const [state, setState] = useState(null);

  useEffect(() => {
    if (!onVisibleFn) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          const visibleSource = await onVisibleFn();
          setState(visibleSource);
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

  return { state, targetRef };
};

export default useIntersectionObserver;
