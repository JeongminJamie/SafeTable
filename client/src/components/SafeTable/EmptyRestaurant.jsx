import React from "react";

const EmptyRestaurant = () => {
  //store에서 inputValue 나중에 가져오기
  return (
    <div className="flex flex-col items-center h-screen w-full gap-5">
      <img src="/assets/empty.png" alt="empty" className="w-20 h-20" />
      <div className="font-base text-lg">
        inputValue에 대한 결과가 없습니다.
      </div>
    </div>
  );
};

export default EmptyRestaurant;
