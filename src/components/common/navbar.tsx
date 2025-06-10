"use client";

import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { AlignJustify, ChevronDown, Search, User } from "lucide-react";
import Notification from "@/shared/assets/svg/notification.svg";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { roboto, workSans } from "@/lib/constants";
import { useEffect, useState } from "react";
import { useSidebarStore } from "@/store/globalStore";

const commonLinkStyles =
  "block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden";

const IconButton = ({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) => (
  <div className="relative rounded-full text-custome outline-none cursor-pointer bg-transparent">
    <span className="absolute -inset-1.5" />
    <span className="sr-only">{label}</span>
    <Icon strokeWidth={1} />
  </div>
);

export default function Navbar() {
  const [userName, setUserName] = useState("");
  const { toggleSidebar } = useSidebarStore();

  useEffect(() => {
    const userData = localStorage.getItem("lendsqr-userData");
    setUserName(userData ? JSON.parse(userData).username : "");
  }, []);

  const menuItems = [
    { href: `/profile/${userName}`, text: "Your Profile" },
    { href: "#", text: "Settings" },
    { href: "#", text: "Sign out" },
  ];

  return (
    <Disclosure
      as="nav"
      className="bg-white shadow-md shadow-gray-100 fixed top-0 w-full z-50"
    >
      <div className="mx-auto max-w-screen px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-[70px] items-center justify-between">
          <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
            <Button
              variant={"outline"}
              className="md:hidden md:mr-0 mr-3"
              onClick={() => toggleSidebar()}
            >
              <AlignJustify strokeWidth={1} />
            </Button>{" "}
            <div className="flex shrink-0 items-center">
              <Link href="/" className="outline-none no-underline">
                <Image
                  alt="lendsqr logo"
                  src="/logo.svg"
                  width={100}
                  height={100}
                  className="w-30"
                />
              </Link>
            </div>
            <div className="hidden ml-10 lg:ml-40 sm:block">
              <div className="flex lg:w-[400px] w-[300px]">
                <Input
                  type="text"
                  placeholder="Search for anything"
                  className={`!bg-transparent rounded-l-md !border-r-0 rounded-r-none w-full !p-2 h-10 shadow-none border-1 focus-visible:ring-0 focus-visible:border-main placeholder:text-gray-400 ${workSans.className} focus:outline-none`}
                />
                <Button className="!bg-main cursor-pointer text-white rounded-l-none rounded-r-md !px-4 h-10">
                  <Search strokeWidth={1} />
                </Button>
              </div>{" "}
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:gap-8 gap-5 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link
              href="#"
              className={`outline-none underline text-custome text-sm font-normal ${roboto.className}`}
            >
              Docs
            </Link>
            <div className="block md:hidden">
              <IconButton icon={Search} label="Search" />
            </div>
            <Menu as="div" className="relative flex items-center">
              <MenuButton className={"cursor-pointer"}>
                <Image
                  src={Notification}
                  alt="notification"
                  width={20}
                  height={20}
                />
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <div className="px-4 py-3 text-sm text-gray-500">
                  No new notifications
                </div>
              </MenuItems>
            </Menu>

            <Menu as="div" className="relative">
              <MenuButton className="flex items-center space-x-1 cursor-pointer">
                <div className="relative flex rounded-full bg-gray-100 p-1 text-sm outline-none">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <User strokeWidth={1} />
                </div>
                <span className="ml-2 text-sm hidden md:flex text-custome">
                  <div
                    className={`truncate max-w-[110px] font-medium ${workSans.className}`}
                  >
                    {userName}
                  </div>
                  <ChevronDown strokeWidth={1} className="inline size-4" />
                </span>
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                {menuItems.map((item, index) => (
                  <MenuItem key={index}>
                    <Link href={item.href} className={commonLinkStyles}>
                      {item.text}
                    </Link>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
