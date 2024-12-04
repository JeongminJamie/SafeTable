import { getAxiosHeaderConfig } from "../config";
import { api } from "../api/api";

const headersConfig = await getAxiosHeaderConfig();

export const getMyCard = async () => {
  if (!headersConfig) return;

  const response = await api.get(`/api/card`, headersConfig);

  return response.data.card;
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
