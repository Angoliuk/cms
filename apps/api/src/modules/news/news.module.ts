import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma";
import { NewsService } from "./news.service";

@Module({
  exports: [NewsService],
  imports: [PrismaModule],
  providers: [NewsService],
})
export class NewsModule {}
