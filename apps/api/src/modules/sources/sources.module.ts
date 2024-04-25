import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma";
import { SourcesService } from "./sources.service";

@Module({
  exports: [SourcesService],
  imports: [PrismaModule],
  providers: [SourcesService],
})
export class SourcesModule {}
