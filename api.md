### 1. Class Definitions
Manage the types of dance classes offered.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/classes` | List all available dance styles/types |
| `GET` | `/api/classes/:id` | Get specific class description and requirements |
| `POST` | `/api/classes` | **[Admin]** Create a new dance style |
| `PUT` | `/api/classes/:id` | **[Admin]** Edit class details or level |
| `DELETE` | `/api/classes/:id` | **[Admin]** Archive/Remove a class type |

### 2. Schedules & Sessions
Manage time slots and the actual instances (Sessions).

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/sessions` | List all class instances for a date range |
| `GET` | `/api/sessions/:id` | Get details for one specific time slot |
| `POST` | `/api/schedule` | **[Admin]** Create a recurring class (RRULE) |
| `PATCH` | `/api/sessions/:id` | **[Admin]** One-off change (e.g., sub teacher) |
| `DELETE` | `/api/sessions/:id` | **[Admin]** Cancel a single specific class instance |

### 3. Bookings (Student Actions)
Routes for students to manage and reserve bookings and view their attendance.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/bookings` | View current user's upcoming reservations |
| `POST` | `/api/bookings` | Reserve a spot in a specific session |
| `DELETE` | `/api/bookings/:id` | Cancel a reservation (subject to studio policy) |
| `GET` | `/api/bookings/history` | View a log of all past attended classes |

### 4. Studio Administration
High-level management routes restricted to owners and staff.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/admin/users` | List all students and staff members |
| `GET` | `/api/admin/users/:id` | View user profile, waivers, and total spend |
| `PATCH` | `/api/admin/users/:id/role` | Change user permissions (Student/Teacher/Admin) |
| `GET` | `/api/admin/roster/:sessionId` | Get list of students signed up for a session |
| `POST` | `/api/admin/attendance` | Mark students as Present, Absent, or No-Show |

### 5. System & Automation
Internal routes used for maintenance and background tasks.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/cron/generate` | Trigger the worker to create next 2 weeks of sessions |
| `GET` | `/api/system/health` | Check database and server status |
