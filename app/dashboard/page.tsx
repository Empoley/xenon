'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import { Card, CardHeader } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { getCurrentUser } from '@/lib/demoData';
import { Clock, Calendar, Briefcase, Megaphone, CheckCircle2, TrendingUp } from 'lucide-react';

export default function EmployeeDashboardPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [clockedIn, setClockedIn] = useState(false);
  const [clockTime, setClockTime] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser({
        full_name: 'Alex Rivera',
        role: 'employee',
        employee_id: 'EMP-002',
      });
    }
  }, []);

  const handleClockToggle = () => {
    if (!clockedIn) {
      const now = new Date();
      setClockTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setClockedIn(true);
    } else {
      setClockedIn(false);
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        role="employee"
        userName={currentUser?.full_name || 'Alex Rivera'}
        userRoleLabel={currentUser?.employee_id ? `ID: ${currentUser.employee_id} • Employee` : 'Staff Employee'}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-content">
        <TopBar
          title="Employee Dashboard"
          subtitle={`Welcome back, ${currentUser?.full_name || 'Alex'}!`}
          role="employee"
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="page-body animate-fade-in">
          {/* Top KPI Grid */}
          <div className="kpi-grid">
            <div className="kpi-card">
              <div>
                <div className="kpi-title">Today&apos;s Attendance</div>
                <div className="kpi-val" style={{ fontSize: '1.35rem', marginTop: 4 }}>
                  {clockedIn ? 'Clocked In' : 'Not Clocked In'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  {clockedIn ? `In at ${clockTime}` : 'Shift starts at 9:00 AM'}
                </div>
              </div>
              <Button
                variant={clockedIn ? 'danger' : 'primary'}
                size="sm"
                onClick={handleClockToggle}
                leftIcon={<Clock size={15} />}
              >
                {clockedIn ? 'Clock Out' : 'Clock In'}
              </Button>
            </div>

            <div className="kpi-card">
              <div>
                <div className="kpi-title">My Tasks</div>
                <div className="kpi-val">4</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  2 Pending • 1 Under Review
                </div>
              </div>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Briefcase size={22} />
              </div>
            </div>

            <div className="kpi-card">
              <div>
                <div className="kpi-title">Leave Balance</div>
                <div className="kpi-val">14 <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>days</span></div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  Vacation & Sick Leave
                </div>
              </div>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-md)',
                background: 'var(--success-bg)',
                color: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Calendar size={22} />
              </div>
            </div>

            <div className="kpi-card">
              <div>
                <div className="kpi-title">Broadcasts</div>
                <div className="kpi-val">2 New</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  Latest: Q4 All Hands
                </div>
              </div>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-md)',
                background: 'var(--info-bg)',
                color: 'var(--info)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Megaphone size={22} />
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
            <Card>
              <CardHeader
                title="Assigned Tasks"
                subtitle="High priority items for this week"
                action={<Badge variant="info">3 Active</Badge>}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{
                  padding: 14,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      Review Employee Self-Service Specs
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      Due Today • Engineering
                    </div>
                  </div>
                  <Badge variant="warning">Pending</Badge>
                </div>

                <div style={{
                  padding: 14,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                      Submit Q4 Leave Calendar Preferences
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      Due in 2 days • HR
                    </div>
                  </div>
                  <Badge variant="info">In Review</Badge>
                </div>
              </div>
            </Card>

            <Card>
              <CardHeader
                title="Weekly Progress (Placeholder)"
                subtitle="Tracked weekly metric per specifications"
              />
              <div style={{
                padding: 28,
                borderRadius: 'var(--radius-md)',
                border: '1px dashed var(--border-color)',
                textAlign: 'center',
                color: 'var(--text-muted)'
              }}>
                <TrendingUp size={36} style={{ margin: '0 auto 12px', color: 'var(--primary)' }} />
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                  Total Weekly Progress & Savings
                </div>
                <p style={{ fontSize: '0.8rem', marginTop: 4 }}>
                  Preserved per EMS documentation requirements. Ready to be populated in upcoming phases.
                </p>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
