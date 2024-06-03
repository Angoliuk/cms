import { cmsContract } from "@/cms-shared/api";
import { ClientInferRequest } from "@ts-rest/core";
import { revalidatePath } from "next/cache";
import { FC } from "react";

import { api } from "../../../../utils/api";
import { CreateSource } from "./create-source";

export const CreateSourceContainer: FC = () => {
  const handleCreateSource = async (
    data: ClientInferRequest<typeof cmsContract.sources.create>["body"],
  ) => {
    "use server";
    const response = await api.sources.create({ body: data });
    revalidatePath(cmsContract.sources.get.path);
    return response;
  };

  return <CreateSource handleCreateSource={handleCreateSource} />;
};
