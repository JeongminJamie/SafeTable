export const formatDateToKorean = (date) => {
  if (date) {
    const formatDate = new Date(date);
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      weekday: "long",
    };
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
