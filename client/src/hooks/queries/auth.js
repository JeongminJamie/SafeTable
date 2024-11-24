import { useMutation } from "@tanstack/react-query";
import { signin } from "../../service/auth";

export const useSignin = (onSuccess, onError) =>
  useMutation({ mutationFn: signin, onSuccess, onError });
