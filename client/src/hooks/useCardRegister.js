import { useState } from "react";

const useCardRegister = (initialCardInfo) => {
  const [cardInfo, setCardInfo] = useState(initialCardInfo);

  // 카드사
  const companyChangeHanlder = (company) => {
    setCardInfo((prev) => ({ ...prev, cardCompany: company }));
  };

  // 카드 번호
  const cardNumberChangeHandler = (event) => {
    const cardNumberWithSpace = event.target.value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();

    if (cardNumberWithSpace.length <= 19)
      setCardInfo((prev) => ({ ...prev, cardNumber: cardNumberWithSpace }));
  };

  // 만료일
  const expireDateChangeHandler = (event) => {
    const inputValue = event.target.value;
    const cursorPosition = event.target.selectionStart;

    let dateWithSlash = inputValue
      .replace(/\D/g, "")
      .replace(/(.{2})/g, "$1/")
      .slice(0, 5);

    if (dateWithSlash[cursorPosition - 1] === "/") {
      dateWithSlash = dateWithSlash.slice(0, -1);
    }

    setCardInfo((prev) => ({ ...prev, expireDate: dateWithSlash }));
  };

  // 카드 소유자 이름
  const nameChangeHandler = (event) => {
    const name = event.target.value;

    setCardInfo((prev) => ({ ...prev, name }));
  };

  // CVC
  const cvcChangeHandler = (event) => {
    const trimmedCVCValue = event.target.value.replace(/\D/g, "").slice(0, 4);

    setCardInfo((prev) => ({ ...prev, cvcNumber: trimmedCVCValue }));
  };

  // 카드 비밀번호 2자리
  const passwordChangeHandler = (event) => {
    const trimmedPassword = event.target.value.replace(/\D/g, "").slice(0, 2);

    setCardInfo((prev) => ({ ...prev, cardPassword: trimmedPassword }));
  };
  return {
    cardInfo,
    cardNumberChangeHandler,
    companyChangeHanlder,
    expireDateChangeHandler,
    nameChangeHandler,
    cvcChangeHandler,
    passwordChangeHandler,
  };
};

export default useCardRegister;
