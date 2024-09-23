import React from "react";
import useReservationStore from "../../store/useReservationStore";

const DepositCheck = () => {
  const { setIsReservationChecked } = useReservationStore();

  return (
    <div className="flex flex-col mt-5 gap-5">
      <section className="border border-gray-300 rounded px-7 py-5">
        <div className="flex flex-col gap-1.5 text-base">
          <div className="flex flex-row justify-between">
            <p>1인당 예약금</p>
            <p className="font-medium">5,000원</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>총 예약 인원</p>
            <p className="font-medium">{}3명</p>
          </div>
        </div>
        <div className="bg-gray-300 h-px -mx-7 mt-5 mb-5 p-0"></div>
        <div className="flex flex-row justify-between font-medium">
          <p>합계</p>
          <p>{}원</p>
        </div>
      </section>
      <p className="text-lg font-semibold">
        총 예약 보장금 <span>{}</span>원
      </p>
      <p>회원님의 카드 2039로 결제 됩니다.</p>
      <div className="w-full flex flex-row justify-center gap-2">
        <button
          className="border border-gray-300 rounded font-medium w-5/12 h-12"
          onClick={() => setIsReservationChecked(false)}
        >
          취소
        </button>
        <button className="rounded font-medium w-5/12 h-12 bg-amber-500 text-white">
          결제
        </button>
      </div>
    </div>
  );
};

export default DepositCheck;
