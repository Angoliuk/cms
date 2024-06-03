import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { cookiesTokens } from "./cookies-tokens";

export const checkIsAuthorized = async () => {
  const cookiesTokensUtils = await cookiesTokens();
  return cookiesTokensUtils.accessTokenCookie.get();
};

export const loggedInProtection = async () => {
  const isAuthorized = await checkIsAuthorized();

  if (isAuthorized) {
    redirect("/sources");
  }
};

export const loggedOutProtection = async () => {
  const isAuthorized = await checkIsAuthorized();

  if (!isAuthorized) {
    redirect("/auth/sign-in");
  }
};
