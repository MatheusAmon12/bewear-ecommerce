import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import Orders from "./components/orders";

const MyOrdersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  const orders = await db.query.orderTable.findMany({
    where: eq(orderTable.userId, session.user.id),
    with: {
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
    orderBy: (orderTable, { desc }) => [desc(orderTable.createdAt)],
  });

  const ordersList = orders?.map((order) => ({
    id: order.id,
    totalPriceInCents: order.totalPriceInCents,
    status: order.status,
    createdAt: order.createdAt,
    items: order?.items?.map((item) => ({
      id: item.id,
      imageUrl: item.productVariant.imageUrl,
      name: item.productVariant.product.name,
      variantName: item.productVariant.name,
      priceInCents: item.productVariant.priceInCents,
      quantity: item.quantity,
    })),
  }));

  return <Orders orders={ordersList} />;
};

export default MyOrdersPage;
