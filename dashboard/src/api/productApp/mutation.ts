import { ProductAll, AddProductPayload } from "@/api/productApp/type";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const URL = `http://localhost:3000`;

export const AddProductFn = async (
  payload: ProductAll
): Promise<AddProductPayload> => {
  const response = await axios.post(`${URL}/productApp`, {
    params: payload,
  });

  return response.data;
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationKey: ["create-product"],
    mutationFn: (payload: AddProductPayload) => AddProductFn({ payload }),
    onSuccess: (res) => {
      if (res.meta.success) {
        toast({
          title: "Success",
        });
        queryClient.invalidateQueries({ queryKey: ["add-product"] });
      }
    },
  });
};


