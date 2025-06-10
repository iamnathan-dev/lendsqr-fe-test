"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserTable } from "../../app/hook/useUsersTable";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
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
import useUserStore from "@/app/(dashboard)/users/store/userStore";
import TableHeaderCell from "./tableHeaderCell";
import { Users as UsersType } from "@/app/action/getUsers";

const TABLE_HEADERS = [
  "Organization",
  "Username",
  "Email",
  "Phone number",
  "Date joined",
  "Status",
];

const CELL_WIDTHS = {
  organization: "116px",
  username: "106px",
  email: "147px",
  phoneNumber: "124px",
  dateJoined: "154px",
};

const STATUS_STYLES = {
  Active: "bg-green-100 text-green-500",
  Blacklisted: "bg-red-100 text-pink-500",
  Pending: "bg-yellow-100 text-yellow-500",
  default: "bg-gray-100 text-gray-500",
};

const DROPDOWN_ACTIONS = [
  { icon: Eye, label: "View Details" },
  { icon: UserX, label: "Blacklist User" },
  { icon: UserCheck, label: "Activate User" },
];

const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

interface User {
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: string;
}

const UserTable = () => {
  const router = useRouter();
  const { data: users, isLoading } = useUserTable();
  const { users: storeUsers, setUsers, query } = useUserStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);
  const [localUsers, setLocalUsers] = useState<UsersType[]>([]);

  const searchParams = useSearchParams();

  const filteredUsers = useMemo(() => {
    if (query.length === 0) {
      return storeUsers;
    }

    return storeUsers.filter((user) => {
      return query.some((searchTerm) => {
        const lowercaseSearchTerm = (searchTerm || "").toLowerCase();
        return (
          user.organization?.toLowerCase().includes(lowercaseSearchTerm) ||
          user.username?.toLowerCase().includes(lowercaseSearchTerm) ||
          user.email?.toLowerCase().includes(lowercaseSearchTerm) ||
          user.phoneNumber?.toLowerCase().includes(lowercaseSearchTerm) ||
          user.dateJoined?.toLowerCase().includes(lowercaseSearchTerm) ||
          user.status?.toLowerCase() === lowercaseSearchTerm
        );
      });
    });
  }, [storeUsers, query]);

  useEffect(() => {
    if (users && users.length > 0) {
      setUsers(users);
    }
  }, [users, setUsers]);

  useEffect(() => {
    const orgFilter = searchParams.get("organization");

    if (orgFilter && filteredUsers.length > 0) {
      const decodedOrg = decodeURIComponent(orgFilter);
      const filtered = filteredUsers.filter(
        (user) => user.organization === decodedOrg
      );
      setLocalUsers(filtered as unknown as UsersType[]);
    } else if (filteredUsers.length > 0) {
      setLocalUsers(filteredUsers as unknown as UsersType[]);
    }
  }, [filteredUsers, searchParams]);

  const isEmpty = !isLoading && (!localUsers || localUsers.length === 0);
  const totalPages = Math.ceil((localUsers?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = localUsers?.slice(startIndex, endIndex);

  const handleStatusChange = (userId: string, action: string) => {
    const statusMap: Record<string, "Active" | "Blacklisted"> = {
      "Blacklist User": "Blacklisted",
      "Activate User": "Active",
    };

    setLocalUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.email === userId
          ? { ...user, status: statusMap[action] || user.status }
          : user
      )
    );
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDropdownAction = (user: User, label: string) => {
    if (label === "View Details") {
      router.push(`/profile/${user.username}`);
    } else {
      handleStatusChange(user.email, label);
    }
  };

  const renderEmptyState = () => (
    <div className="rounded-sm shadow-lg shadow-gray-500/5 border border-gray-100 bg-white p-5 relative">
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Users strokeWidth={1} size={60} className="text-gray-500" />
        <p className="text-lg font-medium text-gray-500">No users available</p>
        <p className="text-sm text-gray-400">
          Users will appear here once they are added to the system
        </p>
      </div>
    </div>
  );

  const renderSkeletonLoader = () => (
    <div className="rounded-sm shadow-lg shadow-gray-500/5 border border-gray-100 bg-white p-5 relative">
      <Table>
        <TableHeader>
          <TableRow className="!border-b-0 py-4 hover:bg-transparent">
            {TABLE_HEADERS.map((header) => (
              <TableHeaderCell key={header} header={header} isLoading />
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <TableRow
              key={index}
              className="border-b-gray-100 hover:bg-transparent"
            >
              {Object.entries(CELL_WIDTHS).map(([key, width]) => (
                <TableCell
                  key={key}
                  className={`truncate max-w-[${width}] py-4`}
                >
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
    </div>
  );

  const renderPagination = () => (
    <Pagination className="mt-4">
      <PaginationContent className="gap-1 sm:gap-2">
        <PaginationItem>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            className="h-6 w-6 sm:h-8 sm:w-8 border-0 !bg-gray-200 cursor-pointer shadow-none"
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </PaginationItem>
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          const isVisible =
            pageNumber === 1 ||
            pageNumber === totalPages ||
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);
          const showEllipsis =
            pageNumber === currentPage - 2 || pageNumber === currentPage + 2;

          if (!isVisible && !showEllipsis) return null;

          return showEllipsis ? (
            <PaginationItem key={pageNumber}>
              <PaginationEllipsis className="text-xs sm:text-sm" />
            </PaginationItem>
          ) : (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                onClick={() => handlePageChange(pageNumber)}
                isActive={currentPage === pageNumber}
                className={`!bg-transparent border-0 w-4 sm:w-6 text-xs sm:text-sm cursor-pointer shadow-none ${
                  currentPage === pageNumber ? "underline" : ""
                }`}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
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
      <div className="rounded-sm shadow-lg shadow-gray-500/5 border border-gray-100 bg-white p-5 relative">
        <Table>
          <TableHeader>
            <TableRow className="!border-b-0 py-4 hover:bg-transparent">
              {TABLE_HEADERS.map((header) => (
                <TableHeaderCell key={header} header={header} />
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers?.map((user, index) => (
              <TableRow
                key={index}
                className="border-b-gray-100 hover:bg-transparent"
              >
                {Object.entries(CELL_WIDTHS).map(([key, width]) => (
                  <TableCell
                    key={key}
                    style={{ maxWidth: width }}
                    className={`truncate py-4 !text-gray-400 ${workSans.className}`}
                  >
                    {user[key as keyof User]}
                  </TableCell>
                ))}
                <TableCell>
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      STATUS_STYLES[
                        user.status as keyof typeof STATUS_STYLES
                      ] || STATUS_STYLES.default
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
                      {DROPDOWN_ACTIONS.map(({ icon: Icon, label }) => (
                        <DropdownMenuItem
                          key={label}
                          onClick={() => handleDropdownAction(user, label)}
                          className={`!text-custome ${workSans.className}`}
                        >
                          <Icon className="mr-2 h-4 w-4" />
                          {label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex lg:flex-row flex-col items-center justify-between">
        <div
          className={`flex flex-row gap-x-3 items-center text-sm text-gray-500 ${workSans.className}`}
        >
          <span>Showing</span>
          <Select
            value={String(itemsPerPage)}
            onValueChange={handleItemsPerPageChange}
          >
            <SelectTrigger className="w-fit !h-7 border-0 !bg-gray-200 cursor-pointer">
              <SelectValue>{itemsPerPage}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Entries</SelectLabel>
                {ITEMS_PER_PAGE_OPTIONS.map((value) => (
                  <SelectItem key={value} value={String(value)}>
                    {value}
                  </SelectItem>
                ))}
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
      {!isEmpty ? renderUserTable() : renderEmptyState()}
    </div>
  );
};

export default UserTable;
