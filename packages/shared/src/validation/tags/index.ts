import { z } from "zod";

import { getBaseQueryValidation, getPaginatedResponseValidation, tagIdSchema } from "../general";

export type TagSchema = z.infer<typeof tagSchema>;
export const tagSchema = z.object({
  createdAt: z.coerce.date(),
  id: z.string().min(1),
  name: z.string().min(1),
  updatedAt: z.coerce.date(),
});

export type CreateTagBodySchema = z.infer<typeof createTagBodySchema>;
export const createTagBodySchema = z.object({ name: z.string().min(1) });

export type CreateTagResponseSchema = z.infer<typeof createTagResponseSchema>;
export const createTagResponseSchema = tagSchema;

export type DeleteTagPathParamsSchema = z.infer<typeof deleteTagPathParamsSchema>;
export const deleteTagPathParamsSchema = z.object({ tagId: tagIdSchema });

export type DeleteTagResponseSchema = z.infer<typeof deleteTagResponseSchema>;
export const deleteTagResponseSchema = tagSchema;

export type GetTagsQuerySchema = z.infer<typeof getTagsQuerySchema>;
export const getTagsQuerySchema = getBaseQueryValidation(z.object({}));

export type GetTagsResponseSchema = z.infer<typeof getTagsResponseSchema>;
export const getTagsResponseSchema = getPaginatedResponseValidation(tagSchema);

export type GetByIdTagPathParamsSchema = z.infer<typeof getByIdTagPathParamsSchema>;
export const getByIdTagPathParamsSchema = z.object({ tagId: tagIdSchema });

export type GetByIdTagResponseSchema = z.infer<typeof getByIdTagResponseSchema>;
export const getByIdTagResponseSchema = tagSchema;

export type UpdateTagPathParamsSchema = z.infer<typeof updateTagPathParamsSchema>;
export const updateTagPathParamsSchema = z.object({ tagId: tagIdSchema });

export type UpdateTagBodySchema = z.infer<typeof updateTagBodySchema>;
export const updateTagBodySchema = z.object({ name: z.string().min(1) }).partial();

export type UpdateTagResponseSchema = z.infer<typeof updateTagResponseSchema>;
export const updateTagResponseSchema = tagSchema;
