import { api } from "../api/api";

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
