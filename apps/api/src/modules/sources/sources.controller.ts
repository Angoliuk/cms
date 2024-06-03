import { cmsContract } from "@/cms-shared/api";
import { NotFoundError, formatResponse, getPaginatedResponse } from "@/shared/utils";
import { Controller, UseGuards } from "@nestjs/common";
import { TsRest, TsRestHandler, tsRestHandler } from "@ts-rest/nest";

import { AccessTokenGuard } from "../../guards";
import { getPaginationSelectFromQuery } from "../../utils";
import { SourcesService } from "./sources.service";

@Controller()
@TsRest({ validateResponses: true })
export class SourcesController {
  constructor(private sourcesService: SourcesService) {}

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.sources.create)
  async create() {
    return tsRestHandler(cmsContract.sources.create, async ({ body }) => {
      const source = await this.sourcesService.create({ data: body });
      return formatResponse(source);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.sources.delete)
  async delete() {
    return tsRestHandler(cmsContract.sources.delete, async ({ params }) => {
      const source = await this.sourcesService.delete({ where: { id: params.sourceId } });
      return formatResponse(source);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.sources.get)
  async get() {
    return tsRestHandler(cmsContract.sources.get, async ({ query }) => {
      const { limit, orderBy, page } = query;
      const sources = await this.sourcesService.get({
        orderBy,
        ...getPaginationSelectFromQuery(page, limit),
      });
      const count = await this.sourcesService.count({});

      const response = getPaginatedResponse(sources, {
        count,
        limit,
        page,
      });
      return formatResponse(response);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.sources.getById)
  async getById() {
    return tsRestHandler(cmsContract.sources.getById, async ({ params }) => {
      const source = await this.sourcesService.getOne({ where: { id: params.sourceId } });

      if (!source) return formatResponse(new NotFoundError("Source not found"));

      return formatResponse(source);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.sources.update)
  async update() {
    return tsRestHandler(cmsContract.sources.update, async ({ body, params }) => {
      const source = await this.sourcesService.update({
        data: body,
        where: { id: params.sourceId },
      });
      return formatResponse(source);
    });
  }
}
