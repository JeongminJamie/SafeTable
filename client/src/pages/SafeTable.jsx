import React, { useEffect, useCallback } from "react";
import SafeMain from "../components/SafeTable/SafeMain";
import SearchBox from "../components/SafeTable/SearchBox";
import axios from "axios";
import fisherYatesShuffle from "../utils/fisherYatesShuffle";
import { useQuery } from "@tanstack/react-query";
import useRestaurantStore from "../store/useRestaurantStore";

const SafeTable = () => {
  const { setFetchedRestaurants } = useRestaurantStore();

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(
        `/openapi/${process.env.REACT_APP_RESTAURANT_API_KEY}/json/Grid_20200713000000000605_1/1/100?RELAX_SI_NM=서울특별시`
      );

      const data = response.data.Grid_20200713000000000605_1.row;
      const shuffledData = await fisherYatesShuffle(data);

      return shuffledData;
    } catch (error) {
      console.error("안심식당 전체 정보 조회 중 에러 발생", error);
    }
  };

  // To-do: isLoading이 1초 이상 넘어가면 스켈레톤 화면 띄워주기
  const { data, isLoading } = useQuery({
    queryKey: ["fetchEntireRestaurants"],
    queryFn: () => fetchRestaurants(),
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setFetchedRestaurants(data);
    }
  }, [data]);

  return (
    <>
      {/* <SearchBox /> */}
      <SafeMain />
    </>
  );
};

export default SafeTable;
