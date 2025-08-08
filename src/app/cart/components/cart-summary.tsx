import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCentsToBRL } from "@/helpers/money";

interface CartSummaryProps {
  subTotalInCents: number;
  totalInCents: number;
  products: Array<{
    id: string;
    name: string;
    imageUrl: string;
    variantName: string;
    quantity: number;
    priceInCents: number;
  }>;
}

const CartSummary = ({
  subTotalInCents,
  totalInCents,
  products,
}: CartSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seu pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <p className="text-sm">Subtotal</p>
          <p className="text-muted-foreground text-sm font-medium">
            {formatCentsToBRL(subTotalInCents)}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="text-sm">Frete</p>
          <p className="text-muted-foreground text-sm font-medium">GRÁTIS</p>
        </div>

        <div className="flex justify-between">
          <p className="text-sm">Total</p>
          <p className="text-muted-foreground text-sm font-medium">
            {formatCentsToBRL(totalInCents)}
          </p>
        </div>

        <div className="my-10">
          <Separator />
        </div>

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
      </CardContent>
    </Card>
  );
};

export default CartSummary;
