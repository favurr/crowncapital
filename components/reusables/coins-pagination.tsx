"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { buildPageNumbers, cn, ELLIPSIS } from "@/lib/utils";
import { useRouter } from "next/navigation";

const CoinsPagination = ({
  currentPage,
  totalPages,
  hasMorePages,
}: Pagination) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`/console/coins?page=${page}`);
  };

  const pageNumbers = buildPageNumbers(currentPage, totalPages);
  const isLastPage = !hasMorePages || currentPage >= totalPages;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const prevDisabled = currentPage <= 1;
  const nextDisabled = isLastPage;

  return (
    <Pagination id="coins-pagination" className="justify-center">
      <PaginationContent className="pagination-content">
        <PaginationItem className="pagination-control prev">
          <PaginationPrevious
            href={`/console/coins?page=${prevPage}`}
            onClick={(e: any) => {
              if (prevDisabled) {
                e.preventDefault();
                return;
              }

              handlePageChange(prevPage);
            }}
            aria-disabled={prevDisabled}
            tabIndex={prevDisabled ? -1 : undefined}
            className={prevDisabled ? "control-disabled" : "control-button"}
          />
        </PaginationItem>

        <div className="pagination-pages">
          {pageNumbers.map((page, index) => (
            <PaginationItem key={index}>
              {page === ELLIPSIS ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href={`/console/coins?page=${page}`}
                  onClick={(e: any) => {
                    e.preventDefault();
                    handlePageChange(page);
                  }}
                  className={cn('page-link', {'page-link-active': currentPage === page})}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
        </div>

        <PaginationItem className="pagination-control next">
          <PaginationNext
            href={`/console/coins?page=${nextPage}`}
            onClick={(e: any) => {
              if (nextDisabled) {
                e.preventDefault();
                return;
              }

              handlePageChange(nextPage);
            }}
            aria-disabled={nextDisabled}
            tabIndex={nextDisabled ? -1 : undefined}
            className={nextDisabled ? "control-disabled" : "control-button"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CoinsPagination;
