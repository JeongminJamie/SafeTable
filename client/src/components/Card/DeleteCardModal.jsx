import React from "react";
import Loading from "../Loading";

const DeleteCardModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  deleteCardHandler,
  isDeleteLoading,
}) => {
  const closeModal = () => {
    setIsDeleteModalOpen(false);
  };

  

  if (!isDeleteModalOpen) return null;

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
            <p className="text-lg font-medium">카드를 삭제하시겠어요?</p>
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
              onClick={deleteCardHandler}
            >
              {isDeleteLoading ? (
                <Loading width="w-10" height="h-10" padding="p-2" />
              ) : (
                "확인"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCardModal;
