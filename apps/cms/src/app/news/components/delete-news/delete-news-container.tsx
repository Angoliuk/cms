import { cmsContract } from "@/cms-shared/api";
import { NewsIdSchema } from "@/shared/types";
import { revalidatePath } from "next/cache";
import { FC } from "react";

import { api } from "../../../../utils/api";
import { DeleteNews } from "./delete-news";

export type DeleteNewsContainerProps = {
  newsId: NewsIdSchema;
};

export const DeleteNewsContainer: FC<DeleteNewsContainerProps> = ({ newsId }) => {
  const handleDeleteNews = async () => {
    "use server";
    const response = await api.news.delete({ params: { newsId } });
    revalidatePath(cmsContract.news.get.path);
    return response;
  };

  return <DeleteNews handleDeleteNews={handleDeleteNews} />;
};
