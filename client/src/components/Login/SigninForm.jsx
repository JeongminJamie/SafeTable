import React, { useState, useRef, useEffect } from "react";
import {
  useSendEmail,
  useSignup,
  useVerityCode,
} from "../../hooks/queries/auth";

export const SigninForm = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  const [emailToken, setEmailtoken] = useState("");
  const [emailClick, setEmailClick] = useState(false);
  const [password, setPassword] = useState("");
  const [passCheck, setPassCheck] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [emailOk, setEmailOk] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailCodeError, setEmailCodeError] = useState("");

  const passwordRef = useRef(password);

  // 비밀번호 변경 시 최신값으로 업데이트
  useEffect(() => {
    passwordRef.current = password;
  }, [password]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (passCheck !== passwordRef.current) {
        setPasswordError("비밀번호가 일치하지 않습니다.");
      } else {
        setPasswordError("");
      }
    }, 1000);

    return () => clearTimeout(debounceTimeout);
  }, [passCheck]);

  // 유저등록-성공
  const onSuccessRegister = (data) => {
    console.log("회원가입 성공:", data);
    onSwitchToLogin();
  };

  // 유저등록-에러
  const onErrorRegister = (error) => {
    const errorMessage = error?.msg || "회원가입에 실패했습니다.";
    console.error("회원가입 실패:", errorMessage);
  };

  // 유저등록
  const { mutate: signupMutate } = useSignup(
    onSuccessRegister,
    onErrorRegister
  );

  // 인증코드발송-성공
  const onSuccessSendCodeToEmail = (data) => {
    if (data.message === "Verification email sent") {
      setEmailError("");
      setEmailOk("이메일로 인증코드를 발송했습니다.");
      setEmailClick(true);
    }
  };

  // 인증코드발송-에러
  const onErrorSendCodeToEmail = (error) => {
    if (
      error.response?.data?.msg ===
      "Email already exists, please use a different email"
    ) {
      setEmailError("이미 등록된 이메일입니다. 다른 이메일을 기입해주세요.");
      setEmailOk("");
    }
  };

  // 인증코드발송
  const { mutate: sendEmailMutate } = useSendEmail(
    onSuccessSendCodeToEmail,
    onErrorSendCodeToEmail
  );

  // 인증코드확인 - 성공
  const onSuccessVerifyCode = (data) => {
    if (data?.message === "Email verified successfully") {
      setIsVerified(true);
    }
  };

  // 인증코드확인 - 에러
  const onErrorVerifyCode = (error) => {
    if (error?.data?.message) {
      setEmailCodeError("유효한 코드 6자리를 입력해주세요.");
    }
  };

  // 인증코드확인
  const { mutate: verifyCodeMutate } = useVerityCode(
    onSuccessVerifyCode,
    onErrorVerifyCode
  );

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== passCheck) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }

    signupMutate({ email, password, username, phoneNumber });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">회원가입</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-4 ">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="email"
          >
            이메일
          </label>
          <div className="flex items-center relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="이메일을 입력하세요"
              required
              disabled={isVerified}
            />
            {!isVerified ? (
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 px-2 py-1.5 border border-amber-500 bg-amber-500 text-white text-sm rounded hover:bg-amber-600 transition duration-200"
                onClick={() => sendEmailMutate({ email })}
              >
                이메일 인증
              </button>
            ) : (
              <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-green-500 text-2xl">
                ✔
              </span>
            )}
          </div>
          {!isVerified && (emailError || emailOk) ? (
            <p
              className={`text-sm mt-2 ${
                emailError ? "text-red-500" : "text-gray-500"
              }`}
            >
              {emailError || emailOk}
            </p>
          ) : null}
        </div>

        {/* 인증이 완료 전 */}
        {!isVerified && emailClick && (
          <div className="mb-4 ">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="verify-email"
            >
              인증코드
            </label>
            <div className="flex items-center relative">
              <input
                type="text"
                id="verifyEmail"
                value={emailToken}
                onChange={(e) => setEmailtoken(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="인증 코드를 입력하세요"
                required
              />
              <button
                type="button"
                className="absolute bottom-2 right-3 px-2 py-1.5 border border-amber-500 bg-amber-500 text-white text-sm rounded hover:bg-amber-600 transition duration-200"
                onClick={() => verifyCodeMutate({ email, emailToken })}
              >
                인증
              </button>
            </div>
            {emailCodeError && (
              <p className="text-red-500 text-sm mt-2">{emailCodeError}</p>
            )}
          </div>
        )}

        {/* 인증 완료 후에 */}
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
                className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="비밀번호를 입력하세요"
                required
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
                onChange={(e) => setPassCheck(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="비밀번호를 다시 입력하세요"
                required
              />
              <p
                className={`text-sm ${
                  passCheck === ""
                    ? "invisible"
                    : passwordError
                    ? "text-red-500"
                    : "text-green-500"
                } absolute bottom-3.5 right-3`}
              >
                {passCheck === ""
                  ? ""
                  : passwordError
                  ? "비밀번호 불일치"
                  : "비밀번호 일치"}
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
                className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="이름을 입력하세요"
                required
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
                className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="연락처를 입력하세요"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-20 py-2 border border-amber-500 bg-white text-amber-500 rounded hover:bg-amber-500 hover:text-white"
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
          className="text-amber-500 hover:underline"
        >
          로그인
        </button>
      </div>
    </div>
  );
};
