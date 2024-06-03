import { SOURCE_PERIOD } from "@/db";
import { sourceIdSchema, sourceSchema } from "@/shared/types";
import { getBaseQuerySchema, getPaginatedResponseValidation } from "@/shared/utils/validation";
import { z } from "zod";

export type CreateSourceBodySchema = z.infer<typeof createSourceBodySchema>;
export const createSourceBodySchema = z.object({
  descriptionKey: z.string().nullish(),
  idKey: z.string().min(1),
  imageLinkKey: z.string().nullish(),
  isActive: z.boolean(),
  linkKey: z.string().min(1),
  name: z.string().min(1),
  periodicity: z.nativeEnum(SOURCE_PERIOD),
  publicationDateKey: z.string().min(1),
  titleKey: z.string().min(1),
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
  descriptionKey: z.string().nullish(),
  idKey: z.string().min(1),
  imageLinkKey: z.string().nullish(),
  isActive: z.boolean(),
  linkKey: z.string().min(1),
  name: z.string().min(1),
  periodicity: z.nativeEnum(SOURCE_PERIOD),
  publicationDateKey: z.string().min(1),
  titleKey: z.string().min(1),
  url: z.string().min(1),
});

export type UpdateSourceResponseSchema = z.infer<typeof updateSourceResponseSchema>;
export const updateSourceResponseSchema = sourceSchema;
