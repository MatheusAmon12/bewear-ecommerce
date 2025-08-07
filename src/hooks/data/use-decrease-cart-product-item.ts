import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { decreaseCartProductQuantity } from "@/actions/decrease-cart-product-quantity";

export const useDecreaseCartProductQuantity = (cartItemId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["remove-product-from-cart", cartItemId],
    mutationFn: () => decreaseCartProductQuantity({ cartItemId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Quantiade diminuída com sucesso");
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
