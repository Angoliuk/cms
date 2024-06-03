import { NewsWithTagsSchema } from "@/shared/types";
import { Badge } from "@/ui-shared/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/ui-shared/components/card";
import Image from "next/image";
import { FC } from "react";

import { DeleteNewsContainer } from "../delete-news";
import { UpdateNewsContainer } from "../update-news";

export type NewsCardProps = { news: NewsWithTagsSchema };

export const NewsCard: FC<NewsCardProps> = async ({ news }) => {
  return (
    <Card key={news.id}>
      <CardHeader>
        <p>
          {news.title}
          {news.isDraft && " (Draft)"}
          {news.visibility === "HIDDEN" && " (Hidden)"}
          {news.deletedAt && " (Deleted)"}
        </p>
        <div className="my-2 flex justify-between border-b border-t py-2">
          <p>{news.originalPublicationDate.toDateString()}</p>
          <a className="underline" href={news.originalLink}>
            Origin
          </a>
        </div>
        <div className="flex gap-4">
          {news.tags.map(tag => (
            <Badge key={tag.id}>{tag.name}</Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex flex-row gap-6">
        {!!news.imageLink && (
          <Image alt="News main image" height={150} src={news.imageLink} width={300} />
        )}
        <CardDescription>{news.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex gap-4">
        {!news.deletedAt && (
          <>
            <DeleteNewsContainer newsId={news.id} />
            <UpdateNewsContainer
              defaultValues={{
                ...news,
                tags: news.tags.map(tag => ({ label: tag.name, value: tag.id })),
              }}
              newsId={news.id}
            />
          </>
        )}
      </CardFooter>
    </Card>
  );
};
