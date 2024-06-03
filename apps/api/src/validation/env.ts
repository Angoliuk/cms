import { z } from "zod";

export type EnvSchema = z.infer<typeof envSchema>;
export const envSchema = z.object({
  ACCESS_SECRET_TOKEN: z.string().min(1),
  ACCESS_SECRET_TOKEN_EXPIRES_IN: z.coerce.number().min(1),
  DATABASE_URL: z.string().min(1),
  ELASTIC_URL: z.string().min(1),
  MINIO_ACCESS_TOKEN: z.string().min(1),
  MINIO_ENDPOINT: z.string().min(1),
  MINIO_PORT: z.coerce.number().min(1),
  MINIO_REFRESH_TOKEN: z.string().min(1),
  PORT: z.coerce.number(),
  REDIS_HOST: z.string().min(1),
  REDIS_PORT: z.coerce.number(),
  REFRESH_SECRET_TOKEN: z.string().min(1),
  REFRESH_SECRET_TOKEN_EXPIRES_IN: z.coerce.number().min(1),
});
