import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addShippingAddress } from "@/actions/add-shipping-address";

interface UseAddShippingAddressParams {
  email: string;
  fullName: string;
  cpf: string;
  phone: string;
  zipCode: string;
  address: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

const getAddShippingAddressKey = (data: UseAddShippingAddressParams) =>
  ["add-shipping-address", data] as const;

export const useAddShippingAddress = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: getAddShippingAddressKey({} as UseAddShippingAddressParams),
    mutationFn: (data: UseAddShippingAddressParams) => addShippingAddress(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["shipping-addresses"] });
      toast.success("Endereço salvo com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao salvar endereço");
    },
  });

  return {
    mutate,
    isPending,
  };
};
