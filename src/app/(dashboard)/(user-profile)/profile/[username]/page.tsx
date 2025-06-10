"use client";
import { Button } from "@/components/ui/button";
import { userData, workSans } from "@/lib/constants";
import { MoveLeft, Star, User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useUserTable } from "@/app/hook/useUsersTable";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const commonStyles = {
  text: `${workSans.className}`,
  card: "rounded-sm shadow-lg shadow-gray-500/5 border-gray-100",
  contentCard: "p-0 [&:not(:last-child)]:border-b [&:not(:last-child)]:pb-10",
};

const TabButton = ({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
      isActive ? "border-main text-main" : "border-transparent text-custome"
    } ${commonStyles.text}`}
  >
    {children}
  </button>
);

const InfoItem = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string | number;
  className?: string;
}) => (
  <div className={`space-y-1 ${className}`}>
    <p className={`text-xs text-gray-500 uppercase ${commonStyles.text}`}>
      {label}
    </p>
    <p className={`text-sm text-gray-900 ${commonStyles.text}`}>{value}</p>
  </div>
);

const ContentSection = ({
  title,
  children,
  gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
}: {
  title: string;
  children: React.ReactNode;
  gridCols?: string;
}) => (
  <div className={commonStyles.contentCard}>
    <CardContent className="space-y-4 p-0">
      <h3 className={`text-base font-medium text-custome ${commonStyles.text}`}>
        {title}
      </h3>
      <div className={`grid ${gridCols} gap-4 md:gap-6`}>{children}</div>
    </CardContent>
  </div>
);

const ActionButton = ({
  variant,
  children,
  onClick,
  disabled,
}: {
  variant: "danger" | "primary";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) => (
  <Button
    variant="outline"
    onClick={onClick}
    disabled={disabled}
    className={`!bg-transparent text-xs ${
      commonStyles.text
    } cursor-pointer shadow-none uppercase rounded-sm ${
      variant === "danger"
        ? "!border-red-500 !text-red-500"
        : "!border-main !text-main"
    }`}
  >
    {children}
  </Button>
);

const TABS = [
  "General Details",
  "Documents",
  "Bank Details",
  "Loans",
  "Savings",
  "App and System",
] as const;

const UserDetails = () => {
  const router = useRouter();
  const { username } = useParams();
  const { data: users, isLoading } = useUserTable();
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]>("General Details");
  const [userStatus, setUserStatus] = useState<"active" | "blacklisted">(
    "active"
  );

  const currentUser =
    users?.find(
      (user) => user.username === decodeURIComponent(username as string)
    ) ?? JSON.parse(localStorage.getItem("lendsqr-userData") || "null");

  const handleBlacklistUser = () => {
    setUserStatus("blacklisted");
    toast.success("The user has been successfully blacklisted.");
  };

  const handleActivateUser = () => {
    setUserStatus("active");
    toast.success("The user has been successfully activated.");
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 3 }, (_, i) => (
      <span key={i} className="text-lg text-yellow-400">
        {i < rating ? "★" : <Star size={14} strokeWidth={1} />}
      </span>
    ));

  const renderGeneralDetails = () => (
    <div className="space-y-5">
      <ContentSection
        title="Personal Information"
        gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
      >
        {Object.entries(userData.personal).map(([key, value]) => (
          <InfoItem
            key={key}
            label={key.replace(/([A-Z])/g, " $1").trim()}
            value={
              key === "email"
                ? currentUser?.email ?? "not set"
                : key === "fullName"
                ? currentUser?.username ?? "not set"
                : key === "phoneNumber"
                ? currentUser?.phoneNumber ?? "not set"
                : value
            }
          />
        ))}
      </ContentSection>

      <ContentSection title="Education and Employment">
        {Object.entries(userData.education).map(([key, value]) => (
          <InfoItem
            key={key}
            label={key.replace(/([A-Z])/g, " $1").trim()}
            value={value}
          />
        ))}
      </ContentSection>

      <ContentSection title="Socials" gridCols="grid-cols-1 md:grid-cols-3">
        {Object.entries(userData.socials).map(([key, value]) => (
          <InfoItem key={key} label={key} value={value} />
        ))}
      </ContentSection>

      <ContentSection title="Guarantor">
        {Object.entries(userData.guarantor).map(([key, value]) => (
          <InfoItem
            key={key}
            label={key.replace(/([A-Z])/g, " $1").trim()}
            value={value}
          />
        ))}
      </ContentSection>
    </div>
  );

  return (
    <div>
      <div className="mb-6">
        <Button
          variant="ghost"
          className={`flex flex-row gap-2 cursor-pointer items-center text-sm !bg-transparent !text-gray-500 ${commonStyles.text}`}
          onClick={() => router.back()}
        >
          <MoveLeft size={32} strokeWidth={1} />
          <span>Back to Users</span>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-4">
        <h2
          className={`text-custome font-medium text-2xl ${commonStyles.text}`}
        >
          User Details
        </h2>
        <div className="flex flex-row gap-x-3 items-center">
          <ActionButton
            variant="danger"
            onClick={handleBlacklistUser}
            disabled={userStatus === "blacklisted"}
          >
            blacklist user
          </ActionButton>
          <ActionButton
            variant="primary"
            onClick={handleActivateUser}
            disabled={userStatus === "active"}
          >
            activate user
          </ActionButton>
        </div>
      </div>

      <Card className={`${commonStyles.card} mb-6 pb-0`}>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 lg:gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {userData.avatar ? (
                  <Image
                    src={userData.avatar}
                    alt="User avatar"
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <User size={32} className="text-gray-400" />
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:gap-6 gap-3 w-full">
              <div className="py-3">
                <h2
                  className={`lg:text-xl md:text-base font-medium text-custome ${commonStyles.text}`}
                >
                  {isLoading ? (
                    <Skeleton className="h-4 w-[100px]" />
                  ) : (
                    currentUser?.username
                  )}
                </h2>
                <p className={`text-sm text-minted ${commonStyles.text}`}>
                  {Math.random()
                    .toString(36)
                    .substring(2, 12)
                    .split("")
                    .map((char, i) =>
                      i % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
                    )
                    .join("")}
                </p>
              </div>

              <div className="md:border-l md:border-r md:px-4 md:py-3">
                <p
                  className={`lg:text-sm text-xs text-minted ${commonStyles.text}`}
                >
                  {userData.tier}
                </p>
                <div className="flex items-center gap-1">
                  {renderStars(userData.rating)}
                </div>
              </div>

              <div className="py-3">
                <p
                  className={`text-xl font-medium text-custome ${commonStyles.text}`}
                >
                  {userData.balance}
                </p>
                <p className={`text-sm text-minted ${commonStyles.text}`}>
                  {Math.floor(1000000000 + Math.random() * 9000000000)}/Providus
                  Bank
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <nav className="flex items-center lg:justify-around overflow-x-auto">
          {TABS.map((tab) => (
            <TabButton
              key={tab}
              isActive={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </TabButton>
          ))}
        </nav>
      </Card>

      <Card className={commonStyles.card}>
        <CardContent>
          {activeTab === "General Details" ? (
            renderGeneralDetails()
          ) : (
            <div className="text-center text-gray-500">
              <p className={commonStyles.text}>
                {activeTab} content will be displayed here
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetails;
