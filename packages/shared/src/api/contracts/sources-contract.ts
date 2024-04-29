import { ForbiddenError, NotFoundError, ServerError } from "../../utils/errors";
import {
  createSourceBodySchema,
  createSourceResponseSchema,
  deleteSourcePathParamsSchema,
  deleteSourceResponseSchema,
  getByIdSourcePathParamsSchema,
  getByIdSourceResponseSchema,
  getSourcesQuerySchema,
  getSourcesResponseSchema,
  updateSourceBodySchema,
  updateSourcePathParamsSchema,
  updateSourceResponseSchema,
} from "../../validation/sources/index";
import { STATUS_CODES } from "../constants";
import { ContractInstance } from "./types";

export const sourcesContract = (c: ContractInstance) =>
  c.router(
    {
      create: {
        body: createSourceBodySchema,
        method: "POST",
        path: "/",
        responses: {
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: createSourceResponseSchema,
        },
      },
      delete: {
        body: null,
        method: "DELETE",
        path: "/:sourceId",
        pathParams: deleteSourcePathParamsSchema,
        responses: {
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: deleteSourceResponseSchema,
        },
      },
      get: {
        method: "GET",
        path: "/",
        query: getSourcesQuerySchema,
        responses: {
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: getSourcesResponseSchema,
        },
      },
      getById: {
        method: "GET",
        path: "/:sourceId",
        pathParams: getByIdSourcePathParamsSchema,
        responses: {
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: getByIdSourceResponseSchema,
        },
      },
      update: {
        body: updateSourceBodySchema,
        method: "PUT",
        path: "/:sourceId",
        pathParams: updateSourcePathParamsSchema,
        responses: {
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: updateSourceResponseSchema,
        },
      },
    },
    { pathPrefix: "/sources" },
  );
