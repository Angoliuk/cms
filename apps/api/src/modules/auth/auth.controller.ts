import { cmsContract } from "@/cms-shared/api";
import { ForbiddenError, formatResponse } from "@/shared/utils";
import { Controller, Req, Res, UseGuards } from "@nestjs/common";
import { TsRest, TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { Request, Response } from "express";

import { GetUser } from "../../decorators";
import { AccessTokenGuard, RefreshTokenGuard } from "../../guards";
import { TokenUser } from "../../validation";
import { AuthService } from "./auth.service";

@Controller()
@TsRest({ validateResponses: true })
export class AuthController {
  constructor(private authService: AuthService) {}

  @TsRestHandler(cmsContract.auth.logout)
  async logout(@Res({ passthrough: true }) res: Response) {
    return tsRestHandler(cmsContract.auth.logout, async () => {
      const logoutResponse = await this.authService.logout();
      await this.authService.removeTokensFromCookies({ res });
      return formatResponse(logoutResponse);
    });
  }

  @UseGuards(AccessTokenGuard)
  @TsRestHandler(cmsContract.auth.me)
  async me(
    @GetUser()
    user: TokenUser,
  ) {
    return tsRestHandler(cmsContract.auth.me, async () => {
      const meResponse = await this.authService.me(user.userId);
      return formatResponse(meResponse);
    });
  }

  @UseGuards(RefreshTokenGuard)
  @TsRestHandler(cmsContract.auth.refreshTokens)
  async refreshTokens(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    return tsRestHandler(cmsContract.auth.refreshTokens, async () => {
      if (!req.user) return formatResponse(new ForbiddenError("Wrong user"));

      const refreshTokensResponse = await this.authService.signTokens({
        userId: req.user.userId,
      });

      this.authService.addTokensToCookies({
        accessToken: refreshTokensResponse.accessToken,
        refreshToken: refreshTokensResponse.refreshToken,
        res,
      });

      return formatResponse(refreshTokensResponse);
    });
  }

  @TsRestHandler(cmsContract.auth.signIn)
  async signIn(@Res({ passthrough: true }) res: Response) {
    return tsRestHandler(cmsContract.auth.signIn, async ({ body }) => {
      const signedInUser = await this.authService.signIn(body);

      if ("accessToken" in signedInUser) {
        this.authService.addTokensToCookies({
          accessToken: signedInUser.accessToken,
          refreshToken: signedInUser.refreshToken,
          res,
        });
      }

      return formatResponse(signedInUser);
    });
  }

  @TsRestHandler(cmsContract.auth.signUp)
  async signUp(@Res({ passthrough: true }) res: Response) {
    return tsRestHandler(cmsContract.auth.signUp, async ({ body }) => {
      const signedUpUser = await this.authService.signUp(body);

      if ("accessToken" in signedUpUser) {
        this.authService.addTokensToCookies({
          accessToken: signedUpUser.accessToken,
          refreshToken: signedUpUser.refreshToken,
          res,
        });
      }

      return formatResponse(signedUpUser);
    });
  }
}
