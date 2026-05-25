"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";
import Cookies from "js-cookie";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");

    // BELUM LOGIN
    if (!token) {
      router.replace("/login");
    } else {
      setChecking(false);
    }
  }, []);

  // LOADING AUTH CHECK
  if (checking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex bg-black min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-72 pt-24">
        <Navbar />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
