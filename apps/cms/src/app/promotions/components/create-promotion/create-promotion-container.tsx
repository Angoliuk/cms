import { cmsContract } from "@/cms-shared/api";
import { ClientInferRequest } from "@ts-rest/core";
import { revalidatePath } from "next/cache";
import { FC } from "react";

import { api } from "../../../../utils/api";
import { CreatePromotion } from "./create-promotion";

export const CreatePromotionContainer: FC = async () => {
  const handleCreatePromotion = async (
    data: ClientInferRequest<typeof cmsContract.promotions.create>["body"],
  ) => {
    "use server";
    const response = await api.promotions.create({
      body: data,
    });
    revalidatePath(cmsContract.promotions.get.path);

    return response;
  };

  // TODO: optimize news options
  // Yeah, it will be better to make request to get only 10-50 items,
  // and then load additional on scroll and add some search maybe
  // But it takes time
  const newsResponse = await api.news.getOptions({ query: { limit: 1000, page: 1 } });

  if (newsResponse.status !== 200) {
    return <p>not found</p>;
  }

  return (
    <CreatePromotion handleCreatePromotion={handleCreatePromotion} news={newsResponse.body.items} />
  );
};
