import React from "react";
import useReservationStore from "../../store/useReservationStore";

import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";

import { PARTY_SIZE, TIME } from "../../constants/reservation";

const BookingDetails = () => {
  const { partySize, date, time, setPartySize, setDate, setTime } =
    useReservationStore();

  // select의 onChange 핸들러
  const selectChangeHandler = (event, setState) => {
    const selectedValue = event.target.value;
    setState(selectedValue);
  };

  return (
    <div className="flex flex-row w-full items-center justify-around px-10 mb-5 gap-5">
      <div className="flex flex-col w-4/12 gap-2">
        <p className="text-start font-medium">인원</p>
        <select
          className="h-8 border border-gray-300 px-2 hover:cursor-pointer"
          value={partySize}
          onChange={(e) => selectChangeHandler(e, setPartySize)}
        >
          {PARTY_SIZE.map((party) => (
            <option key={party}>{party}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col w-4/12 gap-2">
        <p className="text-start font-medium">날짜</p>
        <DatePicker
          locale={ko}
          minDate={new Date()}
          dateFormat="yyyy년 MM월 dd일"
          selected={date}
          onChange={(date) => setDate(date)}
          className="w-full h-8 border border-gray-300 px-2 hover:cursor-pointer"
        />
      </div>
      <div className="flex flex-col w-4/12 gap-2">
        <p className="text-start font-medium">시간</p>
        <select
          className="h-8 border border-gray-300 px-2 hover:cursor-pointer"
          value={time}
          onChange={(e) => selectChangeHandler(e, setTime)}
        >
          {TIME.map((time) => (
            <option key={time}>{time}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BookingDetails;
