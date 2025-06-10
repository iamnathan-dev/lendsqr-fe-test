import TableContainer from "@/components/common/tableContainer";
import { RenderSkeletonLoader } from "@/components/common/tableSkeleton";
import UserTable from "@/components/common/usersTable";
import { Card, CardContent } from "@/components/ui/card";
import { CARDS_DATA, workSans } from "@/lib/constants";
import React, { Suspense } from "react";

const UsersList = () => {
  return (
    <div>
      <h2 className={`text-custome font-medium text-2xl ${workSans.className}`}>
        Users
      </h2>

      <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
        {CARDS_DATA.map((item, index) => (
          <Card
            key={index}
            className="rounded-sm shadow-lg shadow-gray-500/5 border-gray-100"
          >
            <CardContent>
              <div className="flex items-center justify-between">
                <div className={`p-2 w-fit rounded-full ${item.color}`}>
                  {item.icon}
                </div>
              </div>

              <h4
                className={`text-minted uppercase text-xs font-medium lg:text-[10px] xl:text-xs mt-4 ${workSans.className}`}
              >
                {item.title}
              </h4>
              <h1
                className={`text-2xl font-semibold text-custome ${workSans.className}`}
              >
                {item.value.toLocaleString()}
              </h1>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <TableContainer>
          <Suspense fallback={<RenderSkeletonLoader />}>
            <UserTable />
          </Suspense>
        </TableContainer>
      </div>
    </div>
  );
};

export default UsersList;
