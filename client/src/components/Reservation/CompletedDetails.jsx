import React, { useMemo } from "react";
import useReservationStore from "../../store/useReservationStore";
import {
  formatDateToKorean,
  formatTimeToKoean,
} from "../../utils/formatToKorean";

const CompletedDetails = () => {
  const { partySize, date, timeSlot } = useReservationStore();

  const formattedDate = useMemo(() => formatDateToKorean(date), [date]);
  const formattedTime = useMemo(() => formatTimeToKoean(timeSlot), [timeSlot]);

  return (
    <div className="flex flex-col items-center">
      <div>
        <h2>식당 이름</h2>
        <p>식당 업종</p>
      </div>
      <div className="flex flex-col items-center">
        <p>{formattedDate}</p>
        <p>{formattedTime}</p>
        <p>{partySize}</p>
      </div>
    </div>
  );
};

export default CompletedDetails;
