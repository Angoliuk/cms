import { NewsWithTagsSchema } from "@/shared/types";
import { tw } from "@/tailwind";
import { FC } from "react";

import { NewsCard } from "./news-card";

export type NewsListProps = {
  className?: string;
  listClassName?: string;
  newsList: NewsWithTagsSchema[];
};

export const NewsList: FC<NewsListProps> = async ({ className, listClassName, newsList }) => {
  return (
    <div className={className}>
      <div className={tw("mb-6 flex flex-col gap-4", listClassName)}>
        {newsList.map(news => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>
  );
};
