"use client";

import React, { useEffect, useState } from "react";
import { useUserTable } from "../../app/hook/useUsersTable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  ListFilter,
  MoreVertical,
  UserCheck,
  Users,
  UserX,
} from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { workSans } from "@/lib/constants";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "../ui/pagination";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const tableHeaders = [
  "Organization",
  "Username",
  "Email",
  "Phone number",
  "Date joined",
  "Status",
];

const cellWidths = {
  organization: "116px",
  username: "106px",
  email: "147px",
  phoneNumber: "124px",
  dateJoined: "154px",
};

const UserTable = () => {
  const { data: users, isLoading } = useUserTable();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [localUsers, setLocalUsers] = useState(users || []);

  useEffect(() => {
    if (users) {
      setLocalUsers(users);
    }
  }, [users]);

  const totalPages = localUsers
    ? Math.ceil(localUsers.length / itemsPerPage)
    : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = localUsers?.slice(startIndex, endIndex);

  const handleStatusChange = (userId: string, action: string) => {
    setLocalUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.email === userId) {
          let newStatus = user.status;
          switch (action) {
            case "Blacklist User":
              newStatus = "Blacklisted";
              break;
            case "Activate User":
              newStatus = "Active";
              break;
          }
          return { ...user, status: newStatus };
        }
        return user;
      })
    );
  };

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <Users strokeWidth={1} size={60} className="text-gray-500" />
      <p className="text-lg font-medium text-gray-500">No users available</p>
      <p className="text-sm text-gray-400">
        Users will appear here once they are added to the system
      </p>
    </div>
  );

  const renderSkeletonLoader = () => (
    <Table>
      <TableHeader>
        <TableRow className="!border-b-0 py-4 hover:bg-transparent">
          {tableHeaders.map((header) => (
            <TableHead
              className={`uppercase text-sm text-custome ${workSans.className}`}
              key={header}
            >
              <div className="flex flex-row items-center gap-x-2">
                {header} <ListFilter size={15} />
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: itemsPerPage }).map((_, index) => (
          <TableRow
            key={index}
            className="border-b-gray-100 hover:bg-transparent"
          >
            {Object.entries(cellWidths).map(([key, width]) => (
              <TableCell key={key} className={`truncate max-w-[${width}] py-4`}>
                <Skeleton className="h-4 w-full" />
              </TableCell>
            ))}
            <TableCell>
              <Skeleton className="h-4 w-full" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderPagination = () => (
    <Pagination className="mt-4">
      <PaginationContent className="gap-1 sm:gap-2">
        <PaginationItem>
          <Button
            size={"sm"}
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="h-6 w-6 sm:h-8 sm:w-8 border-0 !bg-gray-200 cursor-pointer shadow-none"
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </PaginationItem>
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          if (
            pageNumber === 1 ||
            pageNumber === totalPages ||
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
          ) {
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  onClick={() => setCurrentPage(pageNumber)}
                  isActive={currentPage === pageNumber}
                  className={`!bg-transparent border-0 w-4 sm:w-6 text-xs sm:text-sm cursor-pointer shadow-none ${
                    currentPage === pageNumber ? "underline" : ""
                  }`}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          } else if (
            pageNumber === currentPage - 2 ||
            pageNumber === currentPage + 2
          ) {
            return (
              <PaginationItem key={pageNumber}>
                <PaginationEllipsis className="text-xs sm:text-sm" />
              </PaginationItem>
            );
          }
          return null;
        })}
        <PaginationItem>
          <Button
            variant="outline"
            size={"sm"}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="h-6 w-6 sm:h-8 sm:w-8 border-0 !bg-gray-200 cursor-pointer shadow-none"
          >
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );

  const renderUserTable = () => (
    <>
      <Table>
        <TableHeader>
          <TableRow className="!border-b-0 py-4 hover:bg-transparent">
            {tableHeaders.map((header) => (
              <TableHead
                className={`uppercase text-sm text-custome ${workSans.className}`}
                key={header}
              >
                <div className="flex flex-row items-center gap-x-2">
                  {header} <ListFilter size={15} />
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers?.map((user, index) => (
            <TableRow
              key={index}
              className="border-b-gray-100 hover:bg-transparent"
            >
              {Object.entries(cellWidths).map(([key, width]) => (
                <TableCell
                  key={key}
                  className={`truncate max-w-[${width}] py-4 !text-gray-400 ${workSans.className}`}
                >
                  {user[key as keyof typeof user]}
                </TableCell>
              ))}
              <TableCell>
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-500"
                      : user.status === "Blacklisted"
                      ? "bg-red-100 text-pink-500"
                      : user.status === "Pending"
                      ? "bg-yellow-100 text-yellow-500"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {user.status}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {[
                      { icon: Eye, label: "View Details" },
                      { icon: UserX, label: "Blacklist User" },
                      { icon: UserCheck, label: "Activate User" },
                    ].map(({ icon: Icon, label }) => (
                      <DropdownMenuItem
                        key={label}
                        onClick={() => handleStatusChange(user.email, label)}
                        className={`!text-custome ${workSans.className}`}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex lg:flex-row flex-col items-center justify-between">
        <div
          className={`flex flex-row gap-x-3 items-center text-sm text-gray-500 ${workSans.className}`}
        >
          <span>Showing</span>
          <Select
            onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-fit !h-7 border-0 !bg-gray-200 cursor-pointer">
              <SelectValue placeholder={itemsPerPage} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Entries</SelectLabel>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <span>out of {localUsers?.length}</span>
        </div>
        <div>{renderPagination()}</div>
      </div>
    </>
  );

  if (isLoading) return renderSkeletonLoader();

  return (
    <div className="w-full">
      {localUsers && localUsers.length > 0
        ? renderUserTable()
        : renderEmptyState()}
    </div>
  );
};

export default UserTable;
