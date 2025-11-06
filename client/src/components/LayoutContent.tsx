"use client";

import React from "react";
import { usePathname } from "next/navigation";
import ClientLayoutWrapper from "./ClientLayoutWrapper";
import { useRouter } from "next/navigation";

interface LayoutContentProps {
  children: React.ReactNode;
}

const LayoutContent: React.FC<LayoutContentProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/login";

  React.useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username && !isLoginPage) {
      router.push("/login");
    } else if (username && pathname === "/") {
      router.push("/dashboard");
    }
  }, [pathname, isLoginPage, router]);

  return (
    <>
      {isLoginPage ? (
        children
      ) : (
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      )}
    </>
  );
};

export default LayoutContent;
