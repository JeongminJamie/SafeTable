export const getToken = () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return null;
  }

  return token;
};

export const getAxiosHeaderConfig = () => {
  const token = getToken();

  if (!token) {
    console.log("해당 토큰에 오류 발생");
    return null;
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
