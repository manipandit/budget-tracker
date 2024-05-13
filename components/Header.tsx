"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-5 flex justify-between items-center border-b shadow-sm">
      <Image src="/logo.svg" alt="logo" width={40} height={40} />

      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href={"/sign-in"}>
          <Button>Get started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
