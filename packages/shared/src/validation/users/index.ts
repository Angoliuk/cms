import { z } from "zod";

export type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;
export const createUserBodySchema = z.object({});

export type CreateUserResponseSchema = z.infer<typeof createUserResponseSchema>;
export const createUserResponseSchema = z.object({});

export type DeleteUserPathParamsSchema = z.infer<typeof deleteUserPathParamsSchema>;
export const deleteUserPathParamsSchema = z.object({});

export type DeleteUserResponseSchema = z.infer<typeof deleteUserResponseSchema>;
export const deleteUserResponseSchema = z.object({});

export type GetUsersQuerySchema = z.infer<typeof getUsersQuerySchema>;
export const getUsersQuerySchema = z.object({});

export type GetUsersResponseSchema = z.infer<typeof getUsersResponseSchema>;
export const getUsersResponseSchema = z.object({});

export type GetByIdUserPathParamsSchema = z.infer<typeof getByIdUserPathParamsSchema>;
export const getByIdUserPathParamsSchema = z.object({});

export type GetByIdUserResponseSchema = z.infer<typeof getByIdUserResponseSchema>;
export const getByIdUserResponseSchema = z.object({});

export type UpdateUserPathParamsSchema = z.infer<typeof updateUserPathParamsSchema>;
export const updateUserPathParamsSchema = z.object({});

export type UpdateUserBodySchema = z.infer<typeof updateUserBodySchema>;
export const updateUserBodySchema = z.object({});

export type UpdateUserResponseSchema = z.infer<typeof updateUserResponseSchema>;
export const updateUserResponseSchema = z.object({});
