import { cmsContract } from "@/cms-shared/api";
import { NotFoundError, formatResponse, getPaginatedResponse } from "@/shared/utils";
import { Controller, UseGuards } from "@nestjs/common";
import { TsRest, TsRestHandler, tsRestHandler } from "@ts-rest/nest";

import { AccessTokenGuard } from "../../guards";
import { getPaginationSelectFromQuery } from "../../utils";
import { UsersService } from "./users.service";

@Controller()
@TsRest({ validateResponses: true })
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.users.create)
  async create() {
    return tsRestHandler(cmsContract.users.create, async ({ body }) => {
      const user = await this.usersService.create({ data: body });

      return formatResponse(user);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.users.delete)
  async delete() {
    return tsRestHandler(cmsContract.users.delete, async ({ params }) => {
      const user = await this.usersService.delete({ where: { id: params.userId } });

      return formatResponse(user);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.users.get)
  async get() {
    return tsRestHandler(cmsContract.users.get, async ({ query }) => {
      const { limit, orderBy, page } = query;

      const users = await this.usersService.get({
        orderBy,
        ...getPaginationSelectFromQuery(page, limit),
      });
      const count = await this.usersService.count({});

      const response = getPaginatedResponse(users, {
        count,
        limit,
        page,
      });
      return formatResponse(response);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.users.getById)
  async getById() {
    return tsRestHandler(cmsContract.users.getById, async ({ params }) => {
      const user = await this.usersService.getOne({ where: { id: params.userId } });

      if (!user) return formatResponse(new NotFoundError("User not found"));

      return formatResponse(user);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.users.update)
  async update() {
    return tsRestHandler(cmsContract.users.update, async ({ body, params }) => {
      const user = await this.usersService.update({ data: body, where: { id: params.userId } });

      return formatResponse(user);
    });
  }
}
