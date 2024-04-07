import { UserListPayload, WebsiteUserAll } from "@/api/userList/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const URL = `http://localhost:3000`;

export const AllUserFn = async (
  payload: WebsiteUserAll
): Promise<UserListPayload> => {
  const response = await axios.get(`${URL}/websiteUser/all`, {
    params: payload,
  });

  return response.data;
};

export const useAllUser = (payload: UserListPayload) => {
  return useQuery({
    queryKey: ["register-user", payload],
    queryFn: () => AllUserFn(payload),
    select: (data: UserListPayload) => {
      console.log({ data });

      const dataList = data.body.websiteUserAll;
      return dataList.map((list: WebsiteUserAll) => ({
        name: list.name,
        phone: list.phone,
        email: list.email,
        isActive: list.isActive,
      }));
    },
  });
};
