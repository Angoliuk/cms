import { NewsWithTagsIdsSchema } from "@/shared/types";
import { tw } from "@/tailwind";
import { FC } from "react";

import { NewsCard } from "./news-card";
import { NewsPagination, NewsPaginationProps } from "./news-pagination";

export type NewsListProps = {
  className?: string;
  listClassName?: string;
  newsList: NewsWithTagsIdsSchema[];
} & NewsPaginationProps;

export const NewsList: FC<NewsListProps> = async ({ className, listClassName, newsList, pagination }) => {
  return (
    <div className={className}>
      <div className={tw("mb-6 flex flex-col gap-4", listClassName)}>
        {newsList.map(news => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
      <NewsPagination pagination={pagination} />
    </div>
  );
};
