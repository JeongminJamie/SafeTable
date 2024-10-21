import axios from "axios";
import { getAxiosHeaderConfig } from "../config";

const serverPort = process.env.REACT_APP_SERVER_PORT_URL;

export const getCardNumber = async () => {
  const headersConfig = getAxiosHeaderConfig();
  if (!headersConfig) return null;

  const response = await axios.get(`${serverPort}/api/card`, headersConfig);

  return response.data.last_number;
};

export const saveCardNumber = async (cardNumber) => {
  const headersConfig = getAxiosHeaderConfig();
  if (!headersConfig) return;

  const response = await axios.post(
    `${serverPort}/api/card`,
    {
      cardNumber,
    },
    headersConfig
  );

  return response.data;
};
