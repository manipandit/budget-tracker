import Image from "next/image";
import { Button } from "./ui/button";

function Header() {
  return (
    <div className="p-5 flex justify-between items-center border-b shadow-sm">
      <Image src="/logo.svg" alt="logo" width={40} height={40} />

      <Button>Get started</Button>
    </div>
  );
}

export default Header;
