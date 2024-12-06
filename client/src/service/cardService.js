import { getAxiosHeaderConfig } from "../config";
import { api } from "../api/api";

export const getMyCard = async () => {
  const headersConfig = await getAxiosHeaderConfig();
  if (!headersConfig) return;

  const response = await api.get(`/api/card`, headersConfig);

  return response.data.card;
};

export const saveCard = async (newCardInfo) => {
  const headersConfig = await getAxiosHeaderConfig();
  if (!headersConfig) return;

  const response = await api.post("/api/card", newCardInfo, headersConfig);

  return response.data.savedCard;
};

export const deleteCard = async (cardId) => {
  const headersConfig = await getAxiosHeaderConfig();
  if (!headersConfig) return;

  const response = await api.delete(`/api/card/${cardId}`, headersConfig);

  return response.data;
};
