import { createPromotionWithNewsContentSchema } from "@/cms-shared/validation";
import { DefaultValues, useForm, zodResolver } from "@/ui-shared/components/form";
import { z } from "zod";

export type PromotionNewsContentFormSchema = z.infer<typeof promotionNewsContentFormSchema>;
export const promotionNewsContentFormSchema = createPromotionWithNewsContentSchema.and(
  z.object({ title: z.string() }),
);

export const usePromotionNewsContentForm = (
  defaultValues?: DefaultValues<PromotionNewsContentFormSchema>,
) => {
  return useForm<PromotionNewsContentFormSchema>({
    defaultValues: defaultValues ?? { newsId: "", title: "" },
    resolver: zodResolver(promotionNewsContentFormSchema),
  });
};
