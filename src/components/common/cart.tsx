"use client";

import { ShoppingBagIcon } from "lucide-react";
import Image from "next/image";

import { useGetCart } from "@/hooks/data/use-get-cart";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const Cart = () => {
  const { data: cart, isPending: cartIsLoading } = useGetCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-[#656565]">
          <ShoppingBagIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>
        {cartIsLoading && <div>Carregando...</div>}
        {cart?.items.map((item) => (
          <div key={item.id}>
            <Image
              src={item.productVariant.imageUrl}
              alt={item.productVariant.name}
              width={100}
              height={100}
            />
            <div>
              <h3>{item.productVariant.product.name}</h3>
            </div>
          </div>
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
