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
  getByIdNewsPathParamsSchema,
  getByIdNewsResponseSchema,
  getListNewsQuerySchema,
  getListNewsResponseSchema,
  getSearchNewsQuerySchema,
  getSearchNewsResponseSchema,
} from "../validation";

export const newsContract = (c: ContractInstance) =>
  c.router(
    {
      getById: {
        method: "GET",
        path: "/get-by-id/:newsId",
        pathParams: getByIdNewsPathParamsSchema,
        responses: {
          [STATUS_CODES.BAD_REQUEST]: BadRequestError.zodSchema
            .or(ResponseValidationError.zodSchema)
            .or(RequestValidationError.zodSchema),
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: getByIdNewsResponseSchema,
        },
      },
      getForList: {
        method: "GET",
        path: "/get/list",
        query: getListNewsQuerySchema,
        responses: {
          [STATUS_CODES.BAD_REQUEST]: BadRequestError.zodSchema
            .or(ResponseValidationError.zodSchema)
            .or(RequestValidationError.zodSchema),
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: getListNewsResponseSchema,
        },
      },
      getForSearch: {
        method: "GET",
        path: "/get/search",
        query: getSearchNewsQuerySchema,
        responses: {
          [STATUS_CODES.BAD_REQUEST]: BadRequestError.zodSchema
            .or(ResponseValidationError.zodSchema)
            .or(RequestValidationError.zodSchema),
          [STATUS_CODES.FORBIDDEN]: ForbiddenError.zodSchema,
          [STATUS_CODES.NOT_FOUND]: NotFoundError.zodSchema,
          [STATUS_CODES.SERVER_ERROR]: ServerError.zodSchema,
          [STATUS_CODES.SUCCESS]: getSearchNewsResponseSchema,
        },
      },
    },
    { pathPrefix: "/news" },
  );
