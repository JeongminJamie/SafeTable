import { useMutation } from "@tanstack/react-query";
import {
  sendCodeToEmail,
  signin,
  signup,
  verifyCode,
} from "../../service/authService";
import { api } from "../../api/api";
import { getAxiosHeaderConfig } from "../../config";
import useUserStore from "../../store/useUserStore";

export const useSignin = (onSuccess, onError) =>
  useMutation({ mutationFn: signin, onSuccess, onError });

export const useSignup = (onSuccessRegister, onErrorRegister) =>
  useMutation({
    mutationFn: signup,
    onSuccess: onSuccessRegister,
    onError: onErrorRegister,
  });

export const useSendEmail = (
  onSuccessSendCodeToEmail,
  onErrorSendCodeToEmail
) =>
  useMutation({
    mutationFn: sendCodeToEmail,
    onSuccess: onSuccessSendCodeToEmail,
    onError: onErrorSendCodeToEmail,
  });

export const useVerityCode = (onSuccessVerifyCode, onErrorVerifyCode) =>
  useMutation({
    mutationFn: verifyCode,
    onSuccess: onSuccessVerifyCode,
    onError: onErrorVerifyCode,
  });

export const useVerifyToken = () => {
  const { setUserData } = useUserStore();

  const verifyToken = async () => {
    const headersConfig = await getAxiosHeaderConfig();
    if (!headersConfig) return;

    try {
      const response = await api.get("/login/verify", headersConfig);

      setUserData({
        userName: response.data.user.name,
        userEmail: response.data.user.email,
        userContact: response.data.user.contact,
        userLocation: response.data.user.location,
      });
    } catch (error) {
      if (error.response) {
        console.log("Failed to verify token:", error.response.data.message);
      } else {
        console.error("Error verifying token:", error.message);
      }
    }
  };

  return { verifyToken };
};
