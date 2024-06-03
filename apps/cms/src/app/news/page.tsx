import { Card } from "@/ui-shared/components/card";
import { PageWrapper } from "@/ui-shared/components/page-wrapper";

import { Header } from "../../components/header";
import { ListPagination } from "../../components/list-pagination";
import { api } from "../../utils/api";
import { loggedOutProtection } from "../../utils/auth-protection";
import { NewsList } from "./components/news-list";

export type NewsPageProps = {
  searchParams: {
    page?: string;
  };
};

export default async function NewsPage({ searchParams }: NewsPageProps) {
  await loggedOutProtection();

  const { body: newsResponse, status } = await api.news.get({
    query: {
      page: searchParams?.page ? Number(searchParams?.page) : 1,
    },
  });

  if (status !== 200) {
    return (
      <PageWrapper contentWrapperClassName="items-center" header={<Header />}>
        <Card className="mt-12 w-full max-w-[1024px] px-6 py-4">
          <p className="text-headlineS mb-4 text-center">News</p>
          <p className="text-headlineS mb-4 text-center">News not found</p>
        </Card>
      </PageWrapper>
    );
  }
  return (
    <PageWrapper contentWrapperClassName="items-center" header={<Header />}>
      <Card className="mt-12 w-full max-w-[1024px] px-6 py-4">
        <p className="text-headlineS mb-4 text-center">News</p>
        <NewsList newsList={newsResponse.items} />
        <ListPagination pagination={newsResponse.pagination} />
      </Card>
    </PageWrapper>
  );
}
