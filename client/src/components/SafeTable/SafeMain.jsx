import React from "react";
import { TableCard } from "./tableCard";
import EmptyRestaurant from "./EmptyRestaurant";
import useRestaurantStore from "../../store/useRestaurantStore";

const SafeMain = () => {
  const { inputValue, fetchedRestaurants } = useRestaurantStore();

  return (
    <div className="px-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-5 p-5  gap-y-10">
        {fetchedRestaurants.map((restaurant) => (
          <TableCard
            key={restaurant.RELAX_SEQ}
            name={restaurant.RELAX_RSTRNT_NM}
            address1={restaurant.RELAX_ADD1}
            address2={restaurant.RELAX_ADD2}
            telephone={restaurant.RELAX_RSTRNT_TEL}
            category={restaurant.RELAX_GUBUN_DETAIL}
            seq={restaurant.RELAX_SEQ}
          />
        ))}
      </div>
      {/* To-do: 입력값에 따른 안심식당 정보가 없을 때 아래 컴포넌트 보여주기!! */}
      {inputValue && !fetchedRestaurants && <EmptyRestaurant />}
    </div>
  );
};

export default SafeMain;
