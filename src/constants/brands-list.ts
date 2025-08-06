import { SVGProps } from "react";

import { Icon } from "@/components/icons";

interface BrandList {
  Icon: React.FC<SVGProps<SVGSVGElement>>;
  name: string;
}

export const BRANDS_LIST: BrandList[] = [
  {
    Icon: Icon.Nike,
    name: "Nike",
  },
  {
    Icon: Icon.Adidas,
    name: "Adidas",
  },
  {
    Icon: Icon.NewBalance,
    name: "New Balance",
  },
  {
    Icon: Icon.Converse,
    name: "Converse",
  },
  {
    Icon: Icon.Polo,
    name: "Polo",
  },
  {
    Icon: Icon.Zara,
    name: "Zara",
  },
  {
    Icon: Icon.Puma,
    name: "Puma",
  },
];
