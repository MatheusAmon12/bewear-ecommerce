import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { increaseCartProductQuantity } from "@/actions/increase-cart-product-quantity";

export const useIncreaseCartProductQuantity = (cartItemId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["remove-product-from-cart", cartItemId],
    mutationFn: () => increaseCartProductQuantity({ cartItemId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
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
