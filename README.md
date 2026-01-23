# 🌌 Premium Interactive Portfolio

A state-of-the-art, high-performance developer portfolio featuring a modern glassmorphic design, dynamic 3D interactions, and a full-featured administrative dashboard.

[![Live Demo](https://img.shields.io/badge/demo-live-emerald?style=for-the-badge)](https://dawitsolomon-t.onrender.com)
[![Status](https://img.shields.io/badge/status-active-emerald?style=for-the-badge)](https://dawitsolomon-t.onrender.com)

---

## ✨ Features

- **🚀 Performance Optimized**: Built with Vite and React 19 for ultra-fast load times.
- **🎨 Glassmorphic UI**: Modern aesthetic with tasteful motion, blur effects, and dynamic gradients.
- **📱 Fully Responsive**: Seamless experience across mobile, tablet, and desktop devices.
- **🛠 Admin Dashboard**: Comprehensive CMS to manage projects, skills, services, and experiences in real-time.
- **📧 Smart Contact**: Integrated with EmailJS for reliable, secure, and instantaneous client communication.
- **🛡 Production Ready**: Includes security headers, rate limiting, and optimized image handling.

---

## 🛠 Technology Stack

### Frontend
- **React 19** - Modern component-based architecture.
- **Tailwind CSS 4** - Advanced utility-first styling.
- **Framer Motion** - Silky smooth animations and transitions.
- **EmailJS** - Client-side email delivery.

### Backend
- **Node.js & Express** - Efficient, scalable server-side logic.
- **MongoDB & Mongoose** - Robust NoSQL database management.
- **JWT** - Secure administrative authentication.
- **Helmet & Compression** - Enhanced security and performance middleware.

---

## 📁 Project Structure

```bash
portfolio/
├── frontend/     # React application (Client-facing)
├── admin/        # React application (Dashboard/CMS)
├── backend/      # Node.js API (Express server)
└── public/       # Shared assets and static files
```

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/devasol/portfolio.git
cd portfolio
```

### 2. Configure Environment Variables
Create `.env` files in both `frontend/`, `admin/`, and `backend/` directories based on the provided `.env.example` templates.

### 3. Install Dependencies
```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install

# Admin
cd ../admin && npm install
```

### 4. Run Development Servers
```bash
# Start Backend (on port 5001)
npm run dev

# Start Frontend (on port 3000)
npm run dev

# Start Admin (on port 5173)
npm run dev
```

---

## 📦 Deployment

The project is configured for deployment on **Render**.

1. **Backend**: Deploy the `backend` folder as a Web Service. Add all necessary environment variables (MONGO_URI, JWT_SECRET, etc.).
2. **Frontend/Admin**: Deploy as Static Sites. Ensure `VITE_API_URL` points to your deployed backend.

---

## 🤝 Contact

**Dawit Solomon** - [dawit8908@gmail.com](mailto:dawit8908@gmail.com)

Project Link: [https://github.com/devasol/portfolio](https://github.com/devasol/portfolio)

---

<p align="center">
  Built with ❤️ and passion.
</p>
