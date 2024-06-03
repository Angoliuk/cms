import { TagSchema } from "@/shared/types";
import { tw } from "@/tailwind";
import { FC } from "react";

import { TagCard } from "./tag-card";

export type TagsListProps = {
  className?: string;
  listClassName?: string;
  tagsList: TagSchema[];
};

export const TagsList: FC<TagsListProps> = async ({ className, listClassName, tagsList }) => {
  return (
    <div className={className}>
      <div className={tw("mb-6 flex flex-col gap-4", listClassName)}>
        {tagsList.map(tag => (
          <TagCard key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  );
};
