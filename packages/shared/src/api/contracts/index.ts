import { initContract } from "@ts-rest/core";

import { authContract } from "./auth-contract";
import { sourcesContract } from "./sources-contract";
import { tagsContract } from "./tags-contract";
import { usersContract } from "./users-contract";

const c = initContract();

export const contract = c.router(
  {
    auth: authContract(c),
    sources: sourcesContract(c),
    tags: tagsContract(c),
    users: usersContract(c),
  },
  {
    pathPrefix: "/api",
    strictStatusCodes: true,
  },
);
