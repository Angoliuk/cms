import { Prisma } from "@/db";
import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma";

@Injectable()
export class PromotionsConfigsService {
  constructor(private prisma: PrismaService) {}

  async count<T extends Prisma.PromotionConfigCountArgs>(
    countData: Prisma.SelectSubset<T, Prisma.PromotionConfigCountArgs>,
  ) {
    return await this.prisma.promotionConfig.count(countData);
  }

  async create<T extends Prisma.PromotionConfigCreateArgs>(
    createData: Prisma.SelectSubset<T, Prisma.PromotionConfigCreateArgs>,
  ) {
    return await this.prisma.promotionConfig.create(createData);
  }

  async delete<T extends Prisma.PromotionConfigDeleteArgs>(
    deleteData: Prisma.SelectSubset<T, Prisma.PromotionConfigDeleteArgs>,
  ) {
    return await this.prisma.promotionConfig.delete(deleteData);
  }

  async get<T extends Prisma.PromotionConfigFindManyArgs>(
    getData: Prisma.SelectSubset<T, Prisma.PromotionConfigFindManyArgs>,
  ) {
    return await this.prisma.promotionConfig.findMany(getData);
  }

  async getOne<T extends Prisma.PromotionConfigFindUniqueArgs>(
    getData: Prisma.SelectSubset<T, Prisma.PromotionConfigFindUniqueArgs>,
  ) {
    return await this.prisma.promotionConfig.findUnique(getData);
  }

  async update<T extends Prisma.PromotionConfigUpdateArgs>(
    updateData: Prisma.SelectSubset<T, Prisma.PromotionConfigUpdateArgs>,
  ) {
    return await this.prisma.promotionConfig.update(updateData);
  }
}
