import React from "react";
import { TableCard } from "./tableCard";
import EmptyRestaurant from "./EmptyRestaurant";
import useRestaurantStore from "../../store/useRestaurantStore";

const SafeMain = () => {
  const { searchedValue, fetchedRestaurants } = useRestaurantStore();

  return (
    <div className="px-10 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-5 p-5  gap-y-10">
        {fetchedRestaurants.map((restaurant, index) => (
          <TableCard
            key={restaurant.RELAX_SEQ}
            name={restaurant.RELAX_RSTRNT_NM}
            address1={restaurant.RELAX_ADD1}
            address2={restaurant.RELAX_ADD2}
            telephone={restaurant.RELAX_RSTRNT_TEL}
            category={restaurant.RELAX_GUBUN_DETAIL}
            website={restaurant.RELAX_RSTRNT_ETC}
            seq={restaurant.RELAX_SEQ}
          />
        ))}
      </div>
      {/* 입력값에 따른 안심식당 정보가 없을 때 아래 컴포넌트 보여줌 */}
      {searchedValue && fetchedRestaurants.length === 0 && <EmptyRestaurant />}
    </div>
  );
};

export default SafeMain;
