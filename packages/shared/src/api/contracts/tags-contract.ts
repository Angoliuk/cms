import { ForbiddenError, NotFoundError, ServerError } from "../../utils/errors";
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
} from "../../validation/tags/index";
import { STATUS_CODES } from "../constants";
import { ContractInstance } from "./types";

export const tagsContract = (c: ContractInstance) =>
  c.router(
    {
      create: {
        body: createTagBodySchema,
        method: "POST",
        path: "/",
        responses: {
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: createTagResponseSchema,
        },
      },
      delete: {
        body: null,
        method: "DELETE",
        path: "/:tagId",
        pathParams: deleteTagPathParamsSchema,
        responses: {
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: deleteTagResponseSchema,
        },
      },
      get: {
        method: "GET",
        path: "/",
        query: getTagsQuerySchema,
        responses: {
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: getTagsResponseSchema,
        },
      },
      getById: {
        method: "GET",
        path: "/:tagId",
        pathParams: getByIdTagPathParamsSchema,
        responses: {
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: getByIdTagResponseSchema,
        },
      },
      update: {
        body: updateTagBodySchema,
        method: "PUT",
        path: "/:tagId",
        pathParams: updateTagPathParamsSchema,
        responses: {
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: updateTagResponseSchema,
        },
      },
    },
    { pathPrefix: "/tags" },
  );
