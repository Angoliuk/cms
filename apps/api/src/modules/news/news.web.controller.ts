import {
  ListPromotionSchema,
  NewsWithTagsSchema,
  SearchPromotionSchema,
  listPromotionSchema,
  searchPromotionSchema,
} from "@/shared/types";
import {
  NotFoundError,
  ServerError,
  formatResponse,
  getPaginatedResponse,
  range,
} from "@/shared/utils";
import { webContract } from "@/web-shared/api";
import { SearchRequest } from "@elastic/elasticsearch/lib/api/types";
import { Controller } from "@nestjs/common";
import { TsRest, TsRestHandler, tsRestHandler } from "@ts-rest/nest";

import { getElasticNewsQuery } from "../../utils/elastic-queries";
import { INDEXES } from "../elasticsearch";
import { PromotionsService } from "../promotions";
import { NewsService } from "./news.service";
import { NewsElasticService } from "./news-elastic.service";

@Controller()
@TsRest({ validateResponses: true })
export class WebNewsController {
  constructor(
    private newsService: NewsService,
    private newsElasticService: NewsElasticService,
    private promotionsService: PromotionsService,
  ) {}
  @TsRestHandler(webContract.news.getById)
  async getById() {
    return tsRestHandler(webContract.news.getById, async ({ params }) => {
      const news = await this.newsService.getOne({
        include: { tags: true },
        where: { id: params.newsId },
      });

      if (!news) return formatResponse(new NotFoundError("News not found"));

      return formatResponse(news);
    });
  }

  @TsRestHandler(webContract.news.getForList)
  async getForList() {
    return tsRestHandler(
      webContract.news.getForList,
      async ({ query: { limit, orderBy, page, tags } }) => {
        const promotions = await this.promotionsService.getPromotionsForNewsList();

        const newsLimit = limit - promotions.length;

        const searchResult = await this.newsElasticService.get(
          getElasticNewsQuery({ limit: newsLimit, onlyVisible: true, orderBy, page, tags }),
        );

        const newsWithPromotions: (ListPromotionSchema | NewsWithTagsSchema)[] = searchResult.items;

        for (const promotion of promotions) {
          const validatedPromotion = listPromotionSchema.safeParse(promotion);

          if (!validatedPromotion.success)
            return formatResponse(new ServerError("invalid promotion"));

          const index = range(
            Math.ceil(validatedPromotion.data.priority / (100 / limit)) - 1,
            0,
            limit - 1,
          );

          newsWithPromotions.splice(index, 0, validatedPromotion.data);
        }

        const totalNewsPages = Math.max(Math.ceil(searchResult.count / limit), 1);
        const newsAndPromotionsCount = promotions.length * totalNewsPages + searchResult.count;

        const response = getPaginatedResponse(searchResult.items, {
          count: newsAndPromotionsCount,
          limit,
          page,
        });

        return formatResponse(response);
      },
    );
  }

  @TsRestHandler(webContract.news.getForSearch)
  async getForSearch() {
    return tsRestHandler(
      webContract.news.getForSearch,
      async ({ query: { limit, orderBy, page, search = "" } }) => {
        const promotions = await this.promotionsService.getPromotionsForNewsSearch({ search });

        const validPromotions: (NewsWithTagsSchema | SearchPromotionSchema)[] = [];

        for (const promotion of promotions) {
          const validatedPromotion = searchPromotionSchema.safeParse(promotion);

          if (!validatedPromotion.success)
            return formatResponse(new ServerError("invalid promotion"));

          validPromotions.push(validatedPromotion.data);
        }

        const newsLimit = limit - promotions.length;

        const searchResult = await this.newsElasticService.get(
          getElasticNewsQuery({ limit: newsLimit, onlyVisible: true, orderBy, page, search }),
        );

        const totalNewsPages = Math.max(Math.ceil(searchResult.count / limit), 1);
        const newsAndPromotionsCount = promotions.length * totalNewsPages + searchResult.count;

        const response = getPaginatedResponse(validPromotions.concat(searchResult.items), {
          count: newsAndPromotionsCount,
          limit,
          page,
        });

        return formatResponse(response);
      },
    );
  }
}
