import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";

export const TableCard = ({
  name,
  address1,
  address2,
  telephone,
  category,
  website,
  seq,
  savedRestaurants,
}) => {
  const navigate = useNavigate();

  const reservedTables = 5;
  const restaurantUrl = "https://www.safe-restaurant.com"; // 실제 URL로 변경 => 이 부분 어떻게 대체할까요?

  const [restaurant, setRestaurant] = useState({
    id: seq,
    name,
    address: `${address1} ${address2}`,
    telephone,
    clicked: false,
  });

  // savedRestaurants를 기반으로 `clicked` 상태 설정
  useEffect(() => {
    const savedRestaurant = savedRestaurants.find(
      (res) => res.id === String(seq)
    );
    console.log("🚀 ~ useEffect ~ savedRestaurant:", savedRestaurant);
    setRestaurant((prev) => ({
      ...prev,
      clicked: savedRestaurant ? savedRestaurant.clicked : false, // 찜 상태
    }));
  }, [savedRestaurants, seq]);

  const handleSaveRestaurant = (e) => {
    e.preventDefault();
    setRestaurant((prev) => ({ ...prev, clicked: !prev.clicked }));
  };

  useEffect(() => {
    const saveRestaurant = async () => {
      const token = sessionStorage.getItem("token");

      try {
        const response = await api.post("/user/save-table", restaurant, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.message) {
          console.log(response.data);
        } else {
          console.log("Failed to save restaurant.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const deleteRestaurant = async () => {
      const token = sessionStorage.getItem("token");

      try {
        const response = await api.delete(
          `/user/delete-table/${restaurant.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.message) {
          console.log(response.data);
        } else {
          console.log("Failed to delete restaurant.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // savedRestaurants에서 현재 식당의 clicked 상태 확인
    const isSaved = savedRestaurants.some((res) => res.id === String(seq));

    if (restaurant.clicked) {
      saveRestaurant();
    } else if (isSaved) {
      // clicked가 false이고 savedRestaurants에 있는 경우 삭제 요청
      deleteRestaurant();
    }
  }, [restaurant, savedRestaurants]);

  const handleRedirect = () => {
    window.location.href = restaurantUrl; // URL로 이동
  };

  const BookButtonHandler = () => {
    navigate(`/reservation/${seq}`);
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
            src={`./assets/${restaurant.clicked ? "save" : "unsave"}.svg`}
            className="w-6 h-6 mr-1"
            alt={restaurant.clicked ? "찜" : "찜 취소"}
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
        <button
          className="w-full bg-white text-blue-500 border border-blue-500 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
          onClick={BookButtonHandler}
        >
          예약하기
        </button>
      </div>
    </div>
  );
};
