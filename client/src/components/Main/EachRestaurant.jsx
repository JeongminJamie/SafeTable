import React from "react";

const EachRestaurant = () => {
  return (
    <div className="w-1/4 h-[30rem] p-1 transition-transform transform rounded-lg hover:rounded-2xl hover:translate-y-[-4px] hover:shadow-lg hover:shadow-gray-500/50 cursor-pointer">
      <img
        src="/assets/korean-food.avif"
        className="rounded-2xl object-cover w-full h-3/4"
      ></img>
      <div className="flex flex-col space-around gap-2 mt-2 p-2">
        <div className="font-bold text-xl">식당 이름</div>
        <div>업종</div>
        <div className="mb-2">주소</div>
      </div>
    </div>
  );
};

export default EachRestaurant;
