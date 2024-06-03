import { BullModule } from "@nestjs/bullmq";

export const BullMQConfig = BullModule.forRoot({
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  defaultJobOptions: {
    attempts: 3,
    removeOnComplete: 10,
    removeOnFail: 100,
  },
});
