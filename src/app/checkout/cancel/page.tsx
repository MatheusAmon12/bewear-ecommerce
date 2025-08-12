import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CheckoutCancelPage = () => {
  return (
    <Dialog open>
      <DialogContent className="gap-8">
        <div className="relative h-[233.29px] w-full">
          <Image
            src="/payment-error.svg"
            alt="Pedido cancelado"
            width={0}
            height={0}
            fill
            className="object-contain"
          />
        </div>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Pedido Cancelado!
          </DialogTitle>
          <DialogDescription>
            Seu pedido foi cancelado. Você pode acompanhar o status na seção de
            “Meus Pedidos”.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button size="lg" variant="outline" className="rounded-full" asChild>
            <Link href="/">Página inicial</Link>
          </Button>
          <Button size="lg" className="rounded-full">
            <Link href="/my-orders">Ver meus pedidos</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutCancelPage;
