import { webContract } from "@/web-shared/api";
import { initClient } from "@ts-rest/core";
import { initQueryClient } from "@ts-rest/react-query";
import { cookies } from "next/headers";
import { z } from "zod";

import { API_BASE_URL } from "../env";

export const isZodType = (obj: unknown): obj is z.ZodTypeAny => {
  return typeof (obj as z.ZodTypeAny)?.safeParse === "function";
};

export const client = initQueryClient(webContract, {
  baseUrl: API_BASE_URL,
  throwOnUnknownStatus: true,
  validateResponse: true,
});

export const api = initClient(webContract, {
  api: async ({ body, fetchOptions, headers, method, path, route, validateResponse }) => {
    const result = await fetch(path, {
      ...fetchOptions,
      body,
      headers: {
        Cookie: cookies()
          .getAll()
          .map(cookie => `${cookie.name}=${cookie.value}`)
          .join(";"),
        ...headers,
      },
      method,
    });

    const contentType = result.headers.get("content-type");

    if (contentType?.includes("application/") && contentType?.includes("json")) {
      const response = {
        body: await result.json(),
        headers: result.headers,
        status: result.status,
      };

      const responseSchema = route.responses[response.status];
      if ((validateResponse ?? route.validateResponseOnClient) && isZodType(responseSchema)) {
        return {
          ...response,
          body: responseSchema?.parse(response.body),
        };
      }

      return response;
    }

    if (contentType?.includes("text/")) {
      return {
        body: await result.text(),
        headers: result.headers,
        status: result.status,
      };
    }

    return {
      body: await result.blob(),
      headers: result.headers,
      status: result.status,
    };
  },
  baseUrl: API_BASE_URL,
  throwOnUnknownStatus: true,
  validateResponse: true,
});
