import { ListPromotionWithImageSchema, SearchPromotionWithImageSchema } from "@/shared/types";
import Image from "next/image";
import { FC } from "react";

export type ImagePromotionCardProps = {
  promotion: ListPromotionWithImageSchema | SearchPromotionWithImageSchema;
};

export const ImagePromotionCard: FC<ImagePromotionCardProps> = async ({ promotion }) => {
  return promotion.link ? (
    <Image alt="promotion image" height={150} src={promotion.url} width={300} />
  ) : (
    <a href={promotion.link}>
      <Image alt="promotion image" height={150} src={promotion.url} width={300} />
    </a>
  );
};
