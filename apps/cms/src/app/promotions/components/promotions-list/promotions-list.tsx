import { PromotionSchema } from "@/shared/types";
import { tw } from "@/tailwind";
import { FC } from "react";

import { PromotionCard } from "./promotion-card";

export type PromotionsListProps = {
  className?: string;
  listClassName?: string;
  promotionsList: PromotionSchema[];
};

export const PromotionsList: FC<PromotionsListProps> = async ({
  className,
  listClassName,
  promotionsList,
}) => {
  return (
    <div className={className}>
      <div className={tw("mb-6 flex flex-col gap-4", listClassName)}>
        {promotionsList.map(promotion => {
          return <PromotionCard key={promotion.id} promotion={promotion} />;
        })}
      </div>
    </div>
  );
};
