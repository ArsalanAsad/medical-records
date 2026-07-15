MediVault - Medical Records Management System

MediVault is a full-stack MERN (MongoDB, Express.js, React, Node.js) application that allows users to securely manage their medical records digitally.

Users can create an account, upload medical documents, manage health records, view PDF files, update information, and organize their medical history from a modern responsive dashboard.

🚀 Live Demo

Frontend:
https://medical-records-nn26.vercel.app

Backend API:
https://medical-records-production-6381.up.railway.app

📌 Features
Authentication
User registration and login
Secure password hashing using bcrypt
JWT-based authentication
Protected routes
Medical Records Management
Add new medical records
Upload PDF documents
View record details
Edit existing records
Delete records
User-specific record management
Dashboard
Overview of medical records
Record statistics
Recent uploaded records
File Management
PDF preview
PDF download support
Base64 document storage
User Profile
Update personal information
Manage profile details


🛠️ Tech Stack
Frontend
React.js
Vite
Tailwind CSS
React Router DOM
Context API
Fetch API
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
bcrypt.js
Deployment
Frontend: Vercel
Backend: Railway
Database: MongoDB Atlas

📂 Project Structure
medical-records
│
├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── context
│   │   ├── services
│   │   └── routes
│   │
│   ├── package.json
│   └── vercel.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
└── README.md

⚙️ Installation & Setup
Clone Repository
git clone https://github.com/ArsalanAsad/medical-records.git

cd medical-records
Frontend Setup

Go to client folder:

cd client

Install dependencies:

npm install

Create .env file:

VITE_API_URL=your_backend_api_url

Run frontend:

npm run dev
Backend Setup

Go to server folder:

cd server

Install dependencies:

npm install

Create .env file:

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=your_frontend_url

Run backend:

npm run dev

🔗 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/signup	Register user
POST	/api/auth/login	Login user
Medical Records
Method	Endpoint	Description
GET	/api/records	Get user records
POST	/api/records	Create record
PUT	/api/records/:id	Update record
DELETE	/api/records/:id	Delete record

📸 Screenshots


Sign Up




Login




Dashboard




Upload Record




Reports




🔮 Future Improvements
Cloud storage integration (AWS S3 / Cloudinary)
Doctor appointment management
Medical reminders
Email notifications
Advanced search and filters
Role-based access for doctors and patients

👨‍💻 Author

Arsalan Asad

Full Stack Developer

GitHub:
https://github.com/ArsalanAsad


Update README with project documentation
