import { Module } from "@nestjs/common";

import { elasticConfig } from "../elasticsearch";
import { PromotionsModule } from "../promotions";
import { CmsNewsController } from "./news.cms.controller";
import { NewsService } from "./news.service";
import { WebNewsController } from "./news.web.controller";
import { NewsElasticService } from "./news-elastic.service";

@Module({
  controllers: [CmsNewsController, WebNewsController],
  exports: [NewsService, NewsElasticService],
  imports: [elasticConfig, PromotionsModule],
  providers: [NewsService, NewsElasticService],
})
export class NewsModule {}
