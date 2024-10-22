import React, { useMemo } from "react";
import useReservationStore from "../../store/useReservationStore";
import {
  formatDateToKorean,
  formatTimeToKoean,
} from "../../utils/formatToKorean";

const ReservationCheck = ({
  setIsPaymentModalOpen,
  setIsReservationChecked,
}) => {
  const { partySize, date, timeSlot } = useReservationStore();

  const formattedDate = useMemo(() => formatDateToKorean(date), [date]);
  const formattedTime = useMemo(() => formatTimeToKoean(timeSlot), [timeSlot]);

  return (
    <div className="flex flex-col gap-6">
      <div className="text-lg px-3 py-3 text-gray-600">
        방문 식당과 예약 내용을 다시 한번 확인해주세요.
      </div>
      <section className="h-auto border border-gray-300 rounded-2xl px-5 py-5 flex flex-col gap-7">
        <div>
          <div className="text-xl font-semibold">식당 이름</div>
          <div className="text-gray-700">식당 업종</div>
        </div>
        <div className="flex items-start justify-center gap-7">
          <div className="flex flex-col justify-between h-auto space-y-4">
            <div className="flex items-center">
              <img src="/assets/person.png" className="w-8 h-8" />
            </div>
            <div className="flex items-center">
              <img src="/assets/reservation/calendar.png" className="w-8 h-8" />
            </div>
            <div className="flex items-center">
              <img src="/assets/reservation/clock.png" className="w-8 h-8" />
            </div>
          </div>
          <div className="flex flex-col justify-between h-auto space-y-4">
            <div className="flex items-center h-8 font-medium">
              <div>{partySize}</div>
            </div>
            <div className="flex items-center h-8 font-medium">
              <div>{formattedDate}</div>
            </div>
            <div className="flex items-center h-8 font-medium">
              <div>{formattedTime}</div>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full flex flex-row justify-center gap-2">
        <button
          className="border border-gray-300 rounded font-medium w-5/12 h-12"
          onClick={() => setIsPaymentModalOpen(false)}
        >
          취소
        </button>
        <button
          className="rounded font-medium w-5/12 h-12 bg-amber-500 text-white"
          onClick={() => setIsReservationChecked(true)}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default ReservationCheck;
