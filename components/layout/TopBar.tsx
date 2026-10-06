'use client';

import React from 'react';
import { Menu, Bell, Search, Sparkles } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { UserRole } from '@/types';

interface TopBarProps {
  title?: string;
  subtitle?: string;
  role?: UserRole;
  onToggleSidebar?: () => void;
  onRoleToggle?: (role: UserRole) => void;
}

export default function TopBar({
  title = 'Overview',
  subtitle,
  role = 'employee',
  onToggleSidebar,
  onRoleToggle,
}: TopBarProps) {
  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
            className="btn btn-ghost"
            style={{ padding: 8, display: 'flex', alignItems: 'center' }}
          >
            <Menu size={20} />
          </button>
        )}
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-main)', lineHeight: 1.2 }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 2 }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Quick Demo Role Switcher (convenient for testing both employee & manager experiences) */}
        {onRoleToggle && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg-subtle)',
            padding: 3,
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            fontSize: '0.75rem',
            fontWeight: 600,
          }}>
            <button
              onClick={() => onRoleToggle('employee')}
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                background: role === 'employee' ? 'var(--primary-gradient)' : 'transparent',
                color: role === 'employee' ? '#ffffff' : 'var(--text-muted)',
                transition: 'all var(--transition-fast)',
              }}
            >
              Employee
            </button>
            <button
              onClick={() => onRoleToggle('manager')}
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                background: role === 'manager' ? 'var(--primary-gradient)' : 'transparent',
                color: role === 'manager' ? '#ffffff' : 'var(--text-muted)',
                transition: 'all var(--transition-fast)',
              }}
            >
              Manager
            </button>
          </div>
        )}

        {/* Notification Bell */}
        <button
          aria-label="Notifications"
          style={{
            width: 38,
            height: 38,
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-main)',
            position: 'relative'
          }}
        >
          <Bell size={18} />
          <span style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: 'var(--danger)',
          }} />
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}
