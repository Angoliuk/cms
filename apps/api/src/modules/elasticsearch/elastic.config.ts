import { ElasticsearchModule } from "@nestjs/elasticsearch";

export const elasticConfig = ElasticsearchModule.register({
  node: process.env.ELASTIC_URL ?? "http://elasticsearch:9200",
});
