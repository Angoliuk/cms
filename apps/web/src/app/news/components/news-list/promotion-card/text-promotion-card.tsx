import { ListPromotionWithTextSchema, SearchPromotionWithTextSchema } from "@/shared/types";
import { Card, CardHeader } from "@/ui-shared/components/card";
import { FC } from "react";

export type TextPromotionCardProps = {
  promotion: ListPromotionWithTextSchema | SearchPromotionWithTextSchema;
};

export const TextPromotionCard: FC<TextPromotionCardProps> = async ({ promotion }) => {
  return (
    <Card key={promotion.id}>
      <CardHeader>
        {promotion.link ? <a href={promotion.link}>{promotion.text}</a> : <p>{promotion.text}</p>}
      </CardHeader>
    </Card>
  );
};
