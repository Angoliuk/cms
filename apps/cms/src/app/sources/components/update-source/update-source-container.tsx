import { cmsContract } from "@/cms-shared/api";
import { UpdateSourceBodySchema } from "@/cms-shared/validation";
import { SourceIdSchema } from "@/shared/types";
import { DefaultValues } from "@/ui-shared/components/form";
import { ClientInferRequest } from "@ts-rest/core";
import { revalidatePath } from "next/cache";
import { FC } from "react";

import { api } from "../../../../utils/api";
import { UpdateSource } from "./update-source";

export type UpdateSourceContainerProps = {
  defaultValues: DefaultValues<UpdateSourceBodySchema>;
  sourceId: SourceIdSchema;
};

export const UpdateSourceContainer: FC<UpdateSourceContainerProps> = async ({
  defaultValues,
  sourceId,
}) => {
  const handleUpdateSource = async (
    data: ClientInferRequest<typeof cmsContract.sources.update>["body"],
  ) => {
    "use server";
    const response = await api.sources.update({ body: data, params: { sourceId } });
    revalidatePath(cmsContract.sources.get.path);
    return response;
  };

  return <UpdateSource defaultValues={defaultValues} handleUpdateSource={handleUpdateSource} />;
};
