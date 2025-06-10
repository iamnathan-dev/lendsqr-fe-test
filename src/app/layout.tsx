import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@/components/styles/global.scss";
import { Providers } from "./provider";
import { Toaster } from "@/components/ui/sonner";

const avenirNext = localFont({
  src: [
    {
      path: "./fonts/avenir-regular.otf",
      weight: "400",
      style: "normal",
    },

    {
      path: "./fonts/avenir-medium.otf",
      weight: "500",
      style: "medium",
    },

    {
      path: "./fonts/avenir-semibold.otf",
      weight: "700",
      style: "semibold",
    },

    {
      path: "./fonts/avenir-bold.otf",
      weight: "800",
      style: "bold",
    },
  ],
});

export const metadata: Metadata = {
  title: "Lendsqr FE Assessment | Nathaniel Joseph",
  description:
    "Frontend assessment for Lendsqr by Nathaniel Joseph - A user management dashboard interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${avenirNext.className} antialiased`}>
        <Providers>{children}</Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
