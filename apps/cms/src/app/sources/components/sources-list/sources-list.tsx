import { SourceSchema } from "@/shared/types";
import { tw } from "@/tailwind";
import { FC } from "react";

import { SourceCard } from "./source-card";

export type SourcesListProps = {
  className?: string;
  listClassName?: string;
  sourcesList: SourceSchema[];
};

export const SourcesList: FC<SourcesListProps> = async ({
  className,
  listClassName,
  sourcesList,
}) => {
  return (
    <div className={className}>
      <div className={tw("mb-6 flex flex-col gap-4", listClassName)}>
        {sourcesList.map(source => (
          <SourceCard key={source.id} source={source} />
        ))}
      </div>
    </div>
  );
};
