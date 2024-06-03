import { Prisma } from "@/db";
import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma";

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async count<T extends Prisma.TagCountArgs>(
    countData: Prisma.SelectSubset<T, Prisma.TagCountArgs>,
  ) {
    return await this.prisma.tag.count(countData);
  }

  async create<T extends Prisma.TagCreateArgs>(
    createData: Prisma.SelectSubset<T, Prisma.TagCreateArgs>,
  ) {
    return await this.prisma.tag.create(createData);
  }

  async delete<T extends Prisma.TagDeleteArgs>(
    deleteData: Prisma.SelectSubset<T, Prisma.TagDeleteArgs>,
  ) {
    return await this.prisma.tag.delete(deleteData);
  }

  async get<T extends Prisma.TagFindManyArgs>(
    getData: Prisma.SelectSubset<T, Prisma.TagFindManyArgs>,
  ) {
    return await this.prisma.tag.findMany(getData);
  }

  async getOne<T extends Prisma.TagFindUniqueArgs>(
    getData: Prisma.SelectSubset<T, Prisma.TagFindUniqueArgs>,
  ) {
    return await this.prisma.tag.findUnique(getData);
  }

  async update<T extends Prisma.TagUpdateArgs>(
    updateData: Prisma.SelectSubset<T, Prisma.TagUpdateArgs>,
  ) {
    return await this.prisma.tag.update(updateData);
  }
}
