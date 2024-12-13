import React, { useMemo, useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useCardStore from "../../store/useCardStore";
import { deleteCard, getMyCard } from "../../service/cardService";
import NoCard from "./NoCard";
import DeleteCardModal from "./DeleteCardModal";
import Loading from "../Loading";
import { toast } from "react-toastify";
import AlertToast from "../AlertToast";

const MyCardInfo = () => {
  const { card, setCard, reset } = useCardStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 내 카드 조회
  const {
    data: myCard = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getMyCard"],
    queryFn: () => getMyCard(),
    refetchOnWindowFocus: false,
  });

  // 데이터를 가져왔을 때, []라면 cardStore 리셋 아니면 card 저장
  useEffect(() => {
    if (!isLoading) {
      if (myCard.length === 0) {
        reset();
      } else {
        setCard(myCard[0]);
      }
    }
  }, [myCard, isLoading, setCard, reset]);

  // 카드 정보 마지막 4자리 마스킹하기
  const maskedCardNumber = useMemo(() => {
    if (!isLoading && myCard?.length !== 0) {
      const cardNumber = myCard[0].card_number;

      const showedCardNumber = cardNumber.slice(0, 12);
      const maskedCardNumber = cardNumber.slice(12, 16).replace(/\d/g, "*");

      return showedCardNumber + maskedCardNumber;
    }
    return "";
  }, [myCard, isLoading]);

  // 성공적으로 저장한 카드는 있지만, 서버에서 가져온 데이터에 정보가 없을 때
  useEffect(() => {
    if (!isLoading && card.cardNumber && myCard.length === 0) {
      refetch();
    }
  }, [card, myCard, isLoading, refetch]);

  // 내 카드 삭제
  const { mutate: deleteMyCard, isDeleteLoading } = useMutation({
    mutationFn: (cardId) => deleteCard(cardId),
    onSuccess: (data) => {
      setIsDeleteModalOpen(false);
      reset();
      refetch();
    },
    onError: (error) => {
      console.log(error);
      toast.error("카드 삭제에 실패했습니다. 다시 시도해주세요!");
    },
  });

  const deleteCardHandler = useCallback(() => {
    if (myCard?.length !== 0) {
      deleteMyCard(myCard[0]._id);
    }
  }, [myCard, deleteMyCard]);

  const deleteButtonHandler = useCallback(() => {
    setIsDeleteModalOpen(true);
  }, []);

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
      {isLoading ? (
        <Loading width="w-32" height="h-32" padding="p-10 mt-24 mb-24" />
      ) : !card.cardCompany && myCard?.length === 0 ? (
        <NoCard />
      ) : (
        <div className="py-5 flex h-full justify-center items-center">
          <div className="w-full h-3/6 border flex rounded-md justify-between items-center px-5 py-3 my-16 shadow-md">
            <img
              src="/assets/card/card2.png"
              alt="card"
              className="w-20 h-5/6"
            />
            <section className="flex flex-col">
              <p className="text-lg">{myCard[0]?.card_company}</p>
              <p>{maskedCardNumber}</p>
            </section>
            <button
              className="border border-red-500 bg-red-500 text-white rounded-md p-2 w-16 text-sm hover:bg-red-600 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 shadow-md transition-all"
              onClick={deleteButtonHandler}
            >
              삭제
            </button>
          </div>
          <AlertToast />
        </div>
      )}
    </>
  );
};

export default MyCardInfo;
