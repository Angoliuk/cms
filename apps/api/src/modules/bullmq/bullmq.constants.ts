import { Source } from "@prisma/client";
import { Job, Queue } from "bullmq";

export enum Queues {
  SOURCES_PARSER = "sources-parser",
}

export type SourcesQueue = Queue<Source, void>;
export type SourcesJob = Job<Source, void>;
