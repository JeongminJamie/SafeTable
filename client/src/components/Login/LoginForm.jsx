import React, { useState } from "react";
import useInput from "../../hooks/useInput";
import { useSignin } from "../../hooks/queries/auth";
import { api } from "../../api/api";

export const LoginForm = ({
  onClose,
  onSwitchToSignup,
  setToken,
  onLoginSuccess,
}) => {
  const [emailInput] = useInput("");
  const [passwordInput] = useInput("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSuccess = (data) => {
    console.log("로그인 되었습니다.");
    sessionStorage.setItem("accessToken", data.accessToken);
    sessionStorage.setItem("refreshToken", data.refreshToken);
    setToken(data.token);
    if (onLoginSuccess) {
      onLoginSuccess();
    }
    setErrorMessage("");
    onClose();
  };

  const onError = async (error) => {
    if (error.response?.status === 403) {
      try {
        const refreshToken = sessionStorage.getItem("refreshToken");
        const refreshResponse = await api.post("/login/refresh-token", {
          refreshToken,
        });

        const newAccessToken = refreshResponse.data.accessToken;
        sessionStorage.setItem("accessToken", newAccessToken);

        // 새로운 액세스 토큰으로 다시 요청
        const retryResponse = await api.get("/login/verify", {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        });

        console.log(retryResponse.data);
      } catch (refreshError) {
        if (refreshError.response?.status === 403) {
          setErrorMessage("세션이 만료되었습니다. 다시 로그인해주세요.");
          sessionStorage.clear(); // 세션 초기화
          onClose(); // 모달 닫기
        } else {
          console.error("리프레시 토큰 요청 실패:", refreshError);
          setErrorMessage("일시적인 문제가 발생했습니다. 다시 시도해주세요.");
        }
      }
    } else {
      setErrorMessage("아이디 또는 비밀번호를 다시 확인해주세요.");
    }
  };

  const { mutate: signinMutate } = useSignin(onSuccess, onError);

  const handleLoginButtonClick = async (e) => {
    e.preventDefault();
    signinMutate({ email: emailInput.value, password: passwordInput.value });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">로그인</h2>
      <form onSubmit={handleLoginButtonClick}>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="email"
          >
            이메일
          </label>
          <input
            type="email"
            id="email"
            {...emailInput}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="이메일을 입력하세요"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="password"
          >
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            {...passwordInput}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>

        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            로그인
          </button>
        </div>
      </form>

      <div className="mt-4 text-center">
        <span className="text-gray-500">계정이 없으신가요? </span>
        <button
          onClick={onSwitchToSignup}
          className="text-blue-500 hover:underline"
        >
          회원가입
        </button>
      </div>
    </div>
  );
};
