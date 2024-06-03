import {
  BaseCreateListPromotionSchema,
  baseCreateListPromotionSchema,
} from "@/cms-shared/validation";
import { DefaultValues, useForm, zodResolver } from "@/ui-shared/components/form";

export const useListPromotionForm = (
  defaultValues?: DefaultValues<BaseCreateListPromotionSchema>,
) => {
  return useForm<BaseCreateListPromotionSchema>({
    defaultValues: defaultValues ?? { listType: "MAIN", priority: 0 },
    resolver: zodResolver(baseCreateListPromotionSchema),
  });
};
