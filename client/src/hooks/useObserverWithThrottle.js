import { useEffect, useRef } from "react";
import { throttle } from "../utils/throttle";

const useObserverWithThrottle = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  delay,
}) => {
  const loadMoreRef = useRef(null);

  const throttledFetchNextPage = throttle(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, delay);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          throttledFetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return loadMoreRef;
};

export default useObserverWithThrottle;
