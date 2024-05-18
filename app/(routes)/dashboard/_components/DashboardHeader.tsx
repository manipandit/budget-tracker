import { ThemeToggleBtn } from "@/components/ThemeToggleBtn";
import { UserButton } from "@clerk/nextjs";
import React from "react";

function DashboardHeader() {
  return (
    <div className="p-5 border-b shadow-sm flex justify-between items-center">
      <div></div>
      <div className="flex gap-x-4 items-center">
        <ThemeToggleBtn />
        <UserButton />
      </div>
    </div>
  );
}

export default DashboardHeader;
