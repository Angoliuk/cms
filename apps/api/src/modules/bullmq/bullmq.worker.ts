import { OnWorkerEvent, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";

export abstract class Worker extends WorkerHost {
  protected readonly logger = new Logger(Worker.name);

  @OnWorkerEvent("active")
  onActive(job: Job) {
    const { id, name, queueName, timestamp } = job;
    const startTime = timestamp ? new Date(timestamp).toISOString() : "";
    this.logger.log(`Job id: ${id}, name: ${name} starts in queue ${queueName} on ${startTime}.`);
  }

  @OnWorkerEvent("completed")
  onCompleted(job: Job) {
    const { finishedOn, id, name, queueName, returnvalue } = job;
    const completionTime = finishedOn ? new Date(finishedOn).toISOString() : "";
    this.logger.log(
      `Job id: ${id}, name: ${name} completed in queue ${queueName} on ${completionTime}. Result: ${returnvalue}`,
    );
  }

  @OnWorkerEvent("failed")
  onFailed(job: Job) {
    const { failedReason, id, name, queueName } = job;
    this.logger.error(
      `Job id: ${id}, name: ${name} failed in queue ${queueName}. Failed reason: ${failedReason}`,
    );
  }

  @OnWorkerEvent("progress")
  onProgress(job: Job) {
    const { id, name, progress } = job;
    this.logger.log(`Job id: ${id}, name: ${name} completes ${progress}%`);
  }
}
