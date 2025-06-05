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
      <main className="bg-[#FBFBFB] min-h-screen">
        <div>{children}</div>
      </main>
    </>
  );
}
