const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  return new Intl.DateTimeFormat("ko-KR", options).format(date);
};

export default formatDate;
