import {
  BaseCreateSearchPromotionSchema,
  baseCreateSearchPromotionSchema,
} from "@/cms-shared/validation";
import { DefaultValues, useForm, zodResolver } from "@/ui-shared/components/form";

export const useSearchPromotionForm = (
  defaultValues?: DefaultValues<BaseCreateSearchPromotionSchema>,
) => {
  return useForm<BaseCreateSearchPromotionSchema>({
    defaultValues: defaultValues ?? { search: "" },
    resolver: zodResolver(baseCreateSearchPromotionSchema),
  });
};
