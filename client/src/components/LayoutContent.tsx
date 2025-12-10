"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import ClientLayoutWrapper from "./ClientLayoutWrapper";

interface LayoutContentProps {
  children: React.ReactNode;
}

const LayoutContent: React.FC<LayoutContentProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  // Add your public pages here
  const publicRoutes = ["/login", "/terms", "/privacy", "/about"];

  const isPublicPage = publicRoutes.includes(pathname);

  React.useEffect(() => {
    const username = localStorage.getItem("username");

    // If NOT public page and NOT logged in → go to login
    if (!username && !isPublicPage) {
      router.push("/login");
    }

    // If logged in and on homepage → go to dashboard
    if (username && pathname === "/") {
      router.push("/dashboard");
    }
  }, [pathname, isPublicPage, router]);

  return (
    <>
      {isPublicPage ? (
        // Show page directly, WITHOUT sidebar
        children
      ) : (
        // Show dashboard pages WITH sidebar
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      )}
    </>
  );
};

export default LayoutContent;
