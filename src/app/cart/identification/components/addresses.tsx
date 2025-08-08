"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { getCart } from "@/actions/get-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { shippingAddressTable } from "@/db/schema";
import { useCartShippingAddressUpdate } from "@/hooks/data/use-cart-shipping-address-update";
import { useShippingAddresses } from "@/hooks/data/use-shipping-addresses";

import AddressForm from "./address-form";

interface ShippingAddressesProps {
  initialShippingAddresses: (typeof shippingAddressTable.$inferSelect)[];
  initialCart: Awaited<ReturnType<typeof getCart>>;
}

const Addresses = ({
  initialShippingAddresses,
  initialCart,
}: ShippingAddressesProps) => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(
    initialCart?.shippingAddress?.id || null,
  );
  const { data: shippingAddresses, isPending } = useShippingAddresses({
    initialData: initialShippingAddresses,
  });
  const { mutate } = useCartShippingAddressUpdate();

  const handlePaymentButtonClick = () => {
    if (!selectedAddress) {
      return;
    }

    mutate({
      shippingAddressId: selectedAddress,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedAddress}
          onValueChange={setSelectedAddress}
          className="gap-4"
        >
          {isPending && (
            <div className="text-muted-foreground flex items-center gap-1">
              <Loader2 className="size-3 animate-spin" />
              <span className="text-xs font-medium">Buscando endereços</span>
            </div>
          )}
          {shippingAddresses?.map((shippingAddress) => (
            <Card key={shippingAddress.id}>
              <CardContent>
                <div className="flex items-start gap-3">
                  <RadioGroupItem
                    value={shippingAddress.id}
                    id={shippingAddress.id}
                  />
                  <Label htmlFor={shippingAddress.id}>
                    {shippingAddress.street}, {shippingAddress.number},{" "}
                    {shippingAddress.neighborhood}, {shippingAddress.city} -{" "}
                    {shippingAddress.zipCode}
                  </Label>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card>
            <CardContent>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="add_new" id="add_new" />
                <Label htmlFor="add_new">Adicionar novo endereço</Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
        {selectedAddress === "add_new" && (
          <Card className="mt-4">
            <CardContent>
              <AddressForm onShippingAddressCreate={setSelectedAddress} />
            </CardContent>
          </Card>
        )}

        {selectedAddress && selectedAddress !== "add_new" && (
          <Button
            size="lg"
            className="mt-8 w-full rounded-full"
            onClick={handlePaymentButtonClick}
            asChild
          >
            <Link href="#">Continuar com o pagamento</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default Addresses;
