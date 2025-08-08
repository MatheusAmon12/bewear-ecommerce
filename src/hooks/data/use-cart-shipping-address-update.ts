import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateCartShippingAddress } from "@/actions/update-cart-shipping-address";
import { UpdateCartShippingAddressSchema } from "@/actions/update-cart-shipping-address/schema";

import { getCartKey } from "./use-cart";

export const getCartShippingAddressUpdateKey = () => [
  "cart-shipping-address-update",
];

export const useCartShippingAddressUpdate = () => {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending } = useMutation({
    mutationKey: getCartShippingAddressUpdateKey(),
    mutationFn: (data: UpdateCartShippingAddressSchema) =>
      updateCartShippingAddress(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getCartKey(),
      });
      toast.success("Endereço vinculado ao carrinho");
    },
    onError: () => {
      toast.error("Erro ao definir endereço");
    },
  });

  return {
    mutate,
    mutateAsync,
    isPending,
  };
};
