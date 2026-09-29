# KMEW --- Complete Website & Member Management Platform

**Product:** Kulti Maharaja Educational Welfare Organization (KMEW)\
**Document Type:** Product Requirements Document (PRD) — Final Updated Version\
**Version:** 1.1\
**Target Platform:** Responsive Web --- Desktop, Tablet & Mobile\
**Frontend:** Next.js + TypeScript + shadcn/ui\
**Primary Database:** PostgreSQL\
**ORM:** Prisma\
**Architecture:** Secure full-stack web application with role-based
portals\
**Primary Roles:** Public Visitor, Member, Associate, Admin, Super Admin

------------------------------------------------------------------------

## 1. Executive Summary

KMEW currently operates as a public-facing educational and social
welfare organization website. The existing website communicates KMEW's
mission, educational programs, scholarships, community initiatives,
skill development, health camps, gallery and contact information.

The proposed platform will completely revamp the public website and
transform KMEW into a modern digital organization-management platform.

The new system will contain four major experiences:

1.  **Public KMEW Website**
2.  **Member Portal**
3.  **Associate Portal**
4.  **Admin Portal**

The most important new capability is the digital management of members,
associates, payment plans, installments, payment submissions,
verification and final administrative confirmation.

The platform will provide a transparent workflow:

**Payment Plan Created → Member Payment → Associate Verification → Admin
Final Verification**

### Financial Color Status System

  -----------------------------------------------------------------------
  Color                   Status                  Meaning
  ----------------------- ----------------------- -----------------------
  🟨 Yellow               Payment Due             Installment/payment has
                                                  been created but
                                                  payment has not been
                                                  submitted

  🔵 Blue                 Payment Submitted       Member/payment entry
                                                  has been submitted and
                                                  requires verification

  🟢 Green                Associate Confirmed     Associate has verified
                                                  the payment

  🔴 Red                  Admin Confirmed         Admin has completed
                                                  final verification
  -----------------------------------------------------------------------

Color must never be the only status indicator. Every color must be
accompanied by a textual status.

------------------------------------------------------------------------

# 2. Product Goals

## 2.1 Primary Goals

-   Completely modernize the KMEW website.
-   Establish a professional and trustworthy digital presence.
-   Allow members to register online.
-   Allow associates to register online.
-   Allow administrators to review and approve registrations.
-   Allow admins to assign associates to members.
-   Allow associates to accept member assignments.
-   Allow associates to create payment plans.
-   Allow payment plans to contain multiple installments.
-   Allow members to submit installment payments.
-   Allow associates to submit payment information on behalf of members.
-   Support UPI, bank transfer, cash and other configured payment
    methods.
-   Introduce a structured payment verification workflow.
-   Provide complete payment and installment history.
-   Provide auditability for all sensitive actions.
-   Prevent unauthorized access between members and associates.
-   Provide administrators with complete operational visibility.
-   Provide reports and dashboards for management.
-   Build the system with strong security and scalability.

------------------------------------------------------------------------

# 3. Product Structure

``` text
KMEW Platform
│
├── Public Website
│
├── Authentication
│
├── Member Portal
│
├── Associate Portal
│
├── Admin Portal
│
└── Backend/API
       │
       └── PostgreSQL
```

------------------------------------------------------------------------

# 4. User Roles

## 4.1 Public Visitor

Can:

-   View homepage.
-   View About KMEW.
-   View programs.
-   View impact.
-   View news/events.
-   View gallery.
-   View contact information.
-   View legal pages.
-   Register as Member.
-   Register as Associate.
-   Login.
-   Access donation/support information.

Cannot access private member/associate data.

------------------------------------------------------------------------

## 4.2 Member

A Member can:

-   Register.
-   Complete profile.
-   Track application status.
-   View assigned Associate.
-   View Associate details.
-   View payment plans.
-   View installments.
-   View payment history.
-   Submit payment information.
-   Upload payment proof.
-   Mark an installment as paid.
-   Approve payments entered by Associate on their behalf.
-   View pending approvals.
-   View notifications.
-   Update permitted profile information.
-   Raise support requests.
-   View account activity.

A Member must only be able to access their own data.

------------------------------------------------------------------------

## 4.3 Associate

An Associate can:

-   Register.
-   Complete profile.
-   Track application status.
-   Accept member assignments.
-   View assigned members.
-   View member profiles according to permissions.
-   Create payment plans.
-   Define installment schedules.
-   Send payment requests to members.
-   Enter payment information on behalf of members.
-   Verify member-submitted payments.
-   Verify payments submitted by themselves after required member
    approval.
-   View payment history.
-   View pending payment verification.
-   View installment status.
-   View assigned-member reports.
-   Receive notifications.
-   Communicate/support assigned members.

An Associate must not be able to access members who are not assigned to
them unless explicitly authorized by an Admin.

------------------------------------------------------------------------

## 4.4 Admin

Admin can:

-   Manage members.
-   Manage associates.
-   Review registrations.
-   Approve/reject registrations.
-   Assign associates.
-   Reassign associates.
-   Manage payment plans.
-   View all transactions.
-   Perform final payment verification.
-   Manage content.
-   Manage programs.
-   Manage news/events.
-   Manage gallery.
-   Manage FAQs.
-   Manage website settings.
-   View reports.
-   Manage notifications.
-   View audit logs.
-   Manage users and permissions according to role.

------------------------------------------------------------------------

## 4.5 Super Admin

Super Admin has all Admin capabilities plus:

-   Manage Admin users.
-   Manage roles.
-   Manage permissions.
-   Configure system settings.
-   Configure payment methods.
-   Configure status workflows.
-   Configure notification templates.
-   View security logs.
-   Manage integrations.
-   Manage critical system configurations.

------------------------------------------------------------------------

# 5. Public Website

## 5.1 Homepage

The homepage should position KMEW as a modern, trustworthy and
community-focused organization.

### Hero

Suggested messaging:

> **Building Better Futures, Together.**

Supporting content explaining KMEW's mission.

Primary CTA:

**Become a Member**

Secondary CTA:

**Explore Our Programs**

Header CTAs:

-   Login
-   Become a Member

------------------------------------------------------------------------

## 5.2 Homepage Sections

The homepage should contain:

1.  Header
2.  Hero
3.  Impact statistics
4.  Quick actions
5.  About KMEW
6.  Mission/Vision/Values
7.  Programs
8.  Membership CTA
9.  Associate CTA
10. How KMEW Works
11. Impact section
12. Success stories
13. News & Events
14. Gallery
15. Support/Donation CTA
16. FAQ
17. Footer

------------------------------------------------------------------------

# 6. Public Navigation

``` text
Home
About Us
Our Programs
Membership
Associates
Impact
News & Events
Gallery
Contact

Login
Become a Member
```

Footer:

``` text
Quick Links
Members
Associates
Programs
Legal
Contact
Social Media
```

------------------------------------------------------------------------

# 7. About Section

Content:

-   Organization overview
-   Mission
-   Vision
-   Values
-   History
-   Leadership
-   Registration/legal information
-   Geographic/community presence

Admin should manage this content through the CMS.

------------------------------------------------------------------------

# 8. Programs

Initial program categories can include:

-   Scholarships
-   Education
-   Community Classes
-   School Support
-   Skill Development
-   Health & Welfare

Each program should have:

``` text
Title
Short Description
Detailed Description
Cover Image
Gallery
Objectives
Eligibility
Activities
Impact
Status
Display Order
SEO Metadata
```

------------------------------------------------------------------------

# 9. Membership Registration

## 9.1 Member Registration

Public visitor selects:

**Become a Member**

Registration form should collect configurable information such as:

### Mandatory Member Information

The following information is required for every Member registration:

| Field | Required | Rules / Notes |
|---|---|---|
| **Member Name** | Yes | Full legal/member name |
| **Phone Number** | Yes | Primary contact number; verification should be supported |
| **Government ID** | Yes | Government ID type, ID number and supporting document where required |
| **Student Status** | Yes | Member must indicate whether they are a student |
| **Student ID** | Conditional | Required only when the Member is a student |
| **Bank Account Number** | Yes | Account number required for the Member's registered bank account |
| **IFSC Code** | Yes | Validate IFSC format |
| **Passport-size Photo** | Yes | Profile/identification photo |

### Government ID

Government ID should be captured as structured information:

- Government ID Type
- Government ID Number
- Government ID Document, where required by KMEW policy

The exact accepted Government ID types should be configurable by Admin and finalized according to KMEW's legal and operational requirements.

### Student Information

The registration form should ask:

**Are you a Student?**

- **Yes** → Student ID becomes mandatory.
- **No** → Student ID is not required.

The Student ID field must therefore be conditionally displayed and validated.

### Bank Account Information

The Member must provide:

- Bank Account Number
- IFSC Code

The system should validate the basic format of the IFSC code and protect the account information through role-based access controls.

### Passport-size Photo

The Member must upload a passport-size photograph.

Requirements:

- Supported image formats should be configurable.
- Maximum file size must be enforced.
- Uploaded files must be stored in private object storage.
- Original filenames must not be trusted.
- Public direct file access must not be allowed.
- Authorized users should receive short-lived signed URLs when viewing the photo.

### Account

-   Email/mobile
-   Password
-   Confirm Password

### Consent

-   Terms & Conditions
-   Privacy Policy
-   Consent declaration

------------------------------------------------------------------------

# 10. Member Registration Workflow

``` text
Member Registration
        ↓
Application Created
        ↓
Pending Admin Review
        ↓
Admin Reviews
     ↙       ↘
Reject      Approve
             ↓
       Associate Assignment
             ↓
      Associate Receives Request
             ↓
        Associate Accepts
             ↓
       Member Relationship Active
```

Application statuses:

``` text
DRAFT
SUBMITTED
UNDER_REVIEW
APPROVED
REJECTED
ASSOCIATE_PENDING
ASSOCIATE_ACCEPTED
ACTIVE
SUSPENDED
```

### Member Registration Validation Checklist

Before a Member application can be submitted:

- Member Name must be present.
- Phone Number must be present and valid.
- Government ID information must be present.
- Student status must be selected.
- Student ID must be present when Student status is `Yes`.
- Bank Account Number must be present.
- IFSC Code must be present and pass format validation.
- Passport-size Photo must be uploaded and pass file validation.
- Required consent must be accepted.
- Duplicate Member registration rules must be checked according to KMEW's configured uniqueness rules.

------------------------------------------------------------------------

# 11. Associate Registration

Public visitor selects:

**Become an Associate**

Form can collect:

-   Full Name
-   Mobile
-   Email
-   Address
-   City
-   State
-   PIN
-   Professional/background information
-   Relevant experience
-   Service area
-   Supporting documents
-   Account credentials
-   Consent

Admin reviews Associate applications.

Statuses:

``` text
SUBMITTED
UNDER_REVIEW
APPROVED
REJECTED
ACTIVE
SUSPENDED
INACTIVE
```

------------------------------------------------------------------------

# 12. Associate Assignment

Admin opens an approved Member.

``` text
Member:
Rahul Kumar

Status:
Approved

Associate:
[ Select Associate ]

[ Assign Associate ]
```

After assignment:

``` text
Member
    ↓
Associate Assignment Created
    ↓
Associate Notification
    ↓
Associate Accepts
    ↓
Relationship Active
```

Associate should see:

**New Member Assignment**

``` text
Rahul Kumar
Member ID: KMEW-000124

Location:
Asansol, West Bengal

[ View Details ]
[ Accept Assignment ]
[ Decline ]
```

If declined, the Admin should be notified and can reassign another
Associate.

------------------------------------------------------------------------

# 13. Member Dashboard

Dashboard should display:

``` text
Welcome, Rahul

Membership
ACTIVE

Associate
Amit Kumar

Payment Plan
₹50,000

Paid
₹20,000

Remaining
₹30,000
```

Dashboard cards:

-   Membership Status
-   Assigned Associate
-   Total Plan
-   Total Paid
-   Remaining Amount
-   Pending Installments
-   Pending Approvals
-   Recent Transactions

------------------------------------------------------------------------

# 14. Member Payment Plan

An Associate creates the payment plan.

Example:

``` text
Total Amount: ₹50,000
Installments: 5
Installment Amount: ₹10,000
Frequency: Monthly
```

System generates:

``` text
Installment 1 → ₹10,000
Installment 2 → ₹10,000
Installment 3 → ₹10,000
Installment 4 → ₹10,000
Installment 5 → ₹10,000
```

Every newly created installment starts as:

🟨 **Payment Due**

------------------------------------------------------------------------

# 15. Installment Status System

## Yellow --- PAYMENT_DUE

Meaning:

-   Associate has created installment.
-   Member has not submitted payment.

Example:

``` text
Installment #1
₹10,000
Due: 10 Oct 2026

🟨 Payment Due

[ Pay / Mark as Paid ]
```

------------------------------------------------------------------------

## Blue --- PAYMENT_SUBMITTED

Meaning:

-   Payment details have been submitted.
-   Verification is pending.

Example:

``` text
Installment #1
₹10,000

Payment Method:
UPI

Transaction ID:
TXN123456

Payment Date:
08 Oct 2026

🔵 Payment Submitted

Awaiting Associate Verification
```

------------------------------------------------------------------------

## Green --- ASSOCIATE_CONFIRMED

Meaning:

-   Associate checked the payment.
-   Associate confirmed receipt.

Example:

``` text
₹10,000 / ₹10,000

🟢 Associate Confirmed

Verified by:
Amit Kumar

Verified:
08 Oct 2026
```

------------------------------------------------------------------------

## Red --- ADMIN_CONFIRMED

Meaning:

-   Admin completed the final verification.
-   Transaction is officially confirmed.

Example:

``` text
₹10,000 / ₹10,000

🔴 Admin Confirmed

Associate: Confirmed
Admin: Confirmed
```

------------------------------------------------------------------------

# 16. Status Transition Rules

``` text
🟨 YELLOW
PAYMENT_DUE
      ↓
🔵 BLUE
PAYMENT_SUBMITTED
      ↓
🟢 GREEN
ASSOCIATE_CONFIRMED
      ↓
🔴 RED
ADMIN_CONFIRMED
```

Invalid transitions should be rejected by the backend.

Examples:

``` text
YELLOW → GREEN   ❌
YELLOW → RED     ❌
BLUE → RED       ❌
```

unless an authorized administrative override workflow exists.

------------------------------------------------------------------------

# 17. Partial Payment

The system must support partial payments where applicable.

Example:

``` text
Installment:
₹5,000

Payment received:
₹2,000

Remaining:
₹3,000
```

Status:

**🔵 Payment In Progress**

The installment should not be considered fully completed until:

``` text
Total Paid >= Installment Amount
```

Then it moves through the normal verification workflow.

------------------------------------------------------------------------

# 18. Member Payment Submission

Member selects:

**Mark as Paid**

Form:

``` text
Installment
Amount
Payment Date
Payment Method
Payment Reference
Payment Proof
Remarks
```

### UPI

-   Amount
-   Date
-   UPI Transaction ID
-   Optional proof/screenshot

### Bank Transfer

-   Amount
-   Date
-   Bank
-   Account/reference details required by KMEW
-   UTR/reference number
-   Proof

### Cash

-   Amount
-   Date
-   Receipt number
-   Received by
-   Supporting receipt/proof if applicable

### Other

Configurable payment method and fields.

------------------------------------------------------------------------

# 19. Associate Payment Entry

Associate may enter a payment on behalf of the Member.

The system must explicitly record:

``` text
Entered By:
Associate

On Behalf Of:
Member
```

The payment then requires Member approval.

Workflow:

``` text
Associate enters payment
        ↓
🔵 Payment Submitted
        ↓
Member Review
        ↓
Member Approval
        ↓
Associate Verification
        ↓
🟢 Associate Confirmed
        ↓
Admin Review
        ↓
🔴 Admin Confirmed
```

------------------------------------------------------------------------

# 20. Member-Entered Payment Workflow

``` text
Member enters payment
        ↓
🔵 Payment Submitted
        ↓
Associate Verification
        ↓
🟢 Associate Confirmed
        ↓
Admin Verification
        ↓
🔴 Admin Confirmed
```

------------------------------------------------------------------------

# 21. Associate Dashboard

Dashboard metrics:

``` text
Assigned Members
125

🟨 Payment Due
42

🔵 Awaiting Verification
18

🟢 Associate Confirmed
31

🔴 Admin Confirmed
34
```

Sections:

-   New Assignments
-   Assigned Members
-   Payment Plans
-   Pending Verification
-   Member Payments
-   Payment History
-   Notifications
-   Reports
-   Profile

------------------------------------------------------------------------

# 22. Associate Member Detail

``` text
Member
Rahul Kumar

Member ID
KMEW-000124

Status
ACTIVE

Payment Plan
₹50,000

Paid
₹20,000

Remaining
₹30,000
```

Installments:

``` text
#1 ₹10,000 🔴
#2 ₹10,000 🔴
#3 ₹10,000 🟢
#4 ₹10,000 🔵
#5 ₹10,000 🟨
```

Actions:

-   Create Payment Plan
-   Request Payment
-   Enter Payment
-   Verify Payment
-   View History
-   Contact Member

------------------------------------------------------------------------

# 23. Admin Dashboard

Admin dashboard should provide complete organizational visibility.

### KPIs

``` text
Total Members
Active Members
Pending Members

Total Associates
Active Associates

Total Payment Plans

Total Amount Planned
Total Amount Submitted
Total Amount Associate Confirmed
Total Amount Admin Confirmed

Pending Verification
```

### Status Visualization

``` text
🟨 Due
🔵 Submitted
🟢 Associate Confirmed
🔴 Admin Confirmed
```

------------------------------------------------------------------------

# 24. Admin Member Management

Admin can:

-   Search members.
-   Filter members.
-   View profile.
-   Approve/reject.
-   Assign Associate.
-   Reassign Associate.
-   Suspend.
-   Activate.
-   View payment history.
-   View audit history.

Filters:

-   Status
-   Associate
-   Location
-   Registration date
-   Payment status
-   Membership type

------------------------------------------------------------------------

# 25. Admin Associate Management

Admin can:

-   Approve/reject applications.
-   View profile.
-   Assign members.
-   Reassign members.
-   Suspend Associate.
-   Activate Associate.
-   View performance.
-   View assigned-member count.
-   View payment verification history.

------------------------------------------------------------------------

# 26. Admin Payment Management

Admin can see all payment records.

Filters:

-   Member
-   Associate
-   Payment method
-   Status
-   Date
-   Amount
-   Transaction ID
-   Payment plan
-   Installment

Admin actions:

-   Review
-   Confirm
-   Reject
-   Request clarification
-   View proof
-   View audit history

------------------------------------------------------------------------

# 27. Transaction Audit Trail

Every financial transaction must have a complete history.

Example:

``` text
Payment ID:
PAY-10291

Member:
KMEW-000124

Installment:
INST-0001

Amount:
₹10,000

Entered By:
Member

Submitted:
08 Oct 2026 10:32 AM

Associate:
Amit Kumar

Associate Verified:
08 Oct 2026 02:15 PM

Admin:
Priya Sharma

Admin Confirmed:
09 Oct 2026 11:10 AM
```

------------------------------------------------------------------------

# 28. Audit Log

Database table:

`audit_logs`

Fields:

``` text
id
actor_id
actor_role
action
entity_type
entity_id
old_value
new_value
ip_address
user_agent
created_at
```

Actions include:

``` text
USER_CREATED
USER_UPDATED
MEMBER_APPROVED
MEMBER_REJECTED
ASSOCIATE_ASSIGNED
ASSOCIATE_ACCEPTED
PAYMENT_PLAN_CREATED
PAYMENT_SUBMITTED
PAYMENT_MEMBER_APPROVED
PAYMENT_ASSOCIATE_VERIFIED
PAYMENT_ADMIN_CONFIRMED
PAYMENT_REJECTED
PAYMENT_UPDATED
DOCUMENT_UPLOADED
LOGIN
LOGOUT
PASSWORD_CHANGED
```

Audit logs should be append-only for normal users.

------------------------------------------------------------------------

# 29. Notifications

The system should support in-app notifications initially.

Future channels:

-   Email
-   SMS
-   WhatsApp

### Member Notifications

-   Registration received.
-   Registration approved.
-   Associate assigned.
-   Associate accepted.
-   New installment created.
-   Payment due.
-   Payment submitted.
-   Payment approved.
-   Payment rejected.
-   Payment confirmed by Admin.

### Associate Notifications

-   New member assignment.
-   Member accepted.
-   New payment submission.
-   Payment requires verification.
-   Member approval required.
-   Admin verification result.

### Admin Notifications

-   New member registration.
-   New Associate registration.
-   Associate declined assignment.
-   Payment awaiting final verification.
-   Payment rejected.
-   Security alerts.

------------------------------------------------------------------------

# 30. CMS

Admin should be able to manage:

-   Homepage content
-   About
-   Programs
-   News
-   Events
-   Gallery
-   Testimonials
-   FAQs
-   Contact information
-   Footer
-   SEO metadata

No developer deployment should be required for ordinary content updates.

------------------------------------------------------------------------

# 31. Reports

## Member Report

-   New registrations
-   Active members
-   Inactive members
-   Members by Associate
-   Members by location

## Associate Report

-   Associates
-   Active associates
-   Assigned members
-   Pending assignments

## Financial Report

-   Total planned
-   Total submitted
-   Associate confirmed
-   Admin confirmed
-   Pending
-   Rejected
-   Partial payments
-   Payment-method breakdown

Reports should support:

-   Date filtering
-   CSV export
-   Excel export where required
-   Print/PDF in later phase

------------------------------------------------------------------------

# 32. Search

Global/admin search should support:

``` text
Member Name
Member ID
Mobile
Email
Associate Name
Associate ID
Payment ID
Transaction ID
Installment ID
```

------------------------------------------------------------------------

# 33. Database Architecture

Primary database:

**PostgreSQL**

ORM:

**Prisma**

Recommended core entities:

``` text
users
roles
permissions
user_roles
members
associates
member_applications
associate_applications
associate_assignments
payment_plans
installments
payments
payment_approvals
payment_proofs
notifications
audit_logs
programs
news
events
gallery
testimonials
faqs
contact_messages
settings
```

------------------------------------------------------------------------

# 34. Core Database Relationships

``` text
USER
 │
 ├── MEMBER
 │      │
 │      ├── PAYMENT PLANS
 │      │       │
 │      │       └── INSTALLMENTS
 │      │               │
 │      │               └── PAYMENTS
 │      │
 │      └── ASSOCIATE ASSIGNMENT
 │
 └── ASSOCIATE
        │
        └── ASSIGNED MEMBERS
```

------------------------------------------------------------------------

# 35. Payment Data Model

A payment should contain:

``` text
id
payment_plan_id
installment_id
member_id
associate_id

amount
payment_date
payment_method

transaction_reference
bank_reference
cash_receipt_number

entered_by
entered_on_behalf_of

member_approved_at
associate_verified_at
admin_confirmed_at

status

proof_document_id

remarks

created_at
updated_at
```

Sensitive information should only be stored when genuinely required.

------------------------------------------------------------------------

# 36. PostgreSQL vs MySQL/MSSQL

## Decision

**PostgreSQL will be the primary database.**

Do not use PostgreSQL + MySQL/MSSQL simultaneously without a specific
integration requirement.

Reasons:

-   Strong relational model.
-   Strong transaction support.
-   Reliable consistency.
-   Strong indexing.
-   JSON support.
-   Good reporting capabilities.
-   Excellent ecosystem.
-   Works well with Prisma.
-   Suitable for financial workflows.

If KMEW already has an existing MySQL or Microsoft SQL Server database,
a migration/integration project can be considered separately.

------------------------------------------------------------------------

# 37. Recommended Technology Stack

## Frontend

``` text
Next.js
TypeScript
React
Tailwind CSS
shadcn/ui
Lucide React
React Hook Form
Zod
TanStack Query
TanStack Table
Recharts
```

## Backend

Preferred architecture:

``` text
Next.js
+
Dedicated Service/API Layer
```

Backend options:

-   **Option A:** Next.js Route Handlers + Service Layer
-   **Option B:** NestJS API + Next.js frontend

For a larger long-term platform, a dedicated backend such as NestJS is
recommended.

------------------------------------------------------------------------

# 38. Authentication

Authentication should support:

-   Secure login
-   Registration
-   Email/mobile verification
-   Password hashing
-   Password reset
-   Session management
-   Logout
-   Session expiration
-   Rate limiting
-   Account lockout/temporary throttling
-   Optional MFA for Admin

Use established, security-reviewed authentication libraries rather than
custom cryptography.

------------------------------------------------------------------------

# 39. Authorization

Implement RBAC:

``` text
SUPER_ADMIN
ADMIN
ASSOCIATE
MEMBER
```

Permission examples:

``` text
member.view
member.create
member.update
member.approve
member.assign

associate.view
associate.approve
associate.assign

payment.create
payment.submit
payment.verify
payment.confirm
payment.reject

report.view
report.export

content.view
content.create
content.update
content.delete

audit.view
settings.manage
```

------------------------------------------------------------------------

# 40. Critical Security Requirement --- IDOR Prevention

The backend must never trust an ID supplied by the browser.

Example:

``` text
/api/members/1001
```

A Member attempting:

``` text
/api/members/1002
```

must receive an authorization failure if Member 1002 does not belong to
them.

The same applies to:

-   Payments
-   Installments
-   Payment proofs
-   Member documents
-   Associate data
-   Reports

Authorization must validate:

``` text
Authenticated User
        ↓
Role
        ↓
Permission
        ↓
Resource Ownership
        ↓
Relationship/Assignment
        ↓
Requested Action
```

------------------------------------------------------------------------

# 41. Security Requirements

Security testing must include:

-   OWASP Top 10
-   SQL injection
-   XSS
-   CSRF
-   IDOR
-   Broken access control
-   Authentication bypass
-   Session attacks
-   JWT/session security where applicable
-   SSRF
-   Open redirect
-   File upload vulnerabilities
-   Rate-limit bypass
-   Sensitive data exposure
-   Security misconfiguration
-   Dependency vulnerabilities
-   API abuse

------------------------------------------------------------------------

# 42. Security Headers

Production should configure appropriate:

``` text
Content-Security-Policy
Strict-Transport-Security
X-Content-Type-Options
Referrer-Policy
Permissions-Policy
Frame protections
Secure cookies
HttpOnly cookies
SameSite cookies
```

Exact CSP policy should be tested against all required third-party
services before production.

------------------------------------------------------------------------

# 43. File Upload Security

Payment proofs and documents must be handled securely.

Requirements:

-   Validate MIME type.
-   Validate extension.
-   Restrict file size.
-   Generate safe storage keys.
-   Never trust original filenames.
-   Scan uploaded files where appropriate.
-   Prevent executable uploads.
-   Use private object storage for sensitive documents.
-   Generate short-lived signed URLs.
-   Verify authorization before serving files.

------------------------------------------------------------------------

# 44. Data Security

Sensitive Member data should be:

-   Encrypted in transit using HTTPS.
-   Protected at rest using cloud/database encryption.
-   Access-controlled using RBAC and resource-level authorization.
-   Logged when sensitive operations occur, without unnecessarily logging sensitive values.
-   Excluded from normal application logs.
-   Stored in private object storage when the data is a document/image.
-   Exposed only to authorized users based on their operational role.

### Sensitive Member Data

The following fields require special protection:

- Government ID type/number
- Government ID document
- Bank Account Number
- IFSC Code
- Passport-size Photo
- Student ID where applicable

Access rules:

```text
Member
  → Can view/update permitted own information

Assigned Associate
  → Can access only the Member information required for their operational responsibilities

Admin
  → Authorized access according to permissions

Super Admin
  → Full authorized access

Other Members
  → No access
```

Government ID documents and passport-size photos must be stored in private object storage rather than publicly accessible URLs. Access should be authorized by the backend and served through short-lived signed URLs.

Never store:

-   UPI PIN
-   Banking password
-   OTP
-   CVV
-   Card PIN

Do not store full financial credentials unless legally/business-required
and handled through an appropriate compliant system.

------------------------------------------------------------------------

# 45. Security Leak / Vulnerability Testing

A dedicated security testing phase must be included before production.

Recommended tools:

``` text
OWASP ZAP
Snyk
npm audit
Dependency scanners
ESLint security rules
TypeScript strict mode
Playwright
Postman / Bruno
```

Test categories:

``` text
Authentication
Authorization
API
Database
File Upload
Session
Payments
Admin
Member Isolation
Associate Isolation
Audit Logs
Rate Limiting
```

------------------------------------------------------------------------

# 46. Testing Strategy

## Unit Testing

Test:

-   Business rules
-   Payment state transitions
-   Validation
-   Permission logic
-   Calculations

Recommended:

**Vitest**

## Integration Testing

Test:

-   API
-   Database
-   Authentication
-   Payment workflows
-   Member/Associate relationships

## E2E Testing

Recommended:

**Playwright**

Critical E2E scenarios:

1.  Member registration.
2.  Admin approval.
3.  Associate assignment.
4.  Associate acceptance.
5.  Payment plan creation.
6.  Member payment submission.
7.  Associate verification.
8.  Admin confirmation.
9.  Associate-entered payment.
10. Member approval.
11. Security isolation.

------------------------------------------------------------------------

# 47. Payment State Machine Testing

Every transition must be tested.

Valid:

``` text
YELLOW → BLUE
BLUE → GREEN
GREEN → RED
```

Invalid:

``` text
YELLOW → GREEN
YELLOW → RED
BLUE → RED
```

Also test:

-   Rejection
-   Resubmission
-   Partial payment
-   Duplicate transaction
-   Incorrect amount
-   Duplicate reference
-   Unauthorized verification

------------------------------------------------------------------------

# 48. Duplicate Payment Protection

The system should detect potential duplicate submissions.

For example:

``` text
Member
+
Transaction ID
+
Amount
+
Payment Method
```

can be checked against existing records.

The exact uniqueness rule should be finalized based on payment methods
and KMEW's operational process.

------------------------------------------------------------------------

# 49. Frontend Architecture

Recommended structure:

``` text
app/
├── (public)/
├── (auth)/
├── member/
├── associate/
├── admin/
└── api/

components/
├── ui/
├── public/
├── member/
├── associate/
└── admin/

lib/
├── auth/
├── api/
├── validation/
├── permissions/
└── utilities/

services/
├── members/
├── associates/
├── payments/
├── notifications/
└── reports/
```

------------------------------------------------------------------------

# 50. UI Design System

The entire application should use:

**shadcn/ui**

Components should include:

-   Button
-   Card
-   Dialog
-   Sheet
-   Drawer
-   Tabs
-   Table
-   Data Table
-   Form
-   Input
-   Select
-   Combobox
-   Dropdown
-   Badge
-   Alert
-   Toast
-   Tooltip
-   Calendar
-   Date Picker
-   Accordion
-   Breadcrumb
-   Sidebar
-   Navigation Menu
-   Progress
-   Skeleton
-   Pagination

Avoid building custom components when shadcn already provides the
required component.

------------------------------------------------------------------------

# 51. UI Rules

-   Use Tailwind utilities.
-   Use shadcn theme variables.
-   Avoid hardcoded colors.
-   Support dark mode where appropriate.
-   Use Lucide icons.
-   Use consistent spacing.
-   Use accessible form labels.
-   Use keyboard navigation.
-   Provide loading states.
-   Provide empty states.
-   Provide error states.
-   Provide confirmation dialogs for destructive actions.

Financial status colors should be semantic design tokens rather than
arbitrary hardcoded styling.

------------------------------------------------------------------------

# 52. Responsive Design

The public website must support:

``` text
Mobile
Tablet
Laptop
Desktop
Large Desktop
```

Member and Associate portals must be particularly optimized for mobile
because Associates may use the platform in the field.

------------------------------------------------------------------------

# 53. Accessibility

Target:

**WCAG 2.2 AA**

Requirements:

-   Keyboard navigation
-   Semantic HTML
-   Proper labels
-   Focus states
-   Screen reader support
-   Accessible dialogs
-   Accessible tables
-   Sufficient contrast
-   Do not rely on color alone
-   Error messaging
-   Reduced-motion support

------------------------------------------------------------------------

# 54. SEO

Public website should include:

-   Metadata
-   Open Graph
-   Social metadata
-   Canonical URLs
-   XML sitemap
-   Robots.txt
-   Structured data
-   Organization schema
-   Article schema for news
-   Breadcrumb schema
-   Optimized images
-   Semantic HTML
-   Clean URLs
-   404 page
-   301 redirects from old URLs where required

SEO should focus on relevant KMEW organization, education, welfare and
community-program searches without creating low-value program pages.

------------------------------------------------------------------------

# 55. Performance

Target:

-   Fast initial page load.
-   Optimized images.
-   Responsive images.
-   Lazy loading.
-   Server-side rendering where appropriate.
-   Static generation for suitable public content.
-   CDN.
-   Caching.
-   Minimal JavaScript.
-   Code splitting.
-   Database indexing.

Target strong Core Web Vitals.

------------------------------------------------------------------------

# 56. Admin CMS

Admin should be able to manage:

``` text
Homepage
About
Programs
News
Events
Gallery
Testimonials
FAQs
Contact
SEO
Footer
```

Content workflow:

``` text
Draft
 ↓
Review
 ↓
Published
 ↓
Archived
```

------------------------------------------------------------------------

# 57. Infrastructure

Recommended:

``` text
Cloudflare
      ↓
Next.js
      ↓
Backend/API
      ↓
PostgreSQL
      ↓
Object Storage
```

Environment separation:

``` text
Development
      ↓
Staging
      ↓
Production
```

Production must have:

-   HTTPS
-   WAF
-   Rate limiting
-   Database backups
-   Monitoring
-   Error tracking
-   Secure secrets
-   Access control

------------------------------------------------------------------------

# 58. Backup Strategy

Database:

-   Automated daily backups.
-   Point-in-time recovery where supported.
-   Backup retention policy.
-   Periodic restore testing.

Documents:

-   Object storage versioning where appropriate.
-   Backup/retention policy.
-   Private access.

------------------------------------------------------------------------

# 59. Monitoring

Monitor:

-   Application errors.
-   API errors.
-   Database performance.
-   Authentication failures.
-   Failed payment operations.
-   Failed background jobs.
-   Security events.
-   Server performance.
-   Storage.
-   Traffic anomalies.

------------------------------------------------------------------------

# 60. Development Skills Required

## Skill 1 --- KMEW Frontend Engineering

Required knowledge:

``` text
Next.js
React
TypeScript
Tailwind
shadcn/ui
Responsive UI
Accessibility
React Hook Form
Zod
TanStack Query
TanStack Table
Recharts
```

## Skill 2 --- KMEW Backend Engineering

Required:

``` text
REST API
Service architecture
PostgreSQL
Prisma
Database transactions
Validation
RBAC
Authentication
Authorization
Background jobs
Notifications
```

## Skill 3 --- KMEW Security Engineering

Required:

``` text
OWASP Top 10
API security
RBAC
IDOR
XSS
CSRF
SQL injection
Session security
File upload security
Rate limiting
Security headers
Dependency security
Secrets management
```

## Skill 4 --- KMEW QA Engineering

Required:

``` text
Unit testing
Integration testing
API testing
E2E testing
Playwright
Regression testing
Security testing
Role-based testing
Payment workflow testing
```

## Skill 5 --- KMEW DevOps

Required:

``` text
CI/CD
Cloud deployment
Cloudflare
HTTPS
DNS
Database backup
Monitoring
Logging
Secrets
Environment management
Scaling
```

## Skill 6 --- KMEW SEO

Required:

``` text
Technical SEO
Next.js SEO
Structured data
Sitemap
Robots
Canonical
Core Web Vitals
Schema
Content architecture
Local SEO
Analytics
Search Console
```

------------------------------------------------------------------------

# 61. Engineering Standards

The development team must follow:

``` text
TypeScript strict mode
ESLint
Prettier
Git branching strategy
Pull requests
Code review
Automated tests
Environment separation
No secrets in Git
No production credentials locally
No direct production DB manipulation
Database migrations
API validation
Centralized error handling
Centralized authorization
Audit logging
```

------------------------------------------------------------------------

# 62. Things Developers Must NOT Do

Do not:

-   Build custom UI when shadcn already provides it.
-   Store passwords in plain text.
-   Store OTPs unnecessarily.
-   Store UPI PINs.
-   Store CVVs.
-   Trust frontend role checks.
-   Trust IDs from the browser.
-   Allow members to access other members.
-   Allow associates to access unassigned members.
-   Change payment statuses directly from frontend.
-   Delete financial transactions permanently.
-   Store sensitive documents publicly.
-   Put secrets into source code.
-   Use production database for development.
-   Skip audit logs for financial actions.

------------------------------------------------------------------------

# 63. Important Business Rules

### Member

A Member belongs to KMEW and may have one active Associate at a time
unless the business explicitly allows multiple Associates.

### Associate

An Associate can manage only assigned Members.

### Payment Plan

A payment plan belongs to a Member and is created by an authorized
Associate/Admin.

### Installment

Each installment belongs to a payment plan.

### Payment

A payment belongs to an installment and records the person who entered
it.

### Verification

Payment verification must be role-based.

### Final Confirmation

Admin confirmation is the final official status.

------------------------------------------------------------------------

# 64. Financial State Model

``` text
PAYMENT_DUE
     │
     │ Member/Associate submits payment
     ▼
PAYMENT_SUBMITTED
     │
     │ Required approval/verification complete
     ▼
ASSOCIATE_CONFIRMED
     │
     │ Admin verifies
     ▼
ADMIN_CONFIRMED
```

Additional states:

``` text
REJECTED
CANCELLED
PARTIALLY_PAID
```

Exact transition rules should be implemented centrally in the backend.

------------------------------------------------------------------------

# 65. Complete Member Journey

``` text
Visit KMEW
   ↓
Become Member
   ↓
Registration
   ↓
Submit Application
   ↓
Admin Review
   ↓
Approved
   ↓
Associate Assigned
   ↓
Associate Accepts
   ↓
Member Account Active
   ↓
Associate Creates ₹50,000 Plan
   ↓
5 Installments Generated
   ↓
All Yellow
   ↓
Member Pays Installment #1
   ↓
Blue
   ↓
Associate Verifies
   ↓
Green
   ↓
Admin Verifies
   ↓
Red
```

------------------------------------------------------------------------

# 66. Associate-Entered Payment Journey

``` text
Associate Opens Member
       ↓
Selects Installment
       ↓
Enters Payment Details
       ↓
Payment = Blue
       ↓
Member Receives Notification
       ↓
Member Reviews
       ↓
Member Approves
       ↓
Associate Verifies
       ↓
Green
       ↓
Admin Reviews
       ↓
Red
```

------------------------------------------------------------------------

# 67. Admin Journey

``` text
Admin Login
   ↓
Dashboard
   ↓
Pending Member Applications
   ↓
Review
   ↓
Approve
   ↓
Assign Associate
   ↓
Monitor Payment Activity
   ↓
Review Associate-Confirmed Payments
   ↓
Cross-check Payment
   ↓
Confirm
   ↓
Payment becomes Red
```

------------------------------------------------------------------------

# 68. MVP Scope

## Phase 1 --- Foundation

-   Project setup
-   Design system
-   Authentication
-   RBAC
-   Database
-   Base API
-   Admin structure
-   Security foundation

## Phase 2 --- Public Website

-   Homepage
-   About
-   Programs
-   Membership
-   Associates
-   Impact
-   News
-   Gallery
-   Contact
-   Legal
-   SEO

## Phase 3 --- Member

-   Registration
-   Approval status
-   Login
-   Dashboard
-   Profile
-   Associate
-   Payment plans
-   Installments
-   Payment submission
-   Payment history
-   Notifications

## Phase 4 --- Associate

-   Registration
-   Approval
-   Assignment
-   Member list
-   Member detail
-   Payment plans
-   Payment entry
-   Verification
-   Reports

## Phase 5 --- Admin

-   Member management
-   Associate management
-   Assignment
-   Payment verification
-   Reports
-   CMS
-   Notifications
-   Audit logs
-   Settings

## Phase 6 --- Security & QA

-   Security audit
-   IDOR testing
-   API testing
-   E2E testing
-   Performance testing
-   Accessibility
-   Production hardening

------------------------------------------------------------------------

# 69. Future Features

Potential Phase 2/3 features:

-   WhatsApp notifications
-   SMS
-   Online payment gateway
-   Automatic payment reconciliation
-   Digital membership card
-   QR-based member identification
-   Associate mobile/PWA experience
-   Advanced financial reports
-   Export to accounting software
-   Document verification
-   Multi-language support
-   Mobile application
-   Automated reminders
-   Advanced analytics
-   Geographic member mapping
-   Donation management
-   Volunteer management

------------------------------------------------------------------------

# 70. Acceptance Criteria

## Public Website

-   Website is responsive.
-   All CMS pages are functional.
-   Registration works.
-   SEO fundamentals are implemented.

## Member

-   Member can register.
-   Admin can approve.
-   Associate can be assigned.
-   Associate can accept.
-   Member can view Associate.
-   Member can view payment plan.
-   Member can submit payment.
-   Member can see status.

## Associate

-   Associate can register.
-   Admin can approve.
-   Associate can receive assignment.
-   Associate can accept assignment.
-   Associate can create payment plans.
-   Associate can enter payments.
-   Associate can verify payments.

## Admin

-   Admin can approve registrations.
-   Admin can assign Associates.
-   Admin can review payments.
-   Admin can confirm payments.
-   Admin can view reports.
-   Admin can view audit logs.

## Security

-   Member isolation works.
-   Associate isolation works.
-   RBAC works.
-   Unauthorized APIs return appropriate errors.
-   Sensitive files are protected.
-   Security tests pass.

------------------------------------------------------------------------

# 71. Definition of Done

A feature is considered complete only when:

``` text
Requirements completed
        ↓
UI completed
        ↓
Responsive tested
        ↓
API implemented
        ↓
Database implemented
        ↓
Validation implemented
        ↓
Authorization implemented
        ↓
Audit logging implemented
        ↓
Unit tests
        ↓
Integration tests
        ↓
E2E tests
        ↓
Security tests
        ↓
Code review
        ↓
Staging QA
        ↓
Production deployment
```

------------------------------------------------------------------------

# 72. Final Architecture

``` text
                         KMEW PLATFORM
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
        PUBLIC WEBSITE     MEMBER PORTAL   ASSOCIATE PORTAL
             │                │                │
             └────────────────┼────────────────┘
                              │
                         NEXT.JS
                         TYPESCRIPT
                         SHADCN/UI
                              │
                         API/SERVICE
                            LAYER
                              │
                    ┌─────────┴─────────┐
                    │                   │
                AUTH/RBAC          BUSINESS LOGIC
                    │                   │
                    └─────────┬─────────┘
                              │
                           PRISMA
                              │
                         POSTGRESQL
                              │
             ┌────────────────┼────────────────┐
             │                │                │
          AUDIT LOGS       PAYMENTS       MEMBERS
             │                │                │
             └────────────────┼────────────────┘
                              │
                       OBJECT STORAGE
                              │
                  Payment Proofs/Documents
```

------------------------------------------------------------------------

# 73. Final Technology Decision

  Layer            Technology
  ---------------- -----------------------------------------------------
  Frontend         Next.js
  Language         TypeScript
  UI               shadcn/ui
  Styling          Tailwind CSS
  Icons            Lucide React
  Forms            React Hook Form
  Validation       Zod
  Server State     TanStack Query
  Tables           TanStack Table
  Charts           Recharts
  Backend          Next.js Service/API Layer or NestJS
  ORM              Prisma
  Database         PostgreSQL
  File Storage     S3 / Cloudflare R2 / equivalent
  Authentication   Secure session-based auth
  Authorization    RBAC + permission checks
  Testing          Vitest + Playwright
  Security         OWASP + ZAP + Snyk + dependency scanning
  CDN/WAF          Cloudflare
  CI/CD            GitHub Actions or equivalent
  Monitoring       Application + infrastructure monitoring
  SEO              Next.js Metadata + Structured Data + Search Console

------------------------------------------------------------------------

# 74. Final Product Vision

KMEW should evolve from a primarily informational NGO website into a
**complete digital member and community management platform**.

The final ecosystem should connect:

``` text
                 KMEW
                  │
       ┌──────────┼──────────┐
       │          │          │
    Members   Associates   Admin
       │          │          │
       └──────────┼──────────┘
                  │
          Payment Plans
                  │
             Installments
                  │
          Payment Submission
                  │
          Associate Verification
                  │
           Admin Verification
                  │
          Financial Records
                  │
            Audit History
```

## Core Product Principle

**Every member, assignment, installment, payment, approval and
administrative action must be traceable, permission-controlled and
auditable.**

The public website should build **trust and engagement**, while the
authenticated platform should provide **operational transparency,
financial accountability and controlled access**.

------------------------------------------------------------------------

# 75. Recommended Implementation Decision

Lock the following as the baseline architecture:

**Next.js + TypeScript + shadcn/ui + Tailwind + PostgreSQL + Prisma +
RBAC + Audit Logs + Secure Object Storage + Automated Testing + Security
Testing.**

Do not introduce MySQL/MSSQL alongside PostgreSQL unless KMEW has an
existing database that must be integrated or migrated.

The most critical engineering areas are:

1.  Payment state transitions
2.  Member/Associate data isolation
3.  IDOR prevention
4.  Role-based access control
5.  Financial audit trails
6.  Payment proof security
7.  Security testing
8.  Database transaction integrity
9.  Backup and recovery
10. End-to-end payment workflow testing

These should be treated as **core product requirements**, not optional
enhancements.
