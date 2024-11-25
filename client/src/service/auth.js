import { api } from "../api/api";

//로그인
export const signin = async ({ email, password }) => {
  const response = await api.post(
    "/login",
    {
      user_email: email,
      user_password: password,
    },
    { withCredentials: true }
  );
  return response.data;
};

//등록
export const signup = async ({ email, password, username, phoneNumber }) => {
  const response = await api.post("/register", {
    user_email: email,
    user_password: password,
    user_name: username,
    user_contact: phoneNumber,
  });
  return response.data;
};

//메일발송
export const sendCodeToEmail = async ({ email }) => {
  const response = await api.post("/register/send-verification-email", {
    email: email,
  });
  return response.data;
};

//인증번호 체크
export const verifyCode = async ({ email, emailToken }) => {
  const response = await api.post("/register/verify-email", {
    email: email,
    verificationCode: emailToken,
  });
  return response.data;
};
