import React, { useState } from "react";

const SaveTable = () => {
  const restaurantUrl = "https://www.safe-restaurant.com";
  const [clickSave, setClickSave] = useState(false);
  const handleRedirect = () => {
    window.location.href = restaurantUrl;
  };

  const handleClick = () => {
    setClickSave(!clickSave);
  };

  return (
    <div className="w-full border border-gray-300 rounded-lg bg-white hover:cursor-pointer shadow-md p-4">
      <div className="flex">
        <img
          src="사진링크"
          alt="식당 이미지"
          className="w-24 h-24 object-cover rounded-lg bg-gray-200"
        />
        <div className="ml-4 flex-1">
          <div className="flex justify-between items-center">
            <h1
              className="text-lg font-semibold text-gray-800"
              onClick={handleRedirect}
            >
              안심갈비식당
            </h1>
            <button onClick={handleClick}>
              {clickSave ? (
                <img
                  src="./assets/unsave.svg"
                  className="w-10 h-10"
                  alt="찜 취소"
                />
              ) : (
                <img src="./assets/save.svg" className="w-10 h-10" alt="찜" />
              )}
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-2">
            서울특별시 강남구 역삼동 123-45
          </p>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600 mb-3">02-123-4567</p>
            <button
              onClick={handleRedirect}
              className="bg-white text-blue-500 border border-blue-500 py-1 px-2 rounded hover:bg-blue-500 hover:text-white transition-colors"
            >
              예약하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveTable;
