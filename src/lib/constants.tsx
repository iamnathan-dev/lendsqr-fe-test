import {
  BarChart2,
  Briefcase,
  CheckCircle,
  CircleDollarSign,
  ClipboardList,
  CoinsIcon,
  DollarSign,
  Files,
  HandCoins,
  Handshake,
  Home,
  Layers,
  Package,
  Percent,
  PiggyBank,
  Repeat,
  Settings,
  Shield,
  Tag,
  UserCheck,
  Users,
  UsersRound,
  UserX,
} from "lucide-react";
import { Work_Sans } from "next/font/google";
import { ReactNode } from "react";

interface SidebarLink {
  label?: string;
  icon?: ReactNode;
  section?: string;
  href?: string;
}

interface CardData {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

export const SIDEBAR_LINKS: SidebarLink[] = [
  {
    label: "Dashboard",
    icon: <Home size={20} strokeWidth={1} />,
    href: "/dashboard",
  },
  // Customers
  { section: "Customers" },
  { label: "Users", icon: <Users size={20} strokeWidth={1} />, href: "/users" },
  {
    label: "Guarantors",
    icon: <Shield size={20} strokeWidth={1} />,
    href: "/guarantors",
  },
  {
    label: "Loans",
    icon: <CircleDollarSign size={20} strokeWidth={1} />,
    href: "/loans",
  },
  {
    label: "Decision Models",
    icon: <Handshake size={20} strokeWidth={1} />,
    href: "/decision-models",
  },
  {
    label: "Savings",
    icon: <PiggyBank size={20} strokeWidth={1} />,
    href: "/savings",
  },
  {
    label: "Loan Requests",
    icon: <HandCoins size={20} strokeWidth={1} />,
    href: "/loan-requests",
  },
  {
    label: "Whitelist",
    icon: <CheckCircle size={20} strokeWidth={1} />,
    href: "/whitelist",
  },
  { label: "Karma", icon: <UserX size={20} strokeWidth={1} />, href: "/karma" },

  // Businesses
  { section: "Businesses" },
  {
    label: "Organization",
    icon: <Briefcase size={20} strokeWidth={1} />,
    href: "/organization",
  },
  {
    label: "Loan Products",
    icon: <HandCoins size={20} strokeWidth={1} />,
    href: "/loan-products",
  },
  {
    label: "Savings Products",
    icon: <Package size={20} strokeWidth={1} />,
    href: "/savings-products",
  },
  {
    label: "Fees and Charges",
    icon: <Percent size={20} strokeWidth={1} />,
    href: "/fees-and-charges",
  },
  {
    label: "Transactions",
    icon: <Repeat size={20} strokeWidth={1} />,
    href: "/transactions",
  },
  {
    label: "Services",
    icon: <Layers size={20} strokeWidth={1} />,
    href: "/services",
  },
  {
    label: "Service Account",
    icon: <UserCheck size={20} strokeWidth={1} />,
    href: "/service-account",
  },
  {
    label: "Settlements",
    icon: <DollarSign size={20} strokeWidth={1} />,
    href: "/settlements",
  },
  {
    label: "Reports",
    icon: <BarChart2 size={20} strokeWidth={1} />,
    href: "/reports",
  },

  // Settings
  { section: "Settings" },
  {
    label: "Preferences",
    icon: <Settings size={20} strokeWidth={1} />,
    href: "/preferences",
  },
  {
    label: "Fees and Pricing",
    icon: <Tag size={20} strokeWidth={1} />,
    href: "/fees-and-pricing",
  },
  {
    label: "Audit Logs",
    icon: <ClipboardList size={20} strokeWidth={1} />,
    href: "/audit-logs",
  },
];

export const CARDS_DATA: CardData[] = [
  {
    title: "Users",
    value: 2453,
    icon: <UsersRound strokeWidth={1} size={20} />,
    color: "bg-[#DF18FF]/10 text-[#DF18FF]",
  },
  {
    title: "Active Users",
    value: 2453,
    icon: <UsersRound strokeWidth={1} size={20} />,
    color: "bg-[#5718FF]/10 text-[#5718FF]",
  },
  {
    title: "Users with loans",
    value: 12453,
    icon: <Files strokeWidth={1} size={20} />,
    color: "bg-[#F55F44]/10 text-[#F55F44]",
  },
  {
    title: "Users with savings",
    value: 102453,
    icon: <CoinsIcon strokeWidth={1} size={20} />,
    color: "bg-[#F55F44]/10 text-[#F55F44]",
  },
];

export const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-work-sans",
});
