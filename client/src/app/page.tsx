"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (username) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, []);

  return null; // nothing visible, instant redirect
}