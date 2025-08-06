import Image from "next/image";
import Link from "next/link";

import { productVariantTable } from "@/db/schema";

interface VariantsSelectorProps {
  variants: (typeof productVariantTable.$inferSelect)[];
  selectedVariantSlug: string
}

const VariantsSelector = ({ variants, selectedVariantSlug }: VariantsSelectorProps) => {
  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <Link
          href={`/product-variant/${variant.slug}`}
          key={variant.id}
          className={
            selectedVariantSlug === variant.slug
              ? "border-primary rounded-xl border-2"
              : ""
          }
        >
          <Image
            src={variant.imageUrl}
            alt={variant.name}
            width={68}
            height={67}
            className="rounded-xl"
          />
        </Link>
      ))}
    </div>
  );
};

export default VariantsSelector;
