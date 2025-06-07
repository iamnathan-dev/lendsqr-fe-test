"use client";

import React from "react";
import { useUserTable } from "../../app/hook/useUsersTable";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Users } from "lucide-react";

const UserTable = () => {
  const { data: users } = useUserTable();

  console.log(users);

  return (
    <div className="w-full">
      {users && users.length > 0 ? (
        <Table>
          <TableCaption>List of users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.dateJoined}</TableCell>
                <TableCell>{user.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <Users strokeWidth={1} size={60} className="text-gray-500" />
          <p className="text-lg font-medium text-gray-500">
            No users available
          </p>
          <p className="text-sm text-gray-400">
            Users will appear here once they are added to the system
          </p>
        </div>
      )}
    </div>
  );
};

export default UserTable;
