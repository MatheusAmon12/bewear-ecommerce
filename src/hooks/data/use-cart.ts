import { useQuery } from "@tanstack/react-query";

import { getCart } from "@/actions/get-cart";

export const getCartKey = () => ["cart"] as const;

export const useCart = (cart?: Awaited<ReturnType<typeof getCart>>) => {
  const { data, isLoading, isPending } = useQuery({
    queryKey: getCartKey(),
    queryFn: getCart,
    initialData: cart,
  });

  return { data, isLoading, isPending };
};
