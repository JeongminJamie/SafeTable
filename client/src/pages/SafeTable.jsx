import React, { useEffect } from "react";
import SafeMain from "../components/SafeTable/SafeMain";
import SearchBox from "../components/SafeTable/SearchBox";

import { useInfiniteQuery } from "@tanstack/react-query";
import useRestaurantStore from "../store/useRestaurantStore";
import useObserverWithThrottle from "../hooks/useObserverWithThrottle";
import {
  fetchEntireRestaurants,
  fetchRestaurantByInput,
} from "../utils/searchService";

const SafeTable = () => {
  const { searchedValue, setSearchedValue, setFetchedRestaurants } =
    useRestaurantStore();

  // 전체 및 검색 지역 안심식당 조회 쿼리 & 무한 스크롤링
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["fetchRestaurants", searchedValue],
      queryFn: ({ pageParam }) => {
        return searchedValue
          ? fetchRestaurantByInput(searchedValue, pageParam)
          : fetchEntireRestaurants(pageParam);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => {
        return lastPage?.nextCursor ?? undefined;
      },
      staleTime: 120 * 1000,
      refetchOnWindowFocus: false,
    });

  // 무한 스크롤링을 위한 observer 커스텀 훅 호출
  const loadMoreRef = useObserverWithThrottle({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    delay: 1000,
  });

  // 쿼리의 데이터 set
  useEffect(() => {
    if (data) {
      const allFetchedRestaurants = data.pages.flatMap((page) => page.data);
      setFetchedRestaurants(allFetchedRestaurants);
      console.log(allFetchedRestaurants);
    }
  }, [data]);

  useEffect(() => {
    setSearchedValue("");
  }, []);

  return (
    <>
      <SearchBox />
      <SafeMain />
      <div ref={loadMoreRef}></div>
      {isFetchingNextPage && (
        <img
          src="/assets/loading-animation.gif"
          alt="loading"
          className="m-auto w-32 h-32 p-10"
        />
      )}
    </>
  );
};

export default SafeTable;
