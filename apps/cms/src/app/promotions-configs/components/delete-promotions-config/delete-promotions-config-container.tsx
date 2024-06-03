import { cmsContract } from "@/cms-shared/api";
import { PromotionsConfigIdSchema } from "@/shared/types";
import { revalidatePath } from "next/cache";
import { FC } from "react";

import { api } from "../../../../utils/api";
import { DeletePromotionsConfig } from "./delete-promotions-config";

export type DeletePromotionsConfigContainerProps = {
  promotionsConfigId: PromotionsConfigIdSchema;
};

export const DeletePromotionsConfigContainer: FC<DeletePromotionsConfigContainerProps> = ({
  promotionsConfigId,
}) => {
  const handleDeletePromotionsConfig = async () => {
    "use server";
    const response = await api.promotionsConfigs.delete({ params: { promotionsConfigId } });
    revalidatePath(cmsContract.promotionsConfigs.get.path);
    return response;
  };

  return <DeletePromotionsConfig handleDeletePromotionsConfig={handleDeletePromotionsConfig} />;
};
