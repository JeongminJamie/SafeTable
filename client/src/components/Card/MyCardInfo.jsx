import React, { useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useCardStore from "../../store/useCardStore";
import { getMyCard } from "../../service/cardService";
import NoCard from "./NoCard";

const MyCardInfo = () => {
  const { card, setCard } = useCardStore();

  // 내 카드 조회
  const { data: myCard, isLoading } = useQuery({
    queryKey: ["getMyCard"],
    queryFn: getMyCard,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isLoading && !Array.isArray(myCard)) {
      setCard(myCard);

      console.log("내 카드 조회 mycardinfo에서 확인", myCard);
      console.log("내 카드 상태 정보 확인", card);
    }
  }, [myCard, isLoading, setCard]);

  // 카드 정보 마지막 4자리 마스킹하기
  const maskedCardNumber = useMemo(() => {
    const cardNumber = card.cardNumber;

    if (cardNumber) {
      const showedCardNumber = cardNumber.slice(0, 12);
      const maskedCardNumber = cardNumber.slice(12, 16).replace(/\d/g, "*");

      return showedCardNumber + maskedCardNumber;
    }
    return "";
  }, [card]);

  // 카드 삭제 버튼 처리
  const deleteCardHandler = () => {
    // To-do: 서버로 삭제 요청
  };

  return (
    <>
      {!card.cardCompany ? (
        <NoCard />
      ) : (
        <div className="py-12 flex h-full justify-center items-center">
          <div className="w-full h-3/6 border flex rounded-md justify-between items-center px-5 py-3 my-16 shadow-md">
            <img
              src="/assets/card/card2.png"
              alt="card"
              className="w-20 h-5/6"
            />
            <section className="flex flex-col">
              <p className="text-lg">{card.cardCompany}</p>
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
      )}
    </>
  );
};

export default MyCardInfo;
