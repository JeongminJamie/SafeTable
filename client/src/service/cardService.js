import axios from "axios";

export const saveCardNumber = async (cardNumber) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `/api/card`,
    {
      cardNumber,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
