export interface ProgramItem {
  id: string;
  title: string;
  category: "Education" | "Scholarships" | "Skill Development" | "Health & Welfare" | "Community" | "School Support";
  shortDescription: string;
  detailedDescription: string;
  image: string;
  objectives: string[];
  eligibility: string[];
  impactStats: string;
  status: "Active" | "Accepting Applications" | "Ongoing";
  color: string;
}

export const PROGRAMS_DATA: ProgramItem[] = [
  {
    id: "merit-cum-means-scholarship",
    title: "KMEW Merit-Cum-Means Higher Education Scholarship",
    category: "Scholarships",
    shortDescription: "Empowering meritorious underprivileged students across Bengal & Jharkhand to pursue engineering, medical, law, and degree courses.",
    detailedDescription: "The KMEW Merit-Cum-Means Scholarship bridges the financial chasm for talented students who secure admissions in recognized institutions but struggle with tuition, hostel fees, and examination costs. In addition to financial grant disbursements, candidates receive personalized associate mentorship.",
    image: "/programs/scholarships.png",
    objectives: [
      "Full or partial tuition fee sponsorship for deserving students",
      "Quarterly performance reviews and career counselling",
      "Stipends for textbooks, reference materials, and examination fees"
    ],
    eligibility: [
      "Annual family income below ₹2,50,000",
      "Minimum 70% aggregate marks in 10th or 12th standard",
      "Enrolled in a recognized diploma, undergraduate, or vocational program"
    ],
    impactStats: "4,200+ Scholars Graduated",
    status: "Accepting Applications",
    color: "from-blue-600 to-indigo-700"
  },
  {
    id: "community-learning-centers",
    title: "Community Learning & Evening Tuition Centers",
    category: "Education",
    shortDescription: "Free after-school remedial learning centers in underserved neighborhoods to eliminate dropouts in STEM subjects.",
    detailedDescription: "Operating across Kulti, Asansol, Barakar, and surrounding industrial belts, KMEW evening tuition centers provide structured curriculum support for Grades 5 to 10 in Mathematics, Science, and English, guided by trained community educators.",
    image: "/programs/education.png",
    objectives: [
      "Eliminate primary-to-secondary grade dropout rates",
      "Digital classroom access with tablet-based interactive learning",
      "Regular parent-teacher community dialogues"
    ],
    eligibility: [
      "Students residing in designated municipal wards or rural clusters",
      "Commitment to 85%+ attendance throughout the academic term"
    ],
    impactStats: "45 Active Centers • 6,800+ Children",
    status: "Active",
    color: "from-amber-500 to-orange-600"
  },
  {
    id: "women-skill-vocational",
    title: "Pariwartan: Women Skill & Vocational Empowerment",
    category: "Skill Development",
    shortDescription: "Certified vocational training in tailoring, computer literacy, accounting tally, and digital handicrafts for women and youth.",
    detailedDescription: "A self-reliance initiative helping young women and homemakers acquire market-ready vocational credentials, micro-entrepreneurship tools, and direct linkages to local markets and self-help groups (SHGs).",
    image: "/programs/skill-development.png",
    objectives: [
      "6-month certified diplomas in computer applications and apparel manufacturing",
      "Financial literacy, zero-balance banking, and digital UPI enablement",
      "Seed equipment grant facilitation for top graduates"
    ],
    eligibility: [
      "Women and youth aged 16-35 years",
      "No formal higher education prerequisite"
    ],
    impactStats: "1,850+ Women Certified & Self-Employed",
    status: "Accepting Applications",
    color: "from-emerald-600 to-teal-700"
  },
  {
    id: "health-wellness-camps",
    title: "Swasthya Kalyan: Mobile Health & Diagnostic Camps",
    category: "Health & Welfare",
    shortDescription: "Regular free health checkups, eye screening, pediatric care, and essential medicines distribution in remote communities.",
    detailedDescription: "Organized in collaboration with volunteer doctors and diagnostic laboratories, these camps bring preventive healthcare, hemoglobin tests, eye-spectacle distribution, and chronic condition management right to grassroots doorsteps.",
    image: "/programs/health.png",
    objectives: [
      "Free medical consultation and emergency triage",
      "Preventive anemia and nutrition screening for adolescent girls and mothers",
      "Subsidized cataract surgeries and free corrective spectacles"
    ],
    eligibility: [
      "Open to all community members, senior citizens, and children"
    ],
    impactStats: "24,000+ Consultations Provided",
    status: "Ongoing",
    color: "from-rose-500 to-pink-600"
  },
  {
    id: "school-readiness-kit",
    title: "Vidyarthi Sahayata: Uniform, Books & Stationary Drive",
    category: "School Support",
    shortDescription: "Annual school kit distributions ensuring no child attends school without uniforms, notebooks, school bags, and winter essentials.",
    detailedDescription: "Every academic year, KMEW associates identify students at risk of discontinuing school due to lack of basic stationery or uniform compliance. Complete kits are disbursed with utmost dignity and transparency.",
    image: "/programs/school-support.png",
    objectives: [
      "Direct distribution of standardized textbooks, notebooks, and bags",
      "Annual winter sweater and footwear distribution",
      "Track attendance continuation of recipient children"
    ],
    eligibility: [
      "Students enrolled in government or subsidized schools from low-income families"
    ],
    impactStats: "15,000+ Kits Disbursed Since Inception",
    status: "Active",
    color: "from-violet-600 to-purple-700"
  },
  {
    id: "digital-literacy-youth",
    title: "Yuva Chetna: Digital Literacy & Coding Labs",
    category: "Skill Development",
    shortDescription: "Bridging the digital divide with modern computer labs, internet navigation, and foundational software skills for students.",
    detailedDescription: "Modern equipped computer labs offering foundational courses in typing, office productivity, digital citizenship, safe internet usage, and basic web fundamentals for high schoolers.",
    image: "/programs/skill-development.png",
    objectives: [
      "Hands-on PC access with structured modular curriculum",
      "Preparation for competitive exam online portals and admissions",
      "Interactive coding and robotics workshops during vacations"
    ],
    eligibility: [
      "Students enrolled in Grade 8 and above"
    ],
    impactStats: "1,200+ Youths Trained Annually",
    status: "Accepting Applications",
    color: "from-cyan-600 to-blue-700"
  }
];

export const IMPACT_METRICS = [
  {
    label: "Students & Youth Supported",
    value: "14,500+",
    description: "Across academic scholarships, tuition centers, and digital literacy labs",
    icon: "GraduationCap"
  },
  {
    label: "Scholarships Disbursed",
    value: "₹2.4 Cr+",
    description: "100% transparent and verified multi-tier installment records",
    icon: "IndianRupee"
  },
  {
    label: "Active Community Centers",
    value: "45+",
    description: "Operating across Kulti, Asansol, Barakar, and surrounding regions",
    icon: "Building2"
  },
  {
    label: "Verified Associates",
    value: "185+",
    description: "Dedicated field associates supporting and verifying member progress",
    icon: "Users2"
  },
  {
    label: "Program Completion Rate",
    value: "98.4%",
    description: "Ensured through continuous associate mentorship and counseling",
    icon: "TrendingUp"
  },
  {
    label: "Free Health Consultations",
    value: "28,000+",
    description: "Preventive screenings, pediatric checkups, and diagnostic medicine",
    icon: "HeartPulse"
  }
];

export const SUCCESS_STORIES = [
  {
    name: "Pooja Banerjee",
    role: "KMEW Scholar • Now Software Engineer at TCS",
    location: "Kulti, Paschim Bardhaman",
    quote: "When my father lost his job at the foundry, I thought my dreams of pursuing computer science engineering were shattered. KMEW didn't just sponsor my tuition through a clear installment plan; my assigned associate guided me with career seminars and interview coaching every step of the way.",
    image: "/stories/rina.png",
    course: "B.Tech Computer Science"
  },
  {
    name: "Arindam Mondal",
    role: "Medical Student (MBBS) • R.G. Kar Medical College",
    location: "Barakar",
    quote: "Securing a top rank in NEET was only half the struggle. Buying medical textbooks and equipment was beyond our family's means. KMEW's transparent member portal kept our applications clear and on schedule. Today, I am proud to give back as a volunteer medical camp counselor.",
    image: "/stories/amit.png",
    course: "MBBS 3rd Year"
  },
  {
    name: "Ruksana Khatoon",
    role: "Pariwartan Vocational Trainee • Entrepreneur",
    location: "Sitarampur",
    quote: "With KMEW's 6-month apparel design course, I went from zero income to running a successful boutique in our locality. I now employ three other women from our neighborhood, providing them with reliable monthly incomes.",
    image: "/stories/shabana.png",
    course: "Apparel Design & Micro-Enterprise"
  }
];

export const NEWS_EVENTS = [
  {
    id: "annual-scholarship-drive-2026",
    title: "Annual Merit-Cum-Means Higher Education Scholarship Drive 2026 Announced",
    date: "October 15, 2026",
    category: "Scholarship Announcement",
    summary: "Applications are now open for college and vocational students for the academic year 2026-27. Learn how to apply through our digital Member portal.",
    image: "/news/scholarship.png",
    location: "KMEW Central Auditorium, Kulti",
    isUpcoming: true
  },
  {
    id: "mega-free-eye-pediatric-camp",
    title: "Mega Free Eye & Pediatric Health Camp at Barakar Community Hall",
    date: "November 05, 2026",
    category: "Health & Welfare",
    summary: "Specialist doctors from regional hospitals will conduct free checkups, pediatric screening, and distribute prescription glasses for over 800 patients.",
    image: "/news/health.png",
    location: "Barakar Municipal Hall",
    isUpcoming: true
  },
  {
    id: "stem-robotics-exhibition",
    title: "Grassroots STEM & Science Fair: 120 Students Showcase Inventions",
    date: "September 12, 2026",
    category: "Education Showcase",
    summary: "Students from 15 KMEW evening learning centers demonstrated solar water filters, automated smart plant irrigation, and robotics models.",
    image: "/news/edu.png",
    location: "Kulti High School Ground",
    isUpcoming: false
  }
];

export const GALLERY_ITEMS = [
  {
    id: "g1",
    title: "Annual Scholarship Distribution Ceremony",
    category: "Scholarships",
    image: "/gallery/g1.png",
    description: "250 higher education students receiving award letters and mentorship kits."
  },
  {
    id: "g2",
    title: "Interactive Classroom at Evening Learning Center",
    category: "Education",
    image: "/gallery/g2.png",
    description: "Students solving science experiments using digital tablet modules."
  },
  {
    id: "g3",
    title: "Women Tailoring & Skill Training Workshop",
    category: "Skill Development",
    image: "/gallery/g3.png",
    description: "Batch 14 trainees mastering apparel cutting and garment finishing."
  },
  {
    id: "g4",
    title: "Community Free Eye & Diagnostic Camp",
    category: "Health & Welfare",
    image: "/gallery/g4.png",
    description: "Volunteer ophthalmologists conducting vision tests for senior citizens."
  },
  {
    id: "g5",
    title: "Annual School Bags and Stationery Distribution",
    category: "School Support",
    image: "/gallery/g5.png",
    description: "Primary school students proudly holding their new school supplies."
  },
  {
    id: "g6",
    title: "Youth Coding and Digital Literacy Lab",
    category: "Skill Development",
    image: "/gallery/g6.png",
    description: "High schoolers learning Python coding fundamentals."
  }
];

export const FAQS = [
  {
    question: "Who can register as a Member of KMEW?",
    answer: "Any individual, student, or community member seeking educational support, welfare grants, vocational training, or participating in KMEW community initiatives can register. For students seeking scholarships, valid student ID and academic records will be verified."
  },
  {
    question: "What is the role of an Associate?",
    answer: "Associates are verified community mentors and field officers assigned by KMEW administrators. They work closely with members to review applications, formulate transparent payment or grant plans, assist with documentation, and verify installment payments before final administrative review."
  },
  {
    question: "How does KMEW ensure financial transparency and auditability?",
    answer: "Every grant disbursement, member contribution, and welfare fund is subject to a rigorous two-tier internal verification process by our field associates and central administration, backed by annual statutory audits under our 80G and 12A registration."
  },
  {
    question: "Are donations to KMEW eligible for tax exemptions in India?",
    answer: "Yes, KMEW is registered under Section 12A and Section 80G of the Indian Income Tax Act. Donors receive an instant formal 80G receipt and certificate for 50% tax deduction on eligible contributions."
  },
  {
    question: "How are member documents (Government ID, Bank Details) secured?",
    answer: "All sensitive files, passport photos, and bank identifiers are protected with strict Role-Based Access Control (RBAC), private storage, encrypted transmission (HTTPS), and prevention of Insecure Direct Object References (IDOR). Only assigned associates and authorized admins can access authorized documents."
  }
];

export const KMEW_CONTACT = {
  phone: "+91-8972285850",
  email: "info@kmew.org",
  address: "Gandhi Nagar, Near Railway Station, PO Sitarampur, PS Kulti, Paschim Bardhaman, West Bengal – 713359",
  act: "West Bengal Societies Registration Act XXVI of 1961",
  taxExemption: "Registered 80G & 12A NGO"
};

export const LEADERSHIP_TEAM = [
  {
    name: "Dr. B. K. Mukherjee",
    role: "President & Founder Trustee",
    bio: "Former Principal and veteran educationalist with over 35 years of dedication to grassroots education and social welfare in industrial Bengal.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Smt. Kalyani Sengupta",
    role: "Vice President & Community Welfare Director",
    bio: "Social worker and advocate for women empowerment, leading the Pariwartan vocational skill initiatives across 12 wards.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Shri Rajeshwar Sharma",
    role: "General Secretary & Operations Lead",
    bio: "Chartered accountant and governance expert overseeing organizational compliance, transparent financial auditing, and associate networks.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Prof. Amitava Roy",
    role: "Academic Council Chairman",
    bio: "Professor of Mathematics and competitive exam mentor, designing curriculum for KMEW evening tuition centers.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
  }
];
