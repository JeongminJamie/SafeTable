import React, { useEffect, useMemo } from "react";
import useReservationStore from "../../store/useReservationStore";

import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";

import { PARTY_SIZE, TIME } from "../../constants/reservation";

const BookingDetails = () => {
  const { partySize, date, time, setPartySize, setDate, setTime, resetTime } =
    useReservationStore();

  // select의 onChange 핸들러
  const selectChangeHandler = (event, setState) => {
    const selectedValue = event.target.value;
    setState(selectedValue);
  };

  // datepicker onChange 핸들러
  const datePickerChangeHandler = (date) => {
    setDate(date);
    resetTime();
  };

  // 당일 현재 시간 이후의 시간 배열 값
  const restTime = useMemo(() => {
    const today = new Date();

    // 오늘 날짜와 캘린더에 선택된 날짜가 같을 경우, 현재와 이전의 시간을 제외한 시간대 배열
    if (today.toDateString() === date.toDateString()) {
      let currentTimeIndex;
      let hoursWithoutCurrentTime = [];

      const options = { hour: "numeric", minute: "2-digit", hour12: true };
      const formattedTime = today.toLocaleTimeString("en-US", options);

      const splitTimeWithoutZero = formattedTime.replace(/^0/, "").split(":");
      const currentHour = splitTimeWithoutZero[0];

      for (let i = 0; i < TIME.length; i++) {
        if (TIME[i].includes(currentHour)) {
          currentTimeIndex = i;
          hoursWithoutCurrentTime = TIME.slice(currentTimeIndex + 1);
          break;
        }
      }

      return hoursWithoutCurrentTime;
    }

    // 오늘 날짜와 캘린더에 선택된 날짜가 다를 경우, 모든 시간의 배열
    return TIME;
  }, [TIME, date]);

  // 시간 업데이트
  useEffect(() => {
    if (restTime.length > 0) {
      setTime(restTime[0]);
    }
  }, [restTime, setTime]);

  return (
    <div className="flex flex-row w-full items-center justify-around px-10 mb-5 gap-5">
      {/* 인원 선택 부분 */}
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
      {/* 달력 날짜 선택 부분 */}
      <div className="flex flex-col w-4/12 gap-2">
        <p className="text-start font-medium">날짜</p>
        <DatePicker
          locale={ko}
          minDate={new Date()}
          dateFormat="yyyy년 MM월 dd일"
          selected={date}
          onChange={(date) => datePickerChangeHandler(date)}
          className="w-full h-8 border border-gray-300 px-2 hover:cursor-pointer"
        />
      </div>
      {/* 시간 선택 부분 */}
      <div className="flex flex-col w-4/12 gap-2">
        <p className="text-start font-medium">시간</p>
        <select
          className="h-8 border border-gray-300 px-2 hover:cursor-pointer"
          value={time}
          onChange={(e) => selectChangeHandler(e, setTime)}
        >
          {restTime.map((time) => (
            <option key={time}>{time}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BookingDetails;
