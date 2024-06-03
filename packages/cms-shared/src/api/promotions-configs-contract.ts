import { STATUS_CODES } from "@/shared/constants";
import { ContractInstance } from "@/shared/types";
import {
  BadRequestError,
  ForbiddenError,
  JWTError,
  NotFoundError,
  RequestValidationError,
  ResponseValidationError,
  ServerError,
} from "@/shared/utils";

import {
  createPromotionsConfigBodySchema,
  createPromotionsConfigResponseSchema,
  deletePromotionsConfigPathParamsSchema,
  deletePromotionsConfigResponseSchema,
  getByIdPromotionsConfigPathParamsSchema,
  getByIdPromotionsConfigResponseSchema,
  getPromotionsConfigsQuerySchema,
  getPromotionsConfigsResponseSchema,
  updatePromotionsConfigBodySchema,
  updatePromotionsConfigPathParamsSchema,
  updatePromotionsConfigResponseSchema,
} from "../validation";

export const promotionsConfigsContract = (c: ContractInstance) =>
  c.router(
    {
      create: {
        body: createPromotionsConfigBodySchema,
        method: "POST",
        path: "/create",
        responses: {
          [STATUS_CODES.BAD_REQUEST]: BadRequestError.zodSchema
            .or(ResponseValidationError.zodSchema)
            .or(RequestValidationError.zodSchema),
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema.or(JWTError.zodSchema),
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: createPromotionsConfigResponseSchema,
        },
      },
      delete: {
        body: null,
        method: "DELETE",
        path: "/delete/:promotionsConfigId",
        pathParams: deletePromotionsConfigPathParamsSchema,
        responses: {
          [STATUS_CODES.BAD_REQUEST]: BadRequestError.zodSchema
            .or(ResponseValidationError.zodSchema)
            .or(RequestValidationError.zodSchema),
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema.or(JWTError.zodSchema),
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: deletePromotionsConfigResponseSchema,
        },
      },
      get: {
        method: "GET",
        path: "/get",
        query: getPromotionsConfigsQuerySchema,
        responses: {
          [STATUS_CODES.BAD_REQUEST]: BadRequestError.zodSchema
            .or(ResponseValidationError.zodSchema)
            .or(RequestValidationError.zodSchema),
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema.or(JWTError.zodSchema),
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: getPromotionsConfigsResponseSchema,
        },
      },
      getById: {
        method: "GET",
        path: "/get-by-id/:promotionsConfigId",
        pathParams: getByIdPromotionsConfigPathParamsSchema,
        responses: {
          [STATUS_CODES.BAD_REQUEST]: BadRequestError.zodSchema
            .or(ResponseValidationError.zodSchema)
            .or(RequestValidationError.zodSchema),
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema.or(JWTError.zodSchema),
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: getByIdPromotionsConfigResponseSchema,
        },
      },
      update: {
        body: updatePromotionsConfigBodySchema,
        method: "PUT",
        path: "/update/:promotionsConfigId",
        pathParams: updatePromotionsConfigPathParamsSchema,
        responses: {
          [STATUS_CODES.BAD_REQUEST]: BadRequestError.zodSchema
            .or(ResponseValidationError.zodSchema)
            .or(RequestValidationError.zodSchema),
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema.or(JWTError.zodSchema),
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: updatePromotionsConfigResponseSchema,
        },
      },
    },
    { pathPrefix: "/promotions-configs" },
  );
