import { TagSchema } from "@/shared/types";
import { Card, CardFooter, CardHeader } from "@/ui-shared/components/card";
import { FC } from "react";

import { DeleteTagContainer } from "../delete-tag";
import { UpdateTagContainer } from "../update-tag";

export type TagCardProps = { tag: TagSchema };

export const TagCard: FC<TagCardProps> = async ({ tag }) => {
  return (
    <Card key={tag.id}>
      <CardHeader className="flex-row justify-between">
        <p>{tag.name}</p>
        <p>{tag.createdAt.toDateString()}</p>
      </CardHeader>
      <CardFooter className="gap-4">
        <DeleteTagContainer tagId={tag.id} />
        <UpdateTagContainer defaultValues={tag} tagId={tag.id} />
      </CardFooter>
    </Card>
  );
};
