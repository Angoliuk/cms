import { Card } from "@/ui-shared/components/card";
import { PageWrapper } from "@/ui-shared/components/page-wrapper";

import { ListPagination } from "../../components/list-pagination";
import { api } from "../../utils/api";
import { loggedOutProtection } from "../../utils/auth-protection";
import { CreatePromotionsConfigContainer } from "./components/create-promotions-config";
import { PromotionsConfigsList } from "./components/promotions-configs-list";

export type PromotionsConfigsPageProps = {
  searchParams: {
    page?: string;
  };
};

export default async function PromotionsConfigsPage({ searchParams }: PromotionsConfigsPageProps) {
  await loggedOutProtection();

  const { body: promotionsConfigsResponse, status } = await api.promotionsConfigs.get({
    query: {
      page: searchParams?.page ? Number(searchParams?.page) : 1,
    },
  });

  if (status !== 200) {
    return (
      <PageWrapper contentWrapperClassName="items-center" isHeaderShown={false}>
        <Card className="mt-12 w-full max-w-[512px] px-6 py-4">
          <p className="text-headlineS mb-4 text-center">Promotions configs</p>
          <p className="text-headlineS mb-4 text-center">Promotions configs not found</p>
        </Card>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper contentWrapperClassName="items-center" isHeaderShown={false}>
      <Card className="mt-12 w-full max-w-[512px] px-6 py-4">
        <p className="text-headlineS mb-4 text-center">Promotions configs</p>
        <CreatePromotionsConfigContainer />
        <PromotionsConfigsList
          className="mt-4"
          promotionsConfigsList={promotionsConfigsResponse.items}
        />
        <ListPagination pagination={promotionsConfigsResponse.pagination} />
      </Card>
    </PageWrapper>
  );
}
