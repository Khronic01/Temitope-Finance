"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Building2, Save, ShieldCheck } from "lucide-react";
import { Supplier } from "@/lib/suppliers/data";
import { useToast } from "@/components/ui/toast";
import {
  SupplierFormValues,
  upsertStoredSupplier,
} from "@/lib/suppliers/storage";

interface SupplierFormProps {
  mode: "add" | "edit";
  supplier?: Supplier;
}

export default function SupplierForm({ mode, supplier }: SupplierFormProps) {
  const isEdit = mode === "edit";
  const router = useRouter();
  const { addToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [formValues, setFormValues] = useState<SupplierFormValues>({
    supplierName: supplier?.supplierName ?? "",
    company: supplier?.company ?? "",
    contactEmail: supplier?.contactEmail ?? "",
    phone: supplier?.phone ?? "",
    province: supplier?.province ?? "",
    category: supplier?.category ?? "",
    address: supplier?.address ?? "",
    status: supplier?.status ?? "pending",
    riskRating: supplier?.riskRating ?? "Low",
    chineseBank: supplier?.chineseBank ?? "",
    bankAccount: supplier?.bankAccount ?? "",
    swiftCode: supplier?.swiftCode ?? "",
    lastPayment: supplier?.lastPayment ?? "NGN 0",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      const nextSupplier = upsertStoredSupplier(formValues, supplier);
      addToast({
        type: "success",
        message: isEdit
          ? "Supplier updated successfully."
          : "Supplier created successfully.",
      });
      router.push(`/suppliers/${nextSupplier.id}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link
            href="/suppliers"
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to suppliers
          </Link>
          <p className="text-sm font-medium text-primary">
            Supplier Management
          </p>
          <h1 className="mt-1 text-3xl font-bold text-foreground">
            {isEdit ? "Edit Supplier" : "Create New Supplier"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isEdit
              ? "Update bank, contact, and compliance details for this supplier."
              : "Create a verified Chinese supplier profile for future CNY payments."}
          </p>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : isEdit ? "Save Changes" : "Create Supplier"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section className="rounded-lg border border-border bg-card p-6 shadow-sm xl:col-span-2">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">
                Supplier Profile
              </h2>
              <p className="text-sm text-muted-foreground">
                Legal name, company, location, and contact data
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field
              label="Supplier Name"
              name="supplierName"
              value={formValues.supplierName}
              onChange={handleChange}
              placeholder="Li Wei"
            />
            <Field
              label="Company"
              name="company"
              value={formValues.company}
              onChange={handleChange}
              placeholder="Shanghai Electronics Ltd"
            />
            <Field
              label="Contact Email"
              name="contactEmail"
              value={formValues.contactEmail}
              onChange={handleChange}
              placeholder="finance@supplier.cn"
              type="email"
            />
            <Field
              label="Phone Number"
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
              placeholder="+86 21 0000 0000"
            />
            <Field
              label="Province"
              name="province"
              value={formValues.province}
              onChange={handleChange}
              placeholder="Guangdong"
            />
            <Field
              label="Business Category"
              name="category"
              value={formValues.category}
              onChange={handleChange}
              placeholder="Electronics"
            />
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-foreground">
                Address
              </label>
              <textarea
                name="address"
                value={formValues.address}
                onChange={handleChange}
                placeholder="Supplier registered address in China"
                rows={4}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </section>

        <aside className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">
                Compliance Status
              </h2>
              <p className="text-sm text-muted-foreground">
                Internal review settings
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Status
              </label>
              <select
                name="status"
                value={formValues.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="review">In review</option>
                <option value="paused">Paused</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Risk Rating
              </label>
              <select
                name="riskRating"
                value={formValues.riskRating}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
              Bank account and supplier ownership details will be checked before
              the first payout.
            </div>
          </div>
        </aside>
      </div>

      <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-5 font-semibold text-foreground">
          Chinese Bank Details
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Field
            label="Chinese Bank"
            name="chineseBank"
            value={formValues.chineseBank}
            onChange={handleChange}
            placeholder="Bank of China"
          />
          <Field
            label="Bank Account"
            name="bankAccount"
            value={formValues.bankAccount}
            onChange={handleChange}
            placeholder="6222 0000 0000 0000"
          />
          <Field
            label="SWIFT Code"
            name="swiftCode"
            value={formValues.swiftCode}
            onChange={handleChange}
            placeholder="BKCHCNBJ300"
          />
          <Field
            label="Last Payment"
            name="lastPayment"
            value={formValues.lastPayment}
            onChange={handleChange}
            placeholder="NGN 0"
          />
        </div>
      </section>
    </form>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  name: keyof SupplierFormValues;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
