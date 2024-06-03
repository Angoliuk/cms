import {
  baseCreateListPromotionSchema,
  baseCreatePromotionSchema,
  baseCreateSearchPromotionSchema,
  createPromotionWithImageContentSchema,
  createPromotionWithNewsContentSchema,
  createPromotionWithTextContentSchema,
} from "@/cms-shared/validation";
import { DefaultValues, useForm, zodResolver } from "@/ui-shared/components/form";
import { z } from "zod";

export enum CONTENT_TYPE {
  IMAGE = "image",
  NEWS = "news",
  TEXT = "text",
}

export type UpdatePromotionFormSchema = z.infer<typeof updatePromotionFormSchema>;
export const updatePromotionFormSchema = z.object({
  base: baseCreatePromotionSchema,
  content: createPromotionWithImageContentSchema
    .or(createPromotionWithTextContentSchema)
    .or(createPromotionWithNewsContentSchema),
  contentType: z.nativeEnum(CONTENT_TYPE),
  locations: z
    .object({
      list: baseCreateListPromotionSchema.optional(),
      search: baseCreateSearchPromotionSchema.optional(),
    })
    .refine(data => data.list || data.search, {
      message: "At least one of location is required",
    }),
});

export const useUpdatePromotionForm = (defaultValues: DefaultValues<UpdatePromotionFormSchema>) => {
  return useForm<UpdatePromotionFormSchema>({
    defaultValues,
    resolver: zodResolver(updatePromotionFormSchema),
  });
};
