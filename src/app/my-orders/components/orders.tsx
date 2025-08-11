import { ReactNode } from "react";

import CartFinancialSummary from "@/app/cart/components/cart-financial-summary";
import CartItemsSummary from "@/app/cart/components/cart-items-summary";
import Footer from "@/components/common/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { orderTable } from "@/db/schema";

interface OrdersProps {
  orders: Array<{
    id: string;
    totalPriceInCents: number;
    status: (typeof orderTable.$inferSelect)["status"];
    createdAt: Date;
    items: Array<{
      id: string;
      name: string;
      imageUrl: string;
      variantName: string;
      quantity: number;
      priceInCents: number;
    }>;
  }>;
}

const Orders = ({ orders }: OrdersProps) => {
  const paymentStatus = (
    paymentStatus: (typeof orderTable.$inferSelect)["status"],
  ): ReactNode | null => {
    if (paymentStatus === "paid") {
      return <Badge className="rounded-full">Pago</Badge>;
    }
    if (paymentStatus === "pending") {
      return (
        <Badge variant="outline" className="rounded-full">
          Pagamento pendente
        </Badge>
      );
    }

    if (paymentStatus === "canceled") {
      return (
        <Badge variant="destructive" className="rounded-full">
          Cancelado
        </Badge>
      );
    }

    return null;
  };

  return (
    <div className="space-y-12">
      <div className="space-y-3 px-5">
        {orders?.map((order) => (
          <Card key={order.id}>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value={order.id}>
                  <AccordionTrigger>
                    <div className="flex flex-col gap-2">
                      {paymentStatus(order.status)}
                      <div className="flex flex-col">
                        <p>Pedido</p>
                        <span className="text-muted-foreground text-xs font-semibold">
                          Realizado em{" "}
                          {new Date(order.createdAt).toLocaleDateString(
                            "pt-BR",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}{" "}
                          às{" "}
                          {new Date(order.createdAt).toLocaleTimeString(
                            "pt-BR",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Separator className="mt-4 mb-8" />
                    <CartItemsSummary products={order.items} />
                    <Separator className="my-8" />
                    <CartFinancialSummary
                      totalInCents={order.totalPriceInCents}
                      subTotalInCents={order.totalPriceInCents}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Orders;
