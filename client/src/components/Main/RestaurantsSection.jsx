import React from "react";
import EachRestaurant from "./EachRestaurant";

const RestaurantsSection = () => {
  return (
    <>
      <div className="font-bold text-5xl text-center my-20">추천 식당</div>
      <div className="flex flex-row w-screen">
        <EachRestaurant />
        <EachRestaurant />
        <EachRestaurant />
        <EachRestaurant />
      </div>
    </>
  );
};

export default RestaurantsSection;
