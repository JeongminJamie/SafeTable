import React from "react";
import useReservationStore from "../../store/useReservationStore";
import {
  formatDateToKorean,
  formatTimeToKoean,
} from "../../utils/formatToKorean";

const ReservationCheck = () => {
  const { partySize, date, timeSlot } = useReservationStore();

  const formattedDate = formatDateToKorean(date);
  const formattedTime = formatTimeToKoean(timeSlot);

  return (
    <div>
      <div>방문 식당과 예약 내용을 다시 한번 확인해주세요.</div>
      <div>
        <div>식당 이름</div>
        <div>식당 업종</div>
      </div>
      <div>
        <div>
          <img />
          <div>{partySize}</div>
        </div>
        <div>
          <img />
          <div>{formattedDate}</div>
        </div>
        <div>
          <img />
          <div>{formattedTime}</div>
        </div>
      </div>
      <div>
        <button>취소</button>
        <button>확인</button>
      </div>
    </div>
  );
};

export default ReservationCheck;
