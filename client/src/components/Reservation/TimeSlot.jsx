import React, { useMemo } from "react";
import { TIME_SLOT_MAP } from "../../constants/reservation";
import useReservationStore from "../../store/useReservationStore";

const TimeSlot = () => {
  const { time, timeSlot, setTimeSlot } = useReservationStore();

  //클릭한 시간의 배열
  const availableTimeSlot = useMemo(() => {
    return TIME_SLOT_MAP[time] || [];
  }, [time]);

  console.log(timeSlot, "타임슬롯 체인지 콘솔 확인");

  return (
    <div className="w-full px-10">
      <p className="text-start mt-5 mb-5 font-medium">
        가능하신 시간대를 골라주세요:
      </p>
      <div className="flex flex-row items-center gap-2">
        {availableTimeSlot.map((slot) => (
          <div
            key={slot}
            className={`flex-1 flex justify-center items-center h-10 border border-gray-400 px-2 py-1 text-center mb-10 hover:cursor-pointer ${
              timeSlot === slot
                ? "bg-red-100 border border-amber-600"
                : "hover:bg-red-100 hover:border-amber-600"
            }`}
            onClick={() => setTimeSlot(slot)}
          >
            {slot}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSlot;
