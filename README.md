📧 BulkMail – Bulk Email Sender Web Application

BulkMail is a full-stack MERN web application that allows users to send emails in bulk by uploading an Excel file containing email addresses. It is designed for simplicity, speed, and real-world usage.

🚀 Features

📤 Upload Excel file (.xlsx) with email IDs

✉️ Send bulk emails in one click

📊 Automatically count total emails

🕘 View email sending history

🌐 Fully deployed (Frontend + Backend)

☁️ Uses cloud services (Vercel, Render, MongoDB Atlas)

🛠️ Tech Stack
Frontend

React (Create React App)

React Router DOM

Axios

Tailwind CSS

XLSX (Excel file handling)

Backend

Node.js

Express.js

Nodemailer (Email sending)

MongoDB Atlas

Mongoose

Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

📸 How It Works

User enters the email message

Uploads an Excel file with email addresses

App reads emails from Excel

Backend sends emails one by one

Email status is saved in database

User can view email history

🔗 Live Demo

Frontend:
👉 https://bulk-mail-frontend-alpha.vercel.app/

Backend API:
👉 https://bulkmail-backend-9e3h.onrender.com

📂 Project Structure
BulkMail/
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── History.js
│   │   ├── index.js
│   └── package.json
│
├── backend/
│   ├── index.js
│   ├── models/
│   └── package.json
