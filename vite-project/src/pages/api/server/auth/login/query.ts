// import { LoginPayload } from "@/pages/api/server/auth/login/type";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/pages/hook/useAuth";
import { useToast } from "@/components/ui/use-toast";

const URL = `http://localhost:3000`;

interface LoginPayload {
  email: string;
  password: string;
}
export const loginFn = async (payload: LoginPayload) => {
  const response = await axios.post(`${URL}/websiteUser/login`, payload);
  return response.data;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  const from = location.state?.from?.pathname || "/";

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginFn(payload),
    onSuccess: (data) => {
      if (data?.success) {
        const accessToken = data?.token;
        login(accessToken);
        console.log(data);
        console.log(accessToken);
        toast({
          title: "Login Successfull",
          description: "Welcome back.",
        });
        navigate(from, { replace: true });
      }
    },
    onError: (error) => {
      // console.error("error", error);
      // const errMsg =
      //   error instanceof AxiosError
      //     ? error.response?.data.messageEn
      //     : "Something went wrong";
      // console.log(errMsg.data?.httpStatus);

      let errMsg = "Something went wrong";
      if (error instanceof AxiosError && error.response?.data.messageEn) {
        errMsg = error.response.data.messageEn;
        const httpStatus = error.response.data.httpStatus;
        console.log(httpStatus);
      }
      console.log(errMsg);
    },
  });
};
