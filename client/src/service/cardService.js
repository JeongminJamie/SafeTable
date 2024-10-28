import { getAxiosHeaderConfig } from "../config";
import { api } from "../api/api";

export const getCardNumber = async () => {
  const headersConfig = getAxiosHeaderConfig();
  if (!headersConfig) return null;

  const response = await api.get(`/api/card`, headersConfig);

  if (!response.data.last_number) return null;

  return response.data.last_number;
};

export const saveCardNumber = async (cardNumber) => {
  const headersConfig = getAxiosHeaderConfig();
  if (!headersConfig) return;

  const response = await api.post(
    `/api/card`,
    {
      cardNumber,
    },
    headersConfig
  );

  return response.data;
};
