"use client";

import { Beneficiary, BeneficiaryStatus, defaultBeneficiaries, PaymentMethod } from "./data";

export const BENEFICIARIES_STORAGE_KEY = "temitopeBeneficiaries";

export interface BeneficiaryFormValues {
  nickname?: string;
  recipientName: string;
  companyName?: string;
  paymentMethod: PaymentMethod;
  country: string;
  email?: string;
  phone?: string;
  status: BeneficiaryStatus;
  isFavorite: boolean;

  // Chinese Bank Transfer fields
  bankName?: string;
  bankAccount?: string;
  branchName?: string;
  province?: string;
  city?: string;
  swiftCode?: string;
  cnapsCode?: string;

  // Alipay fields
  alipayAccount?: string;
  alipayId?: string;

  // WeChat Pay fields
  wechatId?: string;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseBeneficiaries(raw: string | null) {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Beneficiary[];
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function getStoredBeneficiaries(): Beneficiary[] {
  if (typeof window === "undefined") return defaultBeneficiaries;

  const stored = parseBeneficiaries(localStorage.getItem(BENEFICIARIES_STORAGE_KEY));
  if (stored && stored.length > 0) {
    return stored;
  }

  // Seed local storage with defaults on first load
  localStorage.setItem(BENEFICIARIES_STORAGE_KEY, JSON.stringify(defaultBeneficiaries));
  return defaultBeneficiaries;
}

export function saveStoredBeneficiaries(nextBeneficiaries: Beneficiary[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(BENEFICIARIES_STORAGE_KEY, JSON.stringify(nextBeneficiaries));
}

export function getStoredBeneficiary(id: string): Beneficiary | undefined {
  return getStoredBeneficiaries().find((b) => b.id === id);
}

export function upsertStoredBeneficiary(
  values: BeneficiaryFormValues,
  existingBeneficiary?: Beneficiary
): Beneficiary {
  const currentBeneficiaries = getStoredBeneficiaries();

  const baseId = slugify(values.companyName || values.recipientName || "beneficiary");
  const nextId =
    existingBeneficiary?.id ||
    `${baseId || "beneficiary"}-${Date.now().toString().slice(-6)}`;

  const nextBeneficiary: Beneficiary = {
    id: nextId,
    nickname: values.nickname?.trim(),
    recipientName: values.recipientName.trim(),
    companyName: values.companyName?.trim(),
    paymentMethod: values.paymentMethod,
    country: values.country?.trim() || "China",
    email: values.email?.trim(),
    phone: values.phone?.trim(),
    status: values.status,
    dateCreated:
      existingBeneficiary?.dateCreated || new Date().toISOString().split("T")[0],
    lastPaymentDate: existingBeneficiary?.lastPaymentDate,
    lastUsedPaymentMethod:
      existingBeneficiary?.lastUsedPaymentMethod || values.paymentMethod,
    isFavorite: values.isFavorite,

    bankName:
      values.paymentMethod === "bank_transfer" ? values.bankName?.trim() : undefined,
    bankAccount:
      values.paymentMethod === "bank_transfer" ? values.bankAccount?.trim() : undefined,
    branchName:
      values.paymentMethod === "bank_transfer" ? values.branchName?.trim() : undefined,
    province:
      values.paymentMethod === "bank_transfer" ? values.province?.trim() : undefined,
    city:
      values.paymentMethod === "bank_transfer" ? values.city?.trim() : undefined,
    swiftCode:
      values.paymentMethod === "bank_transfer" ? values.swiftCode?.trim() : undefined,
    cnapsCode:
      values.paymentMethod === "bank_transfer" ? values.cnapsCode?.trim() : undefined,

    alipayAccount:
      values.paymentMethod === "alipay" ? values.alipayAccount?.trim() : undefined,
    alipayId:
      values.paymentMethod === "alipay" ? values.alipayId?.trim() : undefined,

    wechatId:
      values.paymentMethod === "wechat" ? values.wechatId?.trim() : undefined,
  };

  const existingIndex = currentBeneficiaries.findIndex(
    (b) => b.id === nextBeneficiary.id
  );

  if (existingIndex >= 0) {
    const nextBeneficiaries = [...currentBeneficiaries];
    nextBeneficiaries[existingIndex] = nextBeneficiary;
    saveStoredBeneficiaries(nextBeneficiaries);
    return nextBeneficiary;
  }

  saveStoredBeneficiaries([nextBeneficiary, ...currentBeneficiaries]);
  return nextBeneficiary;
}

export function deleteStoredBeneficiary(id: string): boolean {
  const currentBeneficiaries = getStoredBeneficiaries();
  const nextBeneficiaries = currentBeneficiaries.filter((b) => b.id !== id);

  if (currentBeneficiaries.length === nextBeneficiaries.length) {
    return false;
  }

  saveStoredBeneficiaries(nextBeneficiaries);
  return true;
}
