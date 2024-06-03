import { NewsWithTagsSchema } from "@/shared/types";
import { CountRequest, SearchRequest } from "@elastic/elasticsearch/lib/api/types";
import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";

import { INDEXES } from "../elasticsearch/elastic.constants";

@Injectable()
export class NewsElasticService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async clear() {
    // Check /apps/api/src/modules/news/news.service.ts
    const indexExists = await this.elasticsearchService.indices.exists({ index: INDEXES.NEWS });
    if (indexExists) {
      await this.elasticsearchService.indices.delete({ index: INDEXES.NEWS });
      await this.elasticsearchService.indices.create({ index: INDEXES.NEWS });
    }
  }

  async delete(newsId: string) {
    await this.elasticsearchService.delete({
      id: newsId,
      index: INDEXES.NEWS,
    });
  }

  async get({ countQuery, searchQuery }: { countQuery: CountRequest; searchQuery: SearchRequest }) {
    const { hits } = await this.elasticsearchService.search<NewsWithTagsSchema>(searchQuery);
    const { count } = await this.elasticsearchService.count(countQuery);

    return {
      count,
      items: hits.hits.reduce((prev, current) => {
        if (current._source) prev.push(current._source);
        return prev;
      }, [] as NewsWithTagsSchema[]),
    };
  }

  async index(news: NewsWithTagsSchema) {
    await this.elasticsearchService.index<NewsWithTagsSchema>({
      document: news,
      index: INDEXES.NEWS,
      refresh: true,
    });
  }

  async indexMany(news: NewsWithTagsSchema[]) {
    const bulkOperations = news.flatMap(newsItem => [
      { index: { _id: newsItem.id, _index: INDEXES.NEWS } },
      newsItem,
    ]);

    await this.elasticsearchService.bulk<NewsWithTagsSchema>({
      operations: bulkOperations,
      refresh: true,
    });
  }

  async update(newsId: string, news: Partial<NewsWithTagsSchema>) {
    await this.elasticsearchService.update<NewsWithTagsSchema>({
      doc: news,
      id: newsId,
      index: INDEXES.NEWS,
    });
  }
}
