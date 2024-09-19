import React, { useEffect } from "react";
import useReservationStore from "../store/useReservationStore";
import BookingDetails from "../components/Reservation/BookingDetails";
import TimeSlot from "../components/Reservation/TimeSlot";
import { toast } from "react-toastify";
import ReservationAlertToast from "../components/Reservation/ReservationAlertToast";
import PaymentModal from "../components/Payment/PaymentModal";

const Reservation = () => {
  const {
    timeSlot,
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    resetReservation,
  } = useReservationStore();

  //when deposit payment button clicked
  const clickPayDepositButtonHandler = () => {
    if (!timeSlot) {
      toast.warning("시간대를 꼭 선택해주세요 :)");
    } else {
      setIsPaymentModalOpen(true);
    }
  };

  console.log(isPaymentModalOpen, "결제 모달 상태 확인 콘솔");

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
            인원에 따른 예약 보장금이 발생합니다.
          </span>
          <p>(보장금은 방문 시 환불되거나, 차감됩니다!)</p>
        </p>
        <button
          className="w-2/4 h-10 bg-amber-200 m-auto px-2 py-1"
          onClick={clickPayDepositButtonHandler}
        >
          예약 보장금 결제
        </button>
        <ReservationAlertToast />
        <PaymentModal />
      </div>
    </div>
  );
};

export default Reservation;
