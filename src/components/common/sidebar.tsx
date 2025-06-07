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
import { Building } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import "../styles/sidebar.scss";

const Sidebar: React.FC = () => {
  const currentPath = usePathname();
  const searchParams = useSearchParams();

  const orgId = searchParams.get("orgId");

  return (
    <div
      className={`fixed md:left-0 -left-[250px] top-[70px] h-[calc(100vh-70px)] sidebar w-[250px] bg-white shadow-2xl shadow-gray-100 overflow-y-auto z-40 py-5 ${workSans.className}`}
    >
      <Accordion type="single" collapsible className={`w-full mb-4`}>
        <AccordionItem value="org-1">
          <AccordionTrigger className="flex items-center !shadow-none justify-normal gap-3 text-custome p-2 px-3 !no-underline rounded-none underline-none hover:bg-main/5 border-l-4 duration-200 ease-in border-l-transparent font-normal">
            <div>
              <Building size={20} strokeWidth={1} />
            </div>
            <span className="text-sm">Switch Organization</span>
          </AccordionTrigger>{" "}
          <AccordionContent className="flex flex-col border-l-2 sidebar-accordion  border-l-gray-300 ml-5 pl-4 max-h-[200px] overflow-y-auto">
            {[
              { label: "Organization 1", id: "1" },
              { label: "Organization 2", id: "2" },
            ].map((org, index) => (
              <Link
                key={index}
                href={{
                  pathname: "/dashboard",
                  query: { orgId: org.id },
                }}
                className="flex items-center gap-3 text-custome p-2 px-3 cursor-pointer"
              >
                <span
                  className={`text-sm duration-200 ease-in hover:text-main ${
                    orgId === org.id ? "text-main" : "text-gray-500"
                  }`}
                >
                  {org.label}
                </span>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {SIDEBAR_LINKS.map((link, index) => (
        <div key={index}>
          {link.section ? (
            <h3 className="text-custome font-medium text-sm mt-6 mb-2 px-3">
              {link.section}
            </h3>
          ) : (
            <Link
              href={link.href || "/"}
              className={`flex items-center gap-3 text-custome hover:bg-main/5 border-l-4 duration-200 ease-in ${
                currentPath === link.href
                  ? "border-l-main bg-main/5"
                  : "border-l-transparent"
              } p-2 px-3 cursor-pointer`}
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
      ))}
    </div>
  );
};

export default Sidebar;
