"use client";

import { useEffect, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import FinTechSidebar from "@/components/fintech-sidebar";
import FinTechTopNav from "@/components/fintech-topnav";
import SupplierForm from "@/components/suppliers/supplier-form";
import { Supplier } from "@/lib/suppliers/data";
import { getStoredSupplier } from "@/lib/suppliers/storage";

export default function EditSupplierPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [isAllowed, setIsAllowed] = useState(false);
  const [supplier, setSupplier] = useState<Supplier | null | undefined>(
    undefined,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loggedIn = localStorage.getItem("temitopeLoggedIn") === "true";
    if (!loggedIn) {
      router.push("/auth/login");
      return;
    }

    setSupplier(getStoredSupplier(params.id) ?? null);
    setIsAllowed(true);
  }, [params.id, router]);

  if (!isAllowed || supplier === undefined) return null;

  if (!supplier) {
    notFound();
  }

  return (
    <FinTechSidebar>
      <FinTechTopNav />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pt-16 lg:pt-6">
          <SupplierForm mode="edit" supplier={supplier} />
        </div>
      </main>
    </FinTechSidebar>
  );
}
