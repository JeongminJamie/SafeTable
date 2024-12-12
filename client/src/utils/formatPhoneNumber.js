// 전화번호 포맷팅 함수 3자리-4자리-4자리
export const formatPhoneNumber = (value) => {
  const onlyNumbers = value.replace(/\D/g, "");

  if (onlyNumbers.length <= 3) return onlyNumbers;
  if (onlyNumbers.length <= 8)
    return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`;
  return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(
    3,
    7
  )}-${onlyNumbers.slice(7, 11)}`;
};
