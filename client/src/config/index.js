import { api } from "../api/api";

export const getToken = () => {
  const token = sessionStorage.getItem("accessToken");

  if (!token) {
    console.log("받은 토큰이 없습니다.");
    return null;
  }

  return token;
};

export const getAxiosHeaderConfig = async () => {
  let token = getToken();

  // 액세스 토큰 유효성 검증
  if (token) {
    try {
      await api.get("/login/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return {
        headers: { Authorization: `Bearer ${token}` },
      };
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error("토큰 검증 중 알 수 없는 오류:", error);
        return null;
      }
      console.log("유효하지 않은 토큰. 리프레시 토큰을 통해 재발급 시도.");
    }
  }

  try {
    const refreshToken = sessionStorage.getItem("refreshToken");
    const refreshResponse = await api.post("/login/refresh-token", {
      refreshToken,
    });

    token = refreshResponse.data.accessToken;
    sessionStorage.setItem("accessToken", token);
    console.log("유효하지 않은 토큰. 리프레시 토큰을 통해 재발급 시도.");
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  } catch (refreshError) {
    if (refreshError.response?.status === 403) {
      console.log("세션이 만료되었습니다. 다시 로그인해주세요.");
      sessionStorage.clear();
    } else {
      console.error("리프레시 토큰 요청 실패:", refreshError);
    }
    return null;
  }
};
