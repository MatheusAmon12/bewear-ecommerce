import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { formatCentsToBRL } from "@/helpers/money";
import { useDecreaseCartProductQuantity } from "@/hooks/data/use-decrease-cart-product-item";
import { useRemoveProductFromCart } from "@/hooks/data/use-remove-product-from-cart";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantImageUrl,
  productVariantPriceInCents,
  productVariantName,
  quantity,
}: CartItemProps) => {
  const { mutate: removeProductFromCart } = useRemoveProductFromCart(id);
  const { mutate: decreaseCartProductQuantity } =
    useDecreaseCartProductQuantity(id);

  const handleRemoveProductFromCart = () => {
    removeProductFromCart();
  };

  const handleDecreaseButtonClick = () => {
    decreaseCartProductQuantity();
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={78}
          height={78}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">{productName}</p>
          <p className="text-muted-foreground text-xs font-medium">
            {productVariantName}
          </p>
          <div className="flex w-[100px] items-center justify-between rounded-lg border p-1 px-2">
            {quantity === 1 ? (
              <Button
                className="size-4"
                variant="ghost"
                size="icon"
                onClick={handleRemoveProductFromCart}
              >
                <TrashIcon />
              </Button>
            ) : (
              <Button
                className="size-4"
                variant="ghost"
                onClick={handleDecreaseButtonClick}
              >
                <MinusIcon />
              </Button>
            )}
            <p className="text-xs font-medium">{quantity}</p>
            <Button className="size-4" variant="ghost" onClick={() => {}}>
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold">
          {formatCentsToBRL(productVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
