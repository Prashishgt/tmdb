import { AvatarIcon, SearchIcon } from "@/icons";
import Link from "next/link";
import React from "react";

import MaxWidthWrapper from "./MaxWidthWrapper";
import SearchBar from "./SearchBar";

interface NavItemsPropsI {
  id: number;
  label: string;
  href: string;
}

const navItems: NavItemsPropsI[] = [
  {
    id: 1,
    label: "Home",
    href: "#",
  },
  {
    id: 2,
    label: "Filmes",
    href: "#",
  },
  {
    id: 3,
    label: "Series",
    href: "#",
  },
];

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#000000] opacity-80 lg:py-8 py-4 lg:px-[4.625rem] px-8">
      <MaxWidthWrapper className="flex flex-row justify-between items-center">
        <p className="text-color-primary lg:leading-[4.5rem] lg:text-[3.75rem]">
          FLIMFIX
        </p>
        <ul className="sm:flex flex-row gap-[6.313rem] items-center hidden">
          {navItems.map((navItem) => (
            <Link
              key={navItem.label}
              href={navItem.href}
              className="text-color-text lg:text-[1.875rem]"
            >
              {navItem.label}
            </Link>
          ))}
        </ul>
        <div className="flex flex-row items-center gap-4">
          <SearchBar />
          <AvatarIcon className="h-10 w-10 sm:h-auto sm:w-auto" />
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
