export type SupplierStatus = 'active' | 'pending' | 'review' | 'paused'

export interface Supplier {
  id: string
  supplierName: string
  company: string
  chineseBank: string
  province: string
  lastPayment: string
  status: SupplierStatus
  contactEmail: string
  phone: string
  bankAccount: string
  swiftCode: string
  category: string
  lifetimeVolume: string
  paymentCount: number
  riskRating: 'Low' | 'Medium' | 'High'
  onboardingDate: string
  address: string
}

export const suppliers: Supplier[] = [
  {
    id: 'shanghai-electronics',
    supplierName: 'Li Wei',
    company: 'Shanghai Electronics Ltd',
    chineseBank: 'Bank of China',
    province: 'Shanghai',
    lastPayment: 'NGN 4,850,000',
    status: 'active',
    contactEmail: 'finance@shanghai-electronics.cn',
    phone: '+86 21 5488 9021',
    bankAccount: '6222 0212 8840 1902',
    swiftCode: 'BKCHCNBJ300',
    category: 'Electronics',
    lifetimeVolume: 'NGN 86,420,000',
    paymentCount: 28,
    riskRating: 'Low',
    onboardingDate: 'Jan 18, 2026',
    address: 'Pudong New Area, Shanghai',
  },
  {
    id: 'guangzhou-trading',
    supplierName: 'Chen Ming',
    company: 'Guangzhou Trading Co',
    chineseBank: 'ICBC',
    province: 'Guangdong',
    lastPayment: 'NGN 2,760,000',
    status: 'pending',
    contactEmail: 'accounts@gztrading.cn',
    phone: '+86 20 3318 4470',
    bankAccount: '6215 5888 4003 2190',
    swiftCode: 'ICBKCNBJGDG',
    category: 'General Trade',
    lifetimeVolume: 'NGN 34,980,000',
    paymentCount: 14,
    riskRating: 'Medium',
    onboardingDate: 'Feb 6, 2026',
    address: 'Tianhe District, Guangzhou',
  },
  {
    id: 'beijing-tech',
    supplierName: 'Wang Yue',
    company: 'Beijing Tech Solutions',
    chineseBank: 'China Construction Bank',
    province: 'Beijing',
    lastPayment: 'NGN 6,420,000',
    status: 'active',
    contactEmail: 'settlements@bjtech.cn',
    phone: '+86 10 6672 1184',
    bankAccount: '6217 0009 6621 4473',
    swiftCode: 'PCBCCNBJBJX',
    category: 'Technology',
    lifetimeVolume: 'NGN 112,700,000',
    paymentCount: 35,
    riskRating: 'Low',
    onboardingDate: 'Dec 12, 2025',
    address: 'Haidian District, Beijing',
  },
  {
    id: 'shenzhen-manufacturing',
    supplierName: 'Zhao Lin',
    company: 'Shenzhen Manufacturing',
    chineseBank: 'Agricultural Bank of China',
    province: 'Guangdong',
    lastPayment: 'NGN 3,150,000',
    status: 'review',
    contactEmail: 'billing@szmanufacturing.cn',
    phone: '+86 755 9081 7720',
    bankAccount: '6228 4802 0031 1120',
    swiftCode: 'ABOCCNBJ190',
    category: 'Manufacturing',
    lifetimeVolume: 'NGN 58,300,000',
    paymentCount: 19,
    riskRating: 'Medium',
    onboardingDate: 'Mar 4, 2026',
    address: 'Nanshan District, Shenzhen',
  },
  {
    id: 'hangzhou-supplier',
    supplierName: 'Sun Qiang',
    company: 'Hangzhou Supplier Inc',
    chineseBank: 'China Merchants Bank',
    province: 'Zhejiang',
    lastPayment: 'NGN 1,980,000',
    status: 'active',
    contactEmail: 'ops@hzsupplier.cn',
    phone: '+86 571 6628 3401',
    bankAccount: '6214 8388 2200 8731',
    swiftCode: 'CMBCCNBS051',
    category: 'Consumer Goods',
    lifetimeVolume: 'NGN 26,120,000',
    paymentCount: 11,
    riskRating: 'Low',
    onboardingDate: 'Apr 22, 2026',
    address: 'Xihu District, Hangzhou',
  },
  {
    id: 'ningbo-logistics',
    supplierName: 'Liu Fang',
    company: 'Ningbo Logistics Group',
    chineseBank: 'Bank of Communications',
    province: 'Zhejiang',
    lastPayment: 'NGN 0',
    status: 'paused',
    contactEmail: 'trade@ningbologistics.cn',
    phone: '+86 574 7720 1198',
    bankAccount: '6222 6021 7783 9091',
    swiftCode: 'COMMCNSHNGB',
    category: 'Logistics',
    lifetimeVolume: 'NGN 19,400,000',
    paymentCount: 7,
    riskRating: 'High',
    onboardingDate: 'May 8, 2026',
    address: 'Beilun District, Ningbo',
  },
]

export function getSupplier(id: string) {
  return suppliers.find((supplier) => supplier.id === id)
}
