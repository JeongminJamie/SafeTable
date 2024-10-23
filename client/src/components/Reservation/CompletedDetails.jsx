import React, { useMemo } from "react";
import useReservationStore from "../../store/useReservationStore";
import {
  formatDateToKorean,
  formatTimeToKoean,
} from "../../utils/formatToKorean";

const CompletedDetails = () => {
  const { restaurant, partySize, date, timeSlot } = useReservationStore();

  const formattedDate = useMemo(() => formatDateToKorean(date), [date]);
  const formattedTime = useMemo(() => formatTimeToKoean(timeSlot), [timeSlot]);

  return (
    <div className="w-full flex flex-col items-center gap-3 bg-header-signup-background p-6 rounded-2xl shadow-md">
      <div>
        <h2 className="font-medium text-xl text-center">{restaurant.name}</h2>
        <p className="font-medium text-lg text-gray-600 text-center">
          {restaurant.category}
        </p>
      </div>
      <div className="flex flex-col items-center text-lg gap-1">
        <p>{formattedDate}</p>
        <p>{formattedTime}</p>
        <p>{partySize}</p>
      </div>
    </div>
  );
};

export default CompletedDetails;
