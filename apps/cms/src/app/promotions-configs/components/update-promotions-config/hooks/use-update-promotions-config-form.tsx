import {
  UpdatePromotionsConfigBodySchema,
  updatePromotionsConfigBodySchema,
} from "@/cms-shared/validation";
import { DefaultValues, useForm, zodResolver } from "@/ui-shared/components/form";

export const useUpdatePromotionsConfigForm = (
  defaultValues: DefaultValues<UpdatePromotionsConfigBodySchema>,
) => {
  return useForm<UpdatePromotionsConfigBodySchema>({
    defaultValues,
    resolver: zodResolver(updatePromotionsConfigBodySchema),
  });
};
