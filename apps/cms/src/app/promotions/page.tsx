import { Card } from "@/ui-shared/components/card";
import { PageWrapper } from "@/ui-shared/components/page-wrapper";

import { ListPagination } from "../../components/list-pagination";
import { api } from "../../utils/api";
import { loggedOutProtection } from "../../utils/auth-protection";
import { CreatePromotionContainer } from "./components/create-promotion";
import { PromotionsList } from "./components/promotions-list";

export default async function Index() {
  await loggedOutProtection();

  const { body: promotionsResponse, status } = await api.promotions.get({ query: { page: 1 } });

  if (status !== 200) {
    return (
      <PageWrapper contentWrapperClassName="items-center" isHeaderShown={false}>
        <Card className="mt-12 w-full max-w-[512px] px-6 py-4">
          <p className="text-headlineS mb-4 text-center">Promotions</p>
          <p className="text-headlineS mb-4 text-center">Promotions not found</p>
        </Card>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper contentWrapperClassName="items-center px-12" isHeaderShown={false}>
      <Card className="mt-12 w-full px-6 py-4">
        <p className="text-headlineS mb-4 text-center">Promotions</p>
        <CreatePromotionContainer />
        <PromotionsList className="mt-4" promotionsList={promotionsResponse.items} />
        <ListPagination pagination={promotionsResponse.pagination} />
      </Card>
    </PageWrapper>
  );
}
