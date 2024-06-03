import { PromotionSchema } from "@/shared/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/ui-shared/components/card";
import { FC } from "react";

import { DeletePromotionContainer } from "../delete-promotion";
import { UpdatePromotionContainer } from "../update-promotion";

export type PromotionCardProps = { promotion: PromotionSchema };

export const PromotionCard: FC<PromotionCardProps> = async ({ promotion }) => {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        Promotion {promotion.id} {promotion.isDraft ? "(Disabled)" : "(Active)"}
      </CardHeader>
      <CardContent>
        {"url" in promotion && (
          <>
            <p>Url: {promotion.url}</p>
            <p>Link: {promotion.link}</p>
          </>
        )}
        {"text" in promotion && (
          <>
            <p>Link: {promotion.link}</p>
            <p>Text: {promotion.text}</p>
          </>
        )}
        {"newsId" in promotion && (
          <>
            <p>News Id: {promotion.newsId}</p>
          </>
        )}
        <p>Locations: {promotion.locations.join(", ")}</p>
      </CardContent>
      <CardFooter className="gap-4">
        <DeletePromotionContainer promotionId={promotion.id} />
        <UpdatePromotionContainer promotion={promotion} promotionId={promotion.id} />
      </CardFooter>
    </Card>
  );
};
