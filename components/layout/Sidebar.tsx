'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Megaphone,
  CheckSquare,
  Clock,
  CalendarCheck,
  User,
  Users,
  Settings,
  LogOut,
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { UserRole } from '@/types';

interface SidebarProps {
  role?: UserRole;
  userName?: string;
  userRoleLabel?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({
  role = 'employee',
  userName = 'Alex Rivera',
  userRoleLabel = 'Staff Employee',
  isOpen = false,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  const employeeNav = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Announcements', href: '/announcements', icon: Megaphone },
    { label: 'My Tasks', href: '/tasks', icon: CheckSquare },
    { label: 'Attendance', href: '/attendance', icon: Clock },
    { label: 'Leave Requests', href: '/leave', icon: CalendarCheck },
    { label: 'My Profile', href: '/profile', icon: User },
  ];

  const managerNav = [
    { label: 'DM Dashboard', href: '/manager/dashboard', icon: LayoutDashboard },
    { label: 'Attendance Roster', href: '/manager/attendance', icon: Clock },
    { label: 'Task Board', href: '/manager/tasks', icon: Briefcase },
    { label: 'Leave Queue', href: '/manager/leave', icon: CalendarCheck },
    { label: 'Announcements', href: '/manager/announcements', icon: Megaphone },
    { label: 'Team Members', href: '/manager/employees', icon: Users },
  ];

  const navItems = role === 'manager' ? managerNav : employeeNav;

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Brand Header */}
      <div style={{
        padding: '24px 24px 20px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 'var(--radius-md)',
            background: 'var(--primary-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)'
          }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
              EMS Portal
            </div>
            <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              {role === 'manager' ? 'Department Manager' : 'Employee Workspace'}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ padding: '16px 12px', flex: 1, overflowY: 'auto' }}>
        <div style={{
          fontSize: '0.675rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--text-subtle)',
          padding: '8px 12px 10px'
        }}>
          Main Menu
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && item.href !== '/manager/dashboard' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  background: isActive ? 'var(--primary-gradient)' : 'transparent',
                  boxShadow: isActive ? '0 4px 12px rgba(99, 102, 241, 0.28)' : 'none',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <Icon size={18} style={{ opacity: isActive ? 1 : 0.8 }} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Info & Footer */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid var(--border-color)',
        background: 'var(--bg-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, overflow: 'hidden' }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            fontWeight: 700,
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            {userName.charAt(0)}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{
              fontWeight: 600,
              fontSize: '0.825rem',
              color: 'var(--text-main)',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden'
            }}>
              {userName}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {userRoleLabel}
            </div>
          </div>
        </div>

        <Link
          href="/login"
          title="Sign Out"
          style={{
            padding: 8,
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LogOut size={16} />
        </Link>
      </div>
    </aside>
  );
}
