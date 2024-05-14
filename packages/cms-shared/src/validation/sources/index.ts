// TODO: investigate @nx/enforce-module-boundaries error for prisma import
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SOURCE_PERIOD } from "@/db";
import { sourceIdSchema, sourceSchema } from "@/shared/types";
import { getBaseQuerySchema, getPaginatedResponseValidation } from "@/shared/utils/validation";
import { z } from "zod";

export type CreateSourceBodySchema = z.infer<typeof createSourceBodySchema>;
export const createSourceBodySchema = z.object({
  isActive: z.boolean(),
  name: z.string().min(1),
  periodicity: z.nativeEnum(SOURCE_PERIOD),
  url: z.string().min(1),
});

export type CreateSourceResponseSchema = z.infer<typeof createSourceResponseSchema>;
export const createSourceResponseSchema = sourceSchema;

export type DeleteSourcePathParamsSchema = z.infer<typeof deleteSourcePathParamsSchema>;
export const deleteSourcePathParamsSchema = z.object({ sourceId: sourceIdSchema });

export type DeleteSourceResponseSchema = z.infer<typeof deleteSourceResponseSchema>;
export const deleteSourceResponseSchema = sourceSchema;

export type GetSourcesQuerySchema = z.infer<typeof getSourcesQuerySchema>;
export const getSourcesQuerySchema = getBaseQuerySchema(sourceSchema);

export type GetSourcesResponseSchema = z.infer<typeof getSourcesResponseSchema>;
export const getSourcesResponseSchema = getPaginatedResponseValidation(sourceSchema);

export type GetByIdSourcePathParamsSchema = z.infer<typeof getByIdSourcePathParamsSchema>;
export const getByIdSourcePathParamsSchema = z.object({ sourceId: sourceIdSchema });

export type GetByIdSourceResponseSchema = z.infer<typeof getByIdSourceResponseSchema>;
export const getByIdSourceResponseSchema = sourceSchema;

export type UpdateSourcePathParamsSchema = z.infer<typeof updateSourcePathParamsSchema>;
export const updateSourcePathParamsSchema = z.object({ sourceId: sourceIdSchema });

export type UpdateSourceBodySchema = z.infer<typeof updateSourceBodySchema>;
export const updateSourceBodySchema = z.object({
  isActive: z.boolean(),
  name: z.string().min(1),
  periodicity: z.nativeEnum(SOURCE_PERIOD),
  url: z.string().min(1),
});

export type UpdateSourceResponseSchema = z.infer<typeof updateSourceResponseSchema>;
export const updateSourceResponseSchema = sourceSchema;
