"use server";

import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import Stripe from "stripe";

import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { CreateSessionSchema, createSessionSchema } from "./schema";

export const createCheckoutSession = async (data: CreateSessionSchema) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key not found");
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const { orderId } = createSessionSchema.parse(data);

  const order = await db.query.orderTable.findFirst({
    where: and(
      eq(orderTable.id, orderId),
      eq(orderTable.userId, session.user.id),
    ),
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
  });

  if (!order) {
    throw new Error("Order not found");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
    metadata: {
      orderId,
    },
    line_items: order.items.map((order) => {
      return {
        price_data: {
          currency: "brl",
          product_data: {
            name: `${order.productVariant.product.name} - ${order.productVariant.name}`,
            description: order.productVariant.product.description,
            images: [order.productVariant.imageUrl],
          },
          //price in cents
          unit_amount: order.priceInCents,
        },
        quantity: order.quantity,
      };
    }),
  });

  return checkoutSession;
};
