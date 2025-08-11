import { formatCentsToBRL } from "@/helpers/money";

interface CartFinancialSummary {
  subTotalInCents: number;
  totalInCents: number;
}

const CartFinancialSummary = ({
  subTotalInCents,
  totalInCents,
}: CartFinancialSummary) => {
  return (
    <>
      <div className="flex justify-between">
        <p className="text-sm font-semibold">Subtotal</p>
        <p className="text-muted-foreground text-sm font-medium">
          {formatCentsToBRL(subTotalInCents)}
        </p>
      </div>

      <div className="flex justify-between">
        <p className="text-sm font-semibold">Frete</p>
        <p className="text-muted-foreground text-sm font-medium">GRÁTIS</p>
      </div>

      <div className="flex justify-between">
        <p className="text-sm font-semibold">Total</p>
        <p className="text-foreground text-sm font-medium">
          {formatCentsToBRL(totalInCents)}
        </p>
      </div>
    </>
  );
};

export default CartFinancialSummary;
