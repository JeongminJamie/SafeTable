import { useMutation } from "@tanstack/react-query";
import {
  sendCodeToEmail,
  signin,
  signup,
  verifyCode,
} from "../../service/auth";

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
