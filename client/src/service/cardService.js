import axios from "axios";

const serverPort = process.env.REACT_APP_SERVER_PORT_URL;

export const getCardNumber = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("해당 유저의 토큰에 에러 발생");
  }

  const response = await axios.get(`${serverPort}/api/card`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const saveCardNumber = async (cardNumber) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("해당 유저의 토큰에 에러 발생");
  }

  const response = await axios.post(
    `${serverPort}/api/card`,
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
