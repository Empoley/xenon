# Employee Management System — Final Implementation Plan
**Prepared by:** Keith Wency Bundoc | **Version:** Final | **Date:** 2026-10-06

---

## Resolved Design Decisions

| Question | Decision |
|---|---|
| Login identifier | **Username only** |
| Account seeding | **Manually seeded into DB** — no admin UI needed |
| Attendance clock-in/out | **Inside the EMS web app** |
| Dashboard Weekly Progress | **Placeholder** — keep component, no logic yet |
| Backend / DB | **Next.js API Routes + Supabase (PostgreSQL)** |
| Auth sessions | **Supabase Auth — email + password** |
| Login page | **One shared page** — role detected from credentials |
| Navigation | **Sidebar (fixed left) + top bar** |
| Theme | **Both light and dark** — user toggleable |
| File uploads | **Any file type, max 5 MB** |
| Leave types | Sick Leave, Vacation Leave, Emergency Leave, Maternity/Paternity Leave |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Vanilla CSS (custom design system) |
| Auth | Supabase Auth (email + password) |
| Database | Supabase PostgreSQL |
| ORM / Query | Supabase JS client (`@supabase/supabase-js`) |
| File storage | Supabase Storage |
| API | Next.js Route Handlers (`/app/api/...`) |
| Deployment | Vercel (optional) |

---

## Database Schema

### `profiles`
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | references `auth.users(id)` |
| employee_id | text UNIQUE | e.g. `EMP-001` |
| username | text UNIQUE | login identifier |
| full_name | text | |
| email | text | from Supabase Auth |
| phone | text | |
| address | text | |
| avatar_url | text | Supabase Storage path |
| role | enum `employee \| manager` | |
| department_id | uuid FK | |
| is_first_login | boolean | true until first-login flow done |
| join_date | date | |
| is_active | boolean | default true |

### `departments`
| Column | Type |
|---|---|
| id | uuid PK |
| name | text |

### `attendance`
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| employee_id | uuid FK → profiles | |
| date | date | |
| clock_in | timestamptz | |
| clock_out | timestamptz | |
| break_minutes | int | |
| status | enum `on_time \| late \| absent \| remote \| on_leave` | |
| adjusted_by | uuid FK → profiles | nullable — manager who adjusted |
| notes | text | audit note for manual adjustment |

### `tasks`
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| title | text | |
| subject | text | |
| description | text | |
| department_id | uuid FK | |
| assigned_to | uuid FK → profiles | |
| created_by | uuid FK → profiles | manager |
| priority | enum `low \| medium \| high` | |
| due_date | date | |
| status | enum `pending \| for_verification \| completed \| blocked` | |
| sprint_id | uuid FK nullable | |

### `task_attachments`
| Column | Type |
|---|---|
| id | uuid PK |
| task_id | uuid FK |
| uploaded_by | uuid FK → profiles |
| file_url | text |
| file_name | text |
| uploaded_at | timestamptz |

### `task_comments`
| Column | Type |
|---|---|
| id | uuid PK |
| task_id | uuid FK |
| author_id | uuid FK → profiles |
| body | text |
| created_at | timestamptz |

### `sprints`
| Column | Type |
|---|---|
| id | uuid PK |
| name | text |
| start_date | date |
| end_date | date |
| status | enum `active \| closed` |

### `announcements`
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| title | text | |
| subject | text | |
| body | text | |
| author_id | uuid FK → profiles | manager |
| department_id | uuid FK nullable | null = all departments |
| priority | enum `low \| normal \| urgent` | |
| status | enum `draft \| scheduled \| live \| archived` | |
| publish_at | timestamptz | |
| is_pinned | boolean | |

### `announcement_reactions`
| Column | Type |
|---|---|
| id | uuid PK |
| announcement_id | uuid FK |
| employee_id | uuid FK → profiles |
| reaction | text |

### `announcement_comments`
| Column | Type |
|---|---|
| id | uuid PK |
| announcement_id | uuid FK |
| author_id | uuid FK → profiles |
| body | text |
| created_at | timestamptz |

### `leave_requests`
| Column | Type | Notes |
|---|---|---|
| id | uuid PK | |
| employee_id | uuid FK → profiles | |
| leave_type | enum `sick \| vacation \| emergency \| maternity_paternity` | |
| start_date | date | |
| end_date | date | |
| total_days | int | |
| reason | text | |
| status | enum `draft \| pending \| approved \| rejected` | |
| reviewer_id | uuid FK nullable | manager who reviewed |
| reviewer_note | text | |
| decided_at | timestamptz | |
| coverage_flag | boolean | |
| overlap_flag | boolean | |

### `leave_attachments`
| Column | Type |
|---|---|
| id | uuid PK |
| leave_request_id | uuid FK |
| file_url | text |
| file_name | text |

---

## Folder Structure

```
app/
├── (auth)/
│   ├── activate/          # Account activation page
│   ├── first-login/       # Force-change username + password
│   └── login/             # Shared login (role detected)
│
├── (employee)/            # Route group — role guard: employee
│   ├── dashboard/
│   ├── profile/
│   ├── attendance/
│   ├── tasks/
│   │   └── [id]/
│   ├── announcements/
│   │   └── [id]/
│   └── leave/
│       └── [id]/
│
├── (manager)/             # Route group — role guard: manager
│   ├── dashboard/
│   ├── attendance/        # D1 — Employee Attendance Roster
│   ├── tasks/             # D2 — Task Board
│   │   └── new/           # D3 — Create & Assign Task
│   ├── announcements/     # D4 — Create Announcement
│   └── leave/             # D5 — Leave Queue
│
├── api/
│   ├── auth/
│   ├── profile/
│   ├── attendance/
│   ├── tasks/
│   ├── announcements/
│   └── leave/
│
├── layout.tsx             # Root layout (theme provider)
└── globals.css

components/
├── layout/
│   ├── Sidebar.tsx
│   ├── TopBar.tsx
│   └── ThemeToggle.tsx
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Modal.tsx
│   ├── Table.tsx
│   ├── Input.tsx
│   └── FileUpload.tsx
├── employee/
└── manager/

lib/
├── supabase/
│   ├── client.ts          # Browser Supabase client
│   └── server.ts          # Server Supabase client
├── auth.ts                # Auth helpers
└── utils.ts

types/
└── index.ts               # All shared TypeScript types

middleware.ts              # Role-based route protection
```

---

## Implementation Phases

### Phase 1 — Foundation
- [x] Project already initialized (Next.js 16 + TypeScript)
- [ ] Install `@supabase/supabase-js`, `@supabase/ssr`
- [ ] Set up Supabase project and environment variables
- [ ] Create all database tables (schema above)
- [ ] Seed departments and initial employee records
- [ ] Build global CSS design system (color tokens, typography, dark/light theme)
- [ ] Build `Sidebar`, `TopBar`, and `ThemeToggle` layout components
- [ ] Configure `middleware.ts` for role-based route guards

### Phase 2 — Authentication
- [ ] **Activate Account** page — enter `employee_id` + temp password → Supabase Auth sign-in check
- [ ] **First Login** page — force update username + password, set `is_first_login = false`
- [ ] **Login** page — shared, Supabase Auth email+password, detect role, redirect to correct dashboard
- [ ] **Logout** — clear session, redirect to login
- [ ] Middleware: redirect unauthenticated users, redirect wrong-role users

### Phase 3 — Employee Profile
- [ ] View profile (name, email, phone, address, avatar)
- [ ] Edit profile (phone, address, avatar upload to Supabase Storage)
- [ ] Change password (via Supabase Auth)

### Phase 4 — Attendance (Employee + Manager)
- [ ] **Employee:** Clock-in / Clock-out button (creates/updates attendance row for today)
- [ ] **Employee:** Attendance History — list with search, date filter, status filter, pagination
- [ ] **Manager (D1):** Attendance Roster — KPI cards, employee list with today's status
- [ ] **Manager (D1):** Employee Detail Panel — shift info, clock-in/out, break, monthly summary, recent logs
- [ ] **Manager (D1):** Manual Adjustment — edit a record with audit note
- [ ] **Manager (D1):** Export Timesheet — CSV download

### Phase 5 — Leave Requests (Employee + Manager)
- [ ] **Employee:** Leave Request form — leave type, dates, reason, file upload, save draft / submit
- [ ] **Employee:** Leave Request list — draft, pending, approved, rejected tabs
- [ ] **Employee:** Leave Approved detail view
- [ ] **Manager (D5):** Leave Queue — KPI cards, tabs (Pending / Approved / Rejected / Calendar)
- [ ] **Manager (D5):** Approve / Reject with reviewer note
- [ ] **Manager (D5):** Bulk approve/reject

### Phase 6 — Tasks (Employee + Manager)
- [ ] **Employee:** Task list — Pending / For Verification / Completed tabs
- [ ] **Employee:** Task Detail — description, attachments, requirements, comments, update status
- [ ] **Manager (D2):** Task Board — KPI cards, sprint selector, task table with filters
- [ ] **Manager (D3):** Create & Assign Task form — title, subject, description, department, employee, priority, due date
- [ ] **Manager (D2):** Quick Actions — edit task, mark complete

### Phase 7 — Announcements (Employee + Manager)
- [ ] **Employee:** Announcement list — newest first, search
- [ ] **Employee:** Announcement Detail — full content, reactions, comments
- [ ] **Manager (D4):** Create Announcement form — title, subject, body, department, priority, publish now or schedule
- [ ] **Manager (D4):** Live feed — list active announcements, pin/unpin, archive

### Phase 8 — Dashboard
- [ ] **Employee Dashboard:** Self Tasks widget, Activity Log, Reminders, Add Panel (Notes, Upcoming Events, Team Updates, Documents), Weekly Progress placeholder
- [ ] **Manager Dashboard:** Quick-access cards to each DM screen

### Phase 9 — Polish
- [ ] Loading states for all async actions
- [ ] Empty states for all lists
- [ ] Error boundaries and toast notifications
- [ ] Responsive layout (sidebar collapses on mobile)
- [ ] File size enforcement (5 MB client + server)
- [ ] Accessibility audit (keyboard nav, ARIA labels)
- [ ] End-to-end flow testing

---

## API Route Reference

| Method | Route | Role | Purpose |
|---|---|---|---|
| POST | `/api/auth/activate` | — | Validate activation credentials |
| PATCH | `/api/auth/first-login` | employee | Set username + password |
| GET | `/api/profile` | employee | Get own profile |
| PATCH | `/api/profile` | employee | Update profile |
| GET | `/api/attendance` | employee | Get own attendance history |
| POST | `/api/attendance/clock-in` | employee | Clock in |
| PATCH | `/api/attendance/clock-out` | employee | Clock out |
| GET | `/api/manager/attendance` | manager | Get department roster |
| GET | `/api/manager/attendance/:id` | manager | Get employee detail |
| PATCH | `/api/manager/attendance/:id/adjust` | manager | Manual adjustment |
| GET | `/api/manager/attendance/export` | manager | CSV download |
| GET | `/api/tasks` | employee | Get own tasks |
| GET | `/api/tasks/:id` | employee | Get task detail |
| PATCH | `/api/tasks/:id/status` | employee | Update task status |
| POST | `/api/tasks/:id/comments` | employee | Add comment |
| POST | `/api/tasks/:id/attachments` | employee | Upload attachment |
| GET | `/api/manager/tasks` | manager | Get department task board |
| POST | `/api/manager/tasks` | manager | Create & assign task |
| PATCH | `/api/manager/tasks/:id` | manager | Edit task |
| GET | `/api/announcements` | employee | List announcements |
| GET | `/api/announcements/:id` | employee | Get announcement detail |
| POST | `/api/announcements/:id/reactions` | employee | React |
| POST | `/api/announcements/:id/comments` | employee | Comment |
| GET | `/api/manager/announcements` | manager | List managed announcements |
| POST | `/api/manager/announcements` | manager | Create announcement |
| PATCH | `/api/manager/announcements/:id` | manager | Edit / pin / archive |
| GET | `/api/leave` | employee | Get own leave requests |
| POST | `/api/leave` | employee | Submit leave request |
| PATCH | `/api/leave/:id` | employee | Update draft |
| GET | `/api/manager/leave` | manager | Get leave queue |
| POST | `/api/manager/leave/:id/approve` | manager | Approve |
| POST | `/api/manager/leave/:id/reject` | manager | Reject with note |
| POST | `/api/manager/leave/bulk` | manager | Bulk action |

---

## Open Items (Deferred)

These items from the documentation are acknowledged but **not blocking Phase 1–9**:

- Username uniqueness format rules — apply reasonable defaults (3–20 chars, alphanumeric + underscore)
- Password strength rules — minimum 8 chars, 1 uppercase, 1 number
- Notification behavior (leave approvals, task assignments) — in-app only for now, email TBD
- D1 Leave Calendar full design — use a simple calendar grid in Phase 5
- Department Manager exact department scope — DM sees only their own department_id
- Attendance grace period / overtime rules — not calculated for now, status set manually or by clock-in time
- Employee Delete Account — hidden until authorization behavior is confirmed
- Organization-wide System Manager / HR Admin panel — out of scope for this deliverable

---

*All 17 employee screens and 5 DM screens are in scope. Implementation follows Phases 1–9 above.*
