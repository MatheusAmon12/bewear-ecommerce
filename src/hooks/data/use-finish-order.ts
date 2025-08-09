import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { finishOrder } from "@/actions/finish-order";

import { getCartKey } from "./use-cart";

export const getFinishOrderKey = () => ["finish-order"] as const;

export const useFinishOrder = () => {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending } = useMutation({
    mutationKey: getFinishOrderKey(),
    mutationFn: finishOrder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getCartKey(),
      });

      toast.success("Compra finalizada com sucesso");
    },
    onError: () => {
      toast.error("Erro a finalizar compra");
    },
  });

  return {
    mutate,
    mutateAsync,
    isPending,
  };
};
