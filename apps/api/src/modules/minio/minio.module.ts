import { Module } from "@nestjs/common";

import { MinioService } from "./minio.service";

@Module({
  exports: [MinioService],
  imports: [],
  providers: [MinioService],
})
export class MinioModule {}
