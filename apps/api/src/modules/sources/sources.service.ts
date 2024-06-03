import { Prisma, SOURCE_PERIOD } from "@/db";
import { InjectQueue } from "@nestjs/bullmq";
import { Injectable, OnModuleInit } from "@nestjs/common";

import { Queues, SourcesQueue } from "../bullmq";
import { PrismaService } from "../prisma";

@Injectable()
export class SourcesService implements OnModuleInit {
  constructor(
    private prisma: PrismaService,
    @InjectQueue(Queues.SOURCES_PARSER) private readonly sourceParserQueue: SourcesQueue,
  ) {}

  async count<T extends Prisma.SourceCountArgs>(
    countData: Prisma.SelectSubset<T, Prisma.SourceCountArgs>,
  ) {
    return await this.prisma.source.count(countData);
  }

  async create<T extends Prisma.SourceCreateArgs>(
    createData: Prisma.SelectSubset<T, Prisma.SourceCreateArgs>,
  ) {
    const source = await this.prisma.source.create(createData);
    this.sourceParserQueue.add(this.getSourceParserJobId(source.id), source, {
      // We can use value in milliseconds, but requirements says that I should use cron :<
      repeat: { pattern: this.getCronFromPeriodicity(source.periodicity) },
    });
    return source;
  }

  async delete<T extends Prisma.SourceDeleteArgs>(
    deleteData: Prisma.SelectSubset<T, Prisma.SourceDeleteArgs>,
  ) {
    const source = await this.prisma.source.delete(deleteData);
    this.sourceParserQueue.remove(this.getSourceParserJobId(source.id));
    return source;
  }

  async get<T extends Prisma.SourceFindManyArgs>(
    getData: Prisma.SelectSubset<T, Prisma.SourceFindManyArgs>,
  ) {
    return await this.prisma.source.findMany(getData);
  }

  getCronFromPeriodicity(periodicity: SOURCE_PERIOD) {
    switch (periodicity) {
      case "DAILY":
        return "0 0 * * *";

      case "HOURLY":
        return "0 * * * *";

      default:
        return "0 0 * * *";
    }
  }

  async getOne<T extends Prisma.SourceFindUniqueArgs>(
    getData: Prisma.SelectSubset<T, Prisma.SourceFindUniqueArgs>,
  ) {
    return await this.prisma.source.findUnique(getData);
  }

  getSourceParserJobId(id: string) {
    return Queues.SOURCES_PARSER + "-" + id;
  }

  async onModuleInit() {
    this.sourceParserQueue.drain(true);

    const sources = await this.prisma.source.findMany();
    const bulkData = sources.map(source => {
      return {
        data: source,
        name: this.getSourceParserJobId(source.id),
        options: {
          // We can use value in milliseconds, but requirements says that I should use cron :<
          repeat: { pattern: this.getCronFromPeriodicity(source.periodicity) },
        },
      };
    });

    this.sourceParserQueue.addBulk(bulkData);
  }

  async update<T extends Prisma.SourceUpdateArgs>(
    updateData: Prisma.SelectSubset<T, Prisma.SourceUpdateArgs>,
  ) {
    const source = await this.prisma.source.update(updateData);

    const job = await this.sourceParserQueue.getJob(this.getSourceParserJobId(source.id));

    // TODO: better handling for activation of sources
    // Investigate, if we can pause a job, instead of deletion
    // Maybe, create a separate endpoint for activation
    if (source.isActive) {
      if (job) {
        job.updateData(source);
      } else {
        this.sourceParserQueue.add(this.getSourceParserJobId(source.id), source);
      }
    } else {
      if (job) {
        job.remove();
      }
    }

    return source;
  }
}
