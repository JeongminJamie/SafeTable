import React, { useEffect } from "react";
import SafeMain from "../components/SafeTable/SafeMain";
import SearchBox from "../components/SafeTable/SearchBox";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import useRestaurantStore from "../store/useRestaurantStore";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import {
  fetchEntireRestaurants,
  fetchRestaurantByInput,
} from "../service/searchService";
import Loading from "../components/Loading";

const SafeTable = () => {
  const { searchedValue, setSearchedValue, setFetchedRestaurants } =
    useRestaurantStore();

  // 전체 및 검색 지역 안심식당 조회 쿼리 & 무한 스크롤링
  const {
    restaurantData,
    isRestaurantDataLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
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
  const loadMoreRef = useIntersectionObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  // 쿼리의 데이터 set
  useEffect(() => {
    if (restaurantData) {
      const allFetchedRestaurants = restaurantData?.pages.flatMap(
        (page) => page.data
      );
      setFetchedRestaurants(allFetchedRestaurants);
    }
  }, [restaurantData]);

  // 구글 사진 쿼리 위치
  // const { photoData, isLoading: isPhotoDataLoading } = useQuery({
  //   queryKey: [""],
  // });

  useEffect(() => {
    setSearchedValue("");
  }, []);

  return (
    <>
      <SearchBox />
      <SafeMain isLoading={isRestaurantDataLoading} />
      <div ref={loadMoreRef}></div>
      {isFetchingNextPage && (
        <Loading width="w-32" height="h-32" padding="p-10" />
      )}
    </>
  );
};

export default SafeTable;
