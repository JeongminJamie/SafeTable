export const getToken = () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    console.log("받은 토큰이 없습니다.");
    return null;
  }

  return token;
};

export const getAxiosHeaderConfig = () => {
  const token = getToken();

  if (!token) {
    console.log("토큰이 유효하지 않습니다.");
    return null;
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
