import { NewsWithTagsSchema } from "@/shared/types";
import { Badge } from "@/ui-shared/components/badge";
import { Card, CardContent, CardDescription, CardHeader } from "@/ui-shared/components/card";
import Image from "next/image";
import { FC } from "react";

export type NewsCardProps = { news: NewsWithTagsSchema };

export const NewsCard: FC<NewsCardProps> = async ({ news }) => {
  return (
    <Card key={news.id}>
      <CardHeader>
        <p>{news.title}</p>
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
    </Card>
  );
};
