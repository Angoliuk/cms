import { Module } from "@nestjs/common";

import { elasticConfig } from "../elasticsearch";
import { MinioModule } from "../minio";
import { PromotionsConfigsModule } from "../promotions-configs";
import { PromotionsController } from "./promotions.controller";
import { PromotionsService } from "./promotions.service";
import { PromotionsElasticService } from "./promotions-elastic.service";

@Module({
  controllers: [PromotionsController],
  exports: [PromotionsService],
  imports: [PromotionsConfigsModule, elasticConfig, MinioModule],
  providers: [PromotionsService, PromotionsElasticService],
})
export class PromotionsModule {}
