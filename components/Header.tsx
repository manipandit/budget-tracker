"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ThemeToggleBtn } from "./ThemeToggleBtn";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-5 flex justify-between items-center border-b shadow-sm">
      <Image src="/logo.svg" alt="logo" width={40} height={40} />

      <div className="flex gap-x-4 items-center">
        <ThemeToggleBtn />
        {isSignedIn ? (
          <UserButton />
        ) : (
          <Link href={"/sign-in"}>
            <Button>Sign in</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
