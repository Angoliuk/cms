import { ListPromotionWithNewsSchema, SearchPromotionWithNewsSchema } from "@/shared/types";
import { FC } from "react";

import { api } from "../../../../../utils/api";
import { NewsCard } from "../news-card";

export type NewsPromotionCardProps = {
  promotion: ListPromotionWithNewsSchema | SearchPromotionWithNewsSchema;
};

export const NewsPromotionCard: FC<NewsPromotionCardProps> = async ({ promotion }) => {
  const newsResponse = await api.news.getById({ params: { newsId: promotion.newsId } });
  if (newsResponse.status !== 200) return null;

  return <NewsCard news={newsResponse.body} />;
};
