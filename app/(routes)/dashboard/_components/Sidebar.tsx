"use client";
import { sideBarList } from "@/constants";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="h-screen p-5 border-r shadow-sm">
      <Link href={"/"} className="flex gap-x-2 items-center">
        <Image
          src={"/logo.svg"}
          width={30}
          height={30}
          alt="logo"
          className="ml-5"
        />
        <div className="text-lg font-bold bg-gradient-to-r from-[#008cff] to-sky-400 bg-clip-text text-transparent">
          Budget Tracker
        </div>
      </Link>

      <div className="mt-8">
        {sideBarList.map((item) => {
          return (
            <Link key={item.id} href={item.path}>
              <h2
                key={item.id}
                className={cn(
                  `flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:text-primary hover:bg-sky-100 dark:hover:bg-slate-700 mt-2`,
                  pathname === item.path
                    ? "bg-sky-100 dark:bg-slate-700 dark:text-primary"
                    : ""
                )}
              >
                <item.icon />
                {item.name}
              </h2>
            </Link>
          );
        })}
      </div>

      <div className="fixed bottom-10 flex items-center p-5 gap-2">
        <UserButton />
        Profile
      </div>
    </div>
  );
}

export default Sidebar;
