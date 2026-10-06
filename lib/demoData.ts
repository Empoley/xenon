import { Profile } from '@/types';

// Pre-seeded accounts for development, testing, and demo
export interface MockUser extends Profile {
  password: string;
}

export const INITIAL_USERS: MockUser[] = [
  {
    id: 'usr-emp-001',
    employee_id: 'EMP-001',
    username: 'jampol',
    full_name: 'Jampol Dela Cruz',
    email: 'jampol@gmail.com',
    phone: '+63 912 345 6789',
    address: 'Makati City, Metro Manila',
    role: 'employee',
    department_id: 'dept-eng',
    is_first_login: true, // triggers first-time update flow!
    join_date: '2025-01-15',
    is_active: true,
    password: 'password123',
  },
  {
    id: 'usr-emp-002',
    employee_id: 'EMP-002',
    username: 'arivera',
    full_name: 'Alex Rivera',
    email: 'alex.rivera@xenon.corp',
    phone: '+63 917 555 1234',
    address: 'BGC, Taguig City',
    role: 'employee',
    department_id: 'dept-eng',
    is_first_login: false,
    join_date: '2024-06-01',
    is_active: true,
    password: 'password123',
  },
  {
    id: 'usr-mgr-001',
    employee_id: 'MGR-001',
    username: 'sjenkins',
    full_name: 'Sarah Jenkins',
    email: 'sarah.jenkins@xenon.corp',
    phone: '+63 918 888 9999',
    address: 'Ortigas, Pasig City',
    role: 'manager',
    department_id: 'dept-eng',
    is_first_login: false,
    join_date: '2023-03-10',
    is_active: true,
    password: 'password123',
  },
  // Inactive unactivated account to test Account Activation
  {
    id: 'usr-emp-003',
    employee_id: 'EMP-003',
    username: 'mchen',
    full_name: 'Marcus Chen',
    email: 'marcus.chen@xenon.corp',
    role: 'employee',
    department_id: 'dept-eng',
    is_first_login: true,
    join_date: '2026-10-01',
    is_active: false, // inactive until activated!
    password: 'temp_password_123',
  }
];

export function getStoredUsers(): MockUser[] {
  if (typeof window === 'undefined') return INITIAL_USERS;
  const stored = localStorage.getItem('xenon_users');
  if (!stored) {
    localStorage.setItem('xenon_users', JSON.stringify(INITIAL_USERS));
    return INITIAL_USERS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_USERS;
  }
}

export function saveUsers(users: MockUser[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('xenon_users', JSON.stringify(users));
  }
}

export function getCurrentUser(): MockUser | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('xenon_current_user');
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function setCurrentUser(user: MockUser | null) {
  if (typeof window !== 'undefined') {
    if (user) {
      localStorage.setItem('xenon_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('xenon_current_user');
    }
  }
}
