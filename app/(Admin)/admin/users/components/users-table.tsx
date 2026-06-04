"use client";

import { useState, useEffect, useTransition } from "react";
import {
  getUsers,
  deleteUser,
  type UpdateUserInput,
} from "../actions/user-actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditUserDialog from "./edit-user-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

// Client-safe User type from your API
export interface UserType {
  id: string;
  name: string;
  email: string;
  capital: number;
  accumulativeBalance: number;
  bonus: number;
  profit: number;
  tradeStatus: "LOSS" | "WIN";
  cryptoPlan: "SILVER" | "GOLD" | "DIAMOND" | "ELITE" | "EXCLUSIVE";
}

export default function UsersTable() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isPending, startTransition] = useTransition();

  const fetchUsers = () => {
    getUsers().then(setUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        await deleteUser(id);
        toast.success("User deleted");
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } catch {
        toast.error("Failed to delete user");
      }
    });
  };

  const handleSave = (updatedUser: UpdateUserInput) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? { ...u, ...updatedUser } : u)),
    );
  };

  if (!users.length)
    return <div className="text-center py-20">No users found</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto max-h-[600px]">
          <Table className="min-w-[1100px]">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Capital</TableHead>
                <TableHead>Bonus</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead>Trade Status</TableHead>
                <TableHead>Crypto Plan</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="max-w-[120px] truncate">
                    {user.id}
                  </TableCell>
                  <TableCell className="max-w-[120px] truncate">
                    {user.name}
                  </TableCell>
                  <TableCell className="max-w-[180px] truncate">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    $ {user.accumulativeBalance.toLocaleString()}
                  </TableCell>
                  <TableCell>$ {user.capital.toLocaleString()}</TableCell>
                  <TableCell>$ {user.bonus.toLocaleString()}</TableCell>
                  <TableCell>$ {user.profit.toLocaleString()}</TableCell>
                  <TableCell>{user.tradeStatus}</TableCell>
                  <TableCell>{user.cryptoPlan}</TableCell>
                  <TableCell className="text-right flex gap-2 justify-end">
                    <EditUserDialog
                      user={user}
                      onSave={handleSave}
                      onDelete={handleDelete}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
