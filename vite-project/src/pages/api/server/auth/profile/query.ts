import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@/pages/hook/useAuth";
import Cookies from "js-cookie";
const URL = `http://localhost:8000`;

export const fetchProfile = async (_id: string, token: string) => {
  const response = await axios.get(`${URL}/api/secret/${_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("token");

  return response.data;
};

export const useProfile = () => {
  const { _id, isAuthenicated } = useAuth();
  return useQuery({
    queryKey: ["profile", _id],
    queryFn: () => fetchProfile(_id!, Cookies.get("token")!),
    enabled: !!isAuthenicated && !!_id,
  });
};
