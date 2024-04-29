import type { DefaultArgs } from "@prisma/client/runtime/library";

import { Prisma } from "@/db";
import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";

import { Queues } from "../bullmq";
import { PrismaService } from "../prisma";

const getSourceParserJobId = (id: string) => Queues.SOURCES_PARSER + "-" + id;

@Injectable()
export class SourcesService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue(Queues.SOURCES_PARSER) private readonly sourceParserQueue: Queue,
  ) {}

  async create(createData: Prisma.SourceCreateArgs<DefaultArgs>) {
    const source = await this.prisma.source.create(createData);
    this.sourceParserQueue.add(getSourceParserJobId(source.id), {});
    return source;
  }

  async delete(deleteData: Prisma.SourceDeleteArgs<DefaultArgs>) {
    const source = await this.prisma.source.delete(deleteData);
    this.sourceParserQueue.remove(getSourceParserJobId(source.id));
    return source;
  }

  async get(getData: Prisma.SourceFindManyArgs<DefaultArgs>) {
    return await this.prisma.source.findMany(getData);
  }

  async getOne(getData: Prisma.SourceFindUniqueArgs<DefaultArgs>) {
    return await this.prisma.source.findUnique(getData);
  }

  async update(updateData: Prisma.SourceUpdateArgs<DefaultArgs>) {
    const source = await this.prisma.source.update(updateData);

    const job = await this.sourceParserQueue.getJob(getSourceParserJobId(source.id));

    // TODO: how would be better to handle situations when source do not have job?
    if (job) {
      job.updateData({});
    } else {
      this.sourceParserQueue.add(getSourceParserJobId(source.id), {});
    }

    return source;
  }
}
