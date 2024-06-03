import { cmsContract } from "@/cms-shared/api";
import {
  CreatePromotionBodySchema,
  UpdatePromotionBodySchema,
  createPromotionBodySchema,
  updatePromotionBodySchema,
} from "@/cms-shared/validation";
import { Prisma } from "@/db";
import { promotionSchema, promotionsSchema } from "@/shared/types";
import {
  NotFoundError,
  RequestValidationError,
  ServerError,
  formatResponse,
  getPaginatedResponse,
} from "@/shared/utils";
import { Body, Controller, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { TsRest, TsRestHandler, tsRestHandler } from "@ts-rest/nest";

import { AccessTokenGuard } from "../../guards";
import { getPaginationSelectFromQuery } from "../../utils";
import { MinioService } from "../minio";
import { PromotionsService } from "./promotions.service";

@Controller()
@TsRest({ validateResponses: true })
export class PromotionsController {
  constructor(
    private promotionsService: PromotionsService,
    private minioService: MinioService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor("image"))
  @TsRestHandler(cmsContract.promotions.create)
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: CreatePromotionBodySchema,
  ) {
    return tsRestHandler(cmsContract.promotions.create, async () => {
      // Well, tsrest has some problems with formdata validation, so I did it on my own
      const bodyValidation = createPromotionBodySchema.safeParse(body);
      if (!bodyValidation.success)
        return formatResponse(new RequestValidationError("invalid promotion"));

      let promotionData: Prisma.PromotionCreateArgs["data"] = bodyValidation.data;
      if (image) {
        const uploadedFile = await this.minioService.uploadFile("promotion-images", image);
        const url = await this.minioService.getFileUrl("promotion-images", uploadedFile.fileName);
        promotionData = { ...body, url };
      }

      const promotion = await this.promotionsService.create({ data: promotionData });

      const validatedPromotion = promotionSchema.safeParse(promotion);

      if (!validatedPromotion.success) {
        return formatResponse(new ServerError("invalid promotion"));
      }

      return formatResponse(validatedPromotion.data);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.promotions.delete)
  async delete() {
    return tsRestHandler(cmsContract.promotions.delete, async ({ params }) => {
      const promotion = await this.promotionsService.delete({ where: { id: params.promotionId } });

      const validatedPromotion = promotionSchema.safeParse(promotion);

      if (!validatedPromotion.success) {
        return formatResponse(new ServerError("invalid promotion"));
      }

      return formatResponse(validatedPromotion.data);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.promotions.get)
  async get() {
    return tsRestHandler(cmsContract.promotions.get, async ({ query }) => {
      const { limit, page } = query;
      const promotions = await this.promotionsService.get({
        ...getPaginationSelectFromQuery(page, limit),
      });
      const count = await this.promotionsService.count({});

      const validatedPromotion = promotionsSchema.safeParse(promotions);

      if (!validatedPromotion.success) {
        return formatResponse(new ServerError("invalid promotions"));
      }

      const response = getPaginatedResponse(validatedPromotion.data, {
        count,
        limit,
        page,
      });
      return formatResponse(response);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.promotions.getById)
  async getById() {
    return tsRestHandler(cmsContract.promotions.getById, async ({ params }) => {
      const promotion = await this.promotionsService.getOne({ where: { id: params.promotionId } });

      if (!promotion) return formatResponse(new NotFoundError("Promotion not found"));

      const validatedPromotion = promotionSchema.safeParse(promotion);

      if (!validatedPromotion.success) {
        return formatResponse(new ServerError("invalid promotion"));
      }

      return formatResponse(validatedPromotion.data);
    });
  }

  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor("image"))
  @TsRestHandler(cmsContract.promotions.update)
  async update(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: UpdatePromotionBodySchema,
  ) {
    return tsRestHandler(cmsContract.promotions.update, async ({ params }) => {
      // Well, tsrest has some problems with formdata validation, so I did it on my own
      const bodyValidation = updatePromotionBodySchema.safeParse(body);
      if (!bodyValidation.success)
        return formatResponse(new RequestValidationError("invalid promotion"));

      let promotionData: Prisma.PromotionUpdateArgs["data"] = bodyValidation.data;
      if (image) {
        // TODO: I do not remove old images, maybe in future we can create a library of images to reuse them, or like history
        // Real reason: I do not want to do this :<
        const uploadedFile = await this.minioService.uploadFile("promotion-images", image);
        const url = await this.minioService.getFileUrl("promotion-images", uploadedFile.fileName);
        promotionData = { ...body, url };
      }

      const promotion = await this.promotionsService.update({
        data: promotionData,
        where: { id: params.promotionId },
      });

      const validatedPromotion = promotionSchema.safeParse(promotion);

      if (!validatedPromotion.success) {
        return formatResponse(new ServerError("invalid promotion"));
      }

      return formatResponse(validatedPromotion.data);
    });
  }
}
