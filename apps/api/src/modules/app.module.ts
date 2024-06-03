import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { LoggerMiddleware } from "../middlewares";
import { AuthModule } from "./auth";
import { BullMQConfig } from "./bullmq";
import { EnvModule } from "./env";
import { MinioModule } from "./minio";
import { NewsModule } from "./news";
import { PrismaModule } from "./prisma";
import { PromotionsModule } from "./promotions";
import { SourcesModule } from "./sources";
import { TagsModule } from "./tags";
import { UsersModule } from "./users";

@Module({
  imports: [
    PrismaModule,
    EnvModule,
    AuthModule,
    NewsModule,
    UsersModule,
    TagsModule,
    SourcesModule,
    PromotionsModule,
    NewsModule,
    MinioModule,
    BullMQConfig,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
