import { getAxiosHeaderConfig } from "../config";
import { api } from "../api/api";

export const getMyCard = async () => {
  const headersConfig = getAxiosHeaderConfig();
  if (!headersConfig) return null;

  const response = await api.get(`/api/card`, headersConfig);

  console.log("내 카드 정보 조회", response.data.card);
  return response.data.card;
};

export const saveCard = async (newCardInfo) => {
  const headersConfig = getAxiosHeaderConfig();
  if (!headersConfig) return;

  const response = await api.post(`/api/card`, newCardInfo, headersConfig);

  return response.data;
};
