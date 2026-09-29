import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const USERS = [
  {
    id: "KMEW-ADM-001",
    email: "admin@kmew.org.in",
    password: "password123",
    name: "Rajeshwar Sharma",
    role: "ADMIN",
    phone: "+91 89722 85850",
    avatarLetter: "R",
  },
  {
    id: "KMEW-ASC-082",
    email: "bikram.das@kmew.org.in",
    password: "password123",
    name: "Bikram Das",
    role: "ASSOCIATE",
    phone: "+91 89722 85850",
    badgeNumber: "#082",
    ward: "Ward 12, Ward 08, Ward 10",
    avatarLetter: "B",
  },
  {
    id: "KMEW-ASC-045",
    email: "sunita.roy@kmew.org.in",
    password: "password123",
    name: "Sunita Roy",
    role: "ASSOCIATE",
    phone: "+91 98321 00987",
    badgeNumber: "#045",
    ward: "Ward 04, Ward 06",
    avatarLetter: "S",
  },
  {
    id: "KMEW-ASC-019",
    email: "m.irfan@kmew.org.in",
    password: "password123",
    name: "Mohammed Irfan",
    role: "ASSOCIATE",
    phone: "+91 94345 67890",
    badgeNumber: "#019",
    ward: "Ward 15, Ward 16",
    avatarLetter: "M",
  },
  {
    id: "KMEW-MEM-2024-0418",
    email: "rahul.sharma@kmew.org.in",
    password: "password123",
    name: "Rahul Sharma",
    role: "MEMBER",
    phone: "+91 98321 44521",
    ward: "Ward 12, Kulti Bazar",
    avatarLetter: "R",
  },
  {
    id: "KMEW-MEM-2024-0520",
    email: "fatima.k@kmew.org.in",
    password: "password123",
    name: "Fatima Khatun",
    role: "MEMBER",
    phone: "+91 87654 32190",
    ward: "Ward 08, Kendua Bazar",
    avatarLetter: "F",
  },
  {
    id: "KMEW-MEM-2024-0612",
    email: "amit.sen@kmew.org.in",
    password: "password123",
    name: "Amit Sen",
    role: "MEMBER",
    phone: "+91 94341 87654",
    ward: "Ward 04, Sitarampur",
    avatarLetter: "A",
  },
  {
    id: "KMEW-MEM-2024-0744",
    email: "priya.mondal@kmew.org.in",
    password: "password123",
    name: "Priya Mondal",
    role: "MEMBER",
    phone: "+91 91234 88712",
    ward: "Ward 15, Barakar",
    avatarLetter: "P",
  },
];

const MEMBERS = [
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

const ASSOCIATES = [
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

const INSTALLMENTS = [
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
    status: "MEMBER_PAID",
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
    status: "ASSOCIATE_VERIFIED",
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
    status: "MEMBER_APPROVED",
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
    status: "ADMIN_CONFIRMED",
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

const AUDIT_LOGS = [
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

const NEWS_EVENTS = [
  {
    id: "annual-scholarship-drive-2026",
    title: "Annual Merit-Cum-Means Higher Education Scholarship Drive 2026 Announced",
    date: "October 15, 2026",
    category: "Scholarship Announcement",
    summary: "Applications are now open for college and vocational students for the academic year 2026-27. Learn how to apply through our digital Member portal.",
    image: "/news/scholarship.png",
    location: "KMEW Central Auditorium, Kulti",
    isUpcoming: true,
  },
  {
    id: "mega-free-eye-pediatric-camp",
    title: "Mega Free Eye & Pediatric Health Camp at Barakar Community Hall",
    date: "November 05, 2026",
    category: "Health & Welfare",
    summary: "Specialist doctors from regional hospitals will conduct free checkups, pediatric screening, and distribute prescription glasses for over 800 patients.",
    image: "/news/health.png",
    location: "Barakar Municipal Hall",
    isUpcoming: true,
  },
  {
    id: "stem-robotics-exhibition",
    title: "Grassroots STEM & Science Fair: 120 Students Showcase Inventions",
    date: "September 12, 2026",
    category: "Education Showcase",
    summary: "Students from 15 KMEW evening learning centers demonstrated solar water filters, automated smart plant irrigation, and robotics models.",
    image: "/news/edu.png",
    location: "Kulti High School Ground",
    isUpcoming: false,
  },
];

const GALLERY_ITEMS = [
  {
    id: "g1",
    title: "Annual Higher Education Scholarship Ceremony 2025",
    category: "Scholarships",
    image: "/gallery/g1.png",
    description: "Honoring 85 college students with higher education scholarships.",
    date: "August 2025",
  },
  {
    id: "g2",
    title: "Evening Tuition Classroom in Session",
    category: "Education",
    image: "/gallery/g2.png",
    description: "Class 10 students receiving math coaching at our Sitarampur Center.",
    date: "July 2025",
  },
  {
    id: "g3",
    title: "Pariwartan Women Tailoring & Sewing Graduation",
    category: "Skill Development",
    image: "/gallery/g3.png",
    description: "Women graduating with self-employment kits and certificates.",
    date: "June 2025",
  },
  {
    id: "g4",
    title: "Free Eye Checkup and Diagnostic Health Camp",
    category: "Health & Welfare",
    image: "/gallery/g4.png",
    description: "Volunteer ophthalmologists conducting vision tests for senior citizens.",
    date: "May 2025",
  },
  {
    id: "g5",
    title: "Annual School Bags and Stationery Distribution",
    category: "School Support",
    image: "/gallery/g5.png",
    description: "Primary school students proudly holding their new school supplies.",
    date: "April 2025",
  },
  {
    id: "g6",
    title: "Youth Coding and Digital Literacy Lab",
    category: "Skill Development",
    image: "/gallery/g6.png",
    description: "High schoolers learning Python coding fundamentals.",
    date: "March 2025",
  },
];

async function main() {
  console.log("🌱 Starting database migration and seeding to Supabase...");

  // 1. Users (Login credentials)
  console.log("➡️  Migrating Users (Admin, Associates, Members)...");
  for (const user of USERS) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: user,
      create: user,
    });
  }
  console.log(`✅ ${USERS.length} Users migrated.`);

  // 2. Members
  console.log("➡️  Migrating Members...");
  for (const member of MEMBERS) {
    await prisma.member.upsert({
      where: { id: member.id },
      update: member,
      create: member,
    });
  }
  console.log(`✅ ${MEMBERS.length} Members migrated.`);

  // 3. Associates
  console.log("➡️  Migrating Associates...");
  for (const asc of ASSOCIATES) {
    await prisma.associate.upsert({
      where: { id: asc.id },
      update: asc,
      create: asc,
    });
  }
  console.log(`✅ ${ASSOCIATES.length} Associates migrated.`);

  // 4. Installments
  console.log("➡️  Migrating Payment Installments...");
  for (const inst of INSTALLMENTS) {
    await prisma.paymentInstallment.upsert({
      where: { id: inst.id },
      update: inst,
      create: inst,
    });
  }
  console.log(`✅ ${INSTALLMENTS.length} Installments migrated.`);

  // 5. Audit Logs
  console.log("➡️  Migrating Audit Logs...");
  for (const log of AUDIT_LOGS) {
    await prisma.auditLog.upsert({
      where: { id: log.id },
      update: log,
      create: log,
    });
  }
  console.log(`✅ ${AUDIT_LOGS.length} Audit Logs migrated.`);

  // 6. News Events
  console.log("➡️  Migrating News & Events...");
  for (const item of NEWS_EVENTS) {
    await prisma.newsEvent.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }
  console.log(`✅ ${NEWS_EVENTS.length} News Announcements migrated.`);

  // 7. Gallery Items
  console.log("➡️  Migrating Gallery Items...");
  for (const item of GALLERY_ITEMS) {
    await prisma.galleryItem.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }
  console.log(`✅ ${GALLERY_ITEMS.length} Gallery Photos migrated.`);

  console.log("🎉 Database migration completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Migration failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
