import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import useReservationStore from "../../store/useReservationStore";
import useCardStore from "../../store/useCardStore";
import AddCard from "../Card/AddCard";
import Loading from "../Loading";
import { getMyCard } from "../../service/cardService";
import { saveReservation } from "../../service/reservationService";

const DepositCheck = ({ setIsReservationChecked }) => {
  const navigate = useNavigate();
  const reservationStore = useReservationStore();
  const { lastCardNumber, setLastCardNumber } = useCardStore();
  const localedDeposit = reservationStore.deposit.toLocaleString();

  // 해당 사용자의 카드 뒷자리 번호 패치
  const { data: userCard, isLoading } = useQuery({
    queryKey: ["getUserCard"],
    queryFn: getMyCard,
    staleTime: 60 * 1000,
    enabled: !lastCardNumber,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isLoading && userCard.length !== 0) {
      setLastCardNumber(userCard[0].card_number.slice(-4));
    }
  }, [userCard, isLoading]);

  console.log("userCard 데이터 확인", userCard);
  console.log("lastCardNumber", lastCardNumber);

  // 예약 정보 저장 요청
  const { mutate: saveReservationRequest, isLoading: saveLoading } =
    useMutation({
      mutationFn: saveReservation,
      onSuccess: () => {
        navigate("/reservation-completed");
      },
      onError: (error) => {
        console.log("예약 저장 중 에러 발생", error);
      },
    });

  const confirmPayButtonHanlder = () => {
    saveReservationRequest(reservationStore);
  };
  return (
    <>
      {isLoading ? (
        <Loading width="w-32" height="h-32" padding="p-10" />
      ) : !lastCardNumber ? (
        <AddCard />
      ) : (
        <div className="flex flex-col mt-5 gap-5">
          <section className="border border-gray-300 rounded px-7 py-5">
            <div className="flex flex-col gap-1.5 text-base">
              <div className="flex flex-row justify-between">
                <p>1인당 예약금</p>
                <p className="font-medium">5,000원</p>
              </div>
              <div className="flex flex-row justify-between">
                <p>총 예약 인원</p>
                <p className="font-medium">{reservationStore.partySize}</p>
              </div>
            </div>
            <div className="bg-gray-300 h-px -mx-7 mt-5 mb-5 p-0"></div>
            <div className="flex flex-row justify-between font-medium">
              <p>합계</p>
              <p>{localedDeposit}원</p>
            </div>
          </section>
          <p className="text-lg font-semibold">
            총 예약 보장금 <span>{localedDeposit}</span>원
          </p>
          <p>
            <span className="font-medium">{lastCardNumber}</span>로 끝나는
            카드로 결제됩니다.
          </p>
          <div className="w-full flex flex-row justify-center gap-2">
            <button
              className="border border-gray-300 rounded font-medium w-5/12 h-12"
              onClick={() => setIsReservationChecked(false)}
            >
              이전
            </button>
            <button
              className="rounded font-medium w-5/12 h-12 bg-amber-500 text-white"
              onClick={confirmPayButtonHanlder}
            >
              {saveLoading ? (
                <Loading width="w-10" height="h-10" padding="p-2" />
              ) : (
                "결제"
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default DepositCheck;
