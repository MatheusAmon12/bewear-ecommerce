import { useQuery } from "@tanstack/react-query";

import { getCart } from "@/actions/get-cart";

export const useGetCart = () => {
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  return { data, isLoading, isPending };
};
