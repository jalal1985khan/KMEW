export type PaymentStatus =
  | "PENDING"
  | "MEMBER_PAID"        // 🟡 Yellow - PRD Section 15
  | "ASSOCIATE_VERIFIED"  // 🔵 Blue - PRD Section 15
  | "MEMBER_APPROVED"     // 🟢 Green - PRD Section 15
  | "ADMIN_CONFIRMED";    // 🔴 Red - PRD Section 15

export interface PaymentInstallment {
  id: string;
  memberId: string;
  memberName: string;
  associateId: string;
  associateName: string;
  installmentNo: number;
  totalInstallments: number;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: PaymentStatus;
  paymentMode?: "UPI" | "CASH" | "BANK_TRANSFER";
  utrReference?: string;
  receiptUrl?: string;
  remarks?: string;
  associateVerifiedAt?: string;
  adminConfirmedAt?: string;
}

export interface MemberRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  ward: string;
  category: "Higher Education" | "School Tuition" | "Vocational Skill" | "Medical Aid";
  kycStatus: "VERIFIED" | "PENDING_REVIEW" | "REJECTED";
  assignedAssociateId?: string;
  assignedAssociateName?: string;
  aidAmount: number;
  disbursedAmount: number;
  installmentsCount: number;
  completedInstallments: number;
  joinedDate: string;
  address: string;
  guardianName: string;
  guardianPhone: string;
  bankAccount: {
    accountNumber: string;
    ifsc: string;
    bankName: string;
  };
}

export interface AssociateRecord {
  id: string;
  badgeNumber: string;
  name: string;
  email: string;
  phone: string;
  assignedWards: string[];
  assignedMembersCount: number;
  activePlansCount: number;
  totalCollections: number;
  pendingVerifications: number;
  rating: number;
  joinedDate: string;
  status: "ACTIVE" | "ON_LEAVE" | "PENDING_APPROVAL";
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  action: string;
  performedBy: string;
  target: string;
  statusBadge: PaymentStatus | "INFO" | "SUCCESS";
}

export const INITIAL_MEMBERS: MemberRecord[] = [
  {
    id: "KMEW-MEM-2024-0418",
    name: "Rahul Sharma",
    email: "rahul.sharma@kmew.org.in",
    phone: "+91 98321 44521",
    ward: "Ward 12, Kulti Bazar",
    category: "Higher Education",
    kycStatus: "VERIFIED",
    assignedAssociateId: "KMEW-ASC-082",
    assignedAssociateName: "Bikram Das",
    aidAmount: 24000,
    disbursedAmount: 12000,
    installmentsCount: 6,
    completedInstallments: 3,
    joinedDate: "12 Jan 2024",
    address: "42 Station Road, Near Kali Mandir, Kulti, PIN 713343",
    guardianName: "Manoj Sharma",
    guardianPhone: "+91 94342 11982",
    bankAccount: {
      accountNumber: "•••• •••• 8492",
      ifsc: "SBIN0001248",
      bankName: "State Bank of India (Kulti Branch)",
    },
  },
  {
    id: "KMEW-MEM-2024-0520",
    name: "Fatima Khatun",
    email: "fatima.k@kmew.org.in",
    phone: "+91 87654 32190",
    ward: "Ward 08, Kendua Bazar",
    category: "Vocational Skill",
    kycStatus: "VERIFIED",
    assignedAssociateId: "KMEW-ASC-082",
    assignedAssociateName: "Bikram Das",
    aidAmount: 18000,
    disbursedAmount: 12000,
    installmentsCount: 4,
    completedInstallments: 2,
    joinedDate: "05 Feb 2024",
    address: "15 Rahamat Nagar, Kulti, PIN 713343",
    guardianName: "Abdul Razzak",
    guardianPhone: "+91 91234 56780",
    bankAccount: {
      accountNumber: "•••• •••• 3914",
      ifsc: "PUNB0182700",
      bankName: "Punjab National Bank (Asansol)",
    },
  },
  {
    id: "KMEW-MEM-2024-0612",
    name: "Amit Sen",
    email: "amit.sen@kmew.org.in",
    phone: "+91 94341 87654",
    ward: "Ward 04, Sitarampur",
    category: "School Tuition",
    kycStatus: "PENDING_REVIEW",
    assignedAssociateId: "KMEW-ASC-045",
    assignedAssociateName: "Sunita Roy",
    aidAmount: 12000,
    disbursedAmount: 4000,
    installmentsCount: 3,
    completedInstallments: 1,
    joinedDate: "18 Mar 2024",
    address: "88 Railway Colony, Sitarampur, PIN 713359",
    guardianName: "Pranab Sen",
    guardianPhone: "+91 97321 00412",
    bankAccount: {
      accountNumber: "•••• •••• 9921",
      ifsc: "UBIN0541289",
      bankName: "Union Bank of India",
    },
  },
  {
    id: "KMEW-MEM-2024-0744",
    name: "Priya Mondal",
    email: "priya.mondal@kmew.org.in",
    phone: "+91 91234 88712",
    ward: "Ward 15, Barakar",
    category: "Higher Education",
    kycStatus: "VERIFIED",
    assignedAssociateId: "KMEW-ASC-019",
    assignedAssociateName: "Mohammed Irfan",
    aidAmount: 30000,
    disbursedAmount: 20000,
    installmentsCount: 6,
    completedInstallments: 4,
    joinedDate: "22 Apr 2024",
    address: "24 Old Post Office Road, Barakar, PIN 713324",
    guardianName: "Subhas Mondal",
    guardianPhone: "+91 94344 55123",
    bankAccount: {
      accountNumber: "•••• •••• 5510",
      ifsc: "HDFC0001923",
      bankName: "HDFC Bank (Barakar Branch)",
    },
  },
];

export const INITIAL_ASSOCIATES: AssociateRecord[] = [
  {
    id: "KMEW-ASC-082",
    badgeNumber: "#082",
    name: "Bikram Das",
    email: "bikram.das@kmew.org.in",
    phone: "+91 89722 85850",
    assignedWards: ["Ward 12 (Kulti)", "Ward 08 (Kendua)", "Ward 10"],
    assignedMembersCount: 24,
    activePlansCount: 19,
    totalCollections: 184000,
    pendingVerifications: 3,
    rating: 4.9,
    joinedDate: "15 Oct 2023",
    status: "ACTIVE",
  },
  {
    id: "KMEW-ASC-045",
    badgeNumber: "#045",
    name: "Sunita Roy",
    email: "sunita.roy@kmew.org.in",
    phone: "+91 98321 00987",
    assignedWards: ["Ward 04 (Sitarampur)", "Ward 06"],
    assignedMembersCount: 18,
    activePlansCount: 14,
    totalCollections: 122000,
    pendingVerifications: 1,
    rating: 4.8,
    joinedDate: "02 Dec 2023",
    status: "ACTIVE",
  },
  {
    id: "KMEW-ASC-019",
    badgeNumber: "#019",
    name: "Mohammed Irfan",
    email: "m.irfan@kmew.org.in",
    phone: "+91 94345 67890",
    assignedWards: ["Ward 15 (Barakar)", "Ward 16"],
    assignedMembersCount: 31,
    activePlansCount: 26,
    totalCollections: 246000,
    pendingVerifications: 2,
    rating: 4.95,
    joinedDate: "10 Aug 2023",
    status: "ACTIVE",
  },
];

export const INITIAL_INSTALLMENTS: PaymentInstallment[] = [
  {
    id: "PAY-2024-101",
    memberId: "KMEW-MEM-2024-0418",
    memberName: "Rahul Sharma",
    associateId: "KMEW-ASC-082",
    associateName: "Bikram Das",
    installmentNo: 4,
    totalInstallments: 6,
    amount: 4000,
    dueDate: "25 Sep 2026",
    paidDate: "26 Sep 2026",
    status: "MEMBER_PAID", // 🟡 Yellow
    paymentMode: "UPI",
    utrReference: "UPI/392817492810/SBI",
    remarks: "Quarterly scholarship installment paid via GooglePay UPI",
  },
  {
    id: "PAY-2024-102",
    memberId: "KMEW-MEM-2024-0520",
    memberName: "Fatima Khatun",
    associateId: "KMEW-ASC-082",
    associateName: "Bikram Das",
    installmentNo: 3,
    totalInstallments: 4,
    amount: 4500,
    dueDate: "20 Sep 2026",
    paidDate: "21 Sep 2026",
    status: "ASSOCIATE_VERIFIED", // 🔵 Blue
    paymentMode: "CASH",
    utrReference: "CSH-REC-8842",
    associateVerifiedAt: "24 Sep 2026 by Bikram Das",
    remarks: "Cash collected in Kendua ward camp. Receipt #8842 handed over.",
  },
  {
    id: "PAY-2024-103",
    memberId: "KMEW-MEM-2024-0744",
    memberName: "Priya Mondal",
    associateId: "KMEW-ASC-019",
    associateName: "Mohammed Irfan",
    installmentNo: 5,
    totalInstallments: 6,
    amount: 5000,
    dueDate: "15 Sep 2026",
    paidDate: "16 Sep 2026",
    status: "MEMBER_APPROVED", // 🟢 Green
    paymentMode: "BANK_TRANSFER",
    utrReference: "NEFT-HDFC-9912048",
    associateVerifiedAt: "17 Sep 2026 by M. Irfan",
    remarks: "NEFT verified by associate; two-way digital handshake completed.",
  },
  {
    id: "PAY-2024-104",
    memberId: "KMEW-MEM-2024-0418",
    memberName: "Rahul Sharma",
    associateId: "KMEW-ASC-082",
    associateName: "Bikram Das",
    installmentNo: 3,
    totalInstallments: 6,
    amount: 4000,
    dueDate: "25 Jun 2026",
    paidDate: "25 Jun 2026",
    status: "ADMIN_CONFIRMED", // 🔴 Red
    paymentMode: "UPI",
    utrReference: "UPI/2091823901/SBI",
    associateVerifiedAt: "26 Jun 2026",
    adminConfirmedAt: "28 Jun 2026 by Central Accounts",
    remarks: "Final accounting verification sealed and logged into ledger.",
  },
  {
    id: "PAY-2024-105",
    memberId: "KMEW-MEM-2024-0418",
    memberName: "Rahul Sharma",
    associateId: "KMEW-ASC-082",
    associateName: "Bikram Das",
    installmentNo: 5,
    totalInstallments: 6,
    amount: 4000,
    dueDate: "25 Dec 2026",
    status: "PENDING",
    remarks: "Upcoming semester installment.",
  },
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: "AUD-991",
    timestamp: "Today at 01:14 PM",
    action: "Admin Final Confirmation",
    performedBy: "Rajeshwar Sharma (Admin)",
    target: "Installment #3 for Rahul Sharma (₹4,000)",
    statusBadge: "ADMIN_CONFIRMED",
  },
  {
    id: "AUD-992",
    timestamp: "Yesterday at 05:42 PM",
    action: "Associate Verification Approved",
    performedBy: "Bikram Das (Associate #082)",
    target: "Installment #3 for Fatima Khatun (₹4,500)",
    statusBadge: "ASSOCIATE_VERIFIED",
  },
  {
    id: "AUD-993",
    timestamp: "24 Sep at 10:15 AM",
    action: "Payment Submitted via UPI",
    performedBy: "Rahul Sharma (Member)",
    target: "Installment #4 (₹4,000) UTR: 392817492810",
    statusBadge: "MEMBER_PAID",
  },
  {
    id: "AUD-994",
    timestamp: "22 Sep at 04:30 PM",
    action: "Associate Assigned",
    performedBy: "Admin Portal",
    target: "Priya Mondal assigned to Mohammed Irfan (#019)",
    statusBadge: "SUCCESS",
  },
];
