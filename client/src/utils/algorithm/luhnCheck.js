export const luhnCheck = (cardNumber) => {
  // 카드 등록 때 카드번호는 문자열로 받아옵니다

  const digits = cardNumber.split("").reverse().map(Number);

  const sum = digits.reduce((accumulator, digit, index) => {
    if (index % 2 !== 0) {
      let doubled = digit * 2;

      if (doubled > 9) {
        doubled -= 9;
      }
      return accumulator + doubled;
    } else {
      return accumulator + digit;
    }
  }, 0);

  return sum % 10 === 0;
};
