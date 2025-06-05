import Image from "next/image";
import { ReactNode } from "react";
import Auth_illustration from "./assets/svg/auth-illus.svg";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-white flex flex-col md:flex-row relative">
      <div className="absolute top-4 left-4 md:top-15 md:left-15">
        <Image
          src="/logo.svg"
          alt="logo"
          width={100}
          height={100}
          className="object-cover w-auto h-[30px] md:h-auto"
        />
      </div>
      <div className="w-full md:basis-1/2 py-8 md:h-screen items-center justify-center hidden md:flex">
        <Image
          src={Auth_illustration}
          alt="auth illustration"
          width={500}
          height={337.57}
          className="object-cover w-[80%] md:w-auto"
        />
      </div>

      <div className="w-full md:basis-1/2 h-screen flex items-center justify-center shadow-2xl md:shadow-gray-100">
        <div className="max-w-md w-full px-4 lg:px-0">{children}</div>
      </div>
    </main>
  );
}
