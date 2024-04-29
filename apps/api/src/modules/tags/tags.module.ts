import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma";
import { TagsController } from "./tags.controller";
import { TagsService } from "./tags.service";

@Module({
  controllers: [TagsController],
  exports: [TagsService],
  imports: [PrismaModule],
  providers: [TagsService],
})
export class TagsModule {}
