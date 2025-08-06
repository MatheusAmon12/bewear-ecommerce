import { BRANDS_LIST } from "@/constants/brands-list";

import BrandItem from "./brand-item";

interface BrandListProps {
  title: string;
}

const BrandsList = ({ title }: BrandListProps) => {
  return (
    <div className="space-y-6 pb-14">
      <h3 className="px-5 font-semibold">{title}</h3>
      <div className="flex w-full gap-6 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {BRANDS_LIST.map((brand) => (
          <BrandItem key={brand.name} Icon={brand.Icon} name={brand.name} />
        ))}
      </div>
    </div>
  );
};

export default BrandsList;
