export type PaymentMethod = "bank_transfer" | "alipay" | "wechat";
export type BeneficiaryStatus = "Verified" | "Pending" | "Disabled";

export interface Beneficiary {
  id: string;
  nickname?: string;
  recipientName: string;
  companyName?: string;
  paymentMethod: PaymentMethod;
  country: string; // Defaults to "China"
  email?: string;
  phone?: string;
  status: BeneficiaryStatus;
  dateCreated: string;
  lastPaymentDate?: string;
  lastUsedPaymentMethod?: PaymentMethod;
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
  alipayAccount?: string; // Email or phone
  alipayId?: string;

  // WeChat Pay fields
  wechatId?: string; // WeChat ID or phone
}

export const defaultBeneficiaries: Beneficiary[] = [
  {
    id: "shenzhen-trading",
    nickname: "SZ Trading",
    recipientName: "Zhang Wei",
    companyName: "Shenzhen Trading Ltd.",
    paymentMethod: "bank_transfer",
    country: "China",
    email: "info@sztrading.cn",
    phone: "+86 755 8820 1902",
    status: "Verified",
    dateCreated: "2026-01-18",
    lastPaymentDate: "2026-07-06",
    lastUsedPaymentMethod: "bank_transfer",
    isFavorite: true,
    bankName: "ICBC",
    bankAccount: "6215588840034587",
    province: "Guangdong",
    city: "Shenzhen",
    branchName: "Nanshan Branch",
    swiftCode: "ICBKCNBJGDG",
    cnapsCode: "102584000010"
  },
  {
    id: "shanghai-electronics",
    nickname: "Shanghai Elect",
    recipientName: "Li Wei",
    companyName: "Shanghai Electronics Ltd.",
    paymentMethod: "bank_transfer",
    country: "China",
    email: "finance@shanghai-electronics.cn",
    phone: "+86 21 5488 9021",
    status: "Verified",
    dateCreated: "2026-02-06",
    lastPaymentDate: "2026-07-02",
    lastUsedPaymentMethod: "bank_transfer",
    isFavorite: false,
    bankName: "Bank of China",
    bankAccount: "6222021288401902",
    province: "Shanghai",
    city: "Shanghai",
    branchName: "Pudong Branch",
    swiftCode: "BKCHCNBJ300"
  },
  {
    id: "guangzhou-tech-trading",
    nickname: "GZ Tech",
    recipientName: "Chen Ming",
    companyName: "Guangzhou Tech Trading",
    paymentMethod: "alipay",
    country: "China",
    email: "accounts@gztrading.cn",
    phone: "+86 20 3318 4470",
    status: "Pending",
    dateCreated: "2026-03-12",
    isFavorite: false,
    alipayAccount: "chen.ming@gztrading.cn",
    alipayId: "2088123456789012"
  },
  {
    id: "beijing-tech",
    nickname: "BJ Tech",
    recipientName: "Wang Yue",
    companyName: "Beijing Tech Solutions",
    paymentMethod: "wechat",
    country: "China",
    email: "settlements@bjtech.cn",
    phone: "+86 10 6672 1184",
    status: "Verified",
    dateCreated: "2025-12-12",
    lastPaymentDate: "2026-06-25",
    lastUsedPaymentMethod: "wechat",
    isFavorite: true,
    wechatId: "wang_yue_wechat"
  },
  {
    id: "zhao-lin",
    nickname: "Zhao Lin",
    recipientName: "Zhao Lin",
    paymentMethod: "alipay",
    country: "China",
    email: "zhao.lin@gmail.com",
    phone: "+86 138 9081 7720",
    status: "Disabled",
    dateCreated: "2026-05-08",
    lastPaymentDate: "2026-05-20",
    lastUsedPaymentMethod: "alipay",
    isFavorite: false,
    alipayAccount: "+86 138 9081 7720"
  }
];

export function getBeneficiary(id: string) {
  return defaultBeneficiaries.find((b) => b.id === id);
}
