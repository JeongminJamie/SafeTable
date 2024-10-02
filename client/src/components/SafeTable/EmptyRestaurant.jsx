import React from "react";

const EmptyRestaurant = () => {
  //store에서 inputValue 나중에 가져오기

  return (
    <div className="flex flex-col items-center h-screen w-full gap-5 mt-10">
      <img src="/assets/empty.png" alt="empty" className="w-20 h-20" />
      <div>
        <span className="font-medium">"inputValue"</span>에 대한 안심식당 정보가
        없습니다.
      </div>
    </div>
  );
};

export default EmptyRestaurant;
