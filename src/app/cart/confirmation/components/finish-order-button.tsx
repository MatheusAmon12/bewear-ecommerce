"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Loader2 } from "lucide-react";

import { createCheckoutSession } from "@/actions/create-checkout-session";
import { Button } from "@/components/ui/button";
import { useFinishOrder } from "@/hooks/data/use-finish-order";

const FinishOrderButton = () => {
  const { mutateAsync, isPending } = useFinishOrder();

  const handleFinishOrderButtonClick = async () => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stipe publishable key not found");
    }
    const { orderId } = await mutateAsync();

    const checkoutSession = await createCheckoutSession({ orderId });

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );

    if (!stripe) {
      throw new Error("Stripe load failed");
    }

    await stripe.redirectToCheckout({
      sessionId: checkoutSession.id,
    });
  };

  return (
    <>
      <Button
        size="lg"
        className="w-full rounded-full"
        disabled={isPending}
        onClick={handleFinishOrderButtonClick}
      >
        {isPending && <Loader2 className="animate-spin" />}
        Finalizar compra
      </Button>
    </>
  );
};

export default FinishOrderButton;
