import Navbar from "@/components/common/navbar";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="bg-[#FBFBFB] min-h-screen">
        <div>{children}</div>
      </main>
    </>
  );
}
