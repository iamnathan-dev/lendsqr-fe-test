import Navbar from "@/components/common/navbar";
import Sidebar from "@/components/common/sidebar";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="bg-[#FBFBFB] min-h-screen p-5 xl:p-10 md:ml-[250px] mt-[70px]">
        <div>{children}</div>
      </main>
    </>
  );
}
