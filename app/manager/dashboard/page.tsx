'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import { Card, CardHeader } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { getCurrentUser } from '@/lib/demoData';
import { Users, AlertCircle, Briefcase, Megaphone, CheckCircle2 } from 'lucide-react';

export default function ManagerDashboardPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser({
        full_name: 'Sarah Jenkins',
        role: 'manager',
        employee_id: 'MGR-001',
      });
    }
  }, []);

  return (
    <div className="app-container">
      <Sidebar
        role="manager"
        userName={currentUser?.full_name || 'Sarah Jenkins'}
        userRoleLabel={currentUser?.employee_id ? `ID: ${currentUser.employee_id} • Dept Manager` : 'Department Manager'}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-content">
        <TopBar
          title="Department Manager Dashboard"
          subtitle={`Department of Engineering • Welcome back, ${currentUser?.full_name || 'Sarah'}!`}
          role="manager"
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="page-body animate-fade-in">
          {/* Manager KPI Grid */}
          <div className="kpi-grid">
            <div className="kpi-card">
              <div>
                <div className="kpi-title">Team Attendance Today</div>
                <div className="kpi-val">94%</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  16 of 17 Present (1 Remote)
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
                <Users size={22} />
              </div>
            </div>

            <div className="kpi-card">
              <div>
                <div className="kpi-title">Pending Leave Requests</div>
                <div className="kpi-val">3</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  D5 Queue Needs Review
                </div>
              </div>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-md)',
                background: 'var(--warning-bg)',
                color: 'var(--warning)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <AlertCircle size={22} />
              </div>
            </div>

            <div className="kpi-card">
              <div>
                <div className="kpi-title">Department Tasks</div>
                <div className="kpi-val">28</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  D2 Project Task Board
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
                <div className="kpi-title">Active Broadcasts</div>
                <div className="kpi-val">6</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  D4 Department Feeds
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

          {/* Quick Roster & Queue Overview */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
            <Card>
              <CardHeader
                title="D1 Team Attendance Roster"
                subtitle="Live status of team members"
                action={<Badge variant="success">All Active</Badge>}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{
                  padding: 12,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Marcus Chen</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>EMP-102 • Check-in: 08:52 AM</div>
                  </div>
                  <Badge variant="success">On Time</Badge>
                </div>

                <div style={{
                  padding: 12,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Elena Rostova</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>EMP-105 • Remote Work</div>
                  </div>
                  <Badge variant="info">Remote (WFH)</Badge>
                </div>
              </div>
            </Card>

            <Card>
              <CardHeader
                title="D5 Leave Approvals Queue"
                subtitle="Pending requests from your department"
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{
                  padding: 12,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>David Kim — Sick Leave</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Oct 8 - Oct 9 (2 days)</div>
                  </div>
                  <Badge variant="warning">Pending</Badge>
                </div>

                <div style={{
                  padding: 12,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Maria Santos — Vacation</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Oct 20 - Oct 24 (5 days)</div>
                  </div>
                  <Badge variant="warning">Pending</Badge>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
