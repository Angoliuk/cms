import { PromotionsConfigSchema } from "@/shared/types";
import { tw } from "@/tailwind";
import { FC } from "react";

import { PromotionsConfigCard } from "./promotions-config-card";

export type PromotionsConfigsListProps = {
  className?: string;
  listClassName?: string;
  promotionsConfigsList: PromotionsConfigSchema[];
};

export const PromotionsConfigsList: FC<PromotionsConfigsListProps> = async ({
  className,
  listClassName,
  promotionsConfigsList: promotionsConfigList,
}) => {
  return (
    <div className={className}>
      <div className={tw("mb-6 flex flex-col gap-4", listClassName)}>
        {promotionsConfigList.map(promotionsConfig => (
          <PromotionsConfigCard key={promotionsConfig.id} promotionsConfig={promotionsConfig} />
        ))}
      </div>
    </div>
  );
};
