"use server";
import { cookiesUtil } from "@/ui-shared/utils";

export const cookiesTokens = async () => ({
  accessToken: cookiesUtil<string>("accessToken"),
  refreshToken: cookiesUtil<string>("refreshToken"),
});
