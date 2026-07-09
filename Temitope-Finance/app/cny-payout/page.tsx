"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FinTechSidebar from "@/components/fintech-sidebar";
import FinTechTopNav from "@/components/fintech-topnav";
import StepIndicator from "@/components/send-money/step-indicator";
import { Beneficiary, PaymentMethod } from "@/lib/beneficiaries/data";
import { getStoredBeneficiaries, upsertStoredBeneficiary, saveStoredBeneficiaries } from "@/lib/beneficiaries/storage";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Download,
  LockKeyhole,
  Search,
  ShieldCheck,
  Truck,
  Loader2,
  CreditCard,
  Wallet,
  Send,
  Building2,
  Info,
  Clock,
  UserPlus,
  ChevronRight,
  Check,
  X,
  BookOpen,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";

const STEPS = [
  "Select Payout Method",
  "Recipient Information",
  "Review Payment",
  "OTP Verification",
  "AML Screening",
  "Payment Processing",
  "Payment Successful",
];

const EXCHANGE_RATE = 0.00482;
const PLATFORM_FEE_RATE = 0.012;
const BANK_FEE = 3500;
const reference = "TMP-CNY-20260709-9942";

const PAYMENT_METHODS: Array<{
  id: PaymentMethod;
  label: string;
  description: string;
  icon: any;
}> = [
  {
    id: "bank_transfer",
    label: "Chinese Bank Transfer",
    description: "Settle direct to Chinese supplier RMB accounts.",
    icon: CreditCard,
  },
  {
    id: "alipay",
    label: "Alipay",
    description: "Instant mobile wallet settlement via Alipay account.",
    icon: Wallet,
  },
  {
    id: "wechat",
    label: "WeChat Pay",
    description: "Pay securely to a recipient's WeChat ID.",
    icon: Send,
  },
];

const methodLabels: Record<PaymentMethod, string> = {
  bank_transfer: "Chinese Bank Transfer",
  alipay: "Alipay Payout",
  wechat: "WeChat Pay",
};

export default function CNYPayoutPage() {
  const router = useRouter();
  const { addToast } = useToast();
  
  const [isAllowed, setIsAllowed] = useState(false);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bank_transfer");
  
  // Drawer visibility
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerSearch, setDrawerSearch] = useState("");
  
  // Recipient details
  const [recipientForm, setRecipientForm] = useState({
    recipientName: "",
    companyName: "",
    bankName: "",
    bankAccount: "",
    province: "",
    city: "",
    branchName: "",
    swiftCode: "",
    cnapsCode: "",
    alipayAccount: "",
    wechatId: "",
  });

  // Track if beneficiary is new or updated
  const [isNewRecipient, setIsNewRecipient] = useState(true);

  // Amount Calculator State
  const [amount, setAmount] = useState<number>(2500000);
  const [displayAmount, setDisplayAmount] = useState<string>("2,500,000");

  // Save option
  const [saveBeneficiary, setSaveBeneficiary] = useState(true);

  // OTP
  const [otp, setOtp] = useState("");

  // AML checklist status states
  const [amlStates, setAmlStates] = useState({
    identity: "pending",
    aml: "pending",
    sanctions: "pending",
    risk: "pending",
    beneficiary: "pending",
  });
  
  // Processing status
  const [processingProgress, setProcessingProgress] = useState(0);

  // Load configuration & storage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loggedIn = localStorage.getItem("temitopeLoggedIn") === "true";
    if (!loggedIn) {
      router.push("/auth/login");
      return;
    }

    const walletFunded = localStorage.getItem("temitopeWalletFunded") === "true";
    if (!walletFunded) {
      router.push("/wallet");
      return;
    }

    setIsAllowed(true);
    setBeneficiaries(getStoredBeneficiaries());
  }, [router]);

  // Recipient form field change handler
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecipientForm((prev) => ({ ...prev, [name]: value }));
    setIsNewRecipient(true); // Manually modifying inputs marks it as a new/modified recipient
  };

  // Select beneficiary from Drawer
  const handleSelectFromDrawer = (b: Beneficiary) => {
    setRecipientForm({
      recipientName: b.recipientName || "",
      companyName: b.companyName || "",
      bankName: b.bankName || "",
      bankAccount: b.bankAccount || "",
      province: b.province || "",
      city: b.city || "",
      branchName: b.branchName || "",
      swiftCode: b.swiftCode || "",
      cnapsCode: b.cnapsCode || "",
      alipayAccount: b.alipayAccount || "",
      wechatId: b.wechatId || "",
    });
    setIsNewRecipient(false); // Populating from database means it is existing
    setIsDrawerOpen(false);
    addToast({
      type: "success",
      message: `Populated details for "${b.companyName || b.recipientName}".`,
    });
  };

  // Amount Calculator helper changes
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const stripped = rawValue.replace(/[^\d]/g, "");
    const numericValue = Number(stripped) || 0;

    setAmount(numericValue);
    setDisplayAmount(numericValue ? numericValue.toLocaleString("en-NG") : "");
  };

  const handlePresetClick = (preset: number) => {
    setAmount(preset);
    setDisplayAmount(preset.toLocaleString("en-NG"));
  };

  const quote = useMemo(() => {
    const platformFee = amount * PLATFORM_FEE_RATE;
    const totalFees = platformFee + BANK_FEE;
    const supplierReceives = (amount - platformFee) * EXCHANGE_RATE;
    const totalDebit = amount + BANK_FEE;

    return {
      platformFee,
      transferFee: BANK_FEE,
      totalFees,
      supplierReceives,
      totalDebit,
    };
  }, [amount]);

  // Step 5: AML Screening Checklist progress simulation
  useEffect(() => {
    if (currentStep !== 5) return;
    
    // Simulate sequential checkmarks
    const timers = [
      setTimeout(() => setAmlStates(prev => ({ ...prev, identity: "passed" })), 500),
      setTimeout(() => setAmlStates(prev => ({ ...prev, aml: "passed" })), 1000),
      setTimeout(() => setAmlStates(prev => ({ ...prev, sanctions: "passed" })), 1500),
      setTimeout(() => setAmlStates(prev => ({ ...prev, risk: "passed" })), 2000),
      setTimeout(() => setAmlStates(prev => ({ ...prev, beneficiary: "passed" })), 2500),
      setTimeout(() => {
        // Automatically proceed to Step 6
        setCurrentStep(6);
      }, 3100)
    ];

    return () => timers.forEach(clearTimeout);
  }, [currentStep]);

  // Step 6: Payment routing progress bar simulation
  useEffect(() => {
    if (currentStep !== 6) return;
    
    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Advance to Step 7 Successful
          handlePostPaymentSuccess();
          setCurrentStep(7);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [currentStep]);

  // Write new transactions and save/update beneficiaries
  const handlePostPaymentSuccess = () => {
    const todayStr = new Date().toISOString().split("T")[0]; // "2026-07-09"
    
    // If "Save beneficiary" is checked
    if (saveBeneficiary) {
      const valuesToSave = {
        recipientName: recipientForm.recipientName,
        companyName: recipientForm.companyName || undefined,
        paymentMethod: paymentMethod,
        country: "China",
        email: undefined,
        phone: undefined,
        status: "Verified" as const,
        isFavorite: false,
        
        bankName: paymentMethod === "bank_transfer" ? recipientForm.bankName : undefined,
        bankAccount: paymentMethod === "bank_transfer" ? recipientForm.bankAccount : undefined,
        province: paymentMethod === "bank_transfer" ? recipientForm.province : undefined,
        city: paymentMethod === "bank_transfer" ? recipientForm.city : undefined,
        branchName: paymentMethod === "bank_transfer" ? recipientForm.branchName : undefined,
        swiftCode: paymentMethod === "bank_transfer" ? recipientForm.swiftCode : undefined,
        cnapsCode: paymentMethod === "bank_transfer" ? recipientForm.cnapsCode : undefined,
        
        alipayAccount: paymentMethod === "alipay" ? recipientForm.alipayAccount : undefined,
        wechatId: paymentMethod === "wechat" ? recipientForm.wechatId : undefined,
      };

      // Check if recipient already exists by checking names/account numbers in localStorage database
      const all = getStoredBeneficiaries();
      const existing = all.find((b) => {
        if (paymentMethod === "bank_transfer") {
          return b.bankAccount === recipientForm.bankAccount && b.paymentMethod === "bank_transfer";
        }
        if (paymentMethod === "alipay") {
          return b.alipayAccount === recipientForm.alipayAccount && b.paymentMethod === "alipay";
        }
        if (paymentMethod === "wechat") {
          return b.wechatId === recipientForm.wechatId && b.paymentMethod === "wechat";
        }
        return false;
      });

      if (existing) {
        // Update existing recipient
        const updated = all.map((b) => {
          if (b.id === existing.id) {
            return {
              ...b,
              recipientName: valuesToSave.recipientName,
              companyName: valuesToSave.companyName,
              bankName: valuesToSave.bankName,
              province: valuesToSave.province,
              city: valuesToSave.city,
              branchName: valuesToSave.branchName,
              swiftCode: valuesToSave.swiftCode,
              cnapsCode: valuesToSave.cnapsCode,
              alipayAccount: valuesToSave.alipayAccount,
              wechatId: valuesToSave.wechatId,
              lastPaymentDate: todayStr,
              lastUsedPaymentMethod: paymentMethod,
            };
          }
          return b;
        });
        saveStoredBeneficiaries(updated);
        setIsNewRecipient(false);
      } else {
        // Create new recipient
        const created = upsertStoredBeneficiary(valuesToSave);
        // Set lastPayment details manually
        const finalAll = getStoredBeneficiaries().map((b) => {
          if (b.id === created.id) {
            return { ...b, lastPaymentDate: todayStr, lastUsedPaymentMethod: paymentMethod };
          }
          return b;
        });
        saveStoredBeneficiaries(finalAll);
        setIsNewRecipient(true);
      }
    }

    // Save transaction
    const targetName = recipientForm.companyName || recipientForm.recipientName;
    const targetBank = paymentMethod === "bank_transfer" ? recipientForm.bankName : "CNY Wallet Payout";
    const targetAccount = recipientForm.bankAccount || recipientForm.alipayAccount || recipientForm.wechatId || "Account";

    const tx = {
      id: `txn-${Date.now()}`,
      date: new Date().toLocaleString(),
      reference,
      supplier: targetName,
      amount,
      currency: "NGN",
      fxRate: EXCHANGE_RATE,
      status: "completed",
      settlementTime: "Completed",
      supplierReceives: quote.supplierReceives,
      supplierBank: targetBank,
      supplierAccount: targetAccount,
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      platformFee: quote.platformFee,
      bankFee: BANK_FEE,
      timeline: [
        { step: "Quote Locked", time: "Completed", completed: true },
        { step: "Recipient Authenticated", time: "Completed", completed: true },
        { step: "OTP Authorization", time: "Completed", completed: true },
        { step: "AML Screening", time: "Completed", completed: true },
        { step: "Funds Routed", time: "Completed", completed: true },
        { step: "Payout Successful", time: "Completed", completed: true },
      ],
    };
    
    const existingTx = JSON.parse(localStorage.getItem("temitopeTransactions") || "[]");
    localStorage.setItem("temitopeTransactions", JSON.stringify([tx, ...existingTx]));
  };

  // Step verification rules
  const isStepValid = useMemo(() => {
    if (currentStep === 1) return !!paymentMethod;
    if (currentStep === 2) {
      if (!recipientForm.recipientName.trim()) return false;
      if (amount <= 0) return false;
      if (paymentMethod === "bank_transfer") {
        return !!recipientForm.bankName.trim() && !!recipientForm.bankAccount.trim() && !!recipientForm.province.trim() && !!recipientForm.city.trim();
      }
      if (paymentMethod === "alipay") {
        return !!recipientForm.alipayAccount.trim();
      }
      if (paymentMethod === "wechat") {
        return !!recipientForm.wechatId.trim();
      }
      return false;
    }
    if (currentStep === 3) return true;
    if (currentStep === 4) return otp.length === 6;
    return false; // Steps 5 & 6 auto-advance
  }, [currentStep, paymentMethod, recipientForm, amount, otp]);

  // Drawer filtering
  const filteredDrawerBeneficiaries = useMemo(() => {
    const list = beneficiaries.filter((b) => b.paymentMethod === paymentMethod);
    if (!drawerSearch.trim()) return list;
    const s = drawerSearch.toLowerCase();
    return list.filter(
      (b) =>
        b.recipientName.toLowerCase().includes(s) ||
        b.companyName?.toLowerCase().includes(s) ||
        b.nickname?.toLowerCase().includes(s)
    );
  }, [beneficiaries, paymentMethod, drawerSearch]);

  const maskDrawerIdentifier = (b: Beneficiary) => {
    if (b.paymentMethod === "bank_transfer" && b.bankAccount) {
      const clean = b.bankAccount.replace(/\s/g, "");
      return `${b.bankName || "Bank"} •••• ${clean.slice(-4)}`;
    }
    if (b.paymentMethod === "alipay" && b.alipayAccount) {
      const parts = b.alipayAccount.split("@");
      if (parts.length === 2) {
        return `Alipay •••• ${parts[0].slice(0, 2)}@${parts[1]}`;
      }
      return `Alipay •••• ${b.alipayAccount.slice(-4)}`;
    }
    if (b.paymentMethod === "wechat" && b.wechatId) {
      return `WeChat •••• ${b.wechatId.slice(-4)}`;
    }
    return "Account";
  };

  // Currency formatters
  const formatNGN = (value: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 2 }).format(value);

  const formatCNY = (value: number) =>
    new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY", maximumFractionDigits: 2 }).format(value);

  // Step navigation
  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleNextStep = () => {
    if (!isStepValid) return;
    setCurrentStep((prev) => prev + 1);
  };

  if (!isAllowed) return null;

  return (
    <FinTechSidebar>
      <FinTechTopNav />
      <main className="flex-1 overflow-auto bg-slate-50/50">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 pt-16 lg:pt-6">
          
          {/* Header indicator */}
          <div className="mb-6 border-b border-border pb-4">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider">CNY Payout Corridor</p>
            <h1 className="mt-1 text-2xl font-bold text-foreground">
              CNY Payout
            </h1>
          </div>

          <StepIndicator
            currentStep={currentStep}
            totalSteps={STEPS.length}
            stepLabels={STEPS}
          />

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 relative">
            {/* Left main area */}
            <section className="rounded-xl border border-border bg-card p-6 shadow-sm lg:col-span-2 flex flex-col justify-between min-h-[460px]">
              
              {/* Step 1: Select Payment Method */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-foreground">CNY Payout</h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Send Chinese Yuan (CNY) to your suppliers through your preferred payout method.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {PAYMENT_METHODS.map((method) => {
                      const Icon = method.icon;
                      const isSelected = paymentMethod === method.id;
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setPaymentMethod(method.id)}
                          className={`flex flex-col rounded-xl border p-5 text-left transition-all ${
                            isSelected
                              ? "border-primary bg-primary/5 ring-2 ring-primary/25"
                              : "border-border hover:bg-muted/50"
                          }`}
                        >
                          <div className={`rounded-lg p-2.5 w-fit ${isSelected ? "bg-primary text-white" : "bg-slate-100 text-muted-foreground"} mb-4`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="font-bold text-sm text-foreground mb-1">
                            {method.label}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {method.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Recipient Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div>
                      <h2 className="text-lg font-bold text-foreground">Recipient Information</h2>
                      <p className="text-xs text-muted-foreground mt-1">
                        Enter the recipient's payment details based on the selected payout method.
                      </p>
                    </div>
                    
                    {/* Drawer trigger */}
                    <button
                      type="button"
                      onClick={() => {
                        setDrawerSearch("");
                        setIsDrawerOpen(true);
                      }}
                      className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-muted transition-colors shadow-sm"
                    >
                      📒 Choose from Previous Recipients
                    </button>
                  </div>

                  {/* Dynamic fields based on method */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {paymentMethod === "bank_transfer" && (
                      <>
                        <InputField label="Recipient Name" name="recipientName" value={recipientForm.recipientName} onChange={handleFieldChange} placeholder="Zhang Wei" />
                        <InputField label="Company Name (Optional)" name="companyName" value={recipientForm.companyName} onChange={handleFieldChange} placeholder="Shenzhen Trading Ltd" />
                        <InputField label="Bank Name" name="bankName" value={recipientForm.bankName} onChange={handleFieldChange} placeholder="ICBC / Bank of China" />
                        <InputField label="Account Number" name="bankAccount" value={recipientForm.bankAccount} onChange={handleFieldChange} placeholder="6215 5888 4003 4587" />
                        <InputField label="Province" name="province" value={recipientForm.province} onChange={handleFieldChange} placeholder="Guangdong" />
                        <InputField label="City" name="city" value={recipientForm.city} onChange={handleFieldChange} placeholder="Shenzhen" />
                        <InputField label="Branch (Optional)" name="branchName" value={recipientForm.branchName} onChange={handleFieldChange} placeholder="Nanshan Branch" />
                        <InputField label="SWIFT / CNAPS (If Required)" name="swiftCode" value={recipientForm.swiftCode} onChange={handleFieldChange} placeholder="ICBKCNBJGDG" />
                      </>
                    )}

                    {paymentMethod === "alipay" && (
                      <>
                        <InputField label="Recipient Name" name="recipientName" value={recipientForm.recipientName} onChange={handleFieldChange} placeholder="Zhang Wei" />
                        <InputField label="Alipay Account (Email or Phone Number)" name="alipayAccount" value={recipientForm.alipayAccount} onChange={handleFieldChange} placeholder="receiver@alipay.com or +86 138 0000 0000" />
                      </>
                    )}

                    {paymentMethod === "wechat" && (
                      <>
                        <InputField label="Recipient Name" name="recipientName" value={recipientForm.recipientName} onChange={handleFieldChange} placeholder="Zhang Wei" />
                        <InputField label="WeChat ID / Linked Phone Number" name="wechatId" value={recipientForm.wechatId} onChange={handleFieldChange} placeholder="wechat_id_username or +86 138 0000 0000" />
                      </>
                    )}
                  </div>

                  {/* Calculator integrated directly here */}
                  <div className="border-t border-slate-100 pt-5 mt-4">
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Amount in NGN (Calculator)
                    </label>
                    <div className="flex rounded-lg border border-border bg-background focus-within:ring-2 focus-within:ring-primary/20">
                      <span className="border-r border-border px-3.5 py-3 text-sm font-bold text-muted-foreground flex items-center bg-slate-50/50">
                        NGN
                      </span>
                      <input
                        type="text"
                        value={displayAmount}
                        onChange={handleAmountChange}
                        placeholder="Enter amount"
                        className="w-full bg-transparent px-4 py-3 text-2xl font-extrabold text-foreground outline-none"
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        Rate: 1 NGN = {EXCHANGE_RATE.toFixed(5)} CNY
                      </span>
                      <span className="font-bold text-emerald-600">
                        Supplier Receives: {formatCNY(quote.supplierReceives)}
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {[1000000, 2500000, 5000000].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => handlePresetClick(preset)}
                          className="rounded-lg border border-border bg-background py-2 text-xs font-bold hover:bg-muted text-foreground transition-all"
                        >
                          {formatNGN(preset)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Save Recipient Option checkbox */}
                  <div className="border-t border-slate-100 pt-4 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="saveBeneficiaryCheckbox"
                      checked={saveBeneficiary}
                      onChange={(e) => setSaveBeneficiary(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/20 cursor-pointer"
                    />
                    <label htmlFor="saveBeneficiaryCheckbox" className="text-xs font-medium text-slate-700 cursor-pointer select-none">
                      Save this recipient for future CNY Payouts
                    </label>
                  </div>
                </div>
              )}

              {/* Step 3: Review Payment */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-foreground">Review Payment</h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Verify transaction parameters before confirming settlement.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-slate-50/50 p-5 space-y-4">
                    <ReviewRow label="Recipient Name" value={recipientForm.recipientName} />
                    {recipientForm.companyName && (
                      <ReviewRow label="Company Name" value={recipientForm.companyName} />
                    )}
                    <ReviewRow label="Payment Method" value={methodLabels[paymentMethod]} />
                    <ReviewRow
                      label="Destination Identifier"
                      value={recipientForm.bankAccount || recipientForm.alipayAccount || recipientForm.wechatId || ""}
                    />
                    {paymentMethod === "bank_transfer" && (
                      <ReviewRow label="Bank Name" value={recipientForm.bankName} />
                    )}
                    <ReviewRow label="Amount Sent" value={formatNGN(amount)} strong />
                    <ReviewRow label="Recipient Receives" value={formatCNY(quote.supplierReceives)} highlighted />
                    <ReviewRow label="Exchange Rate" value={`1 NGN = ${EXCHANGE_RATE.toFixed(5)} CNY`} />
                    <ReviewRow label="Platform Fee" value={formatNGN(quote.platformFee + quote.transferFee)} />
                    <ReviewRow label="Estimated Settlement" value="2-6 business hours (Instant Payout Available)" />
                  </div>
                </div>
              )}

              {/* Step 4: OTP Verification */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-foreground">OTP Verification</h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter the One-Time Password to authorize the payment.
                    </p>
                  </div>

                  <div className="mx-auto max-w-sm text-center py-6">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <LockKeyhole className="h-6 w-6" />
                    </div>
                    <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      maxLength={6}
                      placeholder="000000"
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-center text-3xl font-bold tracking-[0.4em] text-foreground outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                    <p className="mt-3 text-xs text-muted-foreground">
                      Verification code dispatched to ending number •••• 9201.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 5: AML & Compliance Screening */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-foreground">Screening Your Transaction</h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      We're performing mandatory AML, sanctions, and risk checks before processing your payment.
                    </p>
                  </div>

                  <div className="max-w-md mx-auto space-y-3.5 py-4">
                    <ComplianceCheckItem label="Identity Verification" status={amlStates.identity} />
                    <ComplianceCheckItem label="AML Screening" status={amlStates.aml} />
                    <ComplianceCheckItem label="Sanctions Screening" status={amlStates.sanctions} />
                    <ComplianceCheckItem label="Risk Assessment" status={amlStates.risk} />
                    <ComplianceCheckItem label="Beneficiary Validation" status={amlStates.beneficiary} />
                  </div>
                </div>
              )}

              {/* Step 6: Payment Processing */}
              {currentStep === 6 && (
                <div className="text-center py-10 my-auto space-y-6">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Routing Funds to China</h2>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto mt-1">
                      Routing NGN deposit through verified correspondent networks to settlement.
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="max-w-md mx-auto space-y-2">
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-200"
                        style={{ width: `${processingProgress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Status: Settling CNY</span>
                      <span>Est. time remaining: seconds</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 7: Payment Successful */}
              {currentStep === 7 && (
                <div className="space-y-6">
                  <div className="text-center border-b pb-4">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-foreground tracking-tight">Payment Successful</h2>
                    
                    {/* Post-save status prompt messages */}
                    <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg mt-3 inline-block max-w-md">
                      {isNewRecipient ? (
                        "Recipient has been saved to your Previous Recipients list for faster future CNY Payouts."
                      ) : (
                        "Recipient information has been updated in your Previous Recipients list."
                      )}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-md mx-auto text-xs border-b pb-4 border-slate-100">
                    <div className="flex justify-between py-1.5"><span className="text-muted-foreground">Reference:</span><span className="font-mono font-bold text-foreground">{reference}</span></div>
                    <div className="flex justify-between py-1.5"><span className="text-muted-foreground">Recipient Name:</span><span className="font-bold text-foreground">{recipientForm.recipientName}</span></div>
                    <div className="flex justify-between py-1.5"><span className="text-muted-foreground">Payment Method:</span><span className="font-bold text-foreground">{methodLabels[paymentMethod]}</span></div>
                    <div className="flex justify-between py-1.5"><span className="text-muted-foreground">Amount Sent:</span><span className="font-bold text-foreground">{formatNGN(amount)}</span></div>
                    <div className="flex justify-between py-1.5"><span className="text-muted-foreground">Recipient Receives (CNY):</span><span className="font-bold text-emerald-600">{formatCNY(quote.supplierReceives)}</span></div>
                    <div className="flex justify-between py-1.5"><span className="text-muted-foreground">Exchange Rate:</span><span className="font-bold text-foreground">1 NGN = {EXCHANGE_RATE.toFixed(5)} CNY</span></div>
                    <div className="flex justify-between py-1.5"><span className="text-muted-foreground">Fees:</span><span className="font-bold text-foreground">{formatNGN(quote.platformFee + quote.transferFee)}</span></div>
                    <div className="flex justify-between py-1.5"><span className="text-muted-foreground">Settlement:</span><span className="font-bold text-foreground">Settled (CNY)</span></div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <button
                      onClick={() => router.push("/transactions")}
                      className="flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-white hover:opacity-95 flex-1 transition-all"
                    >
                      <Truck className="h-3.5 w-3.5" />
                      Track Payment
                    </button>
                    <button
                      onClick={() => {
                        // Reset everything back to step 1
                        setAmount(2500000);
                        setDisplayAmount("2,500,000");
                        setOtp("");
                        setRecipientForm({
                          recipientName: "",
                          companyName: "",
                          bankName: "",
                          bankAccount: "",
                          province: "",
                          city: "",
                          branchName: "",
                          swiftCode: "",
                          cnapsCode: "",
                          alipayAccount: "",
                          wechatId: "",
                        });
                        setAmlStates({
                          identity: "pending",
                          aml: "pending",
                          sanctions: "pending",
                          risk: "pending",
                          beneficiary: "pending",
                        });
                        setProcessingProgress(0);
                        setCurrentStep(1);
                      }}
                      className="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2.5 text-xs font-bold text-foreground hover:bg-muted flex-1 transition-all"
                    >
                      Make Another CNY Payout
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom buttons controller */}
              {currentStep <= 4 && (
                <div className="mt-8 pt-4 border-t border-border flex justify-between gap-3">
                  <button
                    onClick={handlePreviousStep}
                    disabled={currentStep === 1}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-xs font-bold text-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back
                  </button>

                  <button
                    onClick={handleNextStep}
                    disabled={!isStepValid}
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-primary px-6 py-2 text-xs font-bold text-white hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                  >
                    {currentStep === 1 && "Continue"}
                    {currentStep === 2 && "Review Payment"}
                    {currentStep === 3 && "Confirm & Continue"}
                    {currentStep === 4 && "Authorize Payment"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              {currentStep === 7 && (
                <div className="mt-8 pt-4 border-t border-border flex justify-center">
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="rounded-lg border border-border bg-background px-5 py-2 text-xs font-bold text-foreground hover:bg-muted transition-all"
                  >
                    Return to Dashboard
                  </button>
                </div>
              )}

            </section>

            {/* Right details panel */}
            <aside className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4 h-fit">
              <h2 className="text-base font-bold text-foreground border-b pb-2">
                Summary
              </h2>
              
              <div className="space-y-3">
                <SummaryTile
                  label="Method"
                  value={methodLabels[paymentMethod]}
                />
                
                {recipientForm.recipientName && (
                  <SummaryTile
                    label="Recipient"
                    value={recipientForm.companyName || recipientForm.recipientName}
                  />
                )}

                {amount > 0 && (
                  <>
                    <SummaryTile
                      label="Gross Debit"
                      value={formatNGN(quote.totalDebit)}
                    />
                    <SummaryTile
                      label="Receives (CNY)"
                      value={formatCNY(quote.supplierReceives)}
                      highlight
                    />
                  </>
                )}
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-700">
                Quotes are locked for the duration of the review screen window to prevent market fluctuations from affecting settlement.
              </div>
            </aside>

            {/* Slide-over Drawer for Previous Recipients */}
            {isDrawerOpen && (
              <>
                {/* Backdrop overlay */}
                <div
                  className="fixed inset-0 bg-black/40 z-40 transition-opacity animate-in fade-in duration-200"
                  onClick={() => setIsDrawerOpen(false)}
                />
                
                {/* Drawer Panel */}
                <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-card border-l border-border shadow-2xl z-50 flex flex-col justify-between animate-in slide-in-from-right duration-250">
                  
                  {/* Drawer Header */}
                  <div className="p-4 border-b border-border flex items-center justify-between bg-slate-50">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <h3 className="font-bold text-foreground text-sm">Previous Recipients</h3>
                    </div>
                    <button
                      onClick={() => setIsDrawerOpen(false)}
                      className="rounded-lg p-1 hover:bg-slate-200 text-muted-foreground transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Drawer Search */}
                  <div className="p-4 border-b border-border bg-card">
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                      <input
                        value={drawerSearch}
                        onChange={(e) => setDrawerSearch(e.target.value)}
                        placeholder="Search by name or company..."
                        className="w-full rounded-lg border border-border bg-background py-1.5 pl-9 pr-3 text-xs outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Drawer Scrollable Content */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
                    {filteredDrawerBeneficiaries.length === 0 ? (
                      <div className="text-center py-10 text-xs text-muted-foreground">
                        No matching previous recipients found for this method.
                      </div>
                    ) : (
                      filteredDrawerBeneficiaries.map((b) => (
                        <div
                          key={b.id}
                          onClick={() => handleSelectFromDrawer(b)}
                          className="rounded-xl border border-border bg-card p-4 hover:border-primary/50 hover:shadow-sm transition-all duration-200 cursor-pointer text-left space-y-2 group"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors truncate">
                              {b.companyName || b.recipientName}
                            </h4>
                            <span className="text-[9px] font-semibold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                              {b.status}
                            </span>
                          </div>
                          {b.companyName && (
                            <p className="text-[10px] text-muted-foreground truncate">
                              Contact: {b.recipientName}
                            </p>
                          )}
                          <div className="flex justify-between items-center text-[10px] pt-1.5 border-t border-slate-100">
                            <span className="font-mono text-slate-500">{maskDrawerIdentifier(b)}</span>
                            {b.lastPaymentDate && (
                              <span className="text-slate-400">Paid: {b.lastPaymentDate}</span>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Drawer Footer */}
                  <div className="p-4 border-t border-border bg-slate-50 text-center">
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      Only displays verified recipients matching the selected payout rail.
                    </p>
                  </div>

                </div>
              </>
            )}

          </div>

        </div>
      </main>
    </FinTechSidebar>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-xs font-semibold text-slate-700 mb-1.5">{label} *</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground"
      />
    </div>
  );
}

function ReviewRow({
  label,
  value,
  strong = false,
  highlighted = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
  highlighted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={`text-xs ${highlighted ? "font-bold text-emerald-600 text-sm" : strong ? "font-bold text-foreground" : "font-semibold text-slate-800"}`}>
        {value}
      </span>
    </div>
  );
}

function ComplianceCheckItem({
  label,
  status,
}: {
  label: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3.5 shadow-sm">
      <span className="text-xs font-semibold text-foreground">{label}</span>
      <span className="flex items-center gap-1.5 text-xs">
        {status === "pending" ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
            <span className="text-primary font-semibold">Running</span>
          </>
        ) : (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-600 font-bold" />
            <span className="text-emerald-700 font-bold">Passed</span>
          </>
        )}
      </span>
    </div>
  );
}

function SummaryTile({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-slate-50/50 p-3 flex flex-col">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className={`mt-1 text-xs font-bold ${highlight ? "text-emerald-600 text-sm" : "text-foreground"}`}>
        {value}
      </span>
    </div>
  );
}
