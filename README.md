# 🦷 ENTNT Dental Center Management Dashboard

A fully responsive **React-based frontend application** simulating a dental center management system for both Admin (Dentist) and Patient roles. This project is part of the ENTNT Frontend Developer assignment.

---

## 📌 Features

### 🔐 Authentication
- Hardcoded login (Admin & Patient)
- Role-based access control
- Session stored in `localStorage`

### 👨‍⚕️ Admin (Dentist)
- Dashboard with KPIs:
  - Next 10 appointments
  - Revenue
  - Pending/Completed status
  - Top patients
- Patient Management (CRUD)
- Appointment/Incident Management (CRUD)
- Calendar View with daily incident list

### 👤 Patient
- View only their appointments
- Past & upcoming treatment history
- Access to treatment cost, status, and attached files

### 🗂 Data Handling
- All data is persisted via `localStorage`
- File uploads stored as base64/blob URLs
- No backend/API calls used

---

## 🚀 Demo Links

- **Live Demo:** [https://your-vercel-or-netlify-link.com](https://entnt-dental-dashboard.vercel.app/login)
- **GitHub Repo:** [https://github.com/yourusername/entnt-dental-dashboard](https://github.com/vishusharmaX/entnt-dental-dashboard)

---

## 🧰 Tech Stack

- **React** with functional components
- **React Router v6**
- **Context API** for auth and global state
- **TailwindCSS** for UI and responsiveness
- **Plain JS** for Calendar logic
- **LocalStorage** for data simulation

---

## 🏗️ Project Structure




---

## 🧪 Test Users

### Admin:
Email: admin@entnt.in
Password: admin123


### Patient:
Email: john@entnt.in
Password: patient123


---

## ✅ Usage & Setup

### 1. Clone the repo
```bash
git clone https://github.com/vishusharmaX/entnt-dental-dashboard
cd entnt-dental-dashboard
npm run start
