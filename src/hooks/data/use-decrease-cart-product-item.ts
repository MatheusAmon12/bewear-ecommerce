import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { decreaseCartProductQuantity } from "@/actions/decrease-cart-product-quantity";

import { getCartKey } from "./use-cart";

const getDecreaseCartProductKey = (cartItemId: string) =>
  ["remove-product-from-cart", cartItemId] as const;

export const useDecreaseCartProductQuantity = (cartItemId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: getDecreaseCartProductKey(cartItemId),
    mutationFn: () => decreaseCartProductQuantity({ cartItemId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: getCartKey() });
      toast.success("Quantidade diminuída com sucesso");
    },
    onError: () => {
      toast.error("Erro ao diminuir quantidade");
    },
  });

  return {
    mutate,
    isPending,
  };
};
