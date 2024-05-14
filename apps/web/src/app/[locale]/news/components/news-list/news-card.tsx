import { NewsWithTagsIdsSchema } from "@/shared/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/ui-shared/components/card";
import Image from "next/image";
import { FC } from "react";

export type NewsCardProps = { news: NewsWithTagsIdsSchema };

export const NewsCard: FC<NewsCardProps> = async ({ news }) => {
  return (
    <Card key={news.id}>
      <CardHeader>
        <p>{news.title}</p>
        {news.tags.map(tag => tag)}
      </CardHeader>
      <CardContent>
        {!!news.imageLink && <Image alt="News main image" height={150} src={news.imageLink} width={300} />}
        <CardDescription>
          <p>{news.description}</p>
        </CardDescription>
      </CardContent>
      <CardFooter>
        <p>{news.originalLink}</p>
        <p>{news.originalPublicationDate.toDateString()}</p>
      </CardFooter>
    </Card>
  );
};
