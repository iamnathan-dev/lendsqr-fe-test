"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CARDS_DATA, chartData, workSans } from "@/lib/constants";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const userData = localStorage.getItem("lendsqr-userData");
  const userName = userData ? JSON.parse(userData).username : "";

  return (
    <div>
      <h2 className={`text-custome font-medium text-2xl ${workSans.className}`}>
        {new Date().getHours() >= 9 && new Date().getHours() < 12
          ? `Good morning, ${userName}`
          : new Date().getHours() >= 12 && new Date().getHours() <= 15
          ? `Good afternoon, ${userName}`
          : `Good evening, ${userName}`}
      </h2>
      <div className="mt-5 grid grid-cols-2 gap-4 md:gap-6">
        {CARDS_DATA.slice(0, 2).map((item, index) => (
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
      <div className="rounded-sm shadow-lg shadow-gray-500/5 border mt-8 border-gray-100 bg-white p-5 relative">
        <div className="flex flex-col min-h-[400px] space-y-4">
          <div className={workSans.className}>
            <h1 className="text-custome text-2xl font-semibold">
              Jan 2023 - Dec 2023
            </h1>
            <h3 className="text-base font-normal text-custome">
              Monthly User Activity
            </h3>
          </div>
          <div className="w-full h-[300px] lg:h-[400px]">
            <ResponsiveContainer width="103%" height="100%">
              <AreaChart
                width={500}
                height={400}
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="pv"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="rgba(130,202,158,0.43)"
                />
                <Area
                  type="monotone"
                  dataKey="amt"
                  stackId="2"
                  stroke="#5e84db"
                  fill="rgba(94,131,219,0.46)"
                />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stackId="3"
                  stroke="#39CDCC"
                  fill="rgba(57, 205, 204, 0.29)"
                />
              </AreaChart>
            </ResponsiveContainer>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
