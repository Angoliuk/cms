import {
  CreatePromotionWithImageContentSchema,
  createPromotionWithImageContentSchema,
} from "@/cms-shared/validation";
import { DefaultValues, useForm, zodResolver } from "@/ui-shared/components/form";

export const usePromotionImageContentForm = (
  defaultValues?: DefaultValues<CreatePromotionWithImageContentSchema>,
) => {
  return useForm<CreatePromotionWithImageContentSchema>({
    defaultValues: defaultValues ?? { image: undefined, link: "" },
    resolver: zodResolver(createPromotionWithImageContentSchema),
  });
};
