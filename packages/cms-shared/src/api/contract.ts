import { initContract } from "@ts-rest/core";

import { authContract } from "./auth-contract";
import { newsContract } from "./news-contract";
import { promotionsConfigsContract } from "./promotions-configs-contract";
import { promotionsContract } from "./promotions-contract";
import { sourcesContract } from "./sources-contract";
import { tagsContract } from "./tags-contract";
import { usersContract } from "./users-contract";

const c = initContract();

export const cmsContract = c.router(
  {
    auth: authContract(c),
    news: newsContract(c),
    promotions: promotionsContract(c),
    promotionsConfigs: promotionsConfigsContract(c),
    sources: sourcesContract(c),
    tags: tagsContract(c),
    users: usersContract(c),
  },
  {
    pathPrefix: "/api/cms",
    strictStatusCodes: true,
  },
);
