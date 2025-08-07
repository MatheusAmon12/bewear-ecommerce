import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-product";

interface UseProductAddToCartParams {
  productVariantId: string;
  quantity: number;
}

export const useProductAddToCart = (item: UseProductAddToCartParams) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-product-to-cart", item.productVariantId, item.quantity],
    mutationFn: () => addProductToCart(item),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Erro ao adicionar produto ao carrinho");
    },
  });

  return {
    mutate,
    isPending,
  };
};
