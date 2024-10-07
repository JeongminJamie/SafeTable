import React from "react";

const IncorrectCardModal = ({ isIncorrect, setIsIncorrect }) => {
  if (!isIncorrect) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg transform transition-transform duration-300 ease-in-out">
        <div className="flex justify-end mb-7">
          <img
            src="/assets/exit.png"
            alt="exit"
            className="w-6 h-6 hover:cursor-pointer"
            onClick={() => setIsIncorrect(false)}
          />
        </div>
        <div className="flex flex-col items-center text-lg mb-7">
          <p>입력하신 정보와</p>
          <p>카드 정보가 일치하지 않습니다.</p>
        </div>
        <button
          className="w-5/12 h-11 flex flex-col items-center justify-center rounded font-medium bg-amber-500 text-white m-auto"
          onClick={() => setIsIncorrect(false)}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default IncorrectCardModal;
