"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import AddressForm from "./address-form";

const Addresses = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="add_new" id="add_new" />
            <Label htmlFor="add_new">Adicionar novo endereço</Label>
          </div>
        </RadioGroup>
        {selectedAddress === "add_new" && (
          <Card className="mt-4">
            <CardContent className="pt-6">
              <AddressForm />
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default Addresses;
