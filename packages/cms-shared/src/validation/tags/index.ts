import { tagIdSchema, tagSchema } from "@/shared/types";
import { getBaseQuerySchema, getPaginatedResponseValidation } from "@/shared/utils/validation";
import { z } from "zod";

export type CreateTagBodySchema = z.infer<typeof createTagBodySchema>;
export const createTagBodySchema = z.object({ name: z.string().min(1) });

export type CreateTagResponseSchema = z.infer<typeof createTagResponseSchema>;
export const createTagResponseSchema = tagSchema;

export type DeleteTagPathParamsSchema = z.infer<typeof deleteTagPathParamsSchema>;
export const deleteTagPathParamsSchema = z.object({ tagId: tagIdSchema });

export type DeleteTagResponseSchema = z.infer<typeof deleteTagResponseSchema>;
export const deleteTagResponseSchema = tagSchema;

export type GetTagsQuerySchema = z.infer<typeof getTagsQuerySchema>;
export const getTagsQuerySchema = getBaseQuerySchema(tagSchema);

export type GetTagsResponseSchema = z.infer<typeof getTagsResponseSchema>;
export const getTagsResponseSchema = getPaginatedResponseValidation(tagSchema);

export type GetByIdTagPathParamsSchema = z.infer<typeof getByIdTagPathParamsSchema>;
export const getByIdTagPathParamsSchema = z.object({ tagId: tagIdSchema });

export type GetByIdTagResponseSchema = z.infer<typeof getByIdTagResponseSchema>;
export const getByIdTagResponseSchema = tagSchema;

export type UpdateTagPathParamsSchema = z.infer<typeof updateTagPathParamsSchema>;
export const updateTagPathParamsSchema = z.object({ tagId: tagIdSchema });

export type UpdateTagBodySchema = z.infer<typeof updateTagBodySchema>;
export const updateTagBodySchema = z.object({ name: z.string().min(1) });

export type UpdateTagResponseSchema = z.infer<typeof updateTagResponseSchema>;
export const updateTagResponseSchema = tagSchema;
