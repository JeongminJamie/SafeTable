import React, { useMemo } from "react";
import useCardStore from "../../store/useCardStore";

const MyCardInfo = () => {
  const { cardCompany, cardNumber } = useCardStore();

  // 카드 정보 마지막 4자리 마스킹하기
  const maskedCardNumber = useMemo(() => {
    if (cardNumber) {
      const showedCardNumber = cardNumber.slice(0, 12);
      const maskedCardNumber = cardNumber.slice(12, 16).replace(/\d/g, "*");

      return showedCardNumber + maskedCardNumber;
    }
  }, [cardNumber]);

  // 카드 삭제 버튼 처리
  const deleteCardHandler = () => {
    // To-do: 서버로 삭제 요청
  };

  return (
    <>
      <div className="py-12 flex h-full justify-center items-center">
        <div className="w-full h-3/6 border flex rounded-md justify-between items-center px-5 py-3 my-16 shadow-md">
          <img src="/assets/card/card2.png" alt="card" className="w-20 h-5/6" />
          <section className="flex flex-col">
            <p className="text-lg">{cardCompany}</p>
            <p>{maskedCardNumber}</p>
          </section>
          <button
            className="border border-gray-300 rounded-md p-2 w-16 text-sm"
            onClick={deleteCardHandler}
          >
            삭제
          </button>
        </div>
      </div>
    </>
  );
};

export default MyCardInfo;
