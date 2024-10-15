import React, { useEffect } from "react";
import SafeMain from "../components/SafeTable/SafeMain";
import SearchBox from "../components/SafeTable/SearchBox";

import axios from "axios";
import fisherYatesShuffle from "../utils/fisherYatesShuffle";
import { useInfiniteQuery } from "@tanstack/react-query";
import useRestaurantStore from "../store/useRestaurantStore";
import useObserverWithThrottle from "../hooks/useObserverWithThrottle";

const SafeTable = () => {
  const { setFetchedRestaurants } = useRestaurantStore();

  const fetchEntireRestaurants = async (pageParam) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_PORT_URL}/api/restaurants/openapi/${process.env.REACT_APP_RESTAURANT_API_KEY}/json/Grid_20200713000000000605_1/${pageParam}/100?RELAX_SI_NM=서울특별시`
      );

      const data = response.data.Grid_20200713000000000605_1.row;
      const shuffledData = await fisherYatesShuffle(data);

      return { data: shuffledData, nextCursor: pageParam + 1 };
    } catch (error) {
      console.error("안심식당 전체 정보 조회 중 에러 발생", error);
    }
  };

  // To-do: isLoading이 1초 이상 넘어가면 스켈레톤 화면 띄워주기
  // 전체 안심식당 조회 및 무한 스크롤링
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["fetchEntireRestaurants"],
      queryFn: ({ pageParam }) => fetchEntireRestaurants(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => {
        return lastPage?.nextCursor ? lastPage.nextCursor : undefined;
      },
    });

  // 무한 스크롤링을 위한 observer 커스텀 훅 호출
  const loadMoreRef = useObserverWithThrottle({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    delay: 1000,
  });

  useEffect(() => {
    if (data) {
      const allFetchedRestaurants = data.pages.flatMap((page) => page.data);
      setFetchedRestaurants(allFetchedRestaurants);
    }
  }, [data]);

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
