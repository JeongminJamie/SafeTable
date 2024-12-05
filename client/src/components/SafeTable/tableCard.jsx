import React, { useEffect, useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { getAxiosHeaderConfig } from "../../config";
import { AuthModal } from "../Login/AuthModal";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

export const TableCard = React.memo(
  ({
    name,
    address1,
    address2,
    telephone,
    category,
    website,
    seq,
    savedRestaurants,
    reservations,
    onVisible,
  }) => {
    const navigate = useNavigate();
    const { state: photoURL, targetRef: cardRef } = useIntersectionObserver({
      onVisibleFn: onVisible,
    });
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentForm, setCurrentForm] = useState("login");
    const [token, setToken] = useState(null); //이거 이렇게 두면 안됨. 변경필요
    const [photoSource, setPhotoSource] = useState("");

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const [restaurant, setRestaurant] = useState({
      photoURL: photoSource,
      id: seq,
      name,
      address: `${address1} ${address2}`,
      telephone,
      clicked: false,
    });

    const matchingReservations = (reservations || []).filter(
      (res) => res.name === name && res.address === `${address1}${address2}`
    );

    // 실제 구글 식당 사진으로 URL 업데이트
    useEffect(() => {
      if (photoURL) {
        setPhotoSource(photoURL);
        setRestaurant((prev) => ({ ...prev, photoURL }));
      }
    }, [photoURL]);

    useEffect(() => {
      const savedRestaurant = savedRestaurants.find(
        (res) => res.id === String(seq)
      );

      setRestaurant((prev) => ({
        photoURL: photoSource, // photoURL 추가
        id: seq,
        name,
        address: `${address1} ${address2}`,
        telephone,
        clicked: savedRestaurant ? savedRestaurant.clicked : false, // 찜 상태
      }));
    }, [savedRestaurants, seq, photoSource]);

    useEffect(() => {
      const saveRestaurant = async () => {
        const headersConfig = await getAxiosHeaderConfig();
        if (!headersConfig) return;

        try {
          const response = await api.post(
            "/user/save-table",
            restaurant,
            headersConfig
          );
          console.log(restaurant);
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
        const headersConfig = await getAxiosHeaderConfig();
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

    const handleSaveRestaurant = async (e) => {
      e.preventDefault();
      const headersConfig = await getAxiosHeaderConfig();
      if (!headersConfig) {
        setCurrentForm("login");
        openModal();
        return;
      }

      setRestaurant((prev) => ({
        ...prev,
        clicked: !prev.clicked,
        photoURL: photoSource,
      }));
    };

    const BookButtonHandler = async () => {
      const headersConfig = await getAxiosHeaderConfig();
      if (!headersConfig) {
        setCurrentForm("login");
        openModal();
        return;
      }
      navigate(`/reservation/${seq}`);
    };

    return (
      <>
        <div
          className="w-80 border border-amber-100 rounded-lg bg-white transition-transform transform hover:scale-105 hover:cursor-pointer shadow-md"
          ref={cardRef}
        >
          <div className="relative w-full h-40 bg-gray-200 overflow-hidden mb-4 rounded-t-lg ">
            {/* 사진 업데이트에 따라 이미지 또는 무지 회색 바탕 */}
            {photoSource ? (
              <img
                src={photoSource}
                alt="식당 이미지"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-slate-200"></div>
            )}
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
            <p className="text-sm text-gray-600 mb-2 h-10">
              {address1} {address2}
            </p>
            <p className="text-sm text-gray-600 mb-3 h-5">{telephone}</p>
            <div className="flex justify-between mb-3">
              <button className="flex-1 bg-gray-200 text-gray-700 py-1 rounded mr-1">
                {category}
              </button>
              {matchingReservations.length ? (
                <button className="flex-1 bg-gray-200 text-gray-700 py-1 rounded ml-1">
                  <p className="text-sm text-gray-500 mb-2">
                    Booked{" "}
                    <span className="font-bold text-blue-600">
                      {matchingReservations.length}
                    </span>{" "}
                    times
                  </p>
                </button>
              ) : (
                ""
              )}
            </div>

            <button
              className="w-full bg-white text-amber-500 border border-amber-500 py-2 rounded-lg hover:bg-amber-500 hover:text-white transition-colors"
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
  }
);
