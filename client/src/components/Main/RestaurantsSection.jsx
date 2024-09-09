import React from "react";
import EachRestaurant from "./EachRestaurant";

const RestaurantsSection = () => {
  return (
    <div className="w-full overflow-x-hidden flex flex-col items-center mb-4">
      <div className="font-bold text-4xl text-center mt-10 mb-2">추천 식당</div>
      <div className="w-11/12 flex flex-row w-full justify-between items-center gap-3 p-10">
        <EachRestaurant />
        <EachRestaurant />
        <EachRestaurant />
        <EachRestaurant />
      </div>
    </div>
  );
};

export default RestaurantsSection;
