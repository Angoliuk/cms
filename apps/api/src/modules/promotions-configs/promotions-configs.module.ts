import { Module } from "@nestjs/common";

import { PromotionsConfigsController } from "./promotions-configs.controller";
import { PromotionsConfigsService } from "./promotions-configs.service";

@Module({
  controllers: [PromotionsConfigsController],
  exports: [PromotionsConfigsService],
  imports: [],
  providers: [PromotionsConfigsService],
})
export class PromotionsConfigsModule {}
