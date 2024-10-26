import React, { useEffect, useState } from "react";
import { api } from "../../api/api";

const SaveTable = () => {
  const restaurantUrl = "https://www.safe-restaurant.com";
  const [savedRestaurants, setSavedRestaurants] = useState([]); // 배열로 초기화

  const handleFetchSavedRestaurants = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get("/user/saved-tables", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSavedRestaurants(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching saved restaurants:", error);
    }
  };

  useEffect(() => {
    handleFetchSavedRestaurants();
  }, []);

  const handleRedirect = () => {
    window.location.href = restaurantUrl;
  };

  const handleClick = async (restaurant) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.delete(`/user/delete-table/${restaurant.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setSavedRestaurants((prev) =>
          prev.filter((r) => r.id !== restaurant.id)
        );
      }
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      alert("식당 삭제에 실패했습니다.");
    }
  };

  return (
    <>
      {savedRestaurants.length === 0 ? (
        <div className="text-center text-gray-600">찜한 식당이 없습니다.</div>
      ) : (
        savedRestaurants.map((restaurant) => (
          <div
            className="w-full mb-5 border border-gray-300 rounded-lg bg-white hover:cursor-pointer shadow-md p-4"
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

                <p className="text-sm text-gray-600 mb-2">
                  {restaurant.address}
                </p>
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
        ))
      )}
    </>
  );
};

export default SaveTable;
