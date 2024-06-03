import { cmsContract } from "@/cms-shared/api";
import { NotFoundError, formatResponse, getPaginatedResponse } from "@/shared/utils";
import { Controller, UseGuards } from "@nestjs/common";
import { TsRest, TsRestHandler, tsRestHandler } from "@ts-rest/nest";

import { AccessTokenGuard } from "../../guards";
import { getPaginationSelectFromQuery } from "../../utils";
import { TagsService } from "./tags.service";

@Controller()
@TsRest({ validateResponses: true })
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.tags.create)
  async create() {
    return tsRestHandler(cmsContract.tags.create, async ({ body }) => {
      const tag = await this.tagsService.create({ data: body });

      return formatResponse(tag);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.tags.delete)
  async delete() {
    return tsRestHandler(cmsContract.tags.delete, async ({ params }) => {
      const tag = await this.tagsService.delete({ where: { id: params.tagId } });

      return formatResponse(tag);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.tags.get)
  async get() {
    return tsRestHandler(cmsContract.tags.get, async ({ query }) => {
      const { limit, orderBy, page } = query;
      const tags = await this.tagsService.get({
        orderBy,
        ...getPaginationSelectFromQuery(page, limit),
      });
      const count = await this.tagsService.count({});

      const response = getPaginatedResponse(tags, {
        count,
        limit,
        page,
      });
      return formatResponse(response);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.tags.getById)
  async getById() {
    return tsRestHandler(cmsContract.tags.getById, async ({ params }) => {
      const tag = await this.tagsService.getOne({ where: { id: params.tagId } });

      if (!tag) return formatResponse(new NotFoundError("Tag not found"));

      return formatResponse(tag);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.tags.update)
  async update() {
    return tsRestHandler(cmsContract.tags.update, async ({ body, params }) => {
      const tag = await this.tagsService.update({ data: body, where: { id: params.tagId } });

      return formatResponse(tag);
    });
  }
}
