import { cmsContract } from "@/cms-shared/api";
import { UpdatePromotionsConfigBodySchema } from "@/cms-shared/validation";
import { PromotionsConfigIdSchema } from "@/shared/types";
import { DefaultValues } from "@/ui-shared/components/form";
import { ClientInferRequest } from "@ts-rest/core";
import { revalidatePath } from "next/cache";
import { FC } from "react";

import { api } from "../../../../utils/api";
import { UpdatePromotionsConfig } from "./update-promotions-config";

export type UpdatePromotionsConfigContainerProps = {
  defaultValues: DefaultValues<UpdatePromotionsConfigBodySchema>;
  promotionsConfigId: PromotionsConfigIdSchema;
};

export const UpdatePromotionsConfigContainer: FC<UpdatePromotionsConfigContainerProps> = async ({
  defaultValues,
  promotionsConfigId,
}) => {
  const handleUpdatePromotionsConfig = async (
    data: ClientInferRequest<typeof cmsContract.promotionsConfigs.update>["body"],
  ) => {
    "use server";
    const response = await api.promotionsConfigs.update({
      body: data,
      params: { promotionsConfigId },
    });
    revalidatePath(cmsContract.promotionsConfigs.get.path);
    return response;
  };

  return (
    <UpdatePromotionsConfig
      defaultValues={defaultValues}
      handleUpdatePromotionsConfig={handleUpdatePromotionsConfig}
    />
  );
};
