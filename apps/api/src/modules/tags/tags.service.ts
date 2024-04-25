import type { DefaultArgs } from "@prisma/client/runtime/library";

import { Prisma } from "@/db";
import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma";

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create({ data, select }: Prisma.TagCreateArgs<DefaultArgs>) {
    return await this.prisma.tag.create({ data, select });
  }

  async delete(deleteData: Prisma.TagDeleteArgs<DefaultArgs>) {
    return await this.prisma.tag.delete(deleteData);
  }

  async find(findData: Prisma.TagFindManyArgs<DefaultArgs>) {
    return await this.prisma.tag.findMany(findData);
  }

  async findOne(findData: Prisma.TagFindUniqueArgs<DefaultArgs>) {
    return await this.prisma.tag.findUnique(findData);
  }

  async update(updateData: Prisma.TagUpdateArgs<DefaultArgs>) {
    return await this.prisma.tag.update(updateData);
  }
}
