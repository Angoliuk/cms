import { cmsContract } from "@/cms-shared/api";
import { ClientInferRequest } from "@ts-rest/core";
import { revalidatePath } from "next/cache";
import { FC } from "react";

import { api } from "../../../../utils/api";
import { CreatePromotionsConfig } from "./create-promotions-config";

export const CreatePromotionsConfigContainer: FC = () => {
  const handleCreatePromotionsConfig = async (
    data: ClientInferRequest<typeof cmsContract.promotionsConfigs.create>["body"],
  ) => {
    "use server";
    const response = await api.promotionsConfigs.create({ body: data });
    revalidatePath(cmsContract.promotionsConfigs.get.path);
    return response;
  };

  return <CreatePromotionsConfig handleCreatePromotionsConfig={handleCreatePromotionsConfig} />;
};
