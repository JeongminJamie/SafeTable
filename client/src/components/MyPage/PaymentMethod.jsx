import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useCardStore from "../../store/useCardStore";
import { getMyCard } from "../../service/cardService";

import MyCardInfo from "../Card/MyCardInfo";
import NoCard from "../Card/NoCard";

const PaymentMethod = () => {
  const { setCardCompany, setCardNumber } = useCardStore();

  // 내 카드 조회
  const { data: myCard, isLoading } = useQuery({
    queryKey: ["getMyCard"],
    queryFn: getMyCard,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isLoading && myCard) {
      setCardCompany(myCard.card_company);
      setCardNumber(myCard.card_number);
    }
  }, [myCard, isLoading]);

  return <>{myCard?.length === 0 ? <NoCard /> : <MyCardInfo />}</>;
};

export default PaymentMethod;
