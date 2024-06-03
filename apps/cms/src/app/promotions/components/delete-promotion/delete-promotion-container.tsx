import { cmsContract } from "@/cms-shared/api";
import { PromotionIdSchema } from "@/shared/types";
import { revalidatePath } from "next/cache";
import { FC } from "react";

import { api } from "../../../../utils/api";
import { DeletePromotion } from "./delete-promotion";

export type DeletePromotionContainerProps = {
  promotionId: PromotionIdSchema;
};

export const DeletePromotionContainer: FC<DeletePromotionContainerProps> = ({ promotionId }) => {
  const handleDeletePromotion = async () => {
    "use server";
    const response = await api.promotions.delete({ params: { promotionId } });
    revalidatePath(cmsContract.promotions.get.path);
    return response;
  };

  return <DeletePromotion handleDeletePromotion={handleDeletePromotion} />;
};
