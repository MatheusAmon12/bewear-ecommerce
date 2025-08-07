"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useProductAddToCart } from "@/hooks/data/use-add-product-to-cart";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const { mutate, isPending } = useProductAddToCart({
    productVariantId,
    quantity,
  });

  const handleAddToCartButtonClick = () => {
    mutate();
  };
  return (
    <Button
      size="lg"
      variant="outline"
      className="rounded-full font-semibold"
      disabled={isPending}
      onClick={handleAddToCartButtonClick}
    >
      {isPending && <Loader2 className="animate-spin" />}
      Adicionar à sacola
    </Button>
  );
};

export default AddToCartButton;
