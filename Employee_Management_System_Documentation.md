# Employee Management System: Documentation

**Scope:** Combined Employee and Department Manager documentation based on the provided EMS User Manual, implementation draft, and template structure.

**Purpose:** Implementation and user-reference document covering the documented employee workflows and the Department Manager workflows.

**Prepared By:** Keith Wency Bundoc | **Version:** 1.0

---

## 1. Overview

The Employee Management System (EMS) is a web-based platform that provides employees with a centralized workspace for attendance, tasks, announcements, leave requests, and personal account information. The Department Manager side extends the system so managers can oversee department employees, monitor attendance, manage tasks, handle leave approvals, and publish announcements.

The two sides use the same general layout shell, while the available navigation and actions depend on the user's role. This document separates the Employee side and Department Manager side while also showing how their workflows connect.

### System Features — Employee

These items are preserved from the provided manual:

- Activate account using Employee ID and company email
- Log in - The default password will be sent to the email
- Change default password and username on first login
- View and update personal profile
- View attendance records
- View assigned tasks
- Update task status
- View announcements
- Can create leave request
- View leave request status
- Change password

### Department Manager Responsibilities

- Oversee employees in the manager's department.
- Monitor employee attendance and inspect individual attendance information.
- Create and assign tasks to employees and track task status.
- Create, publish, or schedule announcements for the appropriate audience.
- Review, approve, or reject employee leave requests.
- Perform documented attendance adjustments and export attendance information where permitted.

---

## 2. System Layout and Roles

The Employee side uses a sidebar, top bar, and content area. Its documented navigation includes Dashboard, Announcements, Tasks, Attendance, Profile, and Leave Request. The Department Manager side uses the same general layout shell but has a different navigation set: Dashboard, Employees, Attendance, Tasks, Leave Approvals, Announcements, Settings, and Logout.

| Role | Primary scope | Main capabilities |
|---|---|---|
| Employee | Own information and assigned work | Profile, attendance history, tasks, announcements, leave requests, account access |
| Department Manager | Employees within the department | Attendance roster, task management, announcements, leave approvals |
| System Manager / HR | Organization-wide scope (implied) | Employee creation and organization-wide data; not designed in the supplied DM screens |

> **Source note:** Some role and behavior details remain marked as items to confirm in the supplied material. This document does not silently resolve those items.

---

## 3. Employee Side

### Employee Screen Inventory

| # | Screen | Purpose |
|---|---|---|
| 1 | Activate Account | First-time account activation |
| 2 | First-Time Account Update | Replace default username and password |
| 3 | Login | Authenticate with username and password |
| 4 | Dashboard | Tasks, progress, activity, reminders, and custom panels |
| 5 | Profile / Account Settings | View and update contact information and photo |
| 6 | Attendance History | Review attendance records and totals |
| 7 | Tasks | View assigned tasks by status |
| 8 | Task Details | View task information, files, requirements, and comments |
| 9 | Announcements | Browse and search announcements |
| 10 | Announcement Details | Read, react, and comment on an announcement |
| 11 | Leave Request | Create, save, and submit a leave request |
| 12 | Leave Request - Approved | View approval confirmation and leave details |

### 3.1 Authentication

#### Activate Account

**Purpose:** Allows a newly registered employee to activate an account before first login.

**Documented content:** The manual identifies Employee ID/company email as the account activation feature; the implementation draft describes Employee ID or assigned username plus a temporary password.

**How to use:**

- Enter the required activation credentials.
- Click **Activate**.
- After successful validation, continue to the account update page.

**Validation / rules:**

- Employee/account identifier must exist.
- Temporary credentials must match the assigned account.
- Invalid information prevents activation.

#### First-Time Account Update

**Purpose:** Allows the employee to replace the default username and password.

**Documented content:** Preferred username, new password, and password confirmation.

**How to use:**

- Enter the preferred username.
- Create and confirm the new password.
- Click **Save**.
- Use the updated credentials for login.

**Validation / rules:**

- Username uniqueness and format rules still need to be defined.
- Password strength rules still need to be defined.

#### Login

**Purpose:** Provides access to the EMS after account activation.

**Documented content:** Username and password fields with a Sign In action and an Activate Account option.

**How to use:**

- Enter the registered username.
- Enter the password.
- Click **Sign In**.
- A successful login redirects to the Dashboard.

**Validation / rules:**

- Username and password cannot be empty.
- Invalid credentials display an error.
- Inactive accounts cannot log in.

### 3.2 Dashboard

The Dashboard is the employee's home page after login. It provides an overview of daily activities and quick access to important information.

| Component | Documented function |
|---|---|
| Search bar | Quickly locate available pages or features |
| Navigation menu | Dashboard, Announcements, Tasks, Attendance, Profile, Leave Request |
| Self Tasks | Displays upcoming assigned tasks; employees may mark tasks completed using the provided checkbox |
| Weekly Progress / Total Weekly Savings | The supplied material describes a weekly progress area and a money-saving component; the intended meaning requires confirmation |
| Activity Log | Shows recent activities such as submitted files, completed tasks, and attendance updates |
| Reminders | Displays scheduled reminders and allows quick access to upcoming meetings |
| Add Dashboard Panel | Allows employees to add panels such as Notes, Upcoming Events, Team Updates, and Documents |

**Add Panel usage:** Click the **+** button, select the desired panel, and the selected panel appears on the Dashboard.

### 3.3 Profile / Account Settings

**Purpose:** Allows employees to maintain their personal account information.

**Documented content:** Email address, phone number, address, profile picture, and the documented account-delete option.

**How to use:**

- Navigate to Profile.
- Edit the required information.
- Click **Save Changes**.
- For the photo, click **Change Photo**, select an image, and upload it.

**Validation / rules:**

- The supplied material does not define which fields are read-only.
- Account deletion behavior and authorization still need confirmation.

### 3.4 Attendance History

**Purpose:** Allows employees to review their attendance records.

**Documented content:** Days Recorded, Total Sign-ins, Total Sign-outs, Average Hours Worked, searchable records, date/status filters, total working hours, and pagination.

**How to use:**

- Open Attendance from the navigation.
- Search or filter records as needed.
- Review attendance information and total hours.
- Use pagination to move through records.

**Validation / rules:**

- The source describes this as a viewing function; the source does not provide a clock-in/out screen on the Employee side.
- Grace period, overtime rules, and attendance status rules require confirmation.

### 3.5 Tasks

#### Assigned Tasks

**Purpose:** Displays tasks assigned to the employee.

**Documented content:** Tasks are organized into Pending, For Verification, and Completed. Cards show task title, due date, assigned supervisor, and priority.

**How to use:**

- Open Tasks.
- Review tasks by their status.
- Select a task to open its detailed view.

#### Task Details

**Purpose:** Provides complete information about a selected task.

**Documented content:** Task description, due date, assigned employee, priority, current status, attachments, requirements, and comments.

**How to use:**

- Review the task details and requirements.
- Upload required files.
- Participate in comments/discussions.
- Update the task status as permitted.

### 3.6 Announcements

#### Announcements

**Purpose:** Displays company announcements.

**Documented content:** Announcements are listed from newest to oldest and support reading, reactions, comments, and search.

**How to use:**

- Open Announcements.
- Search for an announcement when needed.
- Select an announcement to read its full details.
- React or comment when those actions are available.

#### Announcement Details

**Purpose:** Displays the complete announcement content without truncation.

**Documented content:** Full announcement message with reaction and comment functionality.

**How to use:**

- Open an announcement.
- Read the complete message.
- React or add a comment as needed.

### 3.7 Leave Request

#### Leave Request

**Purpose:** Allows employees to submit leave applications electronically.

**Documented content:** Leave type, start date, end date, total leave days, reason, and supporting documents. Incomplete requests may be saved as drafts.

**How to use:**

- Select the leave type.
- Enter the leave dates.
- Provide the reason.
- Upload supporting documents if required.
- Save as a draft when incomplete, or click **Submit Request** when ready.

**Validation / rules:**

- The source does not fully define pending/rejected states or all leave-balance rules.
- Half-day, blackout-window, overlap, and cancellation behavior require confirmation.

#### Leave Request - Approved

**Purpose:** Displays confirmation after a leave request has been reviewed and approved.

**Documented content:** Approval status, employee details, leave details, approved dates, and total leave days.

**How to use:**

- Review the approval information.
- Return to the Dashboard after reviewing the result.

---

## 4. Department Manager Side

The Department Manager (DM) side is designed for managers who oversee employees in their department. The supplied implementation material identifies five primary DM screens: D1 Employee Attendance Roster, D2 Project Task Board & Status Tracker, D3 Create & Assign Task, D4 Create New Announcement, and D5 Leave Request Queue.

### Department Manager Screen Inventory

| ID | Screen | Purpose |
|---|---|---|
| D1 | Employee Attendance Roster | Monitor team attendance and inspect an employee's attendance |
| D2 | Project Task Board & Status Tracker | Track team tasks by sprint and status |
| D3 | Create & Assign Task | Create a task and assign it to an employee |
| D4 | Create New Announcement | Publish or schedule announcements and monitor feeds |
| D5 | Leave Request Queue | Review, approve, or reject leave requests |

### 4.1 D1 — Employee Attendance Roster

The Employee Attendance Roster provides the Department Manager with a team-level view of attendance and an employee detail panel.

| Area | Documented content |
|---|---|
| KPI cards | Total Employees, Active Employees, Total Departments, Average Tenure |
| Search / filters | Search by name, email, or role; department filter; status filter; Reset filters |
| Roster columns | Employee, Department, Today's Check-in, Status, Action |
| Status values | On Time, Late, Active, Inactive, Remote (WFH), On Leave (PTO) |
| Detail panel | Employee name/status/role/department/email/ID/join date; today's shift; clock-in; break minutes; estimated clock-out |
| Monthly summary | Present, Late, Leaves, PTO Left; Full Log |
| Recent logs | Date, in/out, hours with OT, status; Filter dates |
| Actions | Manual Adjustment and Export Timesheet |

> The source identifies department scope, audit behavior for manual adjustments, export format, and the definition of Inactive as items that still require confirmation.

### 4.2 D2 — Project Task Board & Status Tracker

The Project Task Board provides the Department Manager with a consolidated view of team tasks and their current status.

| Area | Documented content |
|---|---|
| KPI cards | Completed This Week, Active Projects, Tasks in Progress, Blocked/Overdue |
| Board controls | Search tasks/deliverables, sprint selector, Filters, + New Task |
| Task columns | Task & Assignee, Department, Priority, Due Date, Progress, Status, Quick Actions |
| Status examples | In Progress, Under Review, Blocked, Completed |
| Quick actions | +10% progress, edit, mark complete |
| Pagination | Shows the current range of tasks, such as "Showing 1-4 of 47" |

> The source describes a progress slider and percentage-based tracking. For the EMS project workflow, task completion should be treated as the final status action rather than requiring a separate progress-bar interface.

### 4.3 D3 — Create & Assign Task

**Purpose:** Allows the Department Manager to create a task and assign it to an employee.

**Documented content:** Task Title, Subject, Description, Department, Assign Employee, Priority, and Due Date. The description supports attachments and other input options in the supplied design reference.

**How to use:**

- Enter the task title and subject.
- Enter the task description and supporting content.
- Select the department.
- Select the employee to receive the task.
- Set priority and due date.
- Click **Assign**.

**Validation / rules:**

- The employee list depends on the selected department.
- After saving, the task appears on the assignee's Dashboard and the manager's task board.
- The source states that the employee is notified.

### 4.4 D4 — Create New Announcement

**Purpose:** Allows the Department Manager to publish or schedule announcements and monitor active announcement feeds.

**Documented content:** KPI cards for Active Broadcasts, Total Portal Reach, Average Read Rate, and Scheduled Posts. The compose form includes Title, Subject, Description, Department audience, Priority, and Publish Immediately or Schedule Date & Time.

**How to use:**

- Enter the announcement title and subject.
- Write the announcement description.
- Add supporting attachments/content when needed.
- Select the department audience.
- Set priority.
- Publish immediately or select a schedule date and time.
- Use the live feed to review active announcements and available actions.

**Validation / rules:**

- The source identifies edit, pin/unpin, and archive actions.
- Rules for organization-wide targeting, scheduling, editing after publication, and urgent-alert notifications still require confirmation.

### 4.5 D5 — Leave Request Queue

**Purpose:** Provides the Department Manager with a queue for reviewing employee leave requests.

**Documented content:** KPI cards for Pending Approvals, Approved This Month, Rejected Requests, and Team Coverage Index. Tabs include Pending Review, Approved, Rejected, and Calendar.

**How to use:**

- Use filters for name, department, or role.
- Sort requests, including the documented Urgent First option.
- Select individual requests or use bulk selection.
- Review employee, leave type, work days, date range, status, reason, attachment, and system flags.
- Add a note or inquire when necessary.
- Approve or reject the request.

**Validation / rules:**

- The source identifies coverage-index rules, urgency definition, rejection-note requirements, balance deduction, expedited handling, and Calendar design as items requiring confirmation.

---

## 5. Cross-Side Workflows

The Employee and Department Manager sides are connected through shared workflows. Actions taken by one role affect the information shown to the other role.

| Workflow | Employee side | Department Manager side |
|---|---|---|
| Leave | Submits a leave request and views its status | Reviews, approves, or rejects the request; employee status/balance is updated after the decision |
| Tasks | Views assigned tasks and updates task status | Creates/assigns tasks and tracks team tasks |
| Announcements | Reads, reacts/comments, and acknowledges announcements where supported | Creates/publishes or schedules announcements and monitors read/acknowledge counts |
| Attendance | Views attendance records | Views the employee attendance roster, performs documented manual adjustments, and exports timesheets |

---

## 6. Roles and Permissions

| Role | Documented access |
|---|---|
| Employee | Own data only; employee account, profile, attendance history, assigned tasks, announcements, and leave requests |
| Department Manager | Employees in the department; approve leave, assign tasks, post announcements, and adjust attendance |
| System Manager / HR | Implied by the supplied material as an organization-wide role; employee creation and organization-wide data are not designed in the supplied DM screens |

---

## 7. Suggested Data and API Reference

The supplied implementation material proposes additional data fields and API areas to support the Department Manager workflows. These are presented as implementation references rather than confirmed final requirements.

| Area | Suggested data / endpoint examples |
|---|---|
| Task | `sprint_id`, `progress_percent`, `blocked_reason`, `created_by` |
| Sprint | name, start, end, status |
| Announcement | `scheduled_at`, `status` (draft/scheduled/live/archived), department targets |
| LeaveRequest | `reviewer_note`, `decided_at`, `coverage_flag`, `overlap_flag` |
| Attendance | `GET /dm/roster`; `GET /dm/employees/{id}/attendance`; `POST /dm/attendance/adjust`; `GET /dm/attendance/export` |
| Tasks | `GET /dm/tasks?sprint`; `POST /dm/tasks`; `PATCH /dm/tasks/{id}` |
| Leave | `GET /dm/leave?status`; `POST /dm/leave/{id}/approve`; `POST /dm/leave/{id}/reject`; `POST /dm/leave/bulk`; `POST /dm/leave/{id}/note`; `GET /dm/leave/calendar` |
| Announcements | `GET /dm/announcements`; `POST /dm/announcements`; `PATCH /dm/announcements/{id}` |

---

## 8. Suggested Implementation Order

The implementation order below follows the supplied material's dependency between employee features and Department Manager actions.

| Phase | Implementation area |
|---|---|
| 1 | Foundation: project setup, database, layout shell, role-based routing/access |
| 2 | Authentication: activation, login, sessions, logout, password change/reset |
| 3 | Employee profile and account management |
| 4 | Employee attendance history and Department Manager attendance roster |
| 5 | Employee leave request and Department Manager leave queue |
| 6 | Tasks: employee task view, then manager task creation/assignment and tracking |
| 7 | Announcements: employee viewing, then manager publishing/scheduling and tracking |
| 8 | Dashboard aggregation, custom panels, reminders, notifications, and search |
| 9 | Polish: loading/empty/error states, responsive layout, accessibility, file limits, and testing |

---

## 9. Gaps and Questions to Resolve

- Activation inputs differ between the system feature list and the activation-page description.
- Default-password delivery differs between the feature list and activation description.
- The documented first-login sequence should be confirmed.
- The login identifier should be confirmed because username, Employee ID, and company email are referenced in different places.
- The Dashboard's Weekly Progress / Total Weekly Savings component should be confirmed.
- The employee Delete Account function should be confirmed.
- Pending and Rejected leave states are not fully documented on the Employee side.
- The Employee side is described as viewing attendance, while the supplied implementation reference also mentions clock-in/out and regularization; the final responsibility should be confirmed.
- The Department Manager's exact department scope should be confirmed where mockups show broader department data.
- The D1 Leave Calendar and Full Log views are identified but do not have complete designs in the supplied material.
- Department Manager manual-adjustment audit behavior and export format need confirmation.
- Notification behavior for leave approvals, task assignments, and announcements needs confirmation.
- Task status/progress behavior needs one final agreed rule; the project workflow should use the completed status as the employee-facing completion action.

---

## 10. General Notes

- Employees should log out after using the system to protect their account.
- Passwords should never be shared with other users.
- Only authorized users should access the system.
- Information entered into the system should be accurate and kept up to date.
- Supporting documents should meet the required file format and size limitations.
- Role-based access should prevent employees from accessing Department Manager functions and should restrict managers to their authorized department scope.

---

*Document coverage: Employee side — 12 documented screens. Department Manager side — 5 documented screens (D1–D5). The template's structure and visual style are used as a formatting reference; its original Solace HR Portal subject matter is not included.*
