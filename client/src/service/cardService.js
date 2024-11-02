import { getAxiosHeaderConfig } from "../config";
import { api } from "../api/api";

export const getMyCard = async () => {
  const headersConfig = getAxiosHeaderConfig();
  if (!headersConfig) return null;

  const response = await api.get(`/api/card`, headersConfig);

  const myCard = response.data.card;

  console.log("내 카드 조회 데이터 확인", myCard);

  // 카드 정보가 있으면 첫 번째 정보 리턴, 없으면 서버가 보내준 빈 배열 리턴
  if (myCard.length === 0) {
    return myCard;
  } else {
    return myCard[0];
  }
};

export const saveCard = async (newCardInfo) => {
  const headersConfig = getAxiosHeaderConfig();
  if (!headersConfig) return;

  const response = await api.post(`/api/card`, newCardInfo, headersConfig);

  return response.data.savedCard;
};
