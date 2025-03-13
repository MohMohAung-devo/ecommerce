import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const URL = `http://localhost:8000`;

export const fetchProfile = async (userId: string, token: string) => {
  const response = await axios.get(`${URL}/api/secret/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("token");

  return response.data;
};

export const useProfile = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => fetchProfile(userId!, token!),
    enabled: !!token && !!userId,
  });
};
