"use client";

import UsersTable from "./components/users-table";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Users</h1>
      <UsersTable />
    </div>
  );
}
