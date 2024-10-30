import React, { useEffect, useMemo, useCallback } from "react";

const CancelReservationModal = ({
  isCancelModalOpen,
  setIsCancelModalOpen,
  // reservationId,
  // restaurantName,
  reservation,
  cancelOrDeleteReservation,
}) => {
  const closeModal = useCallback(() => {
    setIsCancelModalOpen(false);
  }, []);

  // 당일 예약 취소 시, 예약보장금 환불 불가 안내 & 당일 취소가 아닐 시 환불 안내
  const checkReservationToday = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const reservationDate = reservation.date.split("T")[0];

    if (today === reservationDate) {
      return true;
    } else {
      return false;
    }
  }, []);

  const confirmButtonHandler = useCallback(() => {
    cancelOrDeleteReservation(reservation._id);
    setIsCancelModalOpen(false);
  }, []);

  if (!isCancelModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg transform transition-transform duration-300 ease-in-out">
        <div className="flex justify-end mb-1">
          <img
            src="/assets/exit.png"
            alt="exit-icon"
            className="w-6 h-6 hover:cursor-pointer"
            onClick={closeModal}
          />
        </div>
        <div className="flex flex-col items-center gap-10 p-4">
          <div className="flex flex-col items-center gap-2">
            <p className="text-lg font-medium">
              <strong className="text-2xl text-amber-600">
                {reservation.name}
              </strong>{" "}
              예약을 취소하시겠어요?
            </p>
            {checkReservationToday ? (
              <p className="text-red-400 font-medium text-sm">
                당일 예약 취소 시, 예약 보장금 환불이 불가합니다
              </p>
            ) : (
              <p className="font-medium text-sm">
                결제하신 카드로 예약 보장금 환불이 진행됩니다.
              </p>
            )}
          </div>
          <div className="w-full flex flex-row justify-center gap-3">
            <button
              className="border border-gray-300 rounded font-medium w-5/12 h-12"
              onClick={closeModal}
            >
              취소
            </button>
            <button
              className="rounded font-medium w-5/12 h-12 bg-amber-500 text-white"
              onClick={confirmButtonHandler}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelReservationModal;
