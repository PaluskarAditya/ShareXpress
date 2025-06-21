# 🚀 ShareXpress – Simple File Sharing Platform

ShareXpress is a minimalist and efficient file-sharing application built with the **MERN stack** and **MongoDB GridFS** for scalable file storage.

It enables users to **upload files**, **generate unique shareable links**, and **download files** easily – all with a clean interface and automatic file expiration.

---

## ✨ Features

* 📂 File Uploads with **original filenames preserved**
* ⚡ Real-time unique ID generation for sharing
* 📂 MongoDB GridFS storage for large files
* 📅 Easy file preview with **download buttons**
* ⏳ File auto-deletion policy (configurable)
* ✅ Simple, modern, and responsive UI
* 🔒 Basic file metadata tracking with UUIDs

---

## 🛠 Tech Stack

* **Frontend:** React, Vite, Tailwind CSS, React Router
* **Backend:** Node.js, Express.js
* **Database:** MongoDB + GridFS
* **File Handling:** Multer, GridFSBucket
* **Unique ID Generation:** Custom UUID + crypto

---

## 📂 Folder Structure

```txt
ShareXpress/
├── backend/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   ├── public/
│   └── vite.config.js
├── README.md
└── package.json
```

---

## ⚙️ Setup Instructions

### 🔧 Backend

1. Go to the backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```env
   MONGO_URI=your_mongo_db_uri
   NODE_PORT=8000
   ```

4. Run the backend server:

   ```bash
   nodemon server.js
   ```

---

### 🎨 Frontend

1. Go to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup `.env`:

   ```env
   VITE_BACKEND_URI=http://localhost:8000
   ```

4. Start the React app:

   ```bash
   npm run dev
   ```

---

## 🚀 Deployment

* Frontend: Vercel / Netlify
* Backend: Render / Railway / Your server
* MongoDB: MongoDB Atlas

---

## 📦 API Endpoints

| Method | Endpoint        | Description           |
| ------ | --------------- | --------------------- |
| POST   | `/api/upload`   | Upload a new file     |
| GET    | `/api/download` | Download file by UUID |
| GET    | `/foo`          | Test route            |

---

## 🌟 Author

* **Developer:** [aid3n](https://github.com/PaluskarAditya)
* **GitHub Repo:** [ShareXpress](https://github.com/PaluskarAditya/sharexpress)

---

## 💡 License

This project is licensed under the MIT License — feel free to use and modify it.

---

> ✨ Built with passion by **aid3n**
