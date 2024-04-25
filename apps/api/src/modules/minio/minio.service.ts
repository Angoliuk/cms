import { Injectable } from "@nestjs/common";
import * as Minio from "minio";

import { EnvService } from "../env";

@Injectable()
export class MinioService {
  private readonly minioClient: Minio.Client;

  constructor(private envService: EnvService) {
    this.minioClient = new Minio.Client({
      accessKey: this.envService.get("MINIO_ACCESS_TOKEN"),
      endPoint: this.envService.get("MINIO_ENDPOINT"),
      port: this.envService.get("MINIO_PORT"),
      secretKey: this.envService.get("MINIO_REFRESH_TOKEN"),
      useSSL: false,
    });
  }

  async create() {
    return;
  }

  async delete() {
    return;
  }

  async find() {
    return;
  }

  async findOne() {
    return;
  }

  async onModuleInit() {
    return;
  }

  async update() {
    return;
  }
}
