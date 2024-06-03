import { cmsContract } from "@/cms-shared/api";
import { ClientInferRequest } from "@ts-rest/core";
import { revalidatePath } from "next/cache";
import { FC } from "react";

import { api } from "../../../../utils/api";
import { CreateTag } from "./create-tag";

export const CreateTagContainer: FC = () => {
  const handleCreateTag = async (
    data: ClientInferRequest<typeof cmsContract.tags.create>["body"],
  ) => {
    "use server";
    const response = await api.tags.create({ body: data });
    revalidatePath(cmsContract.tags.get.path);
    return response;
  };

  return <CreateTag handleCreateTag={handleCreateTag} />;
};
