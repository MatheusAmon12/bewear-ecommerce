import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Footer from "@/components/common/footer";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { cartTable, shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import CartFinancialSummary from "../components/cart-financial-summary";
import CartItemsSummary from "../components/cart-items-summary";
import { formatAddress } from "../helpers/address";
import FinishOrderButton from "./components/finish-order-button";

const ConfirmationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });
  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }

  if (!cart?.shippingAddress?.id) {
    redirect("/cart/identification");
  }

  const shippingAddress = await db.query.shippingAddressTable.findFirst({
    where: and(
      eq(shippingAddressTable.userId, session.user.id),
      eq(shippingAddressTable.id, cart.shippingAddress?.id),
    ),
  });

  if (!shippingAddress) {
    redirect("/cart/identification");
  }

  const cartTotalPriceInCents = cart?.items?.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );

  const products = cart?.items?.map((item) => ({
    id: item.productVariant.id,
    name: item.productVariant.product.name,
    variantName: item.productVariant.name,
    quantity: item.quantity,
    priceInCents: item.productVariant.priceInCents,
    imageUrl: item.productVariant.imageUrl,
  }));

  return (
    <div className="flex h-svh flex-col gap-12">
      <div className="space-y-4 px-5">
        <Card>
          <CardHeader>
            <CardTitle>Identificação</CardTitle>
          </CardHeader>
          <CardContent>
            <Card>
              <CardContent>
                <p className="text-sm font-medium">
                  {formatAddress(shippingAddress)}
                </p>
              </CardContent>
            </Card>
          </CardContent>
          <CardFooter>
            <FinishOrderButton />
          </CardFooter>
        </Card>

        <div className="px-5">
          <div className="space-y-3">
            <CartFinancialSummary
              subTotalInCents={cartTotalPriceInCents}
              totalInCents={cartTotalPriceInCents}
            />
          </div>

          <div className="my-10">
            <Separator />
          </div>

          <CartItemsSummary products={products} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ConfirmationPage;
