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
  createNewsBodySchema,
  createNewsResponseSchema,
  deleteNewsPathParamsSchema,
  deleteNewsResponseSchema,
  getByIdNewsPathParamsSchema,
  getByIdNewsResponseSchema,
  getNewsOptionsQuerySchema,
  getNewsOptionsResponseSchema,
  getNewsQuerySchema,
  getNewsResponseSchema,
  updateNewsBodySchema,
  updateNewsPathParamsSchema,
  updateNewsResponseSchema,
} from "../validation";

export const newsContract = (c: ContractInstance) =>
  c.router(
    {
      create: {
        body: createNewsBodySchema,
        method: "POST",
        path: "/create",
        responses: {
          [STATUS_CODES.BAD_REQUEST]: BadRequestError.zodSchema
            .or(ResponseValidationError.zodSchema)
            .or(RequestValidationError.zodSchema),
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: createNewsResponseSchema,
        },
      },
      delete: {
        body: null,
        method: "DELETE",
        path: "/delete/:newsId",
        pathParams: deleteNewsPathParamsSchema,
        responses: {
          [STATUS_CODES.BAD_REQUEST]: BadRequestError.zodSchema
            .or(ResponseValidationError.zodSchema)
            .or(RequestValidationError.zodSchema),
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: deleteNewsResponseSchema,
        },
      },
      get: {
        method: "GET",
        path: "/get",
        query: getNewsQuerySchema,
        responses: {
          [STATUS_CODES.BAD_REQUEST]: BadRequestError.zodSchema
            .or(ResponseValidationError.zodSchema)
            .or(RequestValidationError.zodSchema),
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: getNewsResponseSchema,
        },
      },
      getById: {
        method: "GET",
        path: "/get-by-id/:newsId",
        pathParams: getByIdNewsPathParamsSchema,
        responses: {
          [STATUS_CODES.BAD_REQUEST]: BadRequestError.zodSchema
            .or(ResponseValidationError.zodSchema)
            .or(RequestValidationError.zodSchema),
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: getByIdNewsResponseSchema,
        },
      },
      getOptions: {
        method: "GET",
        path: "/get/options",
        query: getNewsOptionsQuerySchema,
        responses: {
          [STATUS_CODES.BAD_REQUEST]: BadRequestError.zodSchema
            .or(ResponseValidationError.zodSchema)
            .or(RequestValidationError.zodSchema),
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: getNewsOptionsResponseSchema,
        },
      },
      update: {
        body: updateNewsBodySchema,
        method: "PUT",
        path: "/update/:newsId",
        pathParams: updateNewsPathParamsSchema,
        responses: {
          [STATUS_CODES.BAD_REQUEST]: BadRequestError.zodSchema
            .or(ResponseValidationError.zodSchema)
            .or(RequestValidationError.zodSchema),
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: updateNewsResponseSchema,
        },
      },
    },
    { pathPrefix: "/news" },
  );
