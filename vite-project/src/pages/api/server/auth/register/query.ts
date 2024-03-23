import { useToast } from "@/components/ui/use-toast";
import { RegisterPayload } from "@/pages/api/server/auth/register/type";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { error } from "console";
import { useNavigate } from "react-router-dom";

const URL = `http://localhost:3000`;

export const registerFn = async (payload: RegisterPayload) => {
  const response = await axios.post(`${URL}/websiteUser/register`, payload);
  return response.data;
};

export const useAllRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    // mutationKey: ["create-register"],
    mutationFn: (payload: RegisterPayload) => registerFn(payload),
    onSuccess: (data, { name, phone, email, password, currentLocation }) => {
      if (data.meta.success) {
        const status = data.body.status;
        navigate("/login", {
          state: {
            name,
            phone,
            email,
            password,
            currentLocation,
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

      console.log(errMsg.data?.httpStatus);
    },
  });
};
