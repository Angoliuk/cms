// TODO: investigate @nx/enforce-module-boundaries error for prisma import
// eslint-disable-next-line @nx/enforce-module-boundaries
import { NEWS_VISIBILITY } from "@/db";
import { newsIdSchema, newsSchema } from "@/shared/types";
import { getBaseQuerySchema, getPaginatedResponseValidation } from "@/shared/utils/validation";
import { z } from "zod";

export type NewsOptionSchema = z.infer<typeof newsOptionSchema>;
export const newsOptionSchema = z.object({
  id: newsIdSchema,
  title: z.string().min(1),
});

export type CreateNewsBodySchema = z.infer<typeof createNewsBodySchema>;
export const createNewsBodySchema = z.object({
  description: z.string().nullable(),
  imageLink: z.string().nullable(),
  isDraft: z.boolean(),
  originalLink: z.string(),
  originalPublicationDate: z.coerce.date(),
  title: z.string().min(1),
  visibility: z.nativeEnum(NEWS_VISIBILITY),
});

export type CreateNewsResponseSchema = z.infer<typeof createNewsResponseSchema>;
export const createNewsResponseSchema = newsSchema;

export type DeleteNewsPathParamsSchema = z.infer<typeof deleteNewsPathParamsSchema>;
export const deleteNewsPathParamsSchema = z.object({ newsId: newsIdSchema });

export type DeleteNewsResponseSchema = z.infer<typeof deleteNewsResponseSchema>;
export const deleteNewsResponseSchema = newsSchema;

export type GetNewsQuerySchema = z.infer<typeof getNewsQuerySchema>;
export const getNewsQuerySchema = getBaseQuerySchema(newsSchema);

export type GetNewsResponseSchema = z.infer<typeof getNewsResponseSchema>;
export const getNewsResponseSchema = getPaginatedResponseValidation(newsSchema);

export type GetNewsOptionsQuerySchema = z.infer<typeof getNewsOptionsQuerySchema>;
export const getNewsOptionsQuerySchema = getBaseQuerySchema(newsOptionSchema);

export type GetNewsOptionsResponseSchema = z.infer<typeof getNewsOptionsResponseSchema>;
export const getNewsOptionsResponseSchema = getPaginatedResponseValidation(newsOptionSchema);

export type GetByIdNewsPathParamsSchema = z.infer<typeof getByIdNewsPathParamsSchema>;
export const getByIdNewsPathParamsSchema = z.object({ newsId: newsIdSchema });

export type GetByIdNewsResponseSchema = z.infer<typeof getByIdNewsResponseSchema>;
export const getByIdNewsResponseSchema = newsSchema;

export type UpdateNewsPathParamsSchema = z.infer<typeof updateNewsPathParamsSchema>;
export const updateNewsPathParamsSchema = z.object({ newsId: newsIdSchema });

export type UpdateNewsBodySchema = z.infer<typeof updateNewsBodySchema>;
export const updateNewsBodySchema = z.object({
  description: z.string().nullable(),
  imageLink: z.string().nullable(),
  isDraft: z.boolean(),
  originalLink: z.string(),
  originalPublicationDate: z.coerce.date(),
  title: z.string().min(1),
  visibility: z.nativeEnum(NEWS_VISIBILITY),
});

export type UpdateNewsResponseSchema = z.infer<typeof updateNewsResponseSchema>;
export const updateNewsResponseSchema = newsSchema;
