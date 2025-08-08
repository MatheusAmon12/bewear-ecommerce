import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-product";

import { getCartKey } from "./use-cart";

interface UseProductAddToCartParams {
  productVariantId: string;
  quantity: number;
}

const getProductAddToCartKey = ({
  productVariantId,
  quantity,
}: UseProductAddToCartParams) =>
  ["add-product-to-cart", productVariantId, quantity] as const;

export const useProductAddToCart = ({
  productVariantId,
  quantity,
}: UseProductAddToCartParams) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: getProductAddToCartKey({ productVariantId, quantity }),
    mutationFn: () => addProductToCart({ productVariantId, quantity }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: getCartKey() });
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
