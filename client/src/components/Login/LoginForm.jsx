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
      onLoginSuccess(data.accessToken);
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

        const retryResponse = await api.get("/login/verify", {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        });

        console.log(retryResponse.data);
      } catch (refreshError) {
        if (refreshError.response?.status === 403) {
          setErrorMessage("세션이 만료되었습니다. 다시 로그인해주세요.");
          sessionStorage.clear();
          onClose();
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
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl text-center font-bold">로그인</h2>
      <form onSubmit={handleLoginButtonClick}>
        <div>
          <input
            type="email"
            id="email"
            {...emailInput}
            className="w-full px-3 py-3 border border-gray-300 focus:outline-none"
            placeholder="이메일"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            id="password"
            {...passwordInput}
            className="w-full px-3 py-3 border border-t-0 border-gray-300 focus:outline-none"
            placeholder="비밀번호"
            required
          />
        </div>

        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full px-4 py-3 mt-4 border border-amber-500 text-amber-500 font-medium hover:bg-amber-500 hover:text-white"
          >
            로그인
          </button>
        </div>
      </form>

      <div className="mt-4 text-center flex justify-center gap-3">
        <span className="text-gray-500">계정이 없으신가요? </span>
        <button
          onClick={onSwitchToSignup}
          className="font-medium text-amber-500 hover:underline"
        >
          회원가입
        </button>
      </div>
    </div>
  );
};
