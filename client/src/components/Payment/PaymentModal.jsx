import React from "react";
import useReservationStore from "../../store/useReservationStore";
import ReservationCheck from "./ReservationCheck";

const PaymentModal = () => {
  const { isPaymentModalOpen, setIsPaymentModalOpen } = useReservationStore();

  if (!isPaymentModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg transform transition-transform duration-300 ease-in-out">
        <div className="flex justify-end mb-1">
          <button
            onClick={() => setIsPaymentModalOpen(false)}
            className="text-sm text-red-500 hover:text-red-700 font-semibold"
          >
            닫기
          </button>
        </div>
        <ReservationCheck />
      </div>
    </div>
  );
};

export default PaymentModal;
