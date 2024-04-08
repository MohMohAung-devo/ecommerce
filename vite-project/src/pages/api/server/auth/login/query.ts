import { LoginPayload } from "@/pages/api/server/auth/login/type";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const URL = `http://localhost:3000`;

export const loginFn = async (payload: LoginPayload) => {
  const response = await axios.post(`${URL}/websiteUser/login`, payload);
  return response.data;
};

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginFn(payload),
    onSuccess: (data, { email, password }) => {
      if (data.meta.success) {
        const status = data.body.status;
        navigate("", {
          state: {
            email,
            password,
            status,
            code: data.body.code,
          },
        });
      }
    },
    onError: (error) => {
      const errMsg =
        error instanceof AxiosError
          ? error.response?.data.messageEn
          : "Something went wrong";
      console.log(errMsg);
    },
  });
};
