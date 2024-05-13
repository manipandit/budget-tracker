import React, { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";
import DashboardHeader from "./_components/DashboardHeader";

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="fixed md:w-64 hidden md:block ">
        <Sidebar />
      </div>
      <main className="md:ml-64 ">
        <DashboardHeader />
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
