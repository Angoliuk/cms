import { Card } from "@/ui-shared/components/card";
import { PageWrapper } from "@/ui-shared/components/page-wrapper";

import { TextSearchInput } from "../../../components/text-search-input";
import { api } from "../../../utils/api";
import { NewsList } from "../components/news-list";

export type NewsTextSearchPageProps = {
  searchParams: {
    page?: string;
    search?: string;
  };
};

export default async function NewsTextSearchPage({ searchParams }: NewsTextSearchPageProps) {
  const { body: newsResponse, status } = await api.news.getForSearch({
    query: {
      page: searchParams?.page ? Number(searchParams?.page) : 1,
      search: searchParams?.search ?? "",
    },
  });

  if (status !== 200) {
    return (
      <PageWrapper contentWrapperClassName="items-center" isHeaderShown={false}>
        <Card className="mt-12 w-full max-w-7xl px-6 py-4">
          <p className="text-headlineS mb-4 text-center">News text search</p>
          <p className="text-headlineS mb-4 text-center">News not found</p>
        </Card>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper contentWrapperClassName="items-center" isHeaderShown={false}>
      <Card className="mt-12 w-full max-w-7xl px-6 py-4">
        <p className="text-headlineS mb-4 text-center">News text search</p>
        <TextSearchInput className="m-auto max-w-80" />
        <NewsList
          className="mt-6"
          newsList={newsResponse.items}
          pagination={newsResponse.pagination}
        />
      </Card>
    </PageWrapper>
  );
}
