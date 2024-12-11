import { ProductAll, AddProductPayload } from "@/api/productApp/type";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const URL = `http://localhost:3000`;

// export const AddProductFn = async (payload: FormData): Promise<void> => {
//   const response = await axios.post(`${URL}/productApp`, payload);

//   return response.data;
// };

// export const useAddProduct = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationKey: ["create-product"],
//     mutationFn: (payload: FormData) => AddProductFn(payload),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["add-product"] });
//     },
//   });
// };

export const AddProductFn = async (
  payload: ProductAll
): Promise<AddProductPayload> => {
  const response = await axios.post(`${URL}/productApp`, payload);

  return response.data;
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-product"],
    mutationFn: (payload: AddProductPayload) => AddProductFn(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["add-product"] });
    },
  });
};
