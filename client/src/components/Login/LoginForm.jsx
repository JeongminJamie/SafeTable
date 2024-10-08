import React, { useState } from "react";
import { api } from "../../api/api";

export const LoginForm = ({ onClose, onSwitchToSignup, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const connectLogin = async () => {
    try {
      const response = await api.post(
        "/login",
        {
          user_email: email,
          user_password: password,
        },
        { withCredentials: true }
      );

      console.log("로그인 되었습니다.");
      sessionStorage.setItem("token", response.data.token);
      setToken(response.data.token); // 로그인 성공 시 토큰 설정
      return true;
    } catch (e) {
      console.log("로그인 실패:", e.response?.data?.message || e.message);
      return false;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const success = await connectLogin();

    if (success) {
      onClose();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">로그인</h2>
      <form onSubmit={handleLogin}>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>
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
