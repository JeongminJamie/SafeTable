import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TableCard } from "./tableCard";
import EmptyRestaurant from "./EmptyRestaurant";
import useRestaurantStore from "../../store/useRestaurantStore";
import RestaurantSkeleton from "./RestaurantSkeleton";
import { api } from "../../api/api";
import { getAxiosHeaderConfig } from "../../config";
import { getMyReservation } from "../../service/reservationService";
import { addPhotoToRestaurant } from "../../service/googleService";

const SafeMain = ({ isLoading }) => {
  const { searchedValue, fetchedRestaurants, setFetchedRestaurants } =
    useRestaurantStore();
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [savedRestaurants, setSavedRestaurants] = useState([]); // 배열로 초기화

  // 식당과 사진 데이터 불러오는데 시간이 걸리므로 1초 지연 없이 바로 스켈레톤 보여주는 걸로 수정
  useEffect(() => {
    if (isLoading) {
      setShowSkeleton(true);
    } else {
      setShowSkeleton(false);
    }
  }, [isLoading, fetchedRestaurants]);

  // 각 테이블 카드가 보일 때 식당 이름으로 사진 url 패치 ---- 진행중
  const onVisibleGetPhoto = async (restaurantData, restaurantName) => {
    const restaurantDataWithPhoto = await addPhotoToRestaurant(
      restaurantData,
      restaurantName
    );

    setFetchedRestaurants(restaurantDataWithPhoto);
  };

  // 유저의 찜 목록을 불러오기
  useEffect(() => {
    const handleFetchSavedRestaurants = async () => {
      const headersConfig = getAxiosHeaderConfig();
      if (!headersConfig) return;
      try {
        const response = await api.get("/user/saved-tables", headersConfig);
        setSavedRestaurants(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching saved restaurants:", error);
      }
    };
    handleFetchSavedRestaurants();
  }, []);

  const { data: reservations = [], isLoading: isReservationsLoading } =
    useQuery({
      queryKey: ["getMyReservations"],
      queryFn: getMyReservation,
      refetchOnWindowFocus: false,
    });

  return (
    <div className="px-10 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-5 p-5 gap-y-10">
        {/* 로딩 중일 때 전체 Skeleton 표시 */}
        {showSkeleton &&
          Array(16)
            .fill(0)
            .map((_, index) => <RestaurantSkeleton key={index} />)}
        {fetchedRestaurants?.map((restaurant) => (
          // <LazyLoad
          //   key={restaurant.RELAX_SEQ}
          //   height={200}
          //   offset={100}
          //   placeholder={<RestaurantSkeleton />}
          //   onVisible={() =>
          //     onVisibleGetPhoto(restaurantData, restaurant.RELAX_RSTRNT_NM)
          //   }
          // >
          // ---> onVisible의 함수가 실행되지 않음 : intersection observer를 사용해도 !제일 먼저 진행해야 할 것
          <TableCard
            key={restaurant.RELAX_SEQ}
            photoUrl={
              restaurant.hasOwnProperty("PHOTO_URL") ? restaurant.PHOTO_URL : ""
            }
            name={restaurant.RELAX_RSTRNT_NM}
            address1={restaurant.RELAX_ADD1}
            address2={restaurant.RELAX_ADD2}
            telephone={restaurant.RELAX_RSTRNT_TEL}
            category={restaurant.RELAX_GUBUN_DETAIL}
            website={restaurant.RELAX_RSTRNT_ETC}
            seq={restaurant.RELAX_SEQ}
            savedRestaurants={savedRestaurants}
            reservations={reservations}
            onVisible={() =>
              onVisibleGetPhoto(fetchedRestaurants, restaurant.RELAX_RSTRNT_NM)
            }
          />
        ))}
      </div>
      {/* 입력값에 따른 안심식당 정보가 없을 때 아래 컴포넌트 보여줌 */}
      {searchedValue && fetchedRestaurants.length === 0 && <EmptyRestaurant />}
    </div>
  );
};

export default SafeMain;
