import { STATUS_CODES } from "@/shared/constants";
import { ContractInstance } from "@/shared/types";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  RequestValidationError,
  ResponseValidationError,
  ServerError,
} from "@/shared/utils";

import {
  createPromotionBodySchema,
  createPromotionResponseSchema,
  deletePromotionPathParamsSchema,
  deletePromotionResponseSchema,
  getByIdPromotionPathParamsSchema,
  getByIdPromotionResponseSchema,
  getPromotionsQuerySchema,
  getPromotionsResponseSchema,
  updatePromotionBodySchema,
  updatePromotionPathParamsSchema,
  updatePromotionResponseSchema,
} from "../validation";

export const promotionsContract = (c: ContractInstance) =>
  c.router(
    {
      create: {
        body: createPromotionBodySchema,
        method: "POST",
        path: "/create",
        responses: {
          [STATUS_CODES.BAD_REQUEST]: BadRequestError.zodSchema
            .or(ResponseValidationError.zodSchema)
            .or(RequestValidationError.zodSchema),
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: createPromotionResponseSchema,
        },
      },
      delete: {
        body: null,
        method: "DELETE",
        path: "/delete/:promotionId",
        pathParams: deletePromotionPathParamsSchema,
        responses: {
          [STATUS_CODES.BAD_REQUEST]: BadRequestError.zodSchema
            .or(ResponseValidationError.zodSchema)
            .or(RequestValidationError.zodSchema),
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: deletePromotionResponseSchema,
        },
      },
      get: {
        method: "GET",
        path: "/get",
        query: getPromotionsQuerySchema,
        responses: {
          [STATUS_CODES.BAD_REQUEST]: BadRequestError.zodSchema
            .or(ResponseValidationError.zodSchema)
            .or(RequestValidationError.zodSchema),
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: getPromotionsResponseSchema,
        },
      },
      getById: {
        method: "GET",
        path: "/get-by-id/:promotionId",
        pathParams: getByIdPromotionPathParamsSchema,
        responses: {
          [STATUS_CODES.BAD_REQUEST]: BadRequestError.zodSchema
            .or(ResponseValidationError.zodSchema)
            .or(RequestValidationError.zodSchema),
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: getByIdPromotionResponseSchema,
        },
      },
      update: {
        body: updatePromotionBodySchema,
        method: "PUT",
        path: "/update/:promotionId",
        pathParams: updatePromotionPathParamsSchema,
        responses: {
          [STATUS_CODES.BAD_REQUEST]: BadRequestError.zodSchema
            .or(ResponseValidationError.zodSchema)
            .or(RequestValidationError.zodSchema),
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: updatePromotionResponseSchema,
        },
      },
    },
    { pathPrefix: "/promotions" },
  );
