import {
  NEWS_VISIBILITY,
  PROMOTION_LOCATION,
  PROMOTION_LOCATION_LIST_TYPE,
  SOURCE_PERIOD,
} from "@prisma/client";
import { z } from "zod";

import { uniqueEnumArray } from "../utils";

export type UserIdSchema = z.infer<typeof userIdSchema>;
export const userIdSchema = z.string().uuid();

export type TagIdSchema = z.infer<typeof tagIdSchema>;
export const tagIdSchema = z.string().uuid();

export type SourceIdSchema = z.infer<typeof sourceIdSchema>;
export const sourceIdSchema = z.string().uuid();

export type PromotionsConfigIdSchema = z.infer<typeof promotionsConfigIdSchema>;
export const promotionsConfigIdSchema = z.string().uuid();

export type PromotionIdSchema = z.infer<typeof promotionIdSchema>;
export const promotionIdSchema = z.string().uuid();

export type NewsIdSchema = z.infer<typeof newsIdSchema>;
export const newsIdSchema = z.string().uuid();

export type TokensSchema = z.infer<typeof tokensSchema>;
export const tokensSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
});

export type TagSchema = z.infer<typeof tagSchema>;
export const tagSchema = z.object({
  createdAt: z.coerce.date(),
  id: tagIdSchema,
  name: z.string().min(1),
  updatedAt: z.coerce.date(),
});

export type NewsSchema = z.infer<typeof newsSchema>;
export const newsSchema = z.object({
  createdAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
  description: z.string().nullable(),
  externalId: z.string().min(1),
  id: newsIdSchema,
  imageLink: z.string().nullable(),
  isDraft: z.boolean(),
  originalLink: z.string(),
  originalPublicationDate: z.coerce.date(),
  title: z.string().min(1),
  updatedAt: z.coerce.date(),
  visibility: z.nativeEnum(NEWS_VISIBILITY),
});

export type NewsWithTagsIdsSchema = z.infer<typeof newsWithTagsIdsSchema>;
export const newsWithTagsIdsSchema = newsSchema.and(
  z.object({
    tags: z.array(tagIdSchema),
  }),
);

export type NewsWithTagsSchema = z.infer<typeof newsWithTagsSchema>;
export const newsWithTagsSchema = newsSchema.and(
  z.object({
    tags: z.array(tagSchema),
  }),
);

export const userPasswordSchema = z.string().min(6);

export type UserSchema = z.infer<typeof userSchema>;
export const userSchema = z.object({
  createdAt: z.coerce.date(),
  email: z.string().email(),
  id: userIdSchema,
  password: userPasswordSchema,
  updatedAt: z.coerce.date(),
});

export type PromotionsConfigSchema = z.infer<typeof promotionsConfigSchema>;
export const promotionsConfigSchema = z.object({
  createdAt: z.coerce.date(),
  id: promotionsConfigIdSchema,
  location: z.nativeEnum(PROMOTION_LOCATION),
  promotionsPerPage: z.coerce.number().min(0),
  updatedAt: z.coerce.date(),
});

export type SourceSchema = z.infer<typeof sourceSchema>;
export const sourceSchema = z.object({
  createdAt: z.coerce.date(),
  descriptionKey: z.string().nullish(),
  id: sourceIdSchema,
  idKey: z.string().min(1),
  imageLinkKey: z.string().nullish(),
  isActive: z.boolean(),
  linkKey: z.string().min(1),
  name: z.string().min(1),
  periodicity: z.nativeEnum(SOURCE_PERIOD),
  publicationDateKey: z.string().min(1),
  titleKey: z.string().min(1),
  updatedAt: z.coerce.date(),
  url: z.string().min(1),
});

const basePromotionSchema = z.object({
  createdAt: z.coerce.date(),
  id: promotionIdSchema,
  isDraft: z.boolean(),
  locations: uniqueEnumArray(PROMOTION_LOCATION),
  updatedAt: z.coerce.date(),
});

const baseSearchPromotionSchema = z.object({ search: z.string() }).and(basePromotionSchema);
const baseListPromotionSchema = z
  .object({
    listType: z.nativeEnum(PROMOTION_LOCATION_LIST_TYPE),
    priority: z.number().min(0).max(100),
  })
  .and(basePromotionSchema);

export type SearchPromotionWithImageSchema = z.infer<typeof searchPromotionWithImageSchema>;
export const searchPromotionWithImageSchema = baseSearchPromotionSchema.and(
  z.object({
    link: z.string().optional(),
    url: z.string().min(1),
  }),
);

export type SearchPromotionWithTextSchema = z.infer<typeof searchPromotionWithTextSchema>;
export const searchPromotionWithTextSchema = baseSearchPromotionSchema.and(
  z.object({
    link: z.string().min(1),
    text: z.string().min(1),
  }),
);

export type SearchPromotionWithNewsSchema = z.infer<typeof searchPromotionWithNewsSchema>;
export const searchPromotionWithNewsSchema = baseSearchPromotionSchema.and(
  z.object({
    newsId: z.string().min(1),
  }),
);

export type ListPromotionWithImageSchema = z.infer<typeof listPromotionWithImageSchema>;
export const listPromotionWithImageSchema = baseListPromotionSchema.and(
  z.object({
    link: z.string().optional(),
    url: z.string().min(1),
  }),
);

export type ListPromotionWithTextSchema = z.infer<typeof listPromotionWithTextSchema>;
export const listPromotionWithTextSchema = baseListPromotionSchema.and(
  z.object({
    link: z.string().min(1),
    text: z.string().min(1),
  }),
);

export type ListPromotionWithNewsSchema = z.infer<typeof listPromotionWithNewsSchema>;
export const listPromotionWithNewsSchema = baseListPromotionSchema.and(
  z.object({
    newsId: newsIdSchema,
  }),
);

export type SearchPromotionSchema = z.infer<typeof searchPromotionSchema>;
export const searchPromotionSchema = z.union([
  searchPromotionWithTextSchema,
  searchPromotionWithNewsSchema,
  searchPromotionWithImageSchema,
]);

export type ListPromotionSchema = z.infer<typeof listPromotionSchema>;
export const listPromotionSchema = z.union([
  listPromotionWithImageSchema,
  listPromotionWithTextSchema,
  listPromotionWithNewsSchema,
]);

export type PromotionSchema = z.infer<typeof promotionSchema>;
export const promotionSchema = z.union([searchPromotionSchema, listPromotionSchema]);

export type PromotionsSchema = z.infer<typeof promotionsSchema>;
export const promotionsSchema = z.array(promotionSchema);
