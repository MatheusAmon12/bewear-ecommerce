"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { shippingAddressTable } from "@/db/schema";
import { useShippingAddresses } from "@/hooks/data/use-shipping-addresses";

import AddressForm from "./address-form";

interface ShippingAddressesProps {
  initialShippingAddresses: (typeof shippingAddressTable.$inferSelect)[];
}

const Addresses = ({ initialShippingAddresses }: ShippingAddressesProps) => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>();
  const { data: shippingAddresses, isPending } = useShippingAddresses({
    initialData: initialShippingAddresses,
  });

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
              <AddressForm />
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default Addresses;
