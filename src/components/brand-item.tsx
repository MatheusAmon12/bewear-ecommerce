import { SVGProps } from "react";

import { Card } from "./ui/card";

interface BrandItemProps {
  Icon: React.FC<SVGProps<SVGSVGElement>>;
  name: string;
}

const BrandItem = ({ Icon, name }: BrandItemProps) => {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl">
      <Card className="flex items-center justify-center p-6">
        <Icon width={24} height={24} />
      </Card>
      <h2 className="text-sm font-medium text-center text-nowrap">{name}</h2>
    </div>
  );
};

export default BrandItem;
