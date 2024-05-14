import { Card } from "@/ui-shared/components/card";
import { PageWrapper } from "@/ui-shared/components/page-wrapper";

import { TagsSearchInput } from "../../../../components/tags-search-input";
import { api } from "../../../../utils";
import { NewsList } from "../components/news-list";

export type NewsTagSearchPageProps = {
  searchParams: {
    page?: string;
    tags?: string;
  };
};

export default async function NewsTagSearchPage({ searchParams }: NewsTagSearchPageProps) {
  const news = await api.news.get({
    query: {
      page: searchParams?.page ? Number(searchParams?.page) : 1,
      tags: searchParams?.tags?.length ? searchParams?.tags?.split(";") : undefined,
    },
  });

  if (news.status !== 200) {
    return <p>not found</p>;
  }

  const { items, pagination } = news.body;

  return (
    <PageWrapper contentWrapperClassName="justify-center items-center" isHeaderShown={false}>
      <Card className="w-full max-w-7xl px-6 py-4">
        <p className="text-headlineS mb-4 text-center">News tag search</p>
        <TagsSearchInput />
        <NewsList className="mt-6" newsList={items} pagination={pagination} />
      </Card>
    </PageWrapper>
  );
}
