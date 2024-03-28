import { ProductAll, AddProductPayload } from "@/api/productApp/type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const URL = `http://localhost:3000`;

export const AllProductFn = async (
  payload: ProductAll
): Promise<AddProductPayload> => {
  const response = await axios.get(`${URL}/productAdd/all`, {
    params: payload,
  });
  return response.data;
};

export const useAllProduct = (payload: AddProductPayload) => {
  return useQuery({
    queryKey: ["add-product", payload],
    queryFn: () => AllProductFn(payload),
    select: (data: AddProductPayload) => {
      console.log({ data });
      const dataList = data.body.productAll;
      return dataList.map((list: ProductAll) => ({
        id: list._id,
        name: list.name,
        amount: list.amount,
        price: list.price,
        count: list.count,
        image: list.image.path,
        date: list.date,
      }));
    },
  });
};

// export const AllEditFn = async (
//   payload: ProductAll,
//   id: string
// ): Promise<AddProductPayload> => {
//   const response = await axios.patch(`${URL}/product/edit/:id`, {
//     params: payload,
//     id,
//   });
//   return response.data;
// };

// export const useEdit = (payload: AddProductPayload) => {

// }
