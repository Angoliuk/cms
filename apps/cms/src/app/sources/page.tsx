import { Card } from "@/ui-shared/components/card";
import { PageWrapper } from "@/ui-shared/components/page-wrapper";

import { ListPagination } from "../../components/list-pagination";
import { api } from "../../utils/api";
import { loggedOutProtection } from "../../utils/auth-protection";
import { CreateSourceContainer } from "./components/create-source";
import { SourcesList } from "./components/sources-list";

export type SourcesPageProps = {
  searchParams: {
    page?: string;
  };
};
export default async function SourcesPage({ searchParams }: SourcesPageProps) {
  await loggedOutProtection();

  const { body: sourcesResponse, status } = await api.sources.get({
    query: {
      page: searchParams?.page ? Number(searchParams?.page) : 1,
    },
  });

  if (status !== 200) {
    return (
      <PageWrapper contentWrapperClassName="items-center" isHeaderShown={false}>
        <Card className="mt-12 w-full max-w-[512px] px-6 py-4">
          <p className="text-headlineS mb-4 text-center">Sources</p>
          <p className="text-headlineS mb-4 text-center">Sources not found</p>
        </Card>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper contentWrapperClassName="items-center" isHeaderShown={false}>
      <Card className="mt-12 w-full max-w-[512px] px-6 py-4">
        <p className="text-headlineS mb-4 text-center">Sources</p>
        <CreateSourceContainer />
        <SourcesList className="mt-4" sourcesList={sourcesResponse.items} />
        <ListPagination pagination={sourcesResponse.pagination} />
      </Card>
    </PageWrapper>
  );
}
