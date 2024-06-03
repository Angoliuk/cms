import { Card } from "@/ui-shared/components/card";
import { PageWrapper } from "@/ui-shared/components/page-wrapper";

import { api } from "../../utils/api";
import { NewsList } from "./components/news-list";

export type NewsPageProps = {
  searchParams: {
    page?: string;
    search?: string;
  };
};

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const { body: newsResponse, status } = await api.news.getForList({
    query: {
      page: searchParams?.page ? Number(searchParams?.page) : 1,
    },
  });

  if (status !== 200) {
    return (
      <PageWrapper contentWrapperClassName="items-center" isHeaderShown={false}>
        <Card className="mt-12 w-full max-w-7xl px-6 py-4">
          <p className="text-headlineS mb-4 text-center">News main page</p>
          <p className="text-headlineS mb-4 text-center">News not found</p>
        </Card>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper contentWrapperClassName="items-center" isHeaderShown={false}>
      <Card className="mt-12 w-full max-w-7xl px-6 py-4">
        <p className="text-headlineS mb-4 text-center">News main page</p>
        <NewsList
          className="mt-6"
          newsList={newsResponse.items}
          pagination={newsResponse.pagination}
        />
      </Card>
    </PageWrapper>
  );
}
