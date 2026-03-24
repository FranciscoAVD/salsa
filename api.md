Here is the complete set of API routes for your dance studio platform, organized by their functional purpose.

### 1. Authentication & Profile
These routes manage user identity, registration, and security.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create a new student account |
| `POST` | `/api/auth/login` | Authenticate and receive a JWT/Session |
| `POST` | `/api/auth/logout` | Invalidate current session |
| `GET` | `/api/auth/me` | Get current user's profile and role |
| `PATCH` | `/api/auth/profile` | Update personal details (phone, emergency contact) |

### 2. Class Definitions (The "Catalog")
These manage the types of dance offered (e.g., "Level 1 Hip Hop").

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/classes` | List all available dance styles/types |
| `GET` | `/api/classes/:id` | Get specific class description and requirements |
| `POST` | `/api/classes` | **[Admin]** Create a new dance style |
| `PUT` | `/api/classes/:id` | **[Admin]** Edit class details or level |
| `DELETE` | `/api/classes/:id` | **[Admin]** Archive/Remove a class type |

### 3. Schedules & Sessions (The "Calendar")
These manage the time slots (Schedule Templates) and the actual instances (Sessions).

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/sessions` | List all class instances for a date range |
| `GET` | `/api/sessions/:id` | Get details for one specific time slot |
| `POST` | `/api/schedule` | **[Admin]** Create a recurring class (RRULE) |
| `PATCH` | `/api/sessions/:id` | **[Admin]** One-off change (e.g., sub teacher) |
| `DELETE` | `/api/sessions/:id` | **[Admin]** Cancel a single specific class instance |

### 4. Bookings (Student Actions)
Routes for students to reserve spots and manage their attendance.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/bookings` | View current user's upcoming reservations |
| `POST` | `/api/bookings` | Reserve a spot in a specific session |
| `DELETE` | `/api/bookings/:id` | Cancel a reservation (subject to studio policy) |
| `GET` | `/api/bookings/history` | View a log of all past attended classes |

### 5. Studio Administration
High-level management routes restricted to owners and staff.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/admin/users` | List all students and staff members |
| `GET` | `/api/admin/users/:id` | View user profile, waivers, and total spend |
| `PATCH` | `/api/admin/users/:id/role` | Change user permissions (Student/Teacher/Admin) |
| `GET` | `/api/admin/roster/:sessionId` | Get list of students signed up for a session |
| `POST` | `/api/admin/attendance` | Mark students as Present, Absent, or No-Show |

### 6. System & Automation
Internal routes used for maintenance and background tasks.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/cron/generate` | Trigger the worker to create next 2 weeks of sessions |
| `GET` | `/api/system/health` | Check database and server status |

---

### Suggested Middleware Logic
To keep your code clean, I recommend applying these three middleware layers:

1.  **`authGuard`**: Applied to all routes except login/register and public schedule viewing. Verifies the user is logged in.
2.  **`adminGuard`**: Applied to all routes marked **[Admin]**. Checks if `user.role === 'admin'`.
3.  **`validationGuard`**: Checks request bodies (e.g., ensures a booking request has a valid `sessionId` before hitting the database).
