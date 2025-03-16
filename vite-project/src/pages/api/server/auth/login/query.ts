// import { LoginPayload } from "@/pages/api/server/auth/login/type";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/pages/hook/useAuth";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";

const URL = `http://localhost:8000`;

interface LoginPayload {
  email: string;
  password: string;
}
export const loginFn = async (payload: LoginPayload) => {
  const response = await axios.post(`${URL}/api/signin`, payload);
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
        const userId = data?.user._id;

        if (!accessToken || !userId) {
          console.error("Login response missing token or userId");
        }
        // console.log(data);
        // console.log(accessToken);
        // Cookies.set("token", accessToken, { expires: 1, secure: true });
        // Cookies.set("userId", userId, { expires: 1, secure: true });
        // login(accessToken, userId);
        toast({
          title: "Login Successfull",
          description: "Welcome back.",
        });
        navigate("/", { replace: true });
      }
    },

    onError: (error) => {
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

interface LogoutPayLoad {
  _id: string;
  token: string;
}
const logoutFn = async (payload: LogoutPayLoad) => {
  const response = await axios.get(
    `${URL}/api/signout/${payload._id}`,
    payload
  );

  return response.data;
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutFn,
  });
};
