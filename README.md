# My Project

Built a leave management portal where employees can apply for leaves, and managers/admins can approve or reject requests.
Tech Stack used:
Backend: Node.js + Express + MongoDB
Frontend: React + Vite + Tailwind + Redux Toolkit

Here’s a screenshot of the app:

Employee Dashboard to apply Leave-
![Employee Dashboard](/applyLeave.JPG)

Login Page-
![Login Page](/Login_leaveManagement.JPG)

Register Page-
![Register Page](/register_leaveManagement.JPG)

Admin Dashboard-
![Admin Dashboard](/adminDashboard.JPG)

Employee Dashboard for leave History
![Employee Leave History](/leaveHistory_management.JPG)

Features
1. Authentication & Authorization
•	JWT-based login & registration
•	Role-based access: Employee, Manager/Admin
2. Employee Panel
•	Apply for leave with date range, reason, leave type
•	View status of leave requests (Pending, Approved, Rejected)
•	Employee can Cancel pending requests
•	View leave history
3. Manager/Admin Panel
•	View all leave requests
•	Filter by employee or status
•	Approve/Reject requests
•	View total leaves taken by an employee
________________________________________
Backend (Node.js + Express + MongoDB)
•	Models:
o	User: name, email, password, role
o	LeaveRequest: employeeId, fromDate, toDate, type (sick, casual, etc), reason, status
•	Routes:
o	POST /api/auth/register
o	POST /api/auth/login
o	GET /api/leaves (manager only)
o	POST /api/leaves (employee)
o	PUT /api/leaves/:id/status (manager approves/rejects)
o	GET /api/users/:id/leaves (view personal leave history)

 Frontend (React + Vite + Tailwind + Redux Toolkit)
•	Pages:
o	Login/Register
o	Dashboard (based on role)
o	Apply for Leave (Form)
o	Leave History (Table/List)
o	Admin Panel (List of all leave requests with status dropdown)
•	State Management:
o	Redux Toolkit for user, leaves, admin actions
•	Routing:
o	Role-based route guards using React Router

Extra Features 
•	Email notification (using Nodemailer)
•	Filtering, sorting, and searching leaves
