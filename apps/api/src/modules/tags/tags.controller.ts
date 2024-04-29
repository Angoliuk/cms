import { contract } from "@/shared/api";
import { NotFoundError, formatResponse, getPaginatedResponse } from "@/shared/utils";
import { Controller } from "@nestjs/common";
import { TsRest, TsRestHandler, tsRestHandler } from "@ts-rest/nest";

import { TagsService } from "./tags.service";

@Controller()
@TsRest({ validateResponses: true })
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @TsRestHandler(contract.tags.create)
  async create() {
    return tsRestHandler(contract.tags.create, async ({ body }) => {
      const tag = await this.tagsService.create({ data: body });

      return formatResponse(tag);
    });
  }

  @TsRestHandler(contract.tags.delete)
  async delete() {
    return tsRestHandler(contract.tags.delete, async ({ params }) => {
      const tag = await this.tagsService.delete({ where: { id: params.tagId } });

      return formatResponse(tag);
    });
  }

  @TsRestHandler(contract.tags.get)
  async get() {
    return tsRestHandler(contract.tags.get, async ({ query }) => {
      const { limit, orderBy, page } = query;
      const tags = await this.tagsService.get({ orderBy, skip: page, take: limit });

      const response = getPaginatedResponse(tags, {
        limit,
        page,
      });
      return formatResponse(response);
    });
  }

  @TsRestHandler(contract.tags.getById)
  async getById() {
    return tsRestHandler(contract.tags.getById, async ({ params }) => {
      const tag = await this.tagsService.getOne({ where: { id: params.tagId } });

      if (!tag) return formatResponse(new NotFoundError("Tag not found"));

      return formatResponse(tag);
    });
  }

  @TsRestHandler(contract.tags.update)
  async update() {
    return tsRestHandler(contract.tags.update, async ({ body, params }) => {
      const tag = await this.tagsService.update({ data: body, where: { id: params.tagId } });

      return formatResponse(tag);
    });
  }
}
