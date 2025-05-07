# VegaPro Takehome Assessment

This is a full-stack Task Management application with:
- ✅ **Frontend**: React + Vite + TailwindCSS (`priority-note-cards/`)
- 🛠 **Backend**: Node.js + Express + Sequelize (`backend/`)
- 🗃️ **Database**: MySQL, with optional SQL script (`db/init.sql`)

## 🎥 Demo Video

Watch the application in action:  
[▶️ VegaPro Task Manager Demo](https://drive.google.com/file/d/1yNLk32yNJEryVSyCDDzRnirAFVBHHNzv/view?usp=sharing)

---

## 📦 Project Structure

```
VegaPro-Takehome-Assesment/
├── backend/            # Express + Sequelize backend
├── priority-note-cards/ # React frontend UI
├── db/                 # init.sql for optional DB bootstrapping
```

---

## 🚀 Quickstart Instructions

### ⚙️ Prerequisites
- Node.js (v18+ recommended)
- MySQL Server (v8+)
- npm or bun

---

### 1️⃣ Backend Setup (`backend/`)

#### ✅ Step 1: Create MySQL DB
Open terminal and start MySQL:
```bash
mysql -u root -p
```

Then run:
```sql
CREATE DATABASE taskdb;
EXIT;
```

✅ Step 2: Configure Environment
Inside `backend/`, create a `.env` file:
```env
DB_NAME=taskdb
DB_USER=root
DB_PASS=your_mysql_password
DB_HOST=localhost
DB_PORT=3306
PORT=3001
```

✅ Step 3: Install & Run
```bash
cd backend
npm install
npm run dev
```

The backend should now be running at: http://localhost:3001

### 2️⃣ Frontend Setup (`priority-note-cards/`)

✅ Step 1: Install & Run
```bash
cd priority-note-cards
npm install
npm run dev
```

Frontend will be live at: http://localhost:8000

✅ Step 2: Check API Connectivity
Ensure your frontend is calling the backend correctly:
```ts
// Example: src/api.ts
const BASE_URL = "http://localhost:3001";
```
Update this value if your backend runs on a different port or domain.

### 3️⃣ (Optional) DB Schema with SQL Script
If you'd like to initialize the database schema manually:
```bash
mysql -u root -p taskdb < db/init.sql
```

## 🧪 Features
* Add tasks with priority (`low`, `medium`, `high`, `none`)
* Mark tasks as complete/incomplete
* Delete tasks

## 🧰 Tech Stack
Layer | Tech 
----- | ----
Frontend | React, Vite, TypeScript, TailwindCSS 
Backend | Express.js, Sequelize ORM 
Database | MySQL 
Dev Tools | ESLint, Prettier, PostCSS

## 🙌 Author
Made with 💻 by Asish Nelapati
