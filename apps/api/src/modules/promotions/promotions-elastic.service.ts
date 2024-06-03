import { PromotionSchema } from "@/shared/types";
import { CountRequest, SearchRequest } from "@elastic/elasticsearch/lib/api/typesWithBodyKey";
import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";

import { INDEXES } from "../elasticsearch/elastic.constants";

@Injectable()
export class PromotionsElasticService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async clear() {
    // Check /apps/api/src/modules/promotions/promotions.service.ts
    const indexExists = await this.elasticsearchService.indices.exists({
      index: INDEXES.PROMOTIONS,
    });
    if (indexExists) {
      await this.elasticsearchService.indices.delete({ index: INDEXES.PROMOTIONS });
      await this.elasticsearchService.indices.create({ index: INDEXES.PROMOTIONS });
    }
  }

  async delete(promotionId: string) {
    await this.elasticsearchService.delete({
      id: promotionId,
      index: INDEXES.PROMOTIONS,
    });
  }

  async get({ countQuery, searchQuery }: { countQuery: CountRequest; searchQuery: SearchRequest }) {
    const { hits } = await this.elasticsearchService.search<PromotionSchema>(searchQuery);
    const { count } = await this.elasticsearchService.count(countQuery);

    return {
      count,
      items: hits.hits.reduce((prev, current) => {
        if (current._source) prev.push(current._source);
        return prev;
      }, [] as PromotionSchema[]),
    };
  }

  async index(promotion: PromotionSchema) {
    await this.elasticsearchService.index<PromotionSchema>({
      document: promotion,
      id: promotion.id,
      index: INDEXES.PROMOTIONS,
      refresh: true,
    });
  }

  async indexMany(promotions: PromotionSchema[]) {
    const bulkOperations = promotions.flatMap(promotionsItem => [
      { index: { _id: promotionsItem.id, _index: INDEXES.PROMOTIONS } },
      promotionsItem,
    ]);

    await this.elasticsearchService.bulk<PromotionSchema>({
      operations: bulkOperations,
      refresh: true,
    });
  }

  async update(promotionId: string, promotion: Partial<PromotionSchema>) {
    await this.elasticsearchService.update<PromotionSchema>({
      doc: promotion,
      id: promotionId,
      index: INDEXES.PROMOTIONS,
    });
  }
}
