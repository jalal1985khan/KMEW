export type UserRole = "MEMBER" | "ASSOCIATE" | "ADMIN";

export interface AuthUser {
  id: string;
  email: string;
  password: string; // In production this would be hashed via bcrypt/argon2
  name: string;
  role: UserRole;
  phone: string;
  ward?: string;
  badgeNumber?: string;
  avatarLetter: string;
}

export const USERS_DATABASE: AuthUser[] = [
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
];

export function authenticate(emailOrPhone: string, pass: string): AuthUser | null {
  const cleanInput = emailOrPhone.trim().toLowerCase();
  const cleanPass = pass.trim();

  const user = USERS_DATABASE.find(
    (u) =>
      (u.email.toLowerCase() === cleanInput ||
        u.phone.replace(/\s+/g, "") === cleanInput.replace(/\s+/g, "") ||
        u.id.toLowerCase() === cleanInput) &&
      u.password === cleanPass
  );

  return user || null;
}
