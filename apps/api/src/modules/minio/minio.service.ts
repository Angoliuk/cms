import { Injectable, OnModuleInit } from "@nestjs/common";
import * as Minio from "minio";
import { v4 as uuidv4 } from "uuid";

import { EnvService } from "../env";
import { BUCKETS, Buckets, MinioFile } from "./minio.constants";

@Injectable()
export class MinioService implements OnModuleInit {
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

  async deleteFile(bucketName: Buckets, fileName: string) {
    await this.minioClient.removeObject(bucketName, fileName);
  }

  async getFile(bucketName: Buckets, fileName: string) {
    return await this.minioClient.getObject(bucketName, fileName);
  }

  async getFileUrl(bucketName: Buckets, fileName: string) {
    return await this.minioClient.presignedGetObject(bucketName, fileName);
  }

  async onModuleInit() {
    console.log("Buckets: ", await this.minioClient.listBuckets());
    for (const bucket of BUCKETS) {
      const bucketExists = await this.minioClient.bucketExists(bucket);
      if (!bucketExists) {
        await this.minioClient.makeBucket(bucket);
      }
    }
  }

  async updateFile(bucketName: Buckets, fileName: string, file: MinioFile) {
    await this.deleteFile(bucketName, fileName);
    return await this.uploadFile(bucketName, file);
  }

  async uploadFile(bucketName: Buckets, file: MinioFile) {
    const fileName = `${uuidv4()}-${file.originalname}`;

    await this.minioClient.putObject(bucketName, fileName, file.buffer);

    return { fileName };
  }
}
