import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma";
import { TagsService } from "./tags.service";

@Module({
  exports: [TagsService],
  imports: [PrismaModule],
  providers: [TagsService],
})
export class TagsModule {}
