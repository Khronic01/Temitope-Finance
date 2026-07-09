"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FinTechSidebar from "@/components/fintech-sidebar";
import FinTechTopNav from "@/components/fintech-topnav";
import SupplierForm from "@/components/suppliers/supplier-form";

export default function AddSupplierPage() {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loggedIn = localStorage.getItem("temitopeLoggedIn") === "true";
    if (!loggedIn) {
      router.push("/auth/login");
      return;
    }

    setIsAllowed(true);
  }, [router]);

  if (!isAllowed) return null;

  return (
    <FinTechSidebar>
      <FinTechTopNav />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pt-16 lg:pt-6">
          <SupplierForm mode="add" />
        </div>
      </main>
    </FinTechSidebar>
  );
}
