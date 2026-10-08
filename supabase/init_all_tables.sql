-- ====================================================================
-- XENON EMS: COMPLETE DATABASE SCHEMA & SEED DATA
-- Copy and paste this into your Supabase SQL Editor and click RUN
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Employee Management & Credentials)
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    employee_id TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'EMPLOYEE' CHECK (role IN ('EMPLOYEE', 'MANAGER', 'ADMIN')),
    department TEXT DEFAULT 'Engineering',
    job_title TEXT DEFAULT 'Staff',
    default_username TEXT UNIQUE NOT NULL,
    default_password TEXT NOT NULL,
    current_username TEXT,
    current_password_hash TEXT,
    status TEXT NOT NULL DEFAULT 'pending_activation' CHECK (status IN ('pending_activation', 'active', 'suspended')),
    activation_sent_at TIMESTAMPTZ,
    activated_at TIMESTAMPTZ,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 2. Dashboard: Self Tasks Table
CREATE TABLE IF NOT EXISTS public.dashboard_self_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id TEXT NOT NULL DEFAULT 'ALL',
    text TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Dashboard: Activity Logs Table
CREATE TABLE IF NOT EXISTS public.dashboard_activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id TEXT NOT NULL DEFAULT 'ALL',
    time_str TEXT NOT NULL,
    activity TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Dashboard: Reminders Table
CREATE TABLE IF NOT EXISTS public.dashboard_reminders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id TEXT NOT NULL DEFAULT 'ALL',
    title TEXT NOT NULL,
    time_str TEXT NOT NULL,
    meeting_link TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Dashboard: Weekly Savings Table
CREATE TABLE IF NOT EXISTS public.dashboard_savings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id TEXT NOT NULL DEFAULT 'ALL',
    current_amount INT NOT NULL DEFAULT 1024,
    target_amount INT NOT NULL DEFAULT 1200,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Dashboard: Panels Configuration Table
CREATE TABLE IF NOT EXISTS public.dashboard_panels_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id TEXT NOT NULL UNIQUE DEFAULT 'ALL',
    active_panels JSONB NOT NULL DEFAULT '["self-tasks", "week-savings", "activity-log", "reminders"]'::jsonb,
    notes_content TEXT DEFAULT 'Finalize Q4 performance report and submit footage.',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Allows your web app to read and write data seamlessly
-- ====================================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_self_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_savings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_panels_config ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    DROP POLICY IF EXISTS "Allow all on users" ON public.users;
    CREATE POLICY "Allow all on users" ON public.users FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow all on dashboard_self_tasks" ON public.dashboard_self_tasks;
    CREATE POLICY "Allow all on dashboard_self_tasks" ON public.dashboard_self_tasks FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow all on dashboard_activity_logs" ON public.dashboard_activity_logs;
    CREATE POLICY "Allow all on dashboard_activity_logs" ON public.dashboard_activity_logs FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow all on dashboard_reminders" ON public.dashboard_reminders;
    CREATE POLICY "Allow all on dashboard_reminders" ON public.dashboard_reminders FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow all on dashboard_savings" ON public.dashboard_savings;
    CREATE POLICY "Allow all on dashboard_savings" ON public.dashboard_savings FOR ALL USING (true) WITH CHECK (true);

    DROP POLICY IF EXISTS "Allow all on dashboard_panels_config" ON public.dashboard_panels_config;
    CREATE POLICY "Allow all on dashboard_panels_config" ON public.dashboard_panels_config FOR ALL USING (true) WITH CHECK (true);
END $$;

-- ====================================================================
-- SEED INITIAL DATA
-- ====================================================================

-- 1. Insert Initial Employees (EMP-001, EMP-002, Joshua, Manager)
INSERT INTO public.users (
    id, employee_id, full_name, email, role, department, job_title,
    default_username, default_password, current_username, current_password_hash, status
) VALUES 
(
    'usr_emp_001', 'EMP-001', 'Jonh Paul Feliciano', 'jampol@gmail.com',
    'EMPLOYEE', 'Engineering', 'Software Engineer',
    'jampol', 'Xenon@2026!Emp1', 'jampol', 'Xenon@2026!Emp1', 'pending_activation'
),
(
    'usr_emp_002', 'EMP-002', 'Alex Rivera', 'alex.rivera@xenon.corp',
    'EMPLOYEE', 'Engineering', 'Frontend Developer',
    'arivera', 'Xenon@2026!Emp2', 'arivera', 'Xenon@2026!Emp2', 'pending_activation'
),
(
    'usr_emp_014', 'EMP-2026-014', 'Joshua Lleva', 'Llevajoshua54@gmail.com',
    'EMPLOYEE', 'Engineering', 'Developer',
    'joshua.lleva', 'TempPass2026!#Joshua', 'joshua.lleva', 'TempPass2026!#Joshua', 'active'
),
(
    'usr_mgr_002', 'MGR-2026-002', 'Sarah Jenkins', 'sarah.jenkins@xenon.corp',
    'MANAGER', 'Engineering', 'Engineering Manager',
    'sjenkins', 'TempPass2026!#Manager', 'sjenkins', 'TempPass2026!#Manager', 'pending_activation'
),
(
    'usr_emp_003', 'EMP-003', 'Marcus Chen', 'marcus.chen@xenon.corp',
    'EMPLOYEE', 'Engineering', 'Junior Developer',
    'mchen', 'temp_password_123', 'mchen', 'temp_password_123', 'pending_activation'
),
(
    'usr_emp_004', 'EMP-004', 'Leilani Santos', 'leilani.santos@xenon.corp',
    'EMPLOYEE', 'Engineering', 'UI/UX Designer',
    'lsantos', 'Xenon@4028', 'lsantos', 'Xenon@4028', 'pending_activation'
),
(
    'usr_emp_005', 'EMP-005', 'Ramon Aquino', 'ramon.aquino@xenon.corp',
    'EMPLOYEE', 'Engineering', 'QA Engineer',
    'raquino', 'Xenon@5139', 'raquino', 'Xenon@5139', 'pending_activation'
)
ON CONFLICT (employee_id) DO UPDATE SET
    status = EXCLUDED.status,
    default_username = EXCLUDED.default_username,
    default_password = EXCLUDED.default_password;

-- 2. Insert Initial Tasks
INSERT INTO public.dashboard_self_tasks (employee_id, text, completed)
VALUES 
    ('ALL', 'Report Due Monday', false),
    ('ALL', 'Meeting On Friday', false);

-- 3. Insert Initial Activity Logs
INSERT INTO public.dashboard_activity_logs (employee_id, time_str, activity)
VALUES
    ('ALL', '10:00 PM', 'Edited Files'),
    ('ALL', '5:00 PM', 'Submitted Demonstration Footage'),
    ('ALL', '3:00 PM', 'Compiled Pending Fees');

-- 4. Insert Initial Reminder
INSERT INTO public.dashboard_reminders (employee_id, title, time_str, meeting_link)
VALUES
    ('ALL', 'Meeting with Team 2', 'May 12, 3:00 PM', 'https://meet.google.com');

-- 5. Insert Initial Savings (1024 / 1200)
INSERT INTO public.dashboard_savings (employee_id, current_amount, target_amount)
VALUES
    ('ALL', 1024, 1200);

-- 6. Insert Initial Panels Configuration
INSERT INTO public.dashboard_panels_config (employee_id, active_panels, notes_content)
VALUES
    ('ALL', '["self-tasks", "week-savings", "activity-log", "reminders"]'::jsonb, 'Finalize Q4 performance report and submit footage.')
ON CONFLICT (employee_id) DO UPDATE SET
    active_panels = EXCLUDED.active_panels,
    notes_content = EXCLUDED.notes_content;
