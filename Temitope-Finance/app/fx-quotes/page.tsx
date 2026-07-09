"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FXQuotesRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/cny-payout");
  }, [router]);

  return null;
}
