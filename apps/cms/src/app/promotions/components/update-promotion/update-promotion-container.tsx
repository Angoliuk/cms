import { cmsContract } from "@/cms-shared/api";
import { PromotionSchema } from "@/shared/types";
import { ClientInferRequest } from "@ts-rest/core";
import { revalidatePath } from "next/cache";
import { FC } from "react";
import { DefaultValues } from "react-hook-form";

import { api } from "../../../../utils/api";
import { CONTENT_TYPE, UpdatePromotionFormSchema } from "./hooks";
import { UpdatePromotion } from "./update-promotion";

export type UpdatePromotionContainerProps = {
  promotion: PromotionSchema;
  promotionId: string;
};

export const UpdatePromotionContainer: FC<UpdatePromotionContainerProps> = async ({
  promotion,
  promotionId,
}) => {
  const handleUpdatePromotion = async (
    data: ClientInferRequest<typeof cmsContract.promotions.update>["body"],
  ) => {
    "use server";
    const response = await api.promotions.update({
      body: data,
      params: { promotionId },
    });
    revalidatePath(cmsContract.promotions.get.path);

    return response;
  };

  const newsResponse = await api.news.getOptions({ query: { page: 1 } });

  if (newsResponse.status !== 200) {
    return <p>not found</p>;
  }
  const defaultValues: DefaultValues<UpdatePromotionFormSchema> = {
    base: { isDraft: promotion.isDraft, locations: promotion.locations },
    content: {
      link: "link" in promotion ? promotion.link : undefined,
      newsId: "newsId" in promotion ? promotion.newsId : undefined,
      text: "text" in promotion ? promotion.text : undefined,
    },
    contentType:
      "url" in promotion
        ? CONTENT_TYPE.IMAGE
        : "newsId" in promotion
          ? CONTENT_TYPE.NEWS
          : CONTENT_TYPE.TEXT,
    locations: {
      ...("listType" in promotion
        ? {
            list: {
              listType: promotion.listType,
              priority: promotion.priority,
            },
          }
        : {}),
      ...("search" in promotion
        ? {
            search: {
              search: promotion.search,
            },
          }
        : {}),
    },
  };

  return (
    <UpdatePromotion
      defaultValues={defaultValues}
      handleUpdatePromotion={handleUpdatePromotion}
      news={newsResponse.body.items}
    />
  );
};
