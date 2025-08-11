import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Footer from "@/components/common/footer";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { cartTable, shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import CartFinancialSummary from "../components/cart-financial-summary";
import CartItemsSummary from "../components/cart-items-summary";
import Addresses from "./components/addresses";

const IdentificationPage = async () => {
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

  const shippingAddresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, session.user.id),
  });

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
    <div className="space-y-12">
      <div className="space-y-4 px-5">
        <Addresses
          initialShippingAddresses={shippingAddresses}
          initialCart={{ ...cart, totalPriceInCents: 0 }}
        />

      </div>
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

      <Footer />
    </div>
  );
};

export default IdentificationPage;
