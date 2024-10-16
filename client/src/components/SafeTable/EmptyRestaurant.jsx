import React from "react";
import useRestaurantStore from "../../store/useRestaurantStore";

const EmptyRestaurant = () => {
  const { searchedValue } = useRestaurantStore();
  
  return (
    <div className="flex flex-col items-center h-screen w-full gap-5 mt-10">
      <img src="/assets/empty.png" alt="empty" className="w-20 h-20" />
      <div>
        <span className="font-medium">{searchedValue}</span>에 대한 안심식당
        정보가 없습니다.
      </div>
    </div>
  );
};

export default EmptyRestaurant;
