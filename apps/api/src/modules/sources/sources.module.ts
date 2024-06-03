import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";

import { Queues } from "../bullmq";
import { MinioModule } from "../minio";
import { NewsModule } from "../news";
import { SourcesProcessor } from "./source.processor";
import { SourcesController } from "./sources.controller";
import { SourcesService } from "./sources.service";

@Module({
  controllers: [SourcesController],
  exports: [SourcesService],
  imports: [
    NewsModule,
    BullModule.registerQueue({
      name: Queues.SOURCES_PARSER,
    }),
    MinioModule,
  ],
  providers: [SourcesService, SourcesProcessor],
})
export class SourcesModule {}
