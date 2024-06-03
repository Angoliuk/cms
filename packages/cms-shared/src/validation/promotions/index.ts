import { promotionIdSchema, promotionSchema } from "@/shared/types";
import { getPaginatedResponseValidation, paginationQuerySchema } from "@/shared/utils/validation";
import { z } from "zod";

import { createPromotionSchema } from "./create-promotion-schemas";

export type CreatePromotionBodySchema = z.infer<typeof createPromotionBodySchema>;
export const createPromotionBodySchema = createPromotionSchema;

export type CreatePromotionResponseSchema = z.infer<typeof createPromotionResponseSchema>;
export const createPromotionResponseSchema = promotionSchema;

export type DeletePromotionPathParamsSchema = z.infer<typeof deletePromotionPathParamsSchema>;
export const deletePromotionPathParamsSchema = z.object({ promotionId: promotionIdSchema });

export type DeletePromotionResponseSchema = z.infer<typeof deletePromotionResponseSchema>;
export const deletePromotionResponseSchema = promotionSchema;

export type GetPromotionsQuerySchema = z.infer<typeof getPromotionsQuerySchema>;
export const getPromotionsQuerySchema = paginationQuerySchema;

export type GetPromotionsResponseSchema = z.infer<typeof getPromotionsResponseSchema>;
export const getPromotionsResponseSchema = getPaginatedResponseValidation(promotionSchema);

export type GetByIdPromotionPathParamsSchema = z.infer<typeof getByIdPromotionPathParamsSchema>;
export const getByIdPromotionPathParamsSchema = z.object({ promotionId: promotionIdSchema });

export type GetByIdPromotionResponseSchema = z.infer<typeof getByIdPromotionResponseSchema>;
export const getByIdPromotionResponseSchema = promotionSchema;

export type UpdatePromotionPathParamsSchema = z.infer<typeof updatePromotionPathParamsSchema>;
export const updatePromotionPathParamsSchema = z.object({ promotionId: promotionIdSchema });

export type UpdatePromotionBodySchema = z.infer<typeof updatePromotionBodySchema>;
export const updatePromotionBodySchema = createPromotionSchema;

export type UpdatePromotionResponseSchema = z.infer<typeof updatePromotionResponseSchema>;
export const updatePromotionResponseSchema = promotionSchema;

export * from "./create-promotion-schemas";
