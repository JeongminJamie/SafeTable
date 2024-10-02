import React, { useState, useRef, useEffect } from "react";
import { api } from "../../api/api";

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const SigninForm = ({ onClose, onSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  const [emailToken, setEmailtoken] = useState("");
  const [password, setPassword] = useState("");
  const [passCheck, setPassCheck] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const passwordRef = useRef(password);

  useEffect(() => {
    passwordRef.current = password;
  }, [password]);

  const checkPasswordMatch = useRef(
    debounce((value) => {
      if (value !== passwordRef.current) {
        setPasswordError("비밀번호가 일치하지 않습니다.");
      } else {
        setPasswordError("");
      }
    }, 300)
  ).current;

  const register = async () => {
    try {
      const response = await api.post("/register", {
        user_email: email,
        user_password: password,
        user_name: username,
        user_contact: phoneNumber,
      });
      if (response.data) {
        onSwitchToLogin();
      }
    } catch (e) {
      console.log(e.response.data.msg);
    }
  };

  const sendemailapi = async (useremail) => {
    try {
      const response = await api.post("/register/send-verification-email", {
        email: useremail,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const checkemailapi = async (code) => {
    try {
      const response = await api.post("/register/verify-email", {
        email: email,
        verificationCode: code,
      });
      if (response.data.message === "Email verified successfully") {
        setIsVerified(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== passCheck) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }
    register();
  };

  const handlePasswordCheckChange = (e) => {
    const value = e.target.value;
    setPassCheck(value);
    checkPasswordMatch(value);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">회원가입</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-4 relative">
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
            className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="이메일을 입력하세요"
            required
            disabled={isVerified}
          />
          {!isVerified ? (
            <button
              type="button"
              className="absolute bottom-2 right-3 px-2 py-1.5 border border-blue-500 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition duration-200"
              onClick={() => sendemailapi(email)}
            >
              이메일 인증
            </button>
          ) : (
            <span className="absolute bottom-2 right-3 text-green-500 text-2xl">
              ✔
            </span>
          )}
        </div>

        {/* 인증이 완료 전 */}
        {!isVerified && (
          <div className="mb-4 relative">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="verify-email"
            >
              인증코드
            </label>
            <input
              type="text"
              id="verifyEmail"
              value={emailToken}
              onChange={(e) => setEmailtoken(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="인증 코드를 입력하세요"
              required
            />
            <button
              type="button"
              className="absolute bottom-2 right-3 px-2 py-1.5 border border-blue-500 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition duration-200"
              onClick={() => checkemailapi(emailToken)}
            >
              인증
            </button>
          </div>
        )}

        {/* 인증 완료 후에~ */}
        {isVerified && (
          <>
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
                className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="비밀번호를 입력하세요"
              />
            </div>

            <div className="mb-4 relative">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="passwordCheck"
              >
                비밀번호 확인
              </label>
              <input
                type="password"
                id="passwordCheck"
                value={passCheck}
                onChange={handlePasswordCheckChange}
                className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="비밀번호를 다시 입력하세요"
              />
              <p
                className={`text-sm ${
                  passwordError ? "text-red-500" : "text-green-500"
                } absolute bottom-3.5 right-3`}
              >
                {passwordError ? "비밀번호 불일치" : "비밀번호 일치"}
              </p>
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="name"
              >
                이름
              </label>
              <input
                type="text"
                id="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="이름을 입력하세요"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="phone"
              >
                연락처
              </label>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="연락처를 입력하세요"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-20 py-2 border border-blue-500 bg-white text-blue-500 rounded hover:bg-blue-500 hover:text-white"
              >
                회원가입
              </button>
            </div>
          </>
        )}
      </form>

      <div className="mt-4 text-center">
        <span className="text-gray-500">이미 계정이 있으신가요? </span>
        <button
          onClick={onSwitchToLogin}
          className="text-blue-500 hover:underline"
        >
          로그인
        </button>
      </div>
    </div>
  );
};
