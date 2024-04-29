import { z } from "zod";

export type CreateTagBodySchema = z.infer<typeof createTagBodySchema>;
export const createTagBodySchema = z.object({});

export type CreateTagResponseSchema = z.infer<typeof createTagResponseSchema>;
export const createTagResponseSchema = z.object({});

export type DeleteTagPathParamsSchema = z.infer<typeof deleteTagPathParamsSchema>;
export const deleteTagPathParamsSchema = z.object({});

export type DeleteTagResponseSchema = z.infer<typeof deleteTagResponseSchema>;
export const deleteTagResponseSchema = z.object({});

export type GetTagsQuerySchema = z.infer<typeof getTagsQuerySchema>;
export const getTagsQuerySchema = z.object({});

export type GetTagsResponseSchema = z.infer<typeof getTagsResponseSchema>;
export const getTagsResponseSchema = z.object({});

export type GetByIdTagPathParamsSchema = z.infer<typeof getByIdTagPathParamsSchema>;
export const getByIdTagPathParamsSchema = z.object({});

export type GetByIdTagResponseSchema = z.infer<typeof getByIdTagResponseSchema>;
export const getByIdTagResponseSchema = z.object({});

export type UpdateTagPathParamsSchema = z.infer<typeof updateTagPathParamsSchema>;
export const updateTagPathParamsSchema = z.object({});

export type UpdateTagBodySchema = z.infer<typeof updateTagBodySchema>;
export const updateTagBodySchema = z.object({});

export type UpdateTagResponseSchema = z.infer<typeof updateTagResponseSchema>;
export const updateTagResponseSchema = z.object({});
