import { BullModule } from "@nestjs/bullmq";

export const BullMQConfig = BullModule.forRoot({
  connection: {
    host: "localhost",
    port: 6379,
  },
  defaultJobOptions: {
    attempts: 3,
    removeOnComplete: 1000,
    removeOnFail: 5000,
  },
});

export enum Queues {
  SOURCES_PARSER = "sources-parser",
}
