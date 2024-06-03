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
  createTagBodySchema,
  createTagResponseSchema,
  deleteTagPathParamsSchema,
  deleteTagResponseSchema,
  getByIdTagPathParamsSchema,
  getByIdTagResponseSchema,
  getTagsQuerySchema,
  getTagsResponseSchema,
  updateTagBodySchema,
  updateTagPathParamsSchema,
  updateTagResponseSchema,
} from "../validation";

export const tagsContract = (c: ContractInstance) =>
  c.router(
    {
      create: {
        body: createTagBodySchema,
        method: "POST",
        path: "/create",
        responses: {
          [STATUS_CODES.BAD_REQUEST]: BadRequestError.zodSchema
            .or(ResponseValidationError.zodSchema)
            .or(RequestValidationError.zodSchema),
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema.or(JWTError.zodSchema),
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: createTagResponseSchema,
        },
      },
      delete: {
        body: null,
        method: "DELETE",
        path: "/delete/:tagId",
        pathParams: deleteTagPathParamsSchema,
        responses: {
          [STATUS_CODES.BAD_REQUEST]: BadRequestError.zodSchema
            .or(ResponseValidationError.zodSchema)
            .or(RequestValidationError.zodSchema),
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema.or(JWTError.zodSchema),
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: deleteTagResponseSchema,
        },
      },
      get: {
        method: "GET",
        path: "/get",
        query: getTagsQuerySchema,
        responses: {
          [STATUS_CODES.BAD_REQUEST]: BadRequestError.zodSchema
            .or(ResponseValidationError.zodSchema)
            .or(RequestValidationError.zodSchema),
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema.or(JWTError.zodSchema),
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: getTagsResponseSchema,
        },
      },
      getById: {
        method: "GET",
        path: "/get-by-id/:tagId",
        pathParams: getByIdTagPathParamsSchema,
        responses: {
          [STATUS_CODES.BAD_REQUEST]: BadRequestError.zodSchema
            .or(ResponseValidationError.zodSchema)
            .or(RequestValidationError.zodSchema),
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema.or(JWTError.zodSchema),
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: getByIdTagResponseSchema,
        },
      },
      update: {
        body: updateTagBodySchema,
        method: "PUT",
        path: "/update/:tagId",
        pathParams: updateTagPathParamsSchema,
        responses: {
          [STATUS_CODES.BAD_REQUEST]: BadRequestError.zodSchema
            .or(ResponseValidationError.zodSchema)
            .or(RequestValidationError.zodSchema),
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema.or(JWTError.zodSchema),
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: updateTagResponseSchema,
        },
      },
    },
    { pathPrefix: "/tags" },
  );
