import { Prisma } from "@/db";
import { Processor } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import Parser from "rss-parser";

import { getFileFromUrl } from "../../utils";
import { Queues, SourcesJob, Worker } from "../bullmq";
import { MinioService } from "../minio";
import { NewsService } from "../news";

const parser = new Parser();

const getObjectValueIfExists = (
  object: Record<string, unknown>,
  key: null | string | undefined,
) => {
  return key && object && object[key] ? String(object[key]) : "";
};

@Processor(Queues.SOURCES_PARSER)
@Injectable()
export class SourcesProcessor extends Worker {
  constructor(
    private readonly newsService: NewsService,
    private readonly minioService: MinioService,
  ) {
    super();
  }

  async process(job: SourcesJob) {
    try {
      console.log("handling task", job.id);
      const source = job.data;

      const feed = await parser.parseURL(source.url);

      const newsToCreate: Prisma.NewsCreateManyInput[] = [];

      for (const feedItem of feed.items) {
        const baseNews: Prisma.NewsCreateManyInput = {
          description: getObjectValueIfExists(feedItem, source.descriptionKey),
          externalId: getObjectValueIfExists(feedItem, source.idKey),
          isDraft: false,
          originalLink: getObjectValueIfExists(feedItem, source.linkKey),
          originalPublicationDate: getObjectValueIfExists(feedItem, source.publicationDateKey),
          title: getObjectValueIfExists(feedItem, source.titleKey),
          visibility: "VISIBLE",
        };

        const originalFileLink = getObjectValueIfExists(feedItem, source.imageLinkKey);
        if (!originalFileLink) {
          newsToCreate.push(baseNews);
          continue;
        }

        const file = await getFileFromUrl(source.name, originalFileLink);
        if (!file) {
          newsToCreate.push(baseNews);
          continue;
        }

        const { fileName } = await this.minioService.uploadFile("promotion-images", file);
        const imageLink = await this.minioService.getFileUrl("promotion-images", fileName);

        newsToCreate.push({
          ...baseNews,
          imageLink,
        });
      }

      this.newsService.createMany(newsToCreate);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
