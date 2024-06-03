import { cmsContract } from "@/cms-shared/api";
import { NotFoundError, formatResponse, getPaginatedResponse } from "@/shared/utils";
import { Controller, UseGuards } from "@nestjs/common";
import { TsRest, TsRestHandler, tsRestHandler } from "@ts-rest/nest";

import { AccessTokenGuard } from "../../guards";
import { getPaginationSelectFromQuery } from "../../utils";
import { PromotionsConfigsService } from "./promotions-configs.service";

@Controller()
@TsRest({ validateResponses: true })
export class PromotionsConfigsController {
  constructor(private promotionsConfigsService: PromotionsConfigsService) {}

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.promotionsConfigs.create)
  async create() {
    return tsRestHandler(cmsContract.promotionsConfigs.create, async ({ body }) => {
      const promotionsConfig = await this.promotionsConfigsService.create({ data: body });

      return formatResponse(promotionsConfig);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.promotionsConfigs.delete)
  async delete() {
    return tsRestHandler(cmsContract.promotionsConfigs.delete, async ({ params }) => {
      const promotionsConfig = await this.promotionsConfigsService.delete({
        where: { id: params.promotionsConfigId },
      });

      return formatResponse(promotionsConfig);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.promotionsConfigs.get)
  async get() {
    return tsRestHandler(cmsContract.promotionsConfigs.get, async ({ query }) => {
      const { limit, page } = query;
      const promotionsConfigs = await this.promotionsConfigsService.get({
        ...getPaginationSelectFromQuery(page, limit),
      });
      const count = await this.promotionsConfigsService.count({});

      const response = getPaginatedResponse(promotionsConfigs, {
        count,
        limit,
        page,
      });
      return formatResponse(response);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.promotionsConfigs.getById)
  async getById() {
    return tsRestHandler(cmsContract.promotionsConfigs.getById, async ({ params }) => {
      const promotionsConfig = await this.promotionsConfigsService.getOne({
        where: { id: params.promotionsConfigId },
      });

      if (!promotionsConfig) {
        return formatResponse(new NotFoundError("Promotions config not found"));
      }

      return formatResponse(promotionsConfig);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.promotionsConfigs.update)
  async update() {
    return tsRestHandler(cmsContract.promotionsConfigs.update, async ({ body, params }) => {
      const promotionsConfig = await this.promotionsConfigsService.update({
        data: body,
        where: { id: params.promotionsConfigId },
      });

      return formatResponse(promotionsConfig);
    });
  }
}
