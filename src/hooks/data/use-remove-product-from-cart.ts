import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { removeProductFromCart } from "@/actions/remove-cart-product";

import { getCartKey } from "./use-cart";

const getRemoveProductFromCartKey = (cartItemId: string) => ["remove-product-from-cart", cartItemId] as const

export const useRemoveProductFromCart = (cartItemId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: getRemoveProductFromCartKey(cartItemId),
    mutationFn: () => removeProductFromCart({ cartItemId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: getCartKey() });
      toast.success("Produto removido do carrinho");
    },
    onError: () => {
      toast.error("Erro ao remover produto do carrinho");
    },
  });

  return {
    mutate,
    isPending,
  };
};
