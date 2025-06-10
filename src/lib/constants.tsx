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
import { Roboto, Work_Sans } from "next/font/google";
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
  icon: React.ReactNode | string;
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

export const chartData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 3400,
    amt: 4400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 4398,
    amt: 6210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-work-sans",
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
});

export const userData = {
  tier: "User's Tier",
  rating: 2,
  balance: "₦200,000.00",
  bankBalance: "₦200,000.00",
  avatar: null,
  personal: {
    fullName: "Grace Effiom",
    phoneNumber: "07060780922",
    email: "grace@gmail.com",
    bvn: "07824591630",
    gender: Math.random() < 0.5 ? "Female" : "Male",
    maritalStatus: "Single",
    children: "None",
    typeOfResidence: "Parent's Apartment",
  },
  education: {
    levelOfEducation: "B.Sc",
    employmentStatus: "Employed",
    sectorOfEmployment: "FinTech",
    durationOfEmployment: "2 years",
    officeEmail: "grace@lendsqr.com",
    monthlyIncome: "₦200,000.00 - ₦400,000.00",
    loanRepayment: "₦40,000",
  },
  socials: {
    twitter: "@grace_effiom",
    facebook: "Grace Effiom",
    instagram: "@grace_effiom",
  },
  guarantor: {
    fullName: "Debby Ogana",
    phoneNumber: "07060780922",
    email: "debby@gmail.com",
    relationship: "Sister",
  },
};
