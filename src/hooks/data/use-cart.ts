import { useQuery } from "@tanstack/react-query";

import { getCart } from "@/actions/get-cart";

export const getCartKey = () => ["cart"] as const;

export const useCart = () => {
  const { data, isLoading, isPending } = useQuery({
    queryKey: getCartKey(),
    queryFn: getCart,
  });

  return { data, isLoading, isPending };
};
