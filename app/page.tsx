'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import { Card, CardHeader } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { UserRole } from '@/types';
import {
  Clock,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Megaphone,
  Briefcase,
  Users,
  Database,
  Layers,
  ArrowRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';

export default function Home() {
  const [role, setRole] = useState<UserRole>('employee');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [clockedIn, setClockedIn] = useState(false);
  const [clockTime, setClockTime] = useState<string | null>(null);

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
      {/* Universal Fixed Sidebar */}
      <Sidebar
        role={role}
        userName={role === 'manager' ? 'Sarah Jenkins' : 'Alex Rivera'}
        userRoleLabel={role === 'manager' ? 'Engineering Lead / Manager' : 'Senior Frontend Engineer'}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="main-content">
        <TopBar
          title={role === 'manager' ? 'Department Manager Hub' : 'Employee Workspace'}
          subtitle={`Logged in as ${role === 'manager' ? 'Department Manager' : 'Employee'} — Department of Engineering`}
          role={role}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onRoleToggle={(newRole) => setRole(newRole)}
        />

        <main className="page-body animate-fade-in">
          {/* Phase 1 Status Banner */}
          <div style={{
            background: 'var(--primary-light)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px 24px',
            marginBottom: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-gradient)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.35)'
              }}>
                <Layers size={22} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    Phase 1 Foundation Live
                  </h2>
                  <Badge variant="success">Ready for Phase 2</Badge>
                </div>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  Design system active, PostgreSQL schema prepared in <code style={{ color: 'var(--primary)', fontWeight: 600 }}>supabase/schema.sql</code>, Phase 2 Auth screens ready!
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <a
                href="/login"
                className="btn btn-primary"
                style={{ fontSize: '0.8rem', padding: '6px 14px' }}
              >
                Launch Sign In
              </a>
              <a
                href="/activate"
                className="btn btn-secondary"
                style={{ fontSize: '0.8rem', padding: '6px 14px' }}
              >
                Launch Activate
              </a>
              <a
                href="/first-login"
                className="btn btn-secondary"
                style={{ fontSize: '0.8rem', padding: '6px 14px' }}
              >
                Launch Update Details
              </a>
            </div>
          </div>

          {/* Conditional Role Views */}
          {role === 'employee' ? (
            <div>
              {/* Employee Quick KPI cards */}
              <div className="kpi-grid">
                <div className="kpi-card">
                  <div>
                    <div className="kpi-title">Today's Attendance</div>
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
                    <div className="kpi-title">Assigned Tasks</div>
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
                      PTO Available this Year
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
                    <div className="kpi-title">Company Broadcasts</div>
                    <div className="kpi-val">2 New</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                      Latest: Town Hall Meeting
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

              {/* Employee Content Section */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
                <Card>
                  <CardHeader
                    title="Assigned Tasks (Preview)"
                    subtitle="Tasks currently assigned to you"
                    action={<Badge variant="info">3 Active</Badge>}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{
                      padding: 14,
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-main)' }}>
                          Finalize Sprint 42 API Contracts
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
                          Due Tomorrow • Engineering
                        </div>
                      </div>
                      <Badge variant="warning">Pending</Badge>
                    </div>

                    <div style={{
                      padding: 14,
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-main)' }}>
                          Update Profile Picture & Contact Info
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
                          Due in 3 days • Onboarding
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
                    padding: 24,
                    borderRadius: 'var(--radius-md)',
                    border: '1px dashed var(--border-color)',
                    textAlign: 'center',
                    color: 'var(--text-muted)'
                  }}>
                    <TrendingUp size={32} style={{ margin: '0 auto 10px', color: 'var(--primary)' }} />
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      Weekly Progress & Savings Component
                    </div>
                    <p style={{ fontSize: '0.8rem', marginTop: 4 }}>
                      Preserved per the documentation specifications. Ready to be populated in upcoming phases.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          ) : (
            <div>
              {/* Manager Quick KPI Cards */}
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
                    <div className="kpi-title">Pending Leave Approvals</div>
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
                    <div className="kpi-title">Published Announcements</div>
                    <div className="kpi-val">6</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                      D4 Feed & Broadcasts
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

              {/* Manager Quick Overview */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
                <Card>
                  <CardHeader
                    title="D1 Attendance Roster Preview"
                    subtitle="Real-time check-in log for your department"
                    action={<Badge variant="success">All Shifts Active</Badge>}
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
                    title="D5 Leave Approvals Queue Preview"
                    subtitle="Recent requests awaiting manager review"
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
                      <Badge variant="warning">Review</Badge>
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
                      <Badge variant="warning">Review</Badge>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Phase 1 Verification Checklist */}
          <div style={{ marginTop: 32 }}>
            <Card>
              <CardHeader
                title="Phase 1 Foundation Deliverables"
                subtitle="Verification checklist completed for Phase 1"
              />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--success)', marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Dependencies Installed</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>@supabase/supabase-js, @supabase/ssr, lucide-react</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--success)', marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Supabase Clients Configured</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>lib/supabase/client.ts & lib/supabase/server.ts</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--success)', marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>PostgreSQL Schema Ready</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>13 tables + seed in supabase/schema.sql</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--success)', marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Design System Tokens & Theme</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Light/dark mode, cards, badges, buttons, inputs</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--success)', marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Role-Based Layout Shell</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sidebar, TopBar, and responsive drawer</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--success)', marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Route Middleware Ready</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Role guards and auth pass-through configured</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
