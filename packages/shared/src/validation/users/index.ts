import { z } from "zod";

import { getBaseQueryValidation, getPaginatedResponseValidation, userIdSchema } from "../general";

export const userPasswordSchema = z.string().min(6);

export type UserSchema = z.infer<typeof userSchema>;
export const userSchema = z.object({
  createdAt: z.coerce.date(),
  email: z.string().email(),
  id: z.string().min(1),
  password: userPasswordSchema,
  updatedAt: z.coerce.date(),
});

export type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;
export const createUserBodySchema = z.object({
  email: z.string().email(),
  password: userPasswordSchema,
});

export type CreateUserResponseSchema = z.infer<typeof createUserResponseSchema>;
export const createUserResponseSchema = userSchema;

export type DeleteUserPathParamsSchema = z.infer<typeof deleteUserPathParamsSchema>;
export const deleteUserPathParamsSchema = z.object({ userId: userIdSchema });

export type DeleteUserResponseSchema = z.infer<typeof deleteUserResponseSchema>;
export const deleteUserResponseSchema = userSchema;

export type GetUsersQuerySchema = z.infer<typeof getUsersQuerySchema>;
export const getUsersQuerySchema = getBaseQueryValidation(z.object({}));

export type GetUsersResponseSchema = z.infer<typeof getUsersResponseSchema>;
export const getUsersResponseSchema = getPaginatedResponseValidation(userSchema);

export type GetByIdUserPathParamsSchema = z.infer<typeof getByIdUserPathParamsSchema>;
export const getByIdUserPathParamsSchema = z.object({ userId: userIdSchema });

export type GetByIdUserResponseSchema = z.infer<typeof getByIdUserResponseSchema>;
export const getByIdUserResponseSchema = userSchema;

export type UpdateUserPathParamsSchema = z.infer<typeof updateUserPathParamsSchema>;
export const updateUserPathParamsSchema = z.object({ userId: userIdSchema });

export type UpdateUserBodySchema = z.infer<typeof updateUserBodySchema>;
export const updateUserBodySchema = z
  .object({
    email: z.string().email(),
    password: userPasswordSchema,
  })
  .partial();

export type UpdateUserResponseSchema = z.infer<typeof updateUserResponseSchema>;
export const updateUserResponseSchema = userSchema;
