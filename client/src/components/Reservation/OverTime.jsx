import React from "react";

const OverTime = () => {
  return (
    <div className="px-5 py-5">
      <p className="font-semibold text-xl text-amber-700 mb-2">
        당일 예약이 불가한 시간입니다.
      </p>
      <p className="font-medium text-lg">다른 날짜를 선택해주세요!</p>
    </div>
  );
};

export default OverTime;
