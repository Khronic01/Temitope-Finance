"use client";

import { Supplier, SupplierStatus, suppliers as defaultSuppliers } from "@/lib/suppliers/data";

export const SUPPLIERS_STORAGE_KEY = "temitopeSuppliers";

export interface SupplierFormValues {
  supplierName: string;
  company: string;
  contactEmail: string;
  phone: string;
  province: string;
  category: string;
  address: string;
  status: SupplierStatus;
  riskRating: Supplier["riskRating"];
  chineseBank: string;
  bankAccount: string;
  swiftCode: string;
  lastPayment: string;
}

const FALLBACK_VOLUME = "NGN 0";
const FALLBACK_DATE = new Date().toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseSuppliers(raw: string | null) {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Supplier[];
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function getStoredSuppliers() {
  if (typeof window === "undefined") return defaultSuppliers;

  const stored = parseSuppliers(localStorage.getItem(SUPPLIERS_STORAGE_KEY));
  if (stored && stored.length > 0) {
    return stored;
  }

  return defaultSuppliers;
}

export function saveStoredSuppliers(nextSuppliers: Supplier[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SUPPLIERS_STORAGE_KEY, JSON.stringify(nextSuppliers));
}

export function getStoredSupplier(id: string) {
  return getStoredSuppliers().find((supplier) => supplier.id === id);
}

export function upsertStoredSupplier(
  values: SupplierFormValues,
  existingSupplier?: Supplier,
) {
  const currentSuppliers = getStoredSuppliers();
  const baseId = slugify(values.company || values.supplierName || "supplier");
  const nextId =
    existingSupplier?.id || `${baseId || "supplier"}-${Date.now().toString().slice(-6)}`;

  const nextSupplier: Supplier = {
    id: nextId,
    supplierName: values.supplierName.trim(),
    company: values.company.trim(),
    chineseBank: values.chineseBank.trim(),
    province: values.province.trim(),
    lastPayment: values.lastPayment.trim() || FALLBACK_VOLUME,
    status: values.status,
    contactEmail: values.contactEmail.trim(),
    phone: values.phone.trim(),
    bankAccount: values.bankAccount.trim(),
    swiftCode: values.swiftCode.trim(),
    category: values.category.trim(),
    lifetimeVolume: existingSupplier?.lifetimeVolume || FALLBACK_VOLUME,
    paymentCount: existingSupplier?.paymentCount || 0,
    riskRating: values.riskRating,
    onboardingDate: existingSupplier?.onboardingDate || FALLBACK_DATE,
    address: values.address.trim(),
  };

  const existingIndex = currentSuppliers.findIndex(
    (supplier) => supplier.id === nextSupplier.id,
  );

  if (existingIndex >= 0) {
    const nextSuppliers = [...currentSuppliers];
    nextSuppliers[existingIndex] = nextSupplier;
    saveStoredSuppliers(nextSuppliers);
    return nextSupplier;
  }

  saveStoredSuppliers([nextSupplier, ...currentSuppliers]);
  return nextSupplier;
}
