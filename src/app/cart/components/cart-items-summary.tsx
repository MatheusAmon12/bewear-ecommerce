import Image from "next/image";

import { formatCentsToBRL } from "@/helpers/money";

interface CartItemsSummaryProps {
  products: Array<{
    id: string;
    name: string;
    imageUrl: string;
    variantName: string;
    quantity: number;
    priceInCents: number;
  }>;
}

const CartItemsSummary = ({ products }: CartItemsSummaryProps) => {
  return (
    <div className="space-y-12">
      {products.map((product) => (
        <div key={product.id} className="flex items-center gap-4">
          <Image
            src={product.imageUrl}
            alt={product.variantName}
            width={86}
            height={86}
            className="rounded-lg"
          />
          <div className="flex flex-col gap-0">
            <p className="text-sm font-bold">{product.name}</p>
            <p className="text-muted-foreground text-xs font-medium">
              {product.variantName}
            </p>
            <span>{product.quantity}</span>
            <p className="text-sm font-bold">
              {formatCentsToBRL(product.priceInCents)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItemsSummary;
