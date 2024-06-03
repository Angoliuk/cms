import {
  baseCreateListPromotionSchema,
  baseCreatePromotionSchema,
  baseCreateSearchPromotionSchema,
  createPromotionWithImageContentSchema,
  createPromotionWithNewsContentSchema,
  createPromotionWithTextContentSchema,
} from "@/cms-shared/validation";
import { useForm, zodResolver } from "@/ui-shared/components/form";
import { z } from "zod";

export enum CONTENT_TYPE {
  IMAGE = "image",
  NEWS = "news",
  TEXT = "text",
}

export type CreatePromotionFormSchema = z.infer<typeof createPromotionFormSchema>;
export const createPromotionFormSchema = z.object({
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

export const useCreatePromotionForm = () => {
  return useForm<CreatePromotionFormSchema>({
    defaultValues: {
      base: { isDraft: false, locations: ["LIST", "SEARCH"] },
      contentType: CONTENT_TYPE.TEXT,
    },
    resolver: zodResolver(createPromotionFormSchema),
  });
};
