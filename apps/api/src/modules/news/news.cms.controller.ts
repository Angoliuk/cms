import { cmsContract } from "@/cms-shared/api";
import { Prisma } from "@/db";
import { NotFoundError, formatResponse, getPaginatedResponse } from "@/shared/utils";
import { Controller, UseGuards } from "@nestjs/common";
import { TsRest, TsRestHandler, tsRestHandler } from "@ts-rest/nest";

import { AccessTokenGuard } from "../../guards";
import { getPaginationSelectFromQuery } from "../../utils";
import { NewsService } from "./news.service";

@Controller()
@TsRest({ validateResponses: true })
export class CmsNewsController {
  constructor(private newsService: NewsService) {}

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.news.create)
  async create() {
    return tsRestHandler(cmsContract.news.create, async ({ body }) => {
      const news = await this.newsService.create({ data: body });

      return formatResponse(news);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.news.delete)
  async delete() {
    return tsRestHandler(cmsContract.news.delete, async ({ params }) => {
      const news = await this.newsService.update({
        data: { deletedAt: new Date() },
        where: { id: params.newsId },
      });
      return formatResponse(news);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.news.get)
  async get() {
    return tsRestHandler(cmsContract.news.get, async ({ query }) => {
      const { limit, orderBy, page } = query;
      const news = await this.newsService.get({
        orderBy,
        ...getPaginationSelectFromQuery(page, limit),
        include: { tags: true },
      });
      const count = await this.newsService.count({});

      const response = getPaginatedResponse(news, {
        count,
        limit,
        page,
      });

      return formatResponse(response);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.news.getById)
  async getById() {
    return tsRestHandler(cmsContract.news.getById, async ({ params }) => {
      const news = await this.newsService.getOne({ where: { id: params.newsId } });

      if (!news) return formatResponse(new NotFoundError("News not found"));

      return formatResponse(news);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.news.getOptions)
  async getOptions() {
    return tsRestHandler(cmsContract.news.getOptions, async ({ query }) => {
      const { limit, orderBy, page } = query;
      const news = await this.newsService.get({
        orderBy,
        ...getPaginationSelectFromQuery(page, limit),
        select: { id: true, title: true },
      });
      const count = await this.newsService.count({});

      const response = getPaginatedResponse(news, {
        count,
        limit,
        page,
      });

      return formatResponse(response);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.news.update)
  async update() {
    return tsRestHandler(cmsContract.news.update, async ({ body, params }) => {
      const updateData: Prisma.NewsUpdateArgs["data"] = {
        ...body,
        tags: { set: body.tags.map(tagId => ({ id: tagId })) },
      };
      const news = await this.newsService.update({
        data: updateData,
        where: { id: params.newsId },
      });

      return formatResponse(news);
    });
  }
}
