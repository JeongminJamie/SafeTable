import React, { useState } from "react";
import { TIME_SLOT } from "../../constants/reservation";

const TimeSlot = () => {
  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeClick = (timeSlot) => {
    setSelectedTime(timeSlot);
  };

  return (
    <div className="w-full px-10">
      <p className="text-start mt-5 mb-5 font-medium">
        가능하신 시간대를 골라주세요:
      </p>
      <div className="flex flex-row items-center gap-2">
        {TIME_SLOT.map((timeSlot) => (
          <div
            key={timeSlot}
            className={`flex-1 flex justify-center items-center h-10 border border-gray-400 px-2 py-1 text-center mb-10 hover:cursor-pointer ${
              selectedTime === timeSlot
                ? "bg-red-100 border border-amber-600"
                : "hover:bg-red-100 hover:border-amber-600"
            }`}
            onClick={() => handleTimeClick(timeSlot)}
          >
            {timeSlot}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSlot;
