import { useState } from "react";

const useCardRegister = (initialCardInfo) => {
  const [cardInfo, setCardInfo] = useState(initialCardInfo);

  // 카드사
  const companyChangeHanlder = (company) => {
    setCardInfo((prev) => ({ ...prev, cardCompany: company }));
  };

  // 카드 번호
  const cardNumberChangeHanlder = (event) => {
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

  return {
    cardInfo,
    cardNumberChangeHanlder,
    companyChangeHanlder,
    expireDateChangeHandler,
  };
};

export default useCardRegister;
