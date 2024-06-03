import { cmsContract } from "@/cms-shared/api";
import { NewsIdSchema } from "@/shared/types";
import { DefaultValues } from "@/ui-shared/components/form";
import { ClientInferRequest } from "@ts-rest/core";
import { revalidatePath } from "next/cache";
import { FC } from "react";

import { api } from "../../../../utils/api";
import { UpdateNewsFormSchema } from "./hooks";
import { UpdateNews } from "./update-news";

export type UpdateNewsContainerProps = {
  defaultValues: DefaultValues<UpdateNewsFormSchema>;
  newsId: NewsIdSchema;
};

export const UpdateNewsContainer: FC<UpdateNewsContainerProps> = async ({
  defaultValues,
  newsId,
}) => {
  const handleUpdateNews = async (
    data: ClientInferRequest<typeof cmsContract.news.update>["body"],
  ) => {
    "use server";
    const response = await api.news.update({ body: data, params: { newsId } });
    revalidatePath(cmsContract.news.get.path);
    return response;
  };

  // TODO: optimize tags options
  // Yeah, it will be better to make request to get only 10-50 items,
  // and then load additional on scroll and add some search maybe
  // But it takes time
  const tagsResponse = await api.tags.get({ query: { limit: 1000, page: 1 } });

  if (tagsResponse.status !== 200) {
    return <p>not found</p>;
  }

  return (
    <UpdateNews
      defaultValues={defaultValues}
      handleUpdateNews={handleUpdateNews}
      tags={tagsResponse.body.items}
    />
  );
};
