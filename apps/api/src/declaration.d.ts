import { EnvSchema, TokenUser } from "./validation";

declare global {
  namespace Express {
    export type User = TokenUser;
  }

  namespace NodeJS {
    export type ProcessEnv = EnvSchema;
  }
}
