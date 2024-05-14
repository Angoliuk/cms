import { initContract } from "@ts-rest/core";

import { newsContract } from "./news-contract";

const c = initContract();

export const webContract = c.router(
  {
    news: newsContract(c),
  },
  {
    pathPrefix: "/api/web",
    strictStatusCodes: true,
  },
);
