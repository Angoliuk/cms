import { PromotionsConfigSchema } from "@/shared/types";
import { Card, CardFooter, CardHeader } from "@/ui-shared/components/card";
import { FC } from "react";

import { DeletePromotionsConfigContainer } from "../delete-promotions-config";
import { UpdatePromotionsConfigContainer } from "../update-promotions-config";

export type PromotionsConfigCardProps = { promotionsConfig: PromotionsConfigSchema };

export const PromotionsConfigCard: FC<PromotionsConfigCardProps> = async ({ promotionsConfig }) => {
  return (
    <Card key={promotionsConfig.id}>
      <CardHeader className="flex flex-row items-center justify-between">
        <p>{promotionsConfig.location}</p>
        <p>Items per page: {promotionsConfig.promotionsPerPage}</p>
      </CardHeader>
      <CardFooter className="flex-row gap-4">
        <DeletePromotionsConfigContainer promotionsConfigId={promotionsConfig.id} />
        <UpdatePromotionsConfigContainer
          defaultValues={promotionsConfig}
          promotionsConfigId={promotionsConfig.id}
        />
      </CardFooter>
    </Card>
  );
};
