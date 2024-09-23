export const formatDateToKorean = (date) => {
  if (date) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("ko-KR", options);
  }
};

export const formatTimeToKoean = (time) => {
  if (time) {
    const splittedKoreanTime = time.replace("PM", "오후").split(" ");
    return splittedKoreanTime[1] + " " + splittedKoreanTime[0];
  }
};
