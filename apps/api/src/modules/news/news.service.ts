import type { DefaultArgs } from "@prisma/client/runtime/library";

import { Prisma } from "@/db";
import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma";

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async create({ data, select }: Prisma.NewsCreateArgs<DefaultArgs>) {
    return await this.prisma.news.create({ data, select });
  }

  async delete(deleteData: Prisma.NewsDeleteArgs<DefaultArgs>) {
    return await this.prisma.news.delete(deleteData);
  }

  async get(getData: Prisma.NewsFindManyArgs<DefaultArgs>) {
    return await this.prisma.news.findMany(getData);
  }

  async getOne(getData: Prisma.NewsFindUniqueArgs<DefaultArgs>) {
    return await this.prisma.news.findUnique(getData);
  }

  async update(updateData: Prisma.NewsUpdateArgs<DefaultArgs>) {
    return await this.prisma.news.update(updateData);
  }
}
