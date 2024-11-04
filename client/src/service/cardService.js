import { getAxiosHeaderConfig } from "../config";
import { api } from "../api/api";

const headersConfig = getAxiosHeaderConfig();

export const getMyCard = async () => {
  if (!headersConfig) return;

  const response = await api.get(`/api/card`, headersConfig);

  const myCard = response.data.card;

  // 카드 정보가 있으면 첫 번째 정보 리턴, 없으면 서버가 보내준 빈 배열 리턴
  if (myCard.length === 0) {
    return myCard;
  } else {
    return myCard[0];
  }
};

export const saveCard = async (newCardInfo) => {
  if (!headersConfig) return;

  const response = await api.post("/api/card", newCardInfo, headersConfig);

  return response.data.savedCard;
};

export const deleteCard = async (cardId) => {
  if (!headersConfig) return;

  const response = await api.delete(`/api/card/${cardId}`, headersConfig);

  return response.data;
};
