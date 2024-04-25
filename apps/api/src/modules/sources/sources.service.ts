import type { DefaultArgs } from "@prisma/client/runtime/library";

import { Prisma } from "@/db";
import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma";

@Injectable()
export class SourcesService {
  constructor(private prisma: PrismaService) {}

  async create({ data, select }: Prisma.SourceCreateArgs<DefaultArgs>) {
    return await this.prisma.source.create({ data, select });
  }

  async delete(deleteData: Prisma.SourceDeleteArgs<DefaultArgs>) {
    return await this.prisma.source.delete(deleteData);
  }

  async find(findData: Prisma.SourceFindManyArgs<DefaultArgs>) {
    return await this.prisma.source.findMany(findData);
  }

  async findOne(findData: Prisma.SourceFindUniqueArgs<DefaultArgs>) {
    return await this.prisma.source.findUnique(findData);
  }

  async update(updateData: Prisma.SourceUpdateArgs<DefaultArgs>) {
    return await this.prisma.source.update(updateData);
  }
}
