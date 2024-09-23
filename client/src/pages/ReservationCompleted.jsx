import React from "react";
import CompletedDetails from "../components/Reservation/CompletedDetails";
import { useNavigate } from "react-router-dom";

const ReservationCompleted = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-7">
        <img
          src="/assets/reservation/completed.png"
          alt="completed"
          className="w-24 h-24"
        />
        <h1 className="font-bold text-3xl">예약이 확정되었습니다</h1>
        <p className="text-lg text-gray-600">
          예약 확정 메일이 발송되었으며, <span>나의 예약</span>에서도 찾으실 수
          있습니다.
        </p>
        <CompletedDetails />
        <div
          onClick={() => navigate("/")}
          className="w-32 h-12 rounded-full bg-amber-200 flex justify-center items-center font-medium transition-transform duration-200 hover:scale-105 hover:cursor-pointer"
        >
          홈으로 가기
        </div>
      </div>
    </div>
  );
};

export default ReservationCompleted;
