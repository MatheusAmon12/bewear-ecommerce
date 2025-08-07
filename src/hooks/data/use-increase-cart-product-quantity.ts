import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { increaseCartProductQuantity } from "@/actions/increase-cart-product-quantity";

import { getCartKey } from "./use-cart";

const getIncreaseCartProductQuantityKey = (cartItemId: string) =>
  ["remove-product-from-cart", cartItemId] as const;

export const useIncreaseCartProductQuantity = (cartItemId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: getIncreaseCartProductQuantityKey(cartItemId),
    mutationFn: () => increaseCartProductQuantity({ cartItemId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: getCartKey() });
      toast.success("Quantidade aumentada com sucesso");
    },
    onError: () => {
      toast.error("Erro incrementar quantidade");
    },
  });

  return {
    mutate,
    isPending,
  };
};
