import React from "react";
import { PARTY_SIZE, TIME } from "../../constants/reservation";

const BookingDetails = () => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <p>인원</p>
        <select>
          {PARTY_SIZE.map((party) => (
            <option>{party}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <p>날짜</p>
      </div>
      <div className="flex flex-col">
        <p>시간</p>
        <select>
          {TIME.map((time) => (
            <option>{time}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BookingDetails;
