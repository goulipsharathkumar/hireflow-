# ⚡ HireFlow - Full Stack Recruiter Platform

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) job portal and applicant tracking system (ATS) built for real-world recruitment scenarios.

## 🌐 Live Demo

- **Frontend:** https://hireflow-red-kappa.vercel.app
- **Backend:** https://hireflow-server-h26o.onrender.com

## 📸 Features

### For Candidates
- 👤 Register and login as a candidate
- 🔍 Browse and search jobs by title, location, and type
- ⚡ Apply for jobs instantly
- 📊 Track application status through ATS pipeline
- 📱 Fully responsive on all devices

### For Recruiters
- 🏢 Register and login as a recruiter
- 📝 Post, edit, and delete job listings
- 👥 View all applicants for each job
- 🔄 Update applicant status (Applied → Screening → Interview → Offer → Rejected)
- 📈 Dashboard with job statistics

### Security
- 🔒 JWT authentication
- 🛡️ Role-based protected routes
- 🚫 Unauthorized access prevention

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Context API
- Axios
- TailwindCSS

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt.js
- Multer

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## 📁 Project Structure
hireflow/
├── client/                   # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProtectedRoute.js
│   │   │   └── PublicRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Landing.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Jobs.js
│   │   │   ├── RecruiterDashboard.js
│   │   │   ├── MyApplications.js
│   │   │   └── JobApplicants.js
│   │   └── utils/
│   │       └── api.js
│   └── package.json
│
└── server/                   # Node.js Backend
├── controllers/
│   ├── authController.js
│   ├── jobController.js
│   └── applicationController.js
├── middleware/
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
├── models/
│   ├── User.js
│   ├── Job.js
│   └── Application.js
├── routes/
│   ├── authRoutes.js
│   ├── jobRoutes.js
│   └── applicationRoutes.js
├── index.js
└── package.json

## 🚀 Run Locally

### Clone the repo
```bash
git clone https://github.com/goulipsharathkumar/hireflow-.git
cd hireflow
```

### Setup Backend
```bash
cd server
npm install
```

Create `.env` file in server folder:
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=hireflow_secret_key_2024
PORT=5000
```

```bash
npm run dev
```

### Setup Frontend
```bash
cd client
npm install
npm start
```

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |

### Jobs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/jobs | Get all jobs |
| GET | /api/jobs/:id | Get single job |
| POST | /api/jobs | Create job (Recruiter) |
| PUT | /api/jobs/:id | Update job (Recruiter) |
| DELETE | /api/jobs/:id | Delete job (Recruiter) |

### Applications
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/applications/:jobId | Apply for job |
| GET | /api/applications/my | Get my applications |
| GET | /api/applications/job/:jobId | Get job applicants |
| PUT | /api/applications/:id/status | Update status |

## 👨‍💻 Developer

**Gouli P. Sharath Kumar**
- 📧 sharathgouli20@gmail.com
- 💼 [LinkedIn](https://www.linkedin.com/in/gouli-p-sharath-kumar-0794552b1/)
- 🐙 [GitHub](https://github.com/goulipsharathkumar)
- 📍 Hospet, Karnataka |

## 📄 License

MIT License - feel free to use this project for learning and portfolio purposes.
