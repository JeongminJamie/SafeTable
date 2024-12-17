export const formatDateToKorean = (date, reservationId) => {
  if (date) {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      weekday: "long",
    };

    // 서버로 받은 UTC 형태의 날짜를 new Date으로 로컬 시간대로 바뀌지 않게 하기 위함
    if (reservationId) {
      options.timeZone = "UTC";
    }

    const formatDate = new Date(date);

    return formatDate.toLocaleDateString("ko-KR", options);
  }
};

export const formatTimeToKoean = (time) => {
  if (time) {
    const splittedKoreanTime = time.replace("PM", "오후").split(" ");
    return splittedKoreanTime[1] + " " + splittedKoreanTime[0];
  }
};

export const parseStringToDate = (date, time) => {
  const onlyDate = date.split("T")[0];

  const combineString = `${onlyDate} ${time}`;

  return new Date(combineString);
};
