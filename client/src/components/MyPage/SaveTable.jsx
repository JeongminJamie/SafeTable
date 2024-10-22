import React, { useEffect, useState } from "react";
import useSavedTableStore from "../../store/useSavedTableStore";

const SaveTable = () => {
  const restaurantUrl = "https://www.safe-restaurant.com";

  const { savedRestaurants, addRestaurant, removeRestaurant } =
    useSavedTableStore((state) => ({
      savedRestaurants: state.savedRestaurants,
      addRestaurant: state.addRestaurant,
      removeRestaurant: state.removeRestaurant,
    }));

  useEffect(() => {
    console.log("저장된 식당 목록이 업데이트:", savedRestaurants);
  }, [savedRestaurants]);

  const handleRedirect = () => {
    window.location.href = restaurantUrl;
  };

  const handleClick = (restaurant) => {
    const isSaved = savedRestaurants.some((r) => r.id === restaurant.id);

    if (isSaved) {
      removeRestaurant(restaurant.id);
      console.log("삭제할 식당:", restaurant.id);
    } else {
      const restaurantWithClick = { ...restaurant, clicked: true };
      addRestaurant(restaurantWithClick);
      console.log("저장할 식당:", restaurantWithClick);
    }
  };

  return (
    <>
      {savedRestaurants.map((restaurant) => (
        <div
          className="w-full border border-gray-300 rounded-lg bg-white hover:cursor-pointer shadow-md p-4"
          key={restaurant.id}
        >
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
                  {restaurant.name}
                </h1>
                <button onClick={() => handleClick(restaurant)}>
                  <img
                    src={`./assets/${
                      restaurant.clicked ? "save" : "unsave"
                    }.svg`}
                    className="w-10 h-10"
                    alt={restaurant.clicked ? "찜" : "찜 취소"}
                  />
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-2">{restaurant.address}</p>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600 mb-3">
                  {restaurant.telephone}
                </p>
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
      ))}
    </>
  );
};

export default SaveTable;
