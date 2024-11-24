import { useMutation } from "@tanstack/react-query";
import { signin, signup } from "../../service/auth";

export const useSignin = (onSuccess, onError) =>
  useMutation({ mutationFn: signin, onSuccess, onError });

export const useSignup = (onSuccessRegister, onErrorRegister) =>
  useMutation({
    mutationFn: signup,
    onSuccess: onSuccessRegister,
    onError: onErrorRegister,
  });
