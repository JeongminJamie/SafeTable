import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { getAxiosHeaderConfig } from "../../config";
import { AuthModal } from "../Login/AuthModal";

export const TableCard = ({
  photoUrl,
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
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState("login");
  const [token, setToken] = useState(null); //이거 이렇게 두면 안됨. 변경필요

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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
    setRestaurant((prev) => ({
      ...prev,
      clicked: savedRestaurant ? savedRestaurant.clicked : false, // 찜 상태
    }));
  }, [savedRestaurants, seq]);

  const handleSaveRestaurant = (e) => {
    e.preventDefault();
    const headersConfig = getAxiosHeaderConfig();
    if (!headersConfig) {
      setCurrentForm("login");
      openModal();
      return;
    }

    setRestaurant((prev) => ({ ...prev, clicked: !prev.clicked }));
  };

  useEffect(() => {
    const saveRestaurant = async () => {
      const headersConfig = getAxiosHeaderConfig();
      if (!headersConfig) return;

      try {
        const response = await api.post(
          "/user/save-table",
          restaurant,
          headersConfig
        );

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
      const headersConfig = getAxiosHeaderConfig();
      if (!headersConfig) return;

      try {
        const response = await api.delete(
          `/user/delete-table/${restaurant.id}`,
          headersConfig
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

    if (restaurant.clicked) {
      saveRestaurant();
    } else {
      const wasSaved = savedRestaurants.some((res) => res.id === String(seq));
      if (wasSaved) deleteRestaurant();
    }
  }, [restaurant.clicked]);

  const handleRedirect = () => {
    window.location.href = restaurantUrl; // URL로 이동
  };

  const BookButtonHandler = () => {
    navigate(`/reservation/${seq}`);
  };

  return (
    <>
      <div className="w-80 border border-gray-300 rounded-lg bg-white transition-transform transform hover:scale-105 hover:cursor-pointer shadow-md">
        <div className="relative w-full h-40 bg-gray-200  overflow-hidden mb-4">
          <img
            src={photoUrl}
            alt="식당 이미지"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* 식당 저장 버튼 */}
          <button
            onClick={handleSaveRestaurant}
            className={`absolute top-2 right-2 text-white font-semibold py-1 px-2 rounded-lg transition-colors shadow-lg flex items-center ${
              restaurant.clicked
                ? "bg-amber-500"
                : "bg-amber-200 hover:bg-amber-500"
            }`}
          >
            <img
              src={`./assets/${restaurant.clicked ? "save" : "unsave"}.svg`}
              className="w-6 h-6"
              alt={restaurant.clicked ? "찜" : "찜 취소"}
            />
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
      <AuthModal
        isModalOpen={isModalOpen}
        onClose={closeModal}
        currentForm={currentForm}
        setCurrentForm={setCurrentForm}
        setToken={setToken}
        onLoginSuccess={() => window.location.reload()}
      />
    </>
  );
};
