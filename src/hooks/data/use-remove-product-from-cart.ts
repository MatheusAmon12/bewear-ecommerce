import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { removeProductFromCart } from "@/actions/remove-cart-product";

export const useRemoveProductFromCart = (cartItemId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["remove-product-from-cart", cartItemId],
    mutationFn: () => removeProductFromCart({ cartItemId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
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
