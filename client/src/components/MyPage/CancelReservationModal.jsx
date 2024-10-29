import React from "react";

const CancelReservationModal = ({
  isCancelModalOpen,
  setIsCancelModalOpen,
  reservationId,
  restaurantName,
  cancelOrDeleteReservation,
}) => {
  if (!isCancelModalOpen) return null;

  const closeModal = () => {
    setIsCancelModalOpen(false);
  };

  const confirmButtonHandler = () => {
    cancelOrDeleteReservation(reservationId);
    setIsCancelModalOpen(false);
  };

  //To-do: 당일 예약 취소 시, 예약보장금 환불이 불가하다는 문구 띄워주기 그게 아니면 예약 보장금이 환불 된다는 문구 띄워주기

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
          <p className="text-lg font-medium">
            <strong className="text-2xl text-amber-600">
              {restaurantName}
            </strong>{" "}
            예약을 취소하시겠어요?
          </p>
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
