import {
  listPromotionSchema,
  newsIdSchema,
  newsSchema,
  newsWithTagsSchema,
  searchPromotionSchema,
} from "@/shared/types";
import { getBaseQuerySchema, getPaginatedResponseValidation } from "@/shared/utils/validation";
import { z } from "zod";

export type GetListNewsQuerySchema = z.infer<typeof getListNewsQuerySchema>;
export const getListNewsQuerySchema = getBaseQuerySchema(newsSchema).and(
  z.object({
    tags: z.array(z.string()).optional(),
  }),
);

export type GetListNewsResponseSchema = z.infer<typeof getListNewsResponseSchema>;
export const getListNewsResponseSchema = getPaginatedResponseValidation(
  newsWithTagsSchema.or(listPromotionSchema),
);

export type GetSearchNewsQuerySchema = z.infer<typeof getSearchNewsQuerySchema>;
export const getSearchNewsQuerySchema = getBaseQuerySchema(newsSchema).and(
  z.object({
    search: z.string().optional(),
  }),
);

export type GetSearchNewsResponseSchema = z.infer<typeof getSearchNewsResponseSchema>;
export const getSearchNewsResponseSchema = getPaginatedResponseValidation(
  newsWithTagsSchema.or(searchPromotionSchema),
);

export type GetByIdNewsPathParamsSchema = z.infer<typeof getByIdNewsPathParamsSchema>;
export const getByIdNewsPathParamsSchema = z.object({ newsId: newsIdSchema });

export type GetByIdNewsResponseSchema = z.infer<typeof getByIdNewsResponseSchema>;
export const getByIdNewsResponseSchema = newsWithTagsSchema;
