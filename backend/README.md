# HMS Backend

NestJS API for the HMS diabetes glycemic control platform. It serves the web portals and the Android app, enforces multi-tenant isolation, runs background jobs and relays WebRTC signalling.

> **Status: scaffold.** Folders and empty files are in place. Implementation starts in Phase 1 (see the [root roadmap](../README.md#18-roadmap)).

## Stack

- Node.js and TypeScript, **NestJS** (modular monolith)
- **PostgreSQL** with **Prisma** ORM and row-level security
- **Redis** with **BullMQ** for queues and scheduled jobs
- **Socket.IO** for call signalling and presence
- class-validator and class-transformer for DTO validation
- Swagger/OpenAPI served at `/api/docs`
- Jest and Supertest for tests

## Structure

```
backend/
├── prisma/
│   ├── schema.prisma            data model
│   ├── seed.ts                  Super Admin and demo hospital
│   └── migrations/
├── src/
│   ├── main.ts                  bootstrap
│   ├── app.module.ts
│   ├── config/                  configuration and env validation
│   ├── prisma/                  PrismaModule and PrismaService
│   ├── common/
│   │   ├── decorators/          @Roles, @CurrentUser, @CurrentTenant, @Public
│   │   ├── guards/              JwtAuthGuard, RolesGuard, TenantGuard
│   │   ├── interceptors/        audit logging, response transform
│   │   ├── filters/             HTTP exception filter
│   │   ├── pipes/               validation pipe
│   │   ├── tenancy/             tenant context, middleware, Prisma extension
│   │   └── utils/               pagination, glucose units, CSV, pseudonymisation
│   ├── modules/                 domain modules (below)
│   ├── queues/                  BullMQ processors
│   └── realtime/                Socket.IO gateways
└── test/                        e2e tests, including tenant isolation
```

## Modules

Each module folder contains `*.module.ts`, `*.controller.ts`, `*.service.ts` and a `dto/` folder.

| Module | Responsibility |
|---|---|
| `auth` | Login, refresh tokens, password reset, MFA, accept invitation |
| `tenants` | Hospital CRUD and settings (Super Admin) |
| `invitations` | Hospital Admin invites clinicians and patients by email or SMS |
| `users` | Accounts, status, role changes |
| `patients` | Patient profiles, clinician assignment |
| `clinicians` | Clinician profiles and specialty |
| `glucose` | Blood glucose readings |
| `hba1c` | HbA1c results and 3-month trend |
| `medications` | Medication list and dose schedule |
| `refills` | Refill due-date calculation and refill requests (`refill-reminder.scheduler.ts`) |
| `appointments` | Scheduling and reminders |
| `telemedicine` | Call sessions, TURN credentials, in-call vitals |
| `triage` | Risk rules engine and cohort tiers (`risk-rules.engine.ts`, `risk-rules.defaults.ts`) |
| `analytics` | Longitudinal and cohort analytics |
| `exports` | Async CSV export with pseudonymisation |
| `notifications` | Push (FCM), SMS (Africa's Talking) and email providers |
| `audit` | Audit log write and query |
| `consents` | Versioned consent records |

## Multi-tenancy

Shared schema with `tenant_id` on tenant-owned tables.

1. `tenant.middleware.ts` reads `tenantId` from the verified JWT and stores it in `tenant.context.ts` (AsyncLocalStorage).
2. `tenant-prisma.extension.ts` automatically adds `tenantId` to reads and writes.
3. PostgreSQL **row-level security** policies (bootstrapped in `infra/postgres/init.sql` and migrations) read the tenant from a per-request session setting, as a second line of defence.
4. The Super Admin has no tenant. Cross-tenant operations set an explicit tenant context and are audit-logged.
5. `test/tenant-isolation.e2e-spec.ts` must prove that hospital A can never read or write hospital B's data.

## Authentication and authorisation

- Short-lived JWT access token (about 15 minutes) and a rotating refresh token
- Argon2id password hashing
- TOTP MFA required for admins and clinicians
- `@Roles()` and `RolesGuard` for role checks, `TenantGuard` for tenant scope
- Patients can only access their own records

## Background jobs

| Queue / processor | Purpose |
|---|---|
| `refill-reminders` | Computes refill due dates and sends reminders |
| `appointment-reminders` | 24 hour and 1 hour reminders |
| `risk-recalculation` | Recomputes triage tiers when new readings or HbA1c arrive, and on a nightly schedule |
| `export-jobs` | Builds CSV files and produces expiring download links |

## Real-time

| Namespace | Purpose |
|---|---|
| `/signaling` | WebRTC offer, answer and ICE exchange, join and leave |
| `/presence` | Whether a patient or clinician is online for a call |

## Environment variables

Copy `.env.example` to `.env`. Planned variables:

| Variable | Purpose |
|---|---|
| `NODE_ENV`, `PORT` | Runtime |
| `DATABASE_URL` | PostgreSQL connection |
| `REDIS_URL` | Redis connection |
| `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` | Token signing |
| `JWT_ACCESS_TTL`, `JWT_REFRESH_TTL` | Token lifetimes |
| `CORS_ORIGINS` | Allowed web origins |
| `FCM_PROJECT_ID`, `FCM_CLIENT_EMAIL`, `FCM_PRIVATE_KEY` | Push notifications |
| `AT_USERNAME`, `AT_API_KEY`, `AT_SENDER_ID` | Africa's Talking SMS |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` | Email |
| `TURN_URLS`, `TURN_SECRET` | TURN credentials for WebRTC |
| `EXPORT_LINK_TTL_MINUTES` | Lifetime of export download links |

Never commit real secrets.

## Planned scripts

```bash
npm install
npx prisma migrate dev      # apply migrations
npx prisma db seed          # seed Super Admin and demo hospital
npm run start:dev           # watch mode
npm run build
npm run lint
npm run test                # unit tests
npm run test:e2e            # end-to-end tests
```

## Conventions

- Validate all input with DTOs (whitelist, forbid unknown fields)
- Keep controllers thin. Put business logic in services and pure functions
- Pure rules such as risk triage and unit conversion get unit tests
- Consistent error shape: `{ statusCode, error, message, details? }`
- Paginate list endpoints (`page`, `pageSize`, or cursor)
- Never log patient data or secrets
- Every patient-data access goes through the audit interceptor

## Testing

- **Unit:** triage rules, glucose unit conversion, refill date maths, pseudonymisation
- **E2E:** auth flows, RBAC matrix, **tenant isolation**
- Test database via Docker Compose

## Docker

`Dockerfile` builds a production image. `docker-compose.yml` at the repo root provides PostgreSQL, Redis and coturn for development.
