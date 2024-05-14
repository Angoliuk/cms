import { newsSchema, newsWithTagsIdsSchema } from "@/shared/types";
import { getBaseQuerySchema, getPaginatedResponseValidation } from "@/shared/utils/validation";
import { z } from "zod";

export type GetNewsQuerySchema = z.infer<typeof getNewsQuerySchema>;
export const getNewsQuerySchema = getBaseQuerySchema(newsSchema).and(
  z.object({
    search: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
);

export type GetNewsResponseSchema = z.infer<typeof getNewsResponseSchema>;
export const getNewsResponseSchema = getPaginatedResponseValidation(newsWithTagsIdsSchema);
