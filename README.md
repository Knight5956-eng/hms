# HMS: Digital Health Platform for Type 2 Diabetes Glycemic Control

A patient-centered digital health platform that supports diabetes self-management, glycemic control and clinical interaction between adult **Type 2 diabetes** patients and their healthcare providers in Kenya. The first deployment target is **Embu Level Five Hospital**, and the platform is **multi-tenant** so more hospitals can be onboarded later.

> **Project status: Phase 0 (scaffold).** This repository currently contains the agreed structure, empty source files and documentation. No business logic has been written yet. See the [Roadmap](#18-roadmap).

---

## Table of contents

1. [Overview](#1-overview)
2. [Roles and permissions](#2-roles-and-permissions)
3. [Features by portal](#3-features-by-portal)
4. [Architecture](#4-architecture)
5. [Multi-tenancy](#5-multi-tenancy)
6. [Tech stack](#6-tech-stack)
7. [Repository structure](#7-repository-structure)
8. [Data model overview](#8-data-model-overview)
9. [Glycemic risk triage](#9-glycemic-risk-triage)
10. [Telemedicine](#10-telemedicine)
11. [Notifications and refill reminders](#11-notifications-and-refill-reminders)
12. [API overview](#12-api-overview)
13. [UI/UX design principles](#13-uiux-design-principles)
14. [Security, privacy and compliance](#14-security-privacy-and-compliance)
15. [Getting started](#15-getting-started)
16. [Environment variables](#16-environment-variables)
17. [Branching and commit conventions](#17-branching-and-commit-conventions)
18. [Roadmap](#18-roadmap)
19. [Open questions and assumptions](#19-open-questions-and-assumptions)
20. [Disclaimer](#20-disclaimer)

---

## 1. Overview

Type 2 diabetes care depends on what happens between clinic visits. HMS gives patients simple tools to record and understand their glucose, and gives clinicians a real-time view of who needs attention first.

**Core capabilities**

| Area | What it does |
|---|---|
| Self-monitoring | Patients log blood glucose readings and see their 3-month HbA1c trend |
| Medication | Patients see their medication schedule and get prescription refill reminders for the Embu Level 5 Pharmacy |
| Telemedicine | Video consultations, with a low-bandwidth audio-only mode for weak connections |
| Triage | Clinicians see a risk-stratified cohort and act on the patients who need attention most |
| Analytics | Longitudinal glycemic analytics and pseudonymised CSV export for audit and research |
| Administration | Super Admin runs the platform; Hospital Admins onboard clinicians and patients for their own hospital |

**Design goals:** clean, minimal, easy to use, safe with health data, and usable on low-end phones and unreliable networks.

---

## 2. Roles and permissions

There are four user tiers. Clinicians are one tier with three specialties.

| Role | Scope | Responsibility |
|---|---|---|
| **Super Admin** | Whole platform | Creates and manages hospitals (tenants), creates Hospital Admins, sets platform defaults, reviews platform audit logs |
| **Hospital Admin** | One hospital (tenant) | Onboards clinicians and patients, manages their accounts, configures hospital settings and reports |
| **Clinician** (Diabetologist, Diabetes Nurse Educator, Clinical Nutritionist) | One hospital | Triage, patient review, telemedicine, analytics, CSV export |
| **Patient** | Own data only | Logs glucose, views HbA1c and medications, requests refills, joins calls |

**Default permission matrix** (to be refined with the clinical team)

| Capability | Super Admin | Hospital Admin | Diabetologist | Nurse Educator | Nutritionist | Patient |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| Create / suspend hospitals | Yes | - | - | - | - | - |
| Create Hospital Admins | Yes | - | - | - | - | - |
| Onboard clinicians and patients | - | Yes | - | - | - | - |
| Configure hospital risk thresholds | Defaults | Yes | - | - | - | - |
| View identifiable patient health data | Break-glass only | Aggregate only | Yes | Yes | Yes | Own only |
| Log glucose readings | - | - | - | - | - | Yes |
| Record HbA1c results | - | - | Yes | Yes | - | - |
| Edit medication list and schedule | - | - | Yes | View | View | View |
| Triage dashboard | - | Aggregate | Yes | Yes | Yes | - |
| Start telemedicine session | - | - | Yes | Yes | Yes | Join |
| CSV research export (pseudonymised) | - | Operational reports | Yes | Yes | Yes | - |
| View audit logs | Platform | Own hospital | - | - | - | Own access log |

**Principle:** the Super Admin manages the platform but does **not** see identifiable patient data by default. Emergency "break-glass" access requires a written justification and is always audit-logged.

---

## 3. Features by portal

### 3.1 Super Admin Portal (web)
- Hospital (tenant) management: create, configure, suspend, reactivate
- Hospital Admin provisioning
- Platform-wide settings: default risk thresholds, units, feature flags
- Platform usage dashboard (hospitals, active users, sessions; no patient-level data)
- Platform audit log viewer

### 3.2 Hospital Admin Portal (web)
- Onboard clinicians and patients through **email or SMS invitations**
- Deactivate, reassign and manage users
- Assign patients to clinicians
- Hospital settings: branding, thresholds, reminder schedule, pharmacy contact
- Operational reports: enrolment, active patients, call volume, refill requests

### 3.3 Healthcare Provider Portal (web)
For Diabetologists, Diabetes Nurse Educators and Clinical Nutritionists.
- **Cohort risk stratification and clinical triage:** Critical, High, Moderate and Low tiers with the reason each patient is flagged
- **Patient detail:** glucose timeline, HbA1c trend, medications, appointments and notes
- **Telemedicine console with in-call vitals:** video or audio call alongside the patient's latest readings and a form to record vitals during the call
- **Longitudinal glycemic analytics:** cohort and individual trends over time
- **CSV research export:** filtered, pseudonymised and audit-logged
- Schedule and appointment management

### 3.4 Patient Self-Management Portal (web and Android)
For adult Type 2 diabetes patients at Embu Level Five Hospital.
- Securely log blood glucose readings (with context such as fasting, before meal, after meal, bedtime)
- Track 3-month HbA1c trend with plain-language explanations
- View medication schedule and dose reminders
- Prescription refill reminders for Embu Level 5 Pharmacy, with one-tap refill request
- Virtual appointments: video, or low-bandwidth audio
- English and Kiswahili

---

## 4. Architecture

A **modular monolith** backend (simple to deploy and run, with clear module boundaries so it can be split later), two clients, and a small set of infrastructure services.

```
   ┌──────────────────────┐        ┌──────────────────────┐
   │  React web app       │        │  Android app         │
   │  4 portals           │        │  Kotlin + Compose    │
   │  (Super Admin, Admin,│        │  (patient-focused,   │
   │  Clinician, Patient) │        │  offline-first)      │
   └──────────┬───────────┘        └──────────┬───────────┘
              │      HTTPS REST + WebSocket    │
              └───────────────┬────────────────┘
                              ▼
        ┌─────────────────────────────────────────────┐
        │  NestJS API (modular monolith)              │
        │  auth · tenants · users · patients · glucose│
        │  hba1c · medications · refills · triage     │
        │  appointments · telemedicine · analytics    │
        │  exports · notifications · audit · consents │
        │                                             │
        │  Socket.IO gateway (call signalling)        │
        │  BullMQ workers (reminders, risk, exports)  │
        └───────┬───────────────┬──────────────┬──────┘
                ▼               ▼              ▼
          PostgreSQL         Redis           coturn
          (row-level       (queues,        (STUN/TURN
           security)        cache)          for WebRTC)

        External: FCM (push) · Africa's Talking (SMS) · SMTP (email)
```

More detail: [docs/architecture.md](docs/architecture.md).

---

## 5. Multi-tenancy

**Model:** shared database, shared schema, with a `tenant_id` on every tenant-owned table. One tenant is one hospital.

| Layer | Mechanism |
|---|---|
| Identity | The JWT carries `tenantId` and `role`. This is the source of truth for tenant scope |
| API | A tenant middleware and guard resolve the tenant context for every request |
| ORM | A Prisma client extension injects `tenantId` into every query |
| Database | PostgreSQL **Row-Level Security** policies as a second line of defence, so a bug in application code cannot leak across hospitals |
| Super Admin | Has no tenant. Cross-tenant actions use an explicit tenant context and are audit-logged |
| Web branding | Optional per-hospital subdomain (for example `embu.<domain>`) for login branding only. It is never used for authorisation |
| Settings | Each tenant has its own risk thresholds, units, reminder schedule and branding |

Tenant isolation is covered by dedicated end-to-end tests (`backend/test/tenant-isolation.e2e-spec.ts`). Details: [docs/multi-tenancy.md](docs/multi-tenancy.md).

---

## 6. Tech stack

| Layer | Technology |
|---|---|
| Backend | Node.js, TypeScript, **NestJS**, **PostgreSQL**, **Prisma**, Redis + **BullMQ**, Socket.IO, class-validator, Swagger/OpenAPI |
| Frontend | **React**, Vite, TypeScript, Tailwind CSS, React Router, TanStack Query, Zustand, React Hook Form + Zod, Recharts |
| Android | **Kotlin**, Jetpack Compose (Material 3), MVVM + clean architecture, Hilt, Retrofit + OkHttp, Room, WorkManager, FCM, WebRTC |
| Real-time calls | WebRTC (video, with audio-only fallback), Socket.IO signalling, coturn for TURN/STUN |
| Notifications | Firebase Cloud Messaging (push), Africa's Talking (SMS), SMTP (email) |
| DevOps | Docker, Docker Compose, GitHub Actions |

---

## 7. Repository structure

```
hms/
├── backend/                 NestJS API (see backend/README.md)
│   ├── prisma/              schema, migrations, seed
│   ├── src/
│   │   ├── common/          decorators, guards, interceptors, tenancy, utils
│   │   ├── config/          configuration and env validation
│   │   ├── modules/         one folder per domain module
│   │   ├── queues/          BullMQ processors
│   │   ├── realtime/        Socket.IO gateways (signalling, presence)
│   │   └── prisma/          Prisma module and service
│   └── test/                end-to-end tests, including tenant isolation
│
├── frontend/                React web app (see frontend/README.md)
│   └── src/
│       ├── design-system/   tokens and theme
│       ├── components/      ui, layout, charts, telemedicine, domain
│       ├── portals/         super-admin, hospital-admin, clinician, patient, auth
│       ├── routes/  services/  store/  hooks/  types/  utils/  i18n/
│
├── android/                 Kotlin Android app (see android/README.md)
│   └── app/src/main/java/com/hms/app/
│       ├── data/            local (Room), remote (Retrofit), repositories
│       ├── domain/          models, repository interfaces, use cases
│       ├── ui/              theme, components, navigation, screens
│       ├── di/  work/  notifications/  telemedicine/  util/
│
├── docs/                    architecture, API, data model, risk rules, security
├── infra/                   coturn and PostgreSQL bootstrap config
├── .github/workflows/       CI for backend, frontend and Android
├── docker-compose.yml       local infrastructure
└── README.md                you are here
```

Each of `backend/`, `frontend/`, `android/` and `docs/` has its own README.

---

## 8. Data model overview

The full schema will live in `backend/prisma/schema.prisma`. Planned entities:

| Entity | Purpose | Key fields |
|---|---|---|
| `Tenant` | A hospital | name, slug, status, settings |
| `TenantSettings` | Per-hospital configuration | risk thresholds, units, reminder offsets, pharmacy contact |
| `User` | Login identity | tenantId (null for Super Admin), role, email, phone, status, MFA |
| `Invitation` | Onboarding by a Hospital Admin | tenantId, role, token hash, expiry, status |
| `PatientProfile` | Patient details | userId, tenantId, DOB, sex, diagnosis date, assigned clinician |
| `ClinicianProfile` | Clinician details | userId, tenantId, specialty, licence number |
| `GlucoseReading` | A blood glucose reading | patientId, value (mmol/L), context, measuredAt, source |
| `Hba1cResult` | HbA1c lab result | patientId, value (%), resultDate, recordedBy |
| `Medication` | A prescribed medicine | patientId, name, dose, frequency, quantity dispensed, start and end |
| `MedicationSchedule` | Dose times | medicationId, time of day, days |
| `RefillRequest` | Refill workflow | medicationId, status, dueDate, requestedAt, fulfilledAt |
| `Appointment` | Visit or virtual consultation | patientId, clinicianId, start, mode (video or audio or in-person), status |
| `CallSession` | Telemedicine session | appointmentId, mode used, started, ended, quality stats |
| `VitalsSnapshot` | Vitals captured in a call | callSessionId, BP, weight, glucose, notes |
| `RiskAssessment` | Computed triage result | patientId, tier, reasons, computedAt |
| `Consent` | Patient consent records | patientId, type, version, grantedAt, revokedAt |
| `Notification` / `DeviceToken` | Delivery log and push tokens | channel, status, token |
| `AuditLog` | Who accessed or changed what | actor, tenantId, action, resource, timestamp, IP |

**Units.** Glucose is stored canonically in **mmol/L** (the common unit in Kenya) and can be displayed in mg/dL (1 mmol/L = 18.016 mg/dL). HbA1c is stored as a percentage and can also be shown in mmol/mol.

Details: [docs/data-model.md](docs/data-model.md).

---

## 9. Glycemic risk triage

Each patient is assigned a risk tier from recent readings and HbA1c. The rules live in `backend/src/modules/triage/` as a **pure, unit-tested function**, with thresholds stored per tenant.

> **Clinical safety notice.** The values below are **illustrative defaults** based on commonly used glycemic targets (for example HbA1c under 7%, pre-meal glucose 4.4 to 7.2 mmol/L, hypoglycaemia under 3.9 mmol/L). They **must be reviewed and approved by the Embu Level 5 clinical lead against current Kenyan national guidelines** before any clinical use. Individual targets may differ per patient.

| Tier | Example default triggers (any one) |
|---|---|
| **Critical** | Any reading below 3.0 mmol/L; HbA1c 10.0% or higher; reading above 16.7 mmol/L on two or more occasions within 24 hours |
| **High** | HbA1c 8.5% to 9.9%; fewer than 50% of readings in range over 14 days; HbA1c rising by 0.5 percentage points or more over 3 months; no readings logged for 7 or more days |
| **Moderate** | HbA1c 7.0% to 8.4%; 50% to 69% of readings in range over 14 days |
| **Low** | HbA1c under 7.0% and 70% or more of readings in range, with no hypoglycaemia |

Every flag stores its **reasons**, so a clinician sees why a patient is in a tier, not only the tier. Details: [docs/risk-rules.md](docs/risk-rules.md).

---

## 10. Telemedicine

- **Signalling:** Socket.IO namespace `/signaling` (offer, answer, ICE candidates, join and leave)
- **Media:** WebRTC peer-to-peer where possible, relayed through **coturn** when needed
- **Low-bandwidth mode:** a pre-call network check measures connection quality. On a weak connection the call starts as **audio-only (Opus codec)** and can switch automatically during the call
- **Clinician console:** video or audio alongside a **vitals panel** with the patient's latest glucose, HbA1c trend and medications, plus a form to record vitals during the call
- **Privacy:** calls are not recorded by default. Any recording would need explicit patient consent
- **Reminders:** appointment reminders by push and SMS before the call

Details: [docs/telemedicine.md](docs/telemedicine.md).

---

## 11. Notifications and refill reminders

| Reminder | Trigger | Channel |
|---|---|---|
| Medication dose | Per medication schedule | Push (Android), in-app |
| Prescription refill | Computed from quantity dispensed and dose. Defaults: 7, 3 and 0 days before supply runs out | Push, SMS |
| Missed glucose logging | No readings within the configured window | Push, SMS |
| Appointment | 24 hours and 1 hour before | Push, SMS, email |

Refill reminders point to the **Embu Level 5 Pharmacy**. A patient can tap "Request refill" and the request enters a queue visible to clinicians and Hospital Admins. Reminder jobs run in BullMQ workers.

---

## 12. API overview

Base path: `/api/v1`. Interactive docs (Swagger) will be served at `/api/docs`. Full reference: [docs/api.md](docs/api.md).

| Group | Examples |
|---|---|
| `/auth` | login, refresh, logout, forgot and reset password, accept invitation, MFA |
| `/tenants` | Super Admin hospital management |
| `/invitations`, `/users` | Onboarding and account management |
| `/patients`, `/clinicians` | Profiles and assignments |
| `/patients/:id/glucose-readings` | Log and list readings |
| `/patients/:id/hba1c-results` | Record and list HbA1c |
| `/patients/:id/medications`, `/refills` | Medication schedule and refill workflow |
| `/appointments` | Scheduling |
| `/telemedicine` | Sessions, TURN credentials |
| `/triage` | Cohort tiers and rule configuration |
| `/analytics`, `/exports` | Longitudinal analytics, CSV export jobs |
| `/consents`, `/notifications`, `/audit-logs` | Consent, delivery, audit |

Real-time (Socket.IO): `/signaling`, `/presence`.

---

## 13. UI/UX design principles

The interface should feel **clean, modern, minimal and easy to use**. Patients may be older adults on budget phones; clinicians are busy. The product should be calm and quick to use.

### Principles
1. **One primary action per screen.** "Log glucose" is the biggest thing on the patient home screen.
2. **Calm and spacious.** Generous whitespace, few borders, no clutter. Show what matters and hide the rest behind progressive disclosure.
3. **Plain language.** No jargon for patients. English and Kiswahili from day one.
4. **Large, forgiving controls.** Touch targets of 48dp or larger. Big numeric entry for glucose.
5. **Colour carries meaning, sparingly.** Colour is reserved for health status, never decoration, and is **never the only signal**. Always pair it with an icon and a label.
6. **Accessible by default.** WCAG 2.2 AA contrast, scalable text, screen-reader labels, keyboard navigation on web, light and dark themes.
7. **Works on weak networks.** Skeleton loaders, optimistic updates, offline glucose logging that syncs later, small payloads.
8. **Consistent everywhere.** The web app and Android app share the same design tokens.
9. **Dense when needed, calm always.** Clinician screens may show more data, but keep the same visual language.

### Design tokens (shared by web and Android)

| Token | Light value | Use |
|---|---|---|
| `primary` | `#0F766E` (teal) | Primary actions, active states |
| `background` | `#F8FAFC` | App background |
| `surface` | `#FFFFFF` | Cards, sheets |
| `text` | `#0F172A` | Primary text |
| `text-muted` | `#64748B` | Secondary text |
| `border` | `#E2E8F0` | Dividers, outlines |
| `success` | `#16A34A` | In range |
| `warning` | `#D97706` | High / elevated |
| `danger` | `#DC2626` | Low (hypoglycaemia) and critical |
| `info` | `#2563EB` | Informational |

- **Typography:** Inter (system sans-serif fallback). Body 16px minimum, glucose numbers in a large, tabular-figure style
- **Spacing:** 4px base, 8px rhythm
- **Shape:** 12px radius for cards and inputs, 999px for pills; 1px borders in preference to heavy shadows
- **Motion:** short and subtle (150 to 200ms), and respects "reduce motion"
- A dark theme mirrors every token

### Glucose status display

| Status | Colour | Icon | Label |
|---|---|---|---|
| Low | Red | Down arrow | "Low" |
| In range | Green | Check | "In range" |
| High | Amber | Up arrow | "High" |
| Very high | Red | Double up arrow | "Very high" |

### Wireframe sketches

Patient home (mobile):

```
┌──────────────────────────────┐
│  Good morning, Amina         │
│                              │
│  ┌────────────────────────┐  │
│  │ Last reading           │  │
│  │ 6.8 mmol/L  ✓ In range │  │
│  │ Today 07:45 · Fasting  │  │
│  └────────────────────────┘  │
│                              │
│  [        + Log glucose     ]│
│                              │
│  HbA1c    7.4%  ↓ 0.3        │
│  Next dose  Metformin · 8 pm │
│  Appointment  Thu 10:30      │
├──────────────────────────────┤
│  Home   Log   Meds   Visits  │
└──────────────────────────────┘
```

Clinician triage (desktop):

```
┌────────┬─────────────────────────────────────────────────────────┐
│ Triage │  Triage                              [Search] [Filters] │
│ Patients│  Critical 3 │ High 12 │ Moderate 31 │ Low 104          │
│ Schedule│ ──────────────────────────────────────────────────────  │
│ Analytics Patient     HbA1c   In range (14d)  Last log   Reason  ▸│
│ Exports │ J. Mwangi   10.2%      38%           3 d ago   HbA1c   ▸│
│        │ A. Njeru     7.9%      55%           today     Trend ↑ ▸│
└────────┴─────────────────────────────────────────────────────────┘
```

Detailed design system: [docs/ui-design-system.md](docs/ui-design-system.md).

---

## 14. Security, privacy and compliance

Health data is **sensitive personal data**. Security is part of the design.

- **Compliance:** Kenya Data Protection Act, 2019 and its regulations. Hospitals are expected to be the data controller and the platform operator the processor; this must be confirmed with legal counsel. Registration with the Office of the Data Protection Commissioner and a Data Protection Impact Assessment are required before go-live
- **Authentication:** short-lived JWT access tokens with rotating refresh tokens; passwords hashed with Argon2id; **TOTP multi-factor authentication required** for admins and clinicians
- **Authorisation:** role-based access control plus tenant isolation (guards, ORM extension and PostgreSQL row-level security)
- **Least privilege:** the Super Admin has no default access to identifiable patient data; break-glass access needs justification and is audited
- **Audit:** every read or write of patient data by staff is recorded, and patients can see who accessed their record
- **Consent:** explicit, versioned consent records, including consent for research use of data
- **Exports:** pseudonymised identifiers, role-gated, audit-logged, and delivered by expiring signed links. Research use should follow your institution's ethics approvals
- **Transport and storage:** TLS everywhere; encryption at rest; field-level encryption for especially sensitive identifiers
- **Application hardening:** input validation, rate limiting, secure headers, dependency scanning in CI
- **Secrets:** never committed. Use `.env` locally (git-ignored) and a secret manager in production
- **Retention:** configurable retention and deletion policy per hospital

Details: [docs/security-privacy.md](docs/security-privacy.md).

---

## 15. Getting started

> The commands below describe the intended workflow. They will work once Phase 1 fills in `package.json`, Docker and config files.

**Prerequisites:** Node.js (current LTS), Docker and Docker Compose, JDK 17+, Android Studio (latest stable).

```bash
# 1. Clone
git clone https://github.com/Knight5956-eng/hms.git
cd hms

# 2. Start infrastructure (PostgreSQL, Redis, coturn)
cp .env.example .env
docker compose up -d postgres redis coturn

# 3. Backend
cd backend
cp .env.example .env
npm install
npx prisma migrate dev
npx prisma db seed          # creates a Super Admin and a demo hospital
npm run start:dev           # http://localhost:3000/api/v1

# 4. Frontend (new terminal)
cd frontend
cp .env.example .env
npm install
npm run dev                 # http://localhost:5173

# 5. Android
# Open the android/ folder in Android Studio and run on an emulator or device
```

See the README in each folder for specifics.

---

## 16. Environment variables

Each app has its own `.env.example`. Never commit a real `.env`.

| Where | Examples |
|---|---|
| Root `.env` | Database, Redis and coturn settings for Docker Compose |
| `backend/.env` | `DATABASE_URL`, `REDIS_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `FCM_*`, `AT_API_KEY`, `SMTP_*`, `TURN_*` |
| `frontend/.env` | `VITE_API_URL`, `VITE_WS_URL`, `VITE_DEFAULT_LOCALE` |
| `android/` | `API_BASE_URL` via Gradle build config; `google-services.json` (not committed) |

---

## 17. Branching and commit conventions

- `main` is always deployable. Work happens on short-lived feature branches and merges by pull request
- Branch names: `feat/<area>-<short-name>`, `fix/...`, `chore/...`
- Commit messages follow **Conventional Commits**, for example `feat(glucose): add reading validation`
- CI runs lint, tests and build for the folder that changed

---

## 18. Roadmap

| Phase | Focus | Outcome |
|---|---|---|
| **0. Scaffold** (current) | Structure, empty files, documentation | Agreed layout in GitHub |
| **1. Foundation** | Project config, auth, tenants, RBAC, row-level security, invitations, design system | Admins can sign in and onboard users |
| **2. Patient core** | Glucose logging, HbA1c, medication schedule; Android offline sync | Patients can self-monitor |
| **3. Clinician tools** | Risk triage, patient detail, longitudinal analytics | Clinicians can prioritise patients |
| **4. Telemedicine** | Signalling, WebRTC, audio-only fallback, in-call vitals | Virtual consultations work on weak networks |
| **5. Reminders** | Refill, dose and appointment reminders via push and SMS | Fewer missed refills and visits |
| **6. Export and hardening** | CSV export, audit views, security review, accessibility audit, pilot | Ready for pilot at Embu Level 5 |
| **7. Scale** | More hospitals, pharmacist role, glucometer integration, interoperability | Multi-hospital rollout |

---

## 19. Open questions and assumptions

1. **Pharmacy workflow:** refill requests go to a clinician and Hospital Admin queue for now. Should there be a dedicated **Pharmacist** role?
2. **HbA1c source:** assumed to be entered by clinicians from lab results. Is lab or hospital-system integration (for example FHIR) needed?
3. **Clinical thresholds:** the defaults in section 9 need sign-off by the clinical lead
4. **Hosting and data residency:** where will production run, and does the hospital require in-country hosting?
5. **TURN hosting:** coturn needs a public server with a stable IP
6. **SMS sender ID:** needs registration with the SMS provider
7. **Product name:** "HMS" is a working title; the app name and branding are not yet decided
8. **Ethics approval:** needed for any research use of exported data

---

## 20. Disclaimer

This software supports diabetes self-management and clinical workflows. It **does not replace professional medical advice, diagnosis or treatment**, and it is not an emergency service. Patients who feel unwell should contact their clinician or emergency services.
