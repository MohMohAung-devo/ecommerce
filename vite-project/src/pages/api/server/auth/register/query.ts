import { RegisterPayload } from "@/pages/api/server/auth/register/type";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const URL = `http://localhost:8000`;

export const registerFn = async (payload: RegisterPayload) => {
  const response = await axios.post(`${URL}/api/signup`, payload);
  return response.data;
};

export const useAllRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    // mutationKey: ["create-register"],
    mutationFn: (payload: RegisterPayload) => registerFn(payload),
    onSuccess: (data, { name, email, password }) => {
      if (data?.meta?.success) {
        console.log(data);
        const status = data.body.status;
        navigate("/login", {
          state: {
            name,
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
          : "Somethign went wrong";

      console.log("Error Message", errMsg);
    },
  });
};
