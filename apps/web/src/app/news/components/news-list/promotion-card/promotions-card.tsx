import { PromotionSchema } from "@/shared/types";
import { FC } from "react";

import { ImagePromotionCard } from "./image-promotion-card";
import { NewsPromotionCard } from "./news-promotion-card";
import { TextPromotionCard } from "./text-promotion-card";

export type PromotionCardProps = { promotion: PromotionSchema };

export const PromotionCard: FC<PromotionCardProps> = async ({ promotion }) => {
  if ("text" in promotion) {
    return <TextPromotionCard promotion={promotion} />;
  }

  if ("url" in promotion) {
    return <ImagePromotionCard promotion={promotion} />;
  }

  if ("newsId" in promotion) {
    return <NewsPromotionCard promotion={promotion} />;
  }
};
