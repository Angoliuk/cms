import { z } from "zod";

export type CreateSourceBodySchema = z.infer<typeof createSourceBodySchema>;
export const createSourceBodySchema = z.object({});

export type CreateSourceResponseSchema = z.infer<typeof createSourceResponseSchema>;
export const createSourceResponseSchema = z.object({});

export type DeleteSourcePathParamsSchema = z.infer<typeof deleteSourcePathParamsSchema>;
export const deleteSourcePathParamsSchema = z.object({});

export type DeleteSourceResponseSchema = z.infer<typeof deleteSourceResponseSchema>;
export const deleteSourceResponseSchema = z.object({});

export type GetSourcesQuerySchema = z.infer<typeof getSourcesQuerySchema>;
export const getSourcesQuerySchema = z.object({});

export type GetSourcesResponseSchema = z.infer<typeof getSourcesResponseSchema>;
export const getSourcesResponseSchema = z.object({});

export type GetByIdSourcePathParamsSchema = z.infer<typeof getByIdSourcePathParamsSchema>;
export const getByIdSourcePathParamsSchema = z.object({});

export type GetByIdSourceResponseSchema = z.infer<typeof getByIdSourceResponseSchema>;
export const getByIdSourceResponseSchema = z.object({});

export type UpdateSourcePathParamsSchema = z.infer<typeof updateSourcePathParamsSchema>;
export const updateSourcePathParamsSchema = z.object({});

export type UpdateSourceBodySchema = z.infer<typeof updateSourceBodySchema>;
export const updateSourceBodySchema = z.object({});

export type UpdateSourceResponseSchema = z.infer<typeof updateSourceResponseSchema>;
export const updateSourceResponseSchema = z.object({});
