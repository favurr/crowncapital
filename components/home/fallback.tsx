import DataTable from "@/components/reusables/data-table";
import React from "react";

export function CoinOverviewFallback() {
  return (
    <div id="coin-overview-fallback">
      <div className="header pt-2">
        <div className="header-image skeleton" />
        <div className="info">
          <div className="header-line-sm skeleton" />
          <div className="header-line-lg skeleton" />
        </div>
      </div>
    </div>
  );
}

export function TrendingCoinsFallback() {
  // Create dummy skeleton data for 3 rows
  const skeletonData = Array.from({ length: 3 }, (_, i) => ({ id: `skeleton-${i}` }));

  const columns: DataTableColumn<{ id: string }>[] = [
    {
      header: "Name",
      cellClassName: "name-cell",
      cell: () => (
        <div className="name-link">
          <div className="name-image skeleton" />
          <div className="name-line skeleton" />
        </div>
      ),
    },
    {
      header: "24h Change",
      cellClassName: "change-cell",
      cell: () => (
        <div className="flex gap-1 items-center">
          <div className="change-icon skeleton" />
          <div className="change-line skeleton" />
        </div>
      ),
    },
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: () => <div className="price-line skeleton" />,
    },
  ];

  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>
      <DataTable
        columns={columns}
        data={skeletonData}
        rowKey={(row) => row.id}
        tableClassName="trending-coins-table"
      />
    </div>
  );
}
