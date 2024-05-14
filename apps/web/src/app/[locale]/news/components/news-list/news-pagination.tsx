import { Pagination, PaginationContent, PaginationLink } from "@/ui-shared/components/pagination";
import { getPaginationItems } from "@/ui-shared/utils/pagination";
import { FC } from "react";

export type NewsPaginationProps = { pagination: { page: number; totalPages: number } };

export const NewsPagination: FC<NewsPaginationProps> = async ({ pagination }) => {
  const pages = getPaginationItems({ page: pagination.page, searchParams: {}, totalPages: pagination.totalPages });

  return (
    <Pagination>
      <PaginationContent>
        {pages.map(page => {
          return (
            <PaginationLink href={page.href} isActive={page.isActive} key={page.index}>
              {page.label}
            </PaginationLink>
          );
        })}
      </PaginationContent>
    </Pagination>
  );
};
