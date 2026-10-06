export type UserRole = 'employee' | 'manager';

export interface Department {
  id: string;
  name: string;
  created_at?: string;
}

export interface Profile {
  id: string; // references auth.users(id)
  employee_id: string; // e.g. EMP-001
  username: string;
  full_name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  avatar_url?: string | null;
  role: UserRole;
  department_id?: string | null;
  department?: Department | null;
  is_first_login: boolean;
  join_date: string;
  is_active: boolean;
}

export type AttendanceStatus = 'on_time' | 'late' | 'absent' | 'remote' | 'on_leave';

export interface AttendanceRecord {
  id: string;
  employee_id: string;
  employee?: Profile | null;
  date: string; // YYYY-MM-DD
  clock_in?: string | null;
  clock_out?: string | null;
  break_minutes: number;
  status: AttendanceStatus;
  adjusted_by?: string | null;
  notes?: string | null;
  total_hours?: number | null;
}

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'for_verification' | 'completed' | 'blocked';

export interface TaskAttachment {
  id: string;
  task_id: string;
  uploaded_by: string;
  file_url: string;
  file_name: string;
  uploaded_at: string;
}

export interface TaskComment {
  id: string;
  task_id: string;
  author_id: string;
  author?: Profile | null;
  body: string;
  created_at: string;
}

export interface Sprint {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  status: 'active' | 'closed';
}

export interface Task {
  id: string;
  title: string;
  subject: string;
  description: string;
  department_id: string;
  department?: Department | null;
  assigned_to: string;
  assignee?: Profile | null;
  created_by: string;
  creator?: Profile | null;
  priority: TaskPriority;
  due_date: string;
  status: TaskStatus;
  sprint_id?: string | null;
  attachments?: TaskAttachment[];
  comments?: TaskComment[];
  created_at?: string;
}

export type AnnouncementPriority = 'low' | 'normal' | 'urgent';
export type AnnouncementStatus = 'draft' | 'scheduled' | 'live' | 'archived';

export interface AnnouncementReaction {
  id: string;
  announcement_id: string;
  employee_id: string;
  reaction: string;
}

export interface AnnouncementComment {
  id: string;
  announcement_id: string;
  author_id: string;
  author?: Profile | null;
  body: string;
  created_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  subject: string;
  body: string;
  author_id: string;
  author?: Profile | null;
  department_id?: string | null;
  department?: Department | null;
  priority: AnnouncementPriority;
  status: AnnouncementStatus;
  publish_at?: string | null;
  is_pinned: boolean;
  reactions?: AnnouncementReaction[];
  comments?: AnnouncementComment[];
  created_at?: string;
}

export type LeaveType = 'sick' | 'vacation' | 'emergency' | 'maternity_paternity';
export type LeaveStatus = 'draft' | 'pending' | 'approved' | 'rejected';

export interface LeaveAttachment {
  id: string;
  leave_request_id: string;
  file_url: string;
  file_name: string;
}

export interface LeaveRequest {
  id: string;
  employee_id: string;
  employee?: Profile | null;
  leave_type: LeaveType;
  start_date: string;
  end_date: string;
  total_days: number;
  reason: string;
  status: LeaveStatus;
  reviewer_id?: string | null;
  reviewer?: Profile | null;
  reviewer_note?: string | null;
  decided_at?: string | null;
  coverage_flag?: boolean;
  overlap_flag?: boolean;
  attachments?: LeaveAttachment[];
  created_at?: string;
}

export interface DashboardPanelConfig {
  id: string;
  type: 'notes' | 'events' | 'team_updates' | 'documents';
  title: string;
  content?: string;
}

export interface ActivityLogItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'attendance' | 'task' | 'leave' | 'document';
}

export interface ReminderItem {
  id: string;
  title: string;
  time: string;
  date: string;
  type: 'meeting' | 'deadline' | 'general';
}
