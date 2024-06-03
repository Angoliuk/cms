import { SourceSchema } from "@/shared/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/ui-shared/components/card";
import { FC } from "react";

import { DeleteSourceContainer } from "../delete-source";
import { UpdateSourceContainer } from "../update-source";

export type SourceCardProps = { source: SourceSchema };

export const SourceCard: FC<SourceCardProps> = async ({ source }) => {
  return (
    <Card>
      <CardHeader className="flex-row justify-between">
        <p>
          {source.name}
          {source.isActive ? " (Active)" : " (Disabled)"}
        </p>
        <p>{source.periodicity}</p>
      </CardHeader>
      <CardContent>
        <CardDescription>{source.url}</CardDescription>
      </CardContent>
      <CardFooter className="gap-4">
        <DeleteSourceContainer sourceId={source.id} />
        <UpdateSourceContainer defaultValues={source} sourceId={source.id} />
      </CardFooter>
    </Card>
  );
};
