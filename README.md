# PestHub MVP

Next.js + Prisma MVP for pest-control field service teams.

## Features included
- Auth (NextAuth credentials), RBAC roles (ADMIN, DISPATCHER, TECH)
- Admin pages: customers, properties, jobs trust view, calendar, invoices
- Tech pages: today list and job detail with offline queue UX + sync endpoint
- Strict job state machine with admin override auditing
- Auto invoice creation on job completion
- Stripe webhook to mark invoices paid
- QBO sync status placeholder with error visibility via `IntegrationStatus`
- SMS log abstraction + ETA window helper
- Recurring service plan job generator script

## Local setup
```bash
cp .env.example .env
npm install
docker compose up -d
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

## Seed users
- admin@pesthub.local / password123
- dispatch@pesthub.local / password123
- tech1@pesthub.local / password123
- tech2@pesthub.local / password123

## Useful commands
```bash
npm run jobs:generate
npm run test
npm run test:e2e
```

## Required pages
- `/login`
- `/admin/customers`
- `/admin/properties`
- `/admin/jobs`
- `/admin/calendar`
- `/admin/invoices`
- `/tech/today`
- `/tech/job/[id]`
