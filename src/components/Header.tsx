import Image from "next/image";
import DateText from "./DateText";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";
import Link from "next/link";

const Header = () => {
  return (
    <header className="container mx-auto px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-800">
          <Link href={'/'}>
             <Image src="/logo-icon.png" alt="logo" width={20} height={20} priority />
          </Link>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold leading-tight">বাজার দর</h2>
            <DateText />
          </div>
        </div>

        <UserInfo />
      </div>

      <NavLinks />
    </header>
  );
};

export default Header;