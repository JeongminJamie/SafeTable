import React from "react";
import BookingDetails from "../components/Reservation/BookingDetails";
import TimeSlot from "../components/Reservation/TimeSlot";

const Reservation = () => {
  return (
    <div className="w-4/6 h-screen m-auto flex flex-col items-center text-center gap-10">
      <div>
        <p>MAKE A RESERVATION</p>
        <p>테이블 예약을 위해 인원 수, 날짜, 시간대를 선택해 주세요.</p>
      </div>
      <BookingDetails />
      <TimeSlot />
    </div>
  );
};

export default Reservation;
