import React from "react";
import CompletedDetails from "../components/Reservation/CompletedDetails";

const ReservationCompleted = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <img
        src="/assets/reservation/completed.png"
        alt="completed"
        className="w-20 h-20"
      />
      <h1 className="font-bold text-2xl">예약이 확정되었습니다</h1>
      <p className="text-lg text-gray-600">
        예약 확인 메일이 발송되었으며, <span>나의 예약</span>에서도 찾으실 수
        있습니다.
      </p>
      <CompletedDetails />
    </div>
  );
};

export default ReservationCompleted;
