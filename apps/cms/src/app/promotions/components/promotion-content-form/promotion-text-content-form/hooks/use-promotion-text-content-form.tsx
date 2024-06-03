import {
  CreatePromotionWithTextContentSchema,
  createPromotionWithTextContentSchema,
} from "@/cms-shared/validation";
import { DefaultValues, useForm, zodResolver } from "@/ui-shared/components/form";

export const usePromotionTextContentForm = (
  defaultValues?: DefaultValues<CreatePromotionWithTextContentSchema>,
) => {
  return useForm<CreatePromotionWithTextContentSchema>({
    defaultValues: defaultValues ?? { link: "", text: "" },
    resolver: zodResolver(createPromotionWithTextContentSchema),
  });
};
