"use client";

import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import TableHeaderCell from "./tableHeaderCell";
import { CELL_WIDTHS, TABLE_HEADERS } from "./usersTable";

const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

export const RenderSkeletonLoader = () => {
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_OPTIONS[0]);

  return (
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
};
