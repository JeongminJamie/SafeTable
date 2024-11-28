import React, { useEffect, useCallback, useState } from "react";
import SafeMain from "../components/SafeTable/SafeMain";
import SearchBox from "../components/SafeTable/SearchBox";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import useRestaurantStore from "../store/useRestaurantStore";
import useInfiniteObserver from "../hooks/useInfiniteObserver";
import {
  fetchEntireRestaurants,
  fetchRestaurantByInput,
} from "../service/searchService";
import Loading from "../components/Loading";
import { attachPhotoToRestaurant } from "../service/googleService";

const SafeTable = () => {
  const { searchedValue, setSearchedValue, setFetchedRestaurants } =
    useRestaurantStore();

  // 전체 및 검색 지역 안심식당 조회 쿼리 & 무한 스크롤링
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
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
  const loadMoreRef = useInfiniteObserver({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  // 쿼리의 데이터 set
  useEffect(() => {
    if (data) {
      const allFetchedRestaurants = data?.pages.flatMap((page) => page.data);
      setFetchedRestaurants(allFetchedRestaurants);
    }
  }, [data]);

  // 식당 데이터와 사진을 합치는 함수 호출 ---> tablecard onvisible로 진행중
  // const fetchRestaurantsWithPhotos = useCallback(async (restaurantData) => {
  //   setIsPageLoading(true);
  //   const restaurantsWithPhotos = await attachPhotoToRestaurant(restaurantData);
  //   setFetchedRestaurants(restaurantsWithPhotos);
  //   setIsPageLoading(false);
  // }, []);

  // restaurantData가 있을 때 fetchedRestaurants에 사진과 함께 식당 정보 업데이트 ---> tablecard onvisible로 진행중
  // useEffect(() => {
  //   if (restaurantData) {
  //     fetchRestaurantsWithPhotos(restaurantData);
  //   }
  // }, [restaurantData]);

  useEffect(() => {
    setSearchedValue("");
  }, []);

  return (
    <>
      <SearchBox />
      <SafeMain isLoading={isLoading} />
      <div ref={loadMoreRef}></div>
      {!isLoading && isFetchingNextPage && (
        <Loading width="w-32" height="h-32" padding="p-10" />
      )}
    </>
  );
};

export default SafeTable;
