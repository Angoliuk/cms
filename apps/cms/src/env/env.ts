import { cleanEnv, url } from "envalid";

export class Environment {
  public static config(env: unknown) {
    return cleanEnv(env, {
      NEXT_PUBLIC_API_BASE_URL: url({
        default: "http://api:8080",
        desc: "API url",
        example: "http://api:8080",
      }),
    });
  }
}
