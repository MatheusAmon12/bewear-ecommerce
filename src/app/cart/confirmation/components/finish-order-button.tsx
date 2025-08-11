"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { createCheckoutSession } from "@/actions/create-checkout-session";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFinishOrder } from "@/hooks/data/use-finish-order";

const FinishOrderButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
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

    setIsDialogOpen(true);
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
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="gap-8">
          <div className="relative h-[233.29px] w-full">
            <Image
              src="/illustration.svg"
              alt="Pedido efetuado"
              width={0}
              height={0}
              fill
              className="object-contain"
            />
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Pedido Efetuado!
            </DialogTitle>
            <DialogDescription>
              Seu pedido foi efetuado com sucesso. Você pode acompanhar o status
              na seção de “Meus Pedidos”.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full"
              asChild
            >
              <Link href="/">Página inicial</Link>
            </Button>
            <Button size="lg" className="rounded-full">
              Ver meus pedido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FinishOrderButton;
