"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

function HeroNavigate() {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      {userEmail ? (
        <Link
          className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow focus:outline-none focus:ring  sm:w-auto"
          href="/dashboard"
        >
          Dashboard
        </Link>
      ) : (
        <Link
          className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow focus:outline-none focus:ring  sm:w-auto"
          href="/sign-in"
        >
          Get Started
        </Link>
      )}
    </div>
  );
}

export default HeroNavigate;
