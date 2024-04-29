import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";

import { Queues } from "../bullmq";
import { PrismaModule } from "../prisma";
import { SourcesProcessor } from "./source.processor";
import { SourcesController } from "./sources.controller";
import { SourcesService } from "./sources.service";

@Module({
  controllers: [SourcesController],
  exports: [SourcesService],
  imports: [
    PrismaModule,
    BullModule.registerQueue({
      name: Queues.SOURCES_PARSER,
    }),
  ],
  providers: [SourcesService, SourcesProcessor],
})
export class SourcesModule {}
