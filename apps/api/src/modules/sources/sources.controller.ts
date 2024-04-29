import { contract } from "@/shared/api";
import { NotFoundError, formatResponse, getPaginatedResponse } from "@/shared/utils";
import { Controller } from "@nestjs/common";
import { TsRest, TsRestHandler, tsRestHandler } from "@ts-rest/nest";

import { SourcesService } from "./sources.service";

@Controller()
@TsRest({ validateResponses: true })
export class SourcesController {
  constructor(private sourcesService: SourcesService) {}

  @TsRestHandler(contract.sources.create)
  async create() {
    return tsRestHandler(contract.sources.create, async ({ body }) => {
      const source = await this.sourcesService.create({ data: body });
      return formatResponse(source);
    });
  }

  @TsRestHandler(contract.sources.delete)
  async delete() {
    return tsRestHandler(contract.sources.delete, async ({ params }) => {
      const source = await this.sourcesService.delete({ where: { id: params.sourceId } });
      return formatResponse(source);
    });
  }

  @TsRestHandler(contract.sources.get)
  async get() {
    return tsRestHandler(contract.sources.get, async ({ query }) => {
      const { limit, orderBy, page } = query;
      const sources = await this.sourcesService.get({ orderBy, skip: page, take: limit });

      const response = getPaginatedResponse(sources, {
        limit,
        page,
      });
      return formatResponse(response);
    });
  }

  @TsRestHandler(contract.sources.getById)
  async getById() {
    return tsRestHandler(contract.sources.getById, async ({ params }) => {
      const source = await this.sourcesService.getOne({ where: { id: params.sourceId } });

      if (!source) return formatResponse(new NotFoundError("Source not found"));

      return formatResponse(source);
    });
  }

  @TsRestHandler(contract.sources.update)
  async update() {
    return tsRestHandler(contract.sources.update, async ({ body, params }) => {
      const source = await this.sourcesService.update({ data: body, where: { id: params.sourceId } });
      return formatResponse(source);
    });
  }
}
