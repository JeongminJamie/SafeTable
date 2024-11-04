import React, { useMemo, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useCardStore from "../../store/useCardStore";
import { deleteCard, getMyCard } from "../../service/cardService";
import NoCard from "./NoCard";
import DeleteCardModal from "./DeleteCardModal";

const MyCardInfo = () => {
  const { card, setCard, reset } = useCardStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

      console.log("myCard 로그 확인", myCard);
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

  // 내 카드 삭제
  const { mutate: deleteMyCard, isDeleteLoading } = useMutation({
    mutationFn: (cardId) => deleteCard(cardId),
    onSuccess: (data) => {
      setIsDeleteModalOpen(false);
      reset();
      console.log("카드 삭제 성공");
      console.log(data.message);
    },
    onError: (response) => {
      console.log(response.text());
    },
  });

  const deleteCardHandler = () => {
    if (isLoading || !myCard || !myCard._id) {
      console.error("유효한 카드가 없습니다.");
      return; // 유효한 카드가 없을 경우 요청을 보내지 않음
    }
    console.log("내 카드 아이디 확인", myCard._id);
    deleteMyCard(myCard._id);
  };

  const deleteButtonHandler = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      {isDeleteModalOpen && (
        <DeleteCardModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          deleteCardHandler={deleteCardHandler}
          isDeleteLoading={isDeleteLoading}
        />
      )}
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
              onClick={deleteButtonHandler}
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
