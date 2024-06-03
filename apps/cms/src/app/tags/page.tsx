import { Card } from "@/ui-shared/components/card";
import { PageWrapper } from "@/ui-shared/components/page-wrapper";

import { ListPagination } from "../../components/list-pagination";
import { api } from "../../utils/api";
import { loggedOutProtection } from "../../utils/auth-protection";
import { CreateTagContainer } from "./components/create-tag";
import { TagsList } from "./components/tags-list";

export type TagsPageProps = {
  searchParams: {
    page?: string;
  };
};

export default async function TagsPage({ searchParams }: TagsPageProps) {
  await loggedOutProtection();

  const { body: tagsResponse, status } = await api.tags.get({
    query: {
      page: searchParams?.page ? Number(searchParams?.page) : 1,
    },
  });

  if (status !== 200) {
    return (
      <PageWrapper contentWrapperClassName="items-center" isHeaderShown={false}>
        <Card className="mt-12 w-full max-w-[512px] px-6 py-4">
          <p className="text-headlineS mb-4 text-center">Tags</p>
          <p className="text-headlineS mb-4 text-center">Tags not found</p>
        </Card>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper contentWrapperClassName="items-center" isHeaderShown={false}>
      <Card className="mt-12 w-full max-w-[512px] px-6 py-4">
        <p className="text-headlineS mb-4 text-center">Tags</p>
        <CreateTagContainer />
        <TagsList className="mt-4" tagsList={tagsResponse.items} />
        <ListPagination pagination={tagsResponse.pagination} />
      </Card>
    </PageWrapper>
  );
}
