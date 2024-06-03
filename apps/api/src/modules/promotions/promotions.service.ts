import { Prisma } from "@/db";
import { promotionSchema } from "@/shared/types";
import { Injectable } from "@nestjs/common";

import { getElasticPromotionsRegExpQuery } from "../../utils/elastic-queries";
import { MinioService } from "../minio";
import { PrismaService } from "../prisma";
import { PromotionsConfigsService } from "../promotions-configs";
import { PromotionsElasticService } from "./promotions-elastic.service";

@Injectable()
export class PromotionsService {
  constructor(
    private prisma: PrismaService,
    private promotionsConfigsService: PromotionsConfigsService,
    private readonly promotionsElasticService: PromotionsElasticService,
    private minioService: MinioService,
  ) {}

  async count<T extends Prisma.PromotionCountArgs>(
    countData: Prisma.SelectSubset<T, Prisma.PromotionCountArgs>,
  ) {
    return await this.prisma.promotion.count(countData);
  }

  async create<T extends Prisma.PromotionCreateArgs>(
    createData: Prisma.SelectSubset<T, Prisma.PromotionCreateArgs>,
  ) {
    const createdPromotion = await this.prisma.promotion.create(createData);

    const elasticPromotion = await this.prisma.promotion.findUnique({
      where: { id: createdPromotion.id },
    });
    const validPromotion = promotionSchema.safeParse(elasticPromotion);
    if (!validPromotion.success) return createdPromotion;
    await this.promotionsElasticService.index(validPromotion.data);

    return createdPromotion;
  }

  async delete<T extends Prisma.PromotionDeleteArgs>(
    deleteData: Prisma.SelectSubset<T, Prisma.PromotionDeleteArgs>,
  ) {
    const deletedPromotion = await this.prisma.promotion.delete(deleteData);
    if (deletedPromotion.url)
      this.minioService.deleteFile("promotion-images", deletedPromotion.url);
    await this.promotionsElasticService.delete(deletedPromotion.id);
    return deletedPromotion;
  }

  async get<T extends Prisma.PromotionFindManyArgs>(
    getData: Prisma.SelectSubset<T, Prisma.PromotionFindManyArgs>,
  ) {
    return await this.prisma.promotion.findMany(getData);
  }

  async getOne<T extends Prisma.PromotionFindUniqueArgs>(
    getData: Prisma.SelectSubset<T, Prisma.PromotionFindUniqueArgs>,
  ) {
    return await this.prisma.promotion.findUnique(getData);
  }

  async getPromotionsForNewsList() {
    const promotionsConfig = await this.promotionsConfigsService.getOne({
      where: { location: "LIST" },
    });

    if (!promotionsConfig) return [];

    const promotions = await this.prisma.promotion.findMany({
      take: promotionsConfig.promotionsPerPage,
      where: { isDraft: false, locations: { has: promotionsConfig.location } },
    });

    return promotions;
  }

  async getPromotionsForNewsSearch({ search }: { search: string }) {
    const promotionsConfig = await this.promotionsConfigsService.getOne({
      where: { location: "SEARCH" },
    });

    if (!promotionsConfig) return [];

    const promotions = await this.promotionsElasticService.get(
      getElasticPromotionsRegExpQuery({
        limit: promotionsConfig.promotionsPerPage,
        page: 1,
        search,
      }),
    );
    return promotions.items;
  }

  async onModuleInit() {
    // Well, I just remove all indexes and then create it from scratch on module init
    // in order to keep postgres and elastic data synced
    // Maybe, it will be better to check created/updated/deleted items and do partial updates
    // But it will be more much more code and potentially has a lot of bugs
    await this.promotionsElasticService.clear();

    const promotions = await this.prisma.promotion.findMany();

    if (!promotions.length) return;

    const validPromotions = [];

    for (const promotion of promotions) {
      const validatedPromotion = promotionSchema.safeParse(promotion);

      if (!validatedPromotion.success) continue;

      validPromotions.push(validatedPromotion.data);
    }

    if (!validPromotions.length) return;
    await this.promotionsElasticService.indexMany(validPromotions);
  }

  async update<T extends Prisma.PromotionUpdateArgs>(
    updateData: Prisma.SelectSubset<T, Prisma.PromotionUpdateArgs>,
  ) {
    const updatedPromotion = await this.prisma.promotion.update(updateData);

    const elasticPromotion = await this.prisma.promotion.findUnique({
      where: { id: updatedPromotion.id },
    });
    const validPromotion = promotionSchema.safeParse(elasticPromotion);
    if (!validPromotion.success) return updatedPromotion;
    await this.promotionsElasticService.update(validPromotion.data.id, validPromotion.data);

    return updatedPromotion;
  }
}
