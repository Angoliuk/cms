import { cmsContract } from "@/cms-shared/api";
import { UpdateTagBodySchema } from "@/cms-shared/validation";
import { TagIdSchema } from "@/shared/types";
import { DefaultValues } from "@/ui-shared/components/form";
import { ClientInferRequest } from "@ts-rest/core";
import { revalidatePath } from "next/cache";
import { FC } from "react";

import { api } from "../../../../utils/api";
import { UpdateTag } from "./update-tag";

export type UpdateTagContainerProps = {
  defaultValues: DefaultValues<UpdateTagBodySchema>;
  tagId: TagIdSchema;
};

export const UpdateTagContainer: FC<UpdateTagContainerProps> = async ({ defaultValues, tagId }) => {
  const handleUpdateTag = async (
    data: ClientInferRequest<typeof cmsContract.tags.update>["body"],
  ) => {
    "use server";
    const response = await api.tags.update({ body: data, params: { tagId } });
    revalidatePath(cmsContract.tags.get.path);
    return response;
  };

  return <UpdateTag defaultValues={defaultValues} handleUpdateTag={handleUpdateTag} />;
};
