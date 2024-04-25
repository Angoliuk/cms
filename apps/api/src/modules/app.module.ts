import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { LoggerMiddleware } from "../middlewares";
import { AuthModule } from "./auth";
import { EnvModule } from "./env";
import { NewsModule } from "./news";
import { PrismaModule } from "./prisma";
import { SourcesModule } from "./sources";
import { TagsModule } from "./tags";
import { UsersModule } from "./users";

@Module({
  imports: [PrismaModule, EnvModule, PrismaModule, AuthModule, UsersModule, TagsModule, SourcesModule, NewsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
