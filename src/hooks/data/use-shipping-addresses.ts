import { useQuery } from "@tanstack/react-query";

import { getShippingAddresses } from "@/actions/get-shipping-addresses";
import { shippingAddressTable } from "@/db/schema";

export const getShippingAddressesKey = () => ["shipping-addresses"] as const;

interface UseShippingAddressesParams {
  initialData: (typeof shippingAddressTable.$inferSelect)[];
}

export const useShippingAddresses = (params?: UseShippingAddressesParams) => {
  const { data, isLoading, isPending } = useQuery({
    queryKey: getShippingAddressesKey(),
    queryFn: getShippingAddresses,
    initialData: params?.initialData,
  });

  return { data, isLoading, isPending };
};
