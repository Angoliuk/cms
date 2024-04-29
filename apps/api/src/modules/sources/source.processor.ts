import { Processor } from "@nestjs/bullmq";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Job } from "bullmq";

import { Queues, Worker } from "../bullmq";

@Processor(Queues.SOURCES_PARSER)
@Injectable()
export class SourcesProcessor extends Worker {
  async process(job: Job<unknown, number, string>) {
    console.log("handling task", job.id);
    return 1;

    throw new BadRequestException(`Unknown job name: ${job.name}`);
  }
}
