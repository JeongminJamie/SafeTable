import React, { useEffect, useState } from "react";
import { TableCard } from "./tableCard";
import EmptyRestaurant from "./EmptyRestaurant";
import useRestaurantStore from "../../store/useRestaurantStore";
import RestaurantSkeleton from "./RestaurantSkeleton";
import { api } from "../../api/api";

const SafeMain = ({ isLoading }) => {
  const { searchedValue, fetchedRestaurants } = useRestaurantStore();
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [savedRestaurants, setSavedRestaurants] = useState([]); // 배열로 초기화

  // 로딩이 1초 이상일 때부터 스켈레톤 보여주기
  useEffect(() => {
    let timer;
    if (isLoading) {
      timer = setTimeout(() => setShowSkeleton(true), 500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isLoading]);

  // 유저의 찜 목록을 불러오는 함수 만약에 토큰이 없다면?
  useEffect(() => {
    const handleFetchSavedRestaurants = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await api.get("/user/saved-tables", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSavedRestaurants(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching saved restaurants:", error);
      }
    };
    handleFetchSavedRestaurants();
  }, []);

  return (
    <div className="px-10 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-5 p-5 gap-y-10">
        {/* 로딩 중일 때 Skeleton 표시 */}
        {showSkeleton
          ? Array(16)
              .fill(0)
              .map((_, index) => <RestaurantSkeleton key={index} />)
          : fetchedRestaurants?.map((restaurant) => (
              <TableCard
                key={restaurant.RELAX_SEQ}
                name={restaurant.RELAX_RSTRNT_NM}
                address1={restaurant.RELAX_ADD1}
                address2={restaurant.RELAX_ADD2}
                telephone={restaurant.RELAX_RSTRNT_TEL}
                category={restaurant.RELAX_GUBUN_DETAIL}
                website={restaurant.RELAX_RSTRNT_ETC}
                seq={restaurant.RELAX_SEQ}
                savedRestaurants={savedRestaurants}
              />
            ))}
      </div>
      {/* 입력값에 따른 안심식당 정보가 없을 때 아래 컴포넌트 보여줌 */}
      {searchedValue && fetchedRestaurants.length === 0 && <EmptyRestaurant />}
    </div>
  );
};

export default SafeMain;
