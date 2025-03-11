import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const URL = `http://localhost:8000`;

export const fetchProfile = async () => {
  const response = await axios.get(`${URL}/api//secret/:userId`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    enabled: !!localStorage.getItem("token"), // Only run if token exists
  });
};
