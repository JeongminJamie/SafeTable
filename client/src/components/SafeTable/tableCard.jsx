import React from "react";

export const TableCard = ({
  name,
  address1,
  address2,
  telephone,
  category,
  website,
  seq,
}) => {
  const reservedTables = 5;
  const restaurantUrl = "https://www.safe-restaurant.com"; // 실제 URL로 변경

  const handleSaveRestaurant = () => {
    console.log("click");
  };

  const handleRedirect = () => {
    window.location.href = restaurantUrl; // URL로 이동
  };

  return (
    <div className="w-80 border border-gray-300 rounded-lg bg-white transition-transform transform hover:scale-105 hover:cursor-pointer shadow-md">
      <div className="relative w-full h-40 bg-gray-200  overflow-hidden mb-4">
        <img
          src="사진링크"
          alt="식당 이미지"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* 식당 저장 버튼 */}
        <button
          onClick={handleSaveRestaurant}
          className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-lg transition-colors shadow-lg flex items-center"
        >
          <img
            src="./assets/save-icon.svg"
            className="w-6 h-6 mr-1"
            alt="저장 아이콘"
          />
          저장
        </button>
      </div>
      <div className="m-3">
        <h1 className="text-lg font-semibold mb-1 text-gray-800">{name}</h1>
        <p className="text-sm text-gray-600 mb-2">
          {address1} {address2}
        </p>
        <p className="text-sm text-gray-600 mb-3">{telephone}</p>
        <div className="flex justify-between mb-3">
          <button className="flex-1 bg-gray-200 text-gray-700 py-1 rounded hover:bg-gray-300 mr-1">
            {category}
          </button>
          <button
            onClick={handleRedirect} // 버튼 클릭 시 URL로 이동
            className="flex-1 bg-gray-200 text-gray-700 py-1 rounded hover:bg-gray-300 ml-1"
          >
            {/* 이 부분 웹사이트 데이터를 갖고 있는 곳이 거의 없음  */}
            {website}
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-2">
          Booked{" "}
          <span className="font-bold text-blue-600">{reservedTables}</span>{" "}
          times today
        </p>
        <button className="w-full bg-white text-blue-500 border border-blue-500 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors">
          예약하러 가기
        </button>
      </div>
    </div>
  );
};
