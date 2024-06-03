import { uniqueEnumArray } from "@/shared/utils/validation";
import { PROMOTION_LOCATION, PROMOTION_LOCATION_LIST_TYPE } from "@prisma/client";
import { z } from "zod";
export type BaseCreatePromotionSchema = z.infer<typeof baseCreatePromotionSchema>;
export const baseCreatePromotionSchema = z.object({
  isDraft: z
    .string()
    .toLowerCase()
    .transform(value => value === "true")
    .pipe(z.boolean())
    .or(z.boolean()),
  locations: uniqueEnumArray(PROMOTION_LOCATION),
});

export type BaseCreateSearchPromotionSchema = z.infer<typeof baseCreateSearchPromotionSchema>;
export const baseCreateSearchPromotionSchema = z.object({ search: z.string().min(1) });
const createSearchPromotionWithoutContentSchema =
  baseCreateSearchPromotionSchema.and(baseCreatePromotionSchema);

export type BaseCreateListPromotionSchema = z.infer<typeof baseCreateListPromotionSchema>;
export const baseCreateListPromotionSchema = z.object({
  listType: z.nativeEnum(PROMOTION_LOCATION_LIST_TYPE),
  priority: z.coerce.number().min(0).max(100),
});
const createListPromotionWithoutContentSchema =
  baseCreateListPromotionSchema.and(baseCreatePromotionSchema);

export type CreatePromotionWithImageContentSchema = z.infer<
  typeof createPromotionWithImageContentSchema
>;
export const createPromotionWithImageContentSchema = z.object({
  image: z.instanceof(File),
  link: z.string().optional(),
});

export type CreatePromotionWithTextContentSchema = z.infer<
  typeof createPromotionWithTextContentSchema
>;
export const createPromotionWithTextContentSchema = z.object({
  link: z.string().min(1),
  text: z.string().min(1),
});

export type CreatePromotionWithNewsContentSchema = z.infer<
  typeof createPromotionWithNewsContentSchema
>;
export const createPromotionWithNewsContentSchema = z.object({
  newsId: z.string().min(1),
});

export type CreateSearchPromotionWithImageSchema = z.infer<
  typeof createSearchPromotionWithImageSchema
>;
export const createSearchPromotionWithImageSchema = createSearchPromotionWithoutContentSchema.and(
  createPromotionWithImageContentSchema,
);

export type CreateSearchPromotionWithTextSchema = z.infer<
  typeof createSearchPromotionWithTextSchema
>;
export const createSearchPromotionWithTextSchema = createSearchPromotionWithoutContentSchema.and(
  createPromotionWithTextContentSchema,
);

export type CreateSearchPromotionWithNewsSchema = z.infer<
  typeof createSearchPromotionWithNewsSchema
>;
export const createSearchPromotionWithNewsSchema = createSearchPromotionWithoutContentSchema.and(
  createPromotionWithNewsContentSchema,
);

export type CreateListPromotionWithImageSchema = z.infer<typeof createListPromotionWithImageSchema>;
export const createListPromotionWithImageSchema = createListPromotionWithoutContentSchema.and(
  createPromotionWithImageContentSchema,
);

export type CreateListPromotionWithTextSchema = z.infer<typeof createListPromotionWithTextSchema>;
export const createListPromotionWithTextSchema = createListPromotionWithoutContentSchema.and(
  createPromotionWithTextContentSchema,
);

export type CreateListPromotionWithNewsSchema = z.infer<typeof createListPromotionWithNewsSchema>;
export const createListPromotionWithNewsSchema = createListPromotionWithoutContentSchema.and(
  createPromotionWithNewsContentSchema,
);

export type CreateSearchPromotionSchema = z.infer<typeof createSearchPromotionSchema>;
export const createSearchPromotionSchema = z.union([
  createSearchPromotionWithImageSchema,
  createSearchPromotionWithTextSchema,
  createSearchPromotionWithNewsSchema,
]);

export type CreateListPromotionSchema = z.infer<typeof createListPromotionSchema>;
export const createListPromotionSchema = z.union([
  createListPromotionWithImageSchema,
  createListPromotionWithTextSchema,
  createListPromotionWithNewsSchema,
]);

export type CreatePromotionSchema = z.infer<typeof createPromotionSchema>;
export const createPromotionSchema = z.union([
  createSearchPromotionWithImageSchema,
  createSearchPromotionWithTextSchema,
  createSearchPromotionWithNewsSchema,
  createListPromotionWithImageSchema,
  createListPromotionWithTextSchema,
  createListPromotionWithNewsSchema,
]);
