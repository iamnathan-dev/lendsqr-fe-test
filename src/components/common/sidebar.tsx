"use client";

import { SIDEBAR_LINKS, workSans } from "@/lib/constants";
import Link from "next/link";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Briefcase } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import "../styles/sidebar.scss";
import useUserStore from "@/app/(dashboard)/users/store/userStore";
import { useSidebarStore } from "@/store/globalStore";

const Sidebar: React.FC = () => {
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const organization = searchParams.get("organization");
  const { users } = useUserStore();
  const { isOpen } = useSidebarStore();

  const organizations = users.map((user) => user);

  const sidebarClasses = `
    fixed 
    md:left-0 
    !duration-200 
    ease-in 
    ${isOpen ? "left-0" : "-left-[250px]"}
    top-[70px] 
    h-[calc(100vh-70px)] 
    sidebar 
    w-[250px] 
    bg-white 
    shadow-2xl 
    shadow-gray-100 
    overflow-y-auto 
    z-40 
    py-5 
    ${workSans.className}
  `;

  const linkClasses = (href: string) => `
    flex 
    items-center 
    gap-3 
    text-custome 
    hover:bg-main/5 
    border-l-4 
    duration-200 
    ease-in 
    ${currentPath === href ? "border-l-main bg-main/5" : "border-l-transparent"}
    p-2 
    px-3 
    cursor-pointer
  `;

  const organizationLinkClasses = (orgName: string) => `
    text-sm 
    duration-200 
    ease-in 
    hover:text-main 
    ${organization === orgName ? "text-main" : "text-gray-500"}
  `;

  return (
    <div className={sidebarClasses}>
      <Accordion type="single" collapsible className="w-full mb-4">
        <AccordionItem value="org-1">
          <AccordionTrigger className="flex items-center !shadow-none justify-normal gap-3 text-custome p-2 px-3 !no-underline rounded-none underline-none hover:bg-main/5 border-l-4 duration-200 ease-in border-l-transparent font-normal">
            <Briefcase size={20} strokeWidth={1} />
            <span className="text-sm">Switch Organization</span>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col border-l-2 sidebar-accordion border-l-gray-300 ml-5 pl-4 max-h-[200px] overflow-y-auto">
            {organizations.map((org, index) => (
              <Link
                key={`org-${index}`}
                href={{
                  pathname: "/users",
                  query: { organization: org.organization },
                }}
                className="flex items-center gap-3 text-custome p-2 px-3 cursor-pointer"
              >
                <span className={organizationLinkClasses(org.organization)}>
                  {org.organization}
                </span>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {SIDEBAR_LINKS.map((link, index) => (
        <div key={`link-${index}`}>
          {link.section ? (
            <h3 className="text-custome font-medium text-sm mt-6 mb-2 px-3">
              {link.section}
            </h3>
          ) : (
            <Link
              href={link.href || "/"}
              className={linkClasses(link.href || "/")}
            >
              {link.icon}
              <span
                className={`text-sm ${
                  currentPath === link.href ? "text-custome" : "text-gray-500"
                }`}
              >
                {link.label}
              </span>
            </Link>
          )}
        </div>
      ))}{" "}
    </div>
  );
};

export default Sidebar;
