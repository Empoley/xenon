'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Search,
  LayoutGrid,
  Bell,
  CheckSquare,
  BadgeCheck,
  User,
  LogOut,
  Coins,
  Activity,
  CalendarClock,
  Video,
  Plus,
  PlusCircle,
  X,
  FileText,
  Calendar,
  Users,
  Folder,
  Check
} from 'lucide-react';
import XenonLogo from '@/components/ui/XenonLogo';
import { getCurrentUser, setCurrentUser } from '@/lib/demoData';
import { createClient } from '@/lib/supabase/client';

interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
}

interface ActivityItem {
  id: string;
  time_str: string;
  activity: string;
}

interface ReminderItem {
  id: string;
  title: string;
  time_str: string;
  meeting_link?: string;
}

interface SavingsItem {
  current_amount: number;
  target_amount: number;
}

export default function EmployeeDashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [currentUserData, setCurrentUserData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');

  // Active modular panels list (synced with Supabase)
  const [activePanels, setActivePanels] = useState<string[]>([
    'self-tasks',
    'week-savings',
    'activity-log',
    'reminders',
  ]);

  // Supabase-backed widget states
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [reminder, setReminder] = useState<ReminderItem>({
    id: 'default',
    title: 'Meeting with Team 2',
    time_str: 'May 12, 3:00 PM',
  });
  const [savings, setSavings] = useState<SavingsItem>({
    current_amount: 1024,
    target_amount: 1200,
  });
  const [notes, setNotes] = useState('Finalize Q4 performance report and submit footage.');

  // Load live data from Supabase
  useEffect(() => {
    async function loadDashboardData() {
      try {
        // 1. Get current logged in user or query default from Supabase users
        const localUser = getCurrentUser();
        let activeEmpId = localUser?.employee_id || 'EMP-001';

        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('employee_id', activeEmpId)
          .single();

        if (userData) {
          setCurrentUserData(userData);
        } else {
          setCurrentUserData({
            full_name: 'Jonh Paul Feliciano',
            role: 'EMPLOYEE',
            employee_id: 'EMP-001',
          });
        }

        // 2. Fetch Tasks from Supabase
        const { data: tasksData } = await supabase
          .from('dashboard_self_tasks')
          .select('*')
          .order('created_at', { ascending: true });

        if (tasksData && tasksData.length > 0) {
          setTasks(
            tasksData.map((t) => ({
              id: t.id,
              text: t.text,
              completed: t.completed,
            }))
          );
        } else {
          setTasks([
            { id: '1', text: 'Report Due Monday', completed: false },
            { id: '2', text: 'Meeting On Friday', completed: false },
          ]);
        }

        // 3. Fetch Activity Logs from Supabase
        const { data: actData } = await supabase
          .from('dashboard_activity_logs')
          .select('*')
          .order('created_at', { ascending: false });

        if (actData && actData.length > 0) {
          setActivities(actData);
        } else {
          setActivities([
            { id: '1', time_str: '10:00 PM', activity: 'Edited Files' },
            { id: '2', time_str: '5:00 PM', activity: 'Submitted Demonstration Footage' },
            { id: '3', time_str: '3:00 PM', activity: 'Compiled Pending Fees' },
          ]);
        }

        // 4. Fetch Reminders from Supabase
        const { data: remData } = await supabase
          .from('dashboard_reminders')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (remData) {
          setReminder(remData);
        }

        // 5. Fetch Savings from Supabase
        const { data: savData } = await supabase
          .from('dashboard_savings')
          .select('*')
          .limit(1)
          .single();

        if (savData) {
          setSavings({
            current_amount: savData.current_amount,
            target_amount: savData.target_amount,
          });
        }

        // 6. Fetch Panels configuration from Supabase
        const { data: configData } = await supabase
          .from('dashboard_panels_config')
          .select('*')
          .limit(1)
          .single();

        if (configData) {
          if (Array.isArray(configData.active_panels)) {
            setActivePanels(configData.active_panels);
          }
          if (configData.notes_content) {
            setNotes(configData.notes_content);
          }
        }
      } catch (err) {
        console.error('Error fetching data from Supabase:', err);
      }
    }

    loadDashboardData();
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
    router.push('/login');
  };

  // Toggle task completed state in Supabase
  const toggleTask = async (id: string) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);

    const target = updated.find((t) => t.id === id);
    if (target) {
      try {
        await supabase
          .from('dashboard_self_tasks')
          .update({ completed: target.completed })
          .eq('id', id);
      } catch (e) {
        console.error('Error updating task in Supabase:', e);
      }
    }
  };

  // Add new task to Supabase
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newText = newTaskText.trim();
    setNewTaskText('');
    setIsAddingTask(false);

    try {
      const { data, error } = await supabase
        .from('dashboard_self_tasks')
        .insert({
          employee_id: currentUserData?.employee_id || 'ALL',
          text: newText,
          completed: false,
        })
        .select()
        .single();

      if (data) {
        setTasks((prev) => [
          ...prev,
          { id: data.id, text: data.text, completed: data.completed },
        ]);
      } else {
        setTasks((prev) => [
          ...prev,
          { id: String(Date.now()), text: newText, completed: false },
        ]);
      }
    } catch (e) {
      console.error('Error adding task to Supabase:', e);
    }
  };

  // Save Panels configuration to Supabase
  const savePanelsToDb = async (newPanels: string[], updatedNotes = notes) => {
    try {
      await supabase.from('dashboard_panels_config').upsert({
        employee_id: 'ALL',
        active_panels: newPanels,
        notes_content: updatedNotes,
        updated_at: new Date().toISOString(),
      });
    } catch (e) {
      console.error('Error saving panels to Supabase:', e);
    }
  };

  const removePanel = (panelId: string) => {
    const updated = activePanels.filter((p) => p !== panelId);
    setActivePanels(updated);
    savePanelsToDb(updated);
  };

  const addPanel = (panelId: string) => {
    if (!activePanels.includes(panelId)) {
      const updated = [...activePanels, panelId];
      setActivePanels(updated);
      savePanelsToDb(updated);
    }
    setIsAddModalOpen(false);
  };

  const handleNotesChange = (val: string) => {
    setNotes(val);
    savePanelsToDb(activePanels, val);
  };

  const navItems = [
    { label: 'Dashboard', icon: LayoutGrid, href: '/dashboard' },
    { label: 'Announcements', icon: Bell, href: '/dashboard' },
    { label: 'Tasks', icon: CheckSquare, href: '/dashboard' },
    { label: 'Attendance', icon: BadgeCheck, href: '/dashboard' },
    { label: 'Profile', icon: User, href: '/dashboard' },
    { label: 'Leave Request', icon: LogOut, href: '/dashboard' },
  ];

  const panelOptions = [
    {
      id: 'notes',
      title: 'Notes',
      desc: 'Write down quick notes and ideas.',
      iconBg: '#EAB308',
      iconColor: '#FFFFFF',
      icon: FileText,
    },
    {
      id: 'upcoming-events',
      title: 'Upcoming Events',
      desc: 'View your upcoming events and deadlines.',
      iconBg: '#A855F7',
      iconColor: '#FFFFFF',
      icon: Calendar,
    },
    {
      id: 'team-updates',
      title: 'Team Updates',
      desc: 'See the latest updates from your team.',
      iconBg: '#EF4444',
      iconColor: '#FFFFFF',
      icon: Users,
    },
    {
      id: 'documents',
      title: 'Documents',
      desc: "Access all previous documents you've uploaded",
      iconBg: '#0284C7',
      iconColor: '#FFFFFF',
      icon: Folder,
    },
  ];

  // Calculate donut sweep angle
  const savingPercentage = Math.min(
    100,
    Math.round((savings.current_amount / savings.target_amount) * 100)
  );
  const circumference = 226.2;
  const strokeOffset = circumference - (circumference * savingPercentage) / 100;

  return (
    <div className="xenon-dashboard-shell">
      {/* ================= LEFT SIDEBAR (Dusty Rose Palette) ================= */}
      <aside className="xenon-dash-sidebar">
        {/* Brand Header with Divider */}
        <div className="xenon-dash-sidebar-header">
          <Link href="/dashboard" aria-label="Xenon Dashboard">
            <XenonLogo size="md" />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="xenon-dash-search">
          <Search size={16} className="xenon-dash-search-icon" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Navigation Buttons */}
        <nav className="xenon-dash-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.label;
            return (
              <button
                key={item.label}
                type="button"
                className={`xenon-dash-nav-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveNav(item.label)}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="xenon-dash-user">
          <div className="xenon-dash-user-row">
            <Image
              src="/avatar.jpg"
              alt="User Avatar"
              width={44}
              height={44}
              className="xenon-dash-avatar"
            />
            <div>
              <div className="xenon-dash-user-name">
                {currentUserData?.full_name || 'Jonh Paul Feliciano'}
              </div>
              <div className="xenon-dash-user-role">
                {currentUserData?.role
                  ? currentUserData.role.charAt(0).toUpperCase() +
                    currentUserData.role.slice(1).toLowerCase()
                  : 'Employee'}
              </div>
            </div>
          </div>
          <button type="button" className="xenon-dash-logout" onClick={handleLogout}>
            <LogOut size={15} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN DASHBOARD CANVAS ================= */}
      <main className="xenon-dash-canvas">
        <div className="xenon-dash-grid">
          {/* Panel 1: Self Tasks */}
          {activePanels.includes('self-tasks') && (
            <div className="xenon-panel panel-self-tasks animate-fade-in">
              <button
                type="button"
                className="xenon-panel-remove-btn"
                title="Remove Panel"
                onClick={() => removePanel('self-tasks')}
              >
                <X size={14} />
              </button>

              <div className="xenon-panel-title">
                <CheckSquare size={20} />
                <span>Self Tasks</span>
              </div>

              <div className="tasks-pill-list">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="task-pill-item"
                    onClick={() => toggleTask(task.id)}
                  >
                    <div
                      className={`task-checkbox-box ${
                        task.completed ? 'checked' : ''
                      }`}
                    >
                      {task.completed && <Check size={14} strokeWidth={3} />}
                    </div>
                    <span
                      style={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        opacity: task.completed ? 0.6 : 1,
                      }}
                    >
                      {task.text}
                    </span>
                  </div>
                ))}

                {isAddingTask && (
                  <form onSubmit={handleAddTask} style={{ marginTop: 4 }}>
                    <input
                      type="text"
                      autoFocus
                      placeholder="Enter new task..."
                      value={newTaskText}
                      onChange={(e) => setNewTaskText(e.target.value)}
                      onBlur={() => {
                        if (!newTaskText.trim()) setIsAddingTask(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 16px',
                        borderRadius: '12px',
                        border: '2px solid #27272A',
                        background: '#FFFFFF',
                        fontSize: '0.95rem',
                        outline: 'none',
                      }}
                    />
                  </form>
                )}
              </div>

              {!isAddingTask && (
                <button
                  type="button"
                  className="task-add-btn"
                  onClick={() => setIsAddingTask(true)}
                >
                  <Plus size={15} strokeWidth={2.5} />
                  <span>Add Task</span>
                </button>
              )}
            </div>
          )}

          {/* Panel 2: Total Week Saving */}
          {activePanels.includes('week-savings') && (
            <div className="xenon-panel panel-week-savings animate-fade-in">
              <button
                type="button"
                className="xenon-panel-remove-btn"
                title="Remove Panel"
                onClick={() => removePanel('week-savings')}
              >
                <X size={14} />
              </button>

              <div className="xenon-panel-title">
                <Coins size={20} />
                <span>Total Week Saving</span>
              </div>

              <div className="savings-content">
                {/* SVG Radial Donut Chart */}
                <div className="savings-donut-chart">
                  <svg
                    viewBox="0 0 100 100"
                    width="100%"
                    height="100%"
                    style={{ transform: 'rotate(-90deg)' }}
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="36"
                      fill="#728F9F"
                      opacity="0.4"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="36"
                      fill="none"
                      stroke="#7D99A9"
                      strokeWidth="18"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="36"
                      fill="none"
                      stroke="#273238"
                      strokeWidth="18"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeOffset}
                      strokeLinecap="butt"
                    />
                    <circle cx="50" cy="50" r="27" fill="#8FA8B5" />
                  </svg>
                </div>

                <div className="savings-stat-number">
                  {savings.current_amount}/{savings.target_amount}
                </div>
              </div>
            </div>
          )}

          {/* Panel 3: Activity Log (Full Width) */}
          {activePanels.includes('activity-log') && (
            <div className="xenon-panel panel-activity-log animate-fade-in">
              <button
                type="button"
                className="xenon-panel-remove-btn"
                title="Remove Panel"
                onClick={() => removePanel('activity-log')}
              >
                <X size={14} />
              </button>

              <div className="xenon-panel-title">
                <Activity size={22} />
                <span>Activity Log</span>
              </div>

              <div className="activity-rows-list">
                {activities.map((act) => (
                  <div key={act.id} className="activity-row-pill">
                    <div className="activity-time-segment">{act.time_str}</div>
                    <div className="activity-desc-segment">{act.activity}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Panel 4: Reminders */}
          {activePanels.includes('reminders') && (
            <div className="xenon-panel panel-reminders animate-fade-in">
              <button
                type="button"
                className="xenon-panel-remove-btn"
                title="Remove Panel"
                onClick={() => removePanel('reminders')}
              >
                <X size={14} />
              </button>

              <div className="xenon-panel-title">
                <CalendarClock size={20} />
                <span>Reminders</span>
              </div>

              <div className="reminders-body">
                <div className="reminders-title">{reminder.title}</div>
                <div className="reminders-time">{reminder.time_str}</div>
                <button
                  type="button"
                  className="meeting-pill-btn"
                  onClick={() => {
                    if (reminder.meeting_link) {
                      window.open(reminder.meeting_link, '_blank');
                    } else {
                      alert('Launching meeting room...');
                    }
                  }}
                >
                  <Video size={16} />
                  <span>Join Meeting</span>
                </button>
              </div>
            </div>
          )}

          {/* Dynamic Panel: Notes */}
          {activePanels.includes('notes') && (
            <div className="xenon-panel panel-notes animate-fade-in">
              <button
                type="button"
                className="xenon-panel-remove-btn"
                title="Remove Panel"
                onClick={() => removePanel('notes')}
              >
                <X size={14} />
              </button>
              <div className="xenon-panel-title">
                <FileText size={20} />
                <span>Notes</span>
              </div>
              <textarea
                value={notes}
                onChange={(e) => handleNotesChange(e.target.value)}
                placeholder="Write your quick notes here..."
                style={{
                  width: '100%',
                  flex: 1,
                  borderRadius: '12px',
                  background: '#D9DEC9',
                  border: 'none',
                  padding: '12px 14px',
                  color: '#252B1E',
                  fontSize: '0.92rem',
                  fontFamily: 'inherit',
                  resize: 'none',
                  outline: 'none',
                }}
              />
            </div>
          )}

          {/* Dynamic Panel: Upcoming Events */}
          {activePanels.includes('upcoming-events') && (
            <div className="xenon-panel panel-upcoming-events animate-fade-in">
              <button
                type="button"
                className="xenon-panel-remove-btn"
                title="Remove Panel"
                onClick={() => removePanel('upcoming-events')}
              >
                <X size={14} />
              </button>
              <div className="xenon-panel-title">
                <Calendar size={20} />
                <span>Upcoming Events</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div
                  style={{
                    background: '#E2DAEE',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    color: '#281E38',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                  }}
                >
                  May 15 · Q2 Sprint Review
                </div>
                <div
                  style={{
                    background: '#E2DAEE',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    color: '#281E38',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                  }}
                >
                  May 20 · Department Townhall
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Panel: Team Updates */}
          {activePanels.includes('team-updates') && (
            <div className="xenon-panel panel-team-updates animate-fade-in">
              <button
                type="button"
                className="xenon-panel-remove-btn"
                title="Remove Panel"
                onClick={() => removePanel('team-updates')}
              >
                <X size={14} />
              </button>
              <div className="xenon-panel-title">
                <Users size={20} />
                <span>Team Updates</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div
                  style={{
                    background: '#E8D2D2',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    color: '#3A1E1E',
                    fontSize: '0.88rem',
                  }}
                >
                  <strong>Alex Rivera</strong> clocked in at 8:54 AM
                </div>
                <div
                  style={{
                    background: '#E8D2D2',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    color: '#3A1E1E',
                    fontSize: '0.88rem',
                  }}
                >
                  <strong>Sarah Jenkins</strong> approved 3 task tickets
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Panel: Documents */}
          {activePanels.includes('documents') && (
            <div className="xenon-panel panel-documents animate-fade-in">
              <button
                type="button"
                className="xenon-panel-remove-btn"
                title="Remove Panel"
                onClick={() => removePanel('documents')}
              >
                <X size={14} />
              </button>
              <div className="xenon-panel-title">
                <Folder size={20} />
                <span>Documents</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div
                  style={{
                    background: '#CFDFE8',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    color: '#1A3340',
                    fontSize: '0.88rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <Folder size={16} /> Employee_Handbook_2026.pdf
                </div>
                <div
                  style={{
                    background: '#CFDFE8',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    color: '#1A3340',
                    fontSize: '0.88rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <Folder size={16} /> Attendance_Policy_v2.docx
                </div>
              </div>
            </div>
          )}

          {/* Add Panel (+) Card */}
          <div
            className="panel-add-card animate-fade-in"
            onClick={() => setIsAddModalOpen(true)}
            role="button"
            tabIndex={0}
            title="Click to add a panel"
          >
            <Plus size={52} strokeWidth={2.8} className="panel-add-icon" />
          </div>
        </div>

        {/* Tip Banner at Bottom */}
        <div className="xenon-dash-tip">
          Tip: To remove panels, hover over the panels and click the X button.
          <br />
          To add more panels, click the + button and choose from selection.
        </div>
      </main>

      {/* ================= ADD NEW PANEL MODAL (matches Dashboard - prompted.png) ================= */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div
            className="add-panel-modal-card animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#71717A',
              }}
            >
              <X size={20} />
            </button>

            <div className="add-panel-header">
              <PlusCircle size={22} />
              <span>Add New Panel</span>
            </div>
            <div className="add-panel-subtitle">
              Choose a panel to add to your Dashboard
            </div>

            <div className="add-panel-options-list">
              {panelOptions.map((opt) => {
                const Icon = opt.icon;
                const isAlreadyAdded = activePanels.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className="add-panel-option-btn"
                    onClick={() => addPanel(opt.id)}
                    style={{
                      opacity: isAlreadyAdded ? 0.6 : 1,
                    }}
                  >
                    <div
                      className="add-panel-option-icon"
                      style={{ background: opt.iconBg, color: opt.iconColor }}
                    >
                      <Icon size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="add-panel-option-title">{opt.title}</div>
                      <div className="add-panel-option-desc">{opt.desc}</div>
                    </div>
                    {isAlreadyAdded && (
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: '#16A34A',
                        }}
                      >
                        Added
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
