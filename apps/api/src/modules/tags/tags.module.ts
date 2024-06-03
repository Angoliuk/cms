import { Module } from "@nestjs/common";

import { TagsController } from "./tags.controller";
import { TagsService } from "./tags.service";

@Module({
  controllers: [TagsController],
  exports: [TagsService],
  imports: [],
  providers: [TagsService],
})
export class TagsModule {}
