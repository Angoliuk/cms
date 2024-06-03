import { promotionsConfigIdSchema, promotionsConfigSchema } from "@/shared/types";
import { getPaginatedResponseValidation, paginationQuerySchema } from "@/shared/utils/validation";
import { PROMOTION_LOCATION } from "@prisma/client";
import { z } from "zod";

export type CreatePromotionsConfigSchema = z.infer<typeof createPromotionsConfigSchema>;
export const createPromotionsConfigSchema = z.object({
  location: z.nativeEnum(PROMOTION_LOCATION),
  promotionsPerPage: z.coerce.number().min(0),
});

export type CreatePromotionsConfigBodySchema = z.infer<typeof createPromotionsConfigBodySchema>;
export const createPromotionsConfigBodySchema = createPromotionsConfigSchema;

export type CreatePromotionsConfigResponseSchema = z.infer<
  typeof createPromotionsConfigResponseSchema
>;
export const createPromotionsConfigResponseSchema = promotionsConfigSchema;

export type DeletePromotionsConfigPathParamsSchema = z.infer<
  typeof deletePromotionsConfigPathParamsSchema
>;
export const deletePromotionsConfigPathParamsSchema = z.object({
  promotionsConfigId: promotionsConfigIdSchema,
});

export type DeletePromotionsConfigResponseSchema = z.infer<
  typeof deletePromotionsConfigResponseSchema
>;
export const deletePromotionsConfigResponseSchema = promotionsConfigSchema;

export type GetPromotionsConfigsQuerySchema = z.infer<typeof getPromotionsConfigsQuerySchema>;
export const getPromotionsConfigsQuerySchema = paginationQuerySchema;

export type GetPromotionsConfigsResponseSchema = z.infer<typeof getPromotionsConfigsResponseSchema>;
export const getPromotionsConfigsResponseSchema =
  getPaginatedResponseValidation(promotionsConfigSchema);

export type GetByIdPromotionsConfigPathParamsSchema = z.infer<
  typeof getByIdPromotionsConfigPathParamsSchema
>;
export const getByIdPromotionsConfigPathParamsSchema = z.object({
  promotionsConfigId: promotionsConfigIdSchema,
});

export type GetByIdPromotionsConfigResponseSchema = z.infer<
  typeof getByIdPromotionsConfigResponseSchema
>;
export const getByIdPromotionsConfigResponseSchema = promotionsConfigSchema;

export type UpdatePromotionsConfigPathParamsSchema = z.infer<
  typeof updatePromotionsConfigPathParamsSchema
>;
export const updatePromotionsConfigPathParamsSchema = z.object({
  promotionsConfigId: promotionsConfigIdSchema,
});

export type UpdatePromotionsConfigBodySchema = z.infer<typeof updatePromotionsConfigBodySchema>;
export const updatePromotionsConfigBodySchema = z.object({
  promotionsPerPage: z.coerce.number().min(0),
});

export type UpdatePromotionsConfigResponseSchema = z.infer<
  typeof updatePromotionsConfigResponseSchema
>;
export const updatePromotionsConfigResponseSchema = promotionsConfigSchema;
