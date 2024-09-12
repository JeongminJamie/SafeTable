import React from "react";
import useReservationStore from "../store/useReservationStore";
import BookingDetails from "../components/Reservation/BookingDetails";
import TimeSlot from "../components/Reservation/TimeSlot";
import { toast } from "react-toastify";

const Reservation = () => {
  const { timeSlot } = useReservationStore();
  const clickPayDepositButtonHandler = () => {
    if (!timeSlot) {
    }
  };
  return (
    <div className="w-4/6 h-screen m-auto flex flex-col items-center text-center gap-10 mt-10 mb-20">
      <div>
        <p className="font-medium text-4xl text-amber-600 mb-5">
          MAKE A RESERVATION
        </p>
        <p className="mb-7 text-base">
          원하시는 테이블 예약을 위해 인원 수, 날짜, 시간대를 선택해 주세요.
        </p>
      </div>
      <BookingDetails />
      <div className="w-full h-px bg-gray-300"></div>
      <TimeSlot />
      <div className="flex flex-col gap-7">
        노쇼 방지를 위해, 예약금 2만원 선결제가 필요합니다.
        <button
          className="w-2/4 h-10 bg-amber-200 m-auto px-2 py-1"
          onClick={clickPayDepositButtonHandler}
        >
          예약금 결제
        </button>
      </div>
    </div>
  );
};

export default Reservation;
