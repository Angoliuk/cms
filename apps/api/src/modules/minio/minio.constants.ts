import { ArrayElement } from "@/shared/types";

export type Buckets = ArrayElement<typeof BUCKETS>;
export const BUCKETS = ["promotion-images"] as const;

export type MinioFile = {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
};
