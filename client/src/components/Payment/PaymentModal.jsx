import React, { useState } from "react";
import ReservationCheck from "./ReservationCheck";
import DepositCheck from "./DepositCheck";

const PaymentModal = ({ isPaymentModalOpen, setIsPaymentModalOpen }) => {
  const [isReservationChecked, setIsReservationChecked] = useState(false);

  if (!isPaymentModalOpen) return null;

  const closeModalStates = () => {
    setIsPaymentModalOpen(false);
    setIsReservationChecked(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg transform transition-transform duration-300 ease-in-out">
        <div className="flex justify-end mb-1">
          <img
            src="/assets/exit.png"
            alt="exit-icon"
            className="w-7 h-7 hover:cursor-pointer"
            onClick={() => closeModalStates()}
          />
        </div>
        {isReservationChecked ? (
          <DepositCheck
            setIsPaymentModalOpen={setIsPaymentModalOpen}
            setIsReservationChecked={setIsReservationChecked}
          />
        ) : (
          <ReservationCheck
            setIsPaymentModalOpen={setIsPaymentModalOpen}
            setIsReservationChecked={setIsReservationChecked}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
