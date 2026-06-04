import UserGrowthChart from "./components/charts/user-growth-chart";
import TransactionsChart from "./components/charts/transactions-chart";
import RevenueChart from "./components/charts/revenue-chart";
import KpiCard from "./components/kpi-card";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard title="Total Users" value="1,245" />
        <KpiCard title="Transactions" value="8,432" />
        <KpiCard title="Revenue" value="$42,190" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserGrowthChart />
        <TransactionsChart />
      </div>

      <div className="grid grid-cols-1">
        <RevenueChart />
      </div>
    </div>
  );
}
