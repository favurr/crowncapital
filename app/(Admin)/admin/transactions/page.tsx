import TransactionTable from "./components/transaction-table";
import TransactionForm from "./components/transaction-form";

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Transactions</h1>

      {/* Transaction Form */}
      <TransactionForm />

      {/* Transaction Table */}
      <TransactionTable />
    </div>
  );
}
