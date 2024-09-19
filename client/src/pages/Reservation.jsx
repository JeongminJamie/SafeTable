import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useReservationStore from "../store/useReservationStore";
import BookingDetails from "../components/Reservation/BookingDetails";
import TimeSlot from "../components/Reservation/TimeSlot";
import { toast } from "react-toastify";
import ReservationAlertToast from "../components/Reservation/ReservationAlertToast";

const Reservation = () => {
  const navigate = useNavigate();

  const { timeSlot, deposit, resetReservation } = useReservationStore();

  //when deposit payment button clicked
  const clickPayDepositButtonHandler = () => {
    if (!timeSlot) {
      toast.warning("시간대를 꼭 선택해주세요 :)");
    } else {
      navigate("/payment");
    }
  };

  //reset past reservation state
  useEffect(() => {
    resetReservation();
  }, []);

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
        <p>
          당일 취소 및 노쇼 방지를 위해{" "}
          <span className="font-semibold">
            1인당 5천원, 총 {deposit.toLocaleString()}원이 결제됩니다.
          </span>
          <p>(예약금은 방문 시 환불되거나, 차감됩니다!)</p>
        </p>
        <button
          className="w-2/4 h-10 bg-amber-200 m-auto px-2 py-1"
          onClick={clickPayDepositButtonHandler}
        >
          예약금 결제
        </button>
        <ReservationAlertToast />
      </div>
    </div>
  );
};

export default Reservation;
