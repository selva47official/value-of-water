# 💧 Value of Water - Water Quality Monitoring System

**Smart India Hackathon Submission | Tamil Nadu | Government Level: All (State, District, Municipal, Gram Panchayat)**

---

## 📋 Project Overview

**Value of Water** is a comprehensive water quality monitoring and reporting system designed for Tamil Nadu Government across all administrative levels. Citizens can report water quality issues in real-time, and government officials can track, manage, and resolve complaints efficiently.

### Problem Statement
- India loses **₹260 billion annually** due to water contamination
- Citizens have no direct channel to report water quality issues
- Government lacks real-time data on water quality across regions
- No transparency in complaint resolution
- **Solution:** Unified platform connecting citizens with government officials

---

## 🎯 Key Features

### 👤 **For Citizens (Mobile App)**
- ✅ Report water quality issues with photos
- ✅ Real-time GPS location tagging
- ✅ Offline mode for low connectivity areas
- ✅ Track complaint status
- ✅ Receive notifications
- ✅ Water test parameter submission
- ✅ Multi-language support (Tamil, English)

### 👨‍💼 **For Government Officials (Web Dashboard)**
- ✅ Real-time complaint map view
- ✅ Filter by severity, region, status
- ✅ Assign complaints to field officers
- ✅ Track resolution progress
- ✅ Generate analytics & reports
- ✅ Export data for analysis
- ✅ Multi-level hierarchy (State → District → Municipal → Gram Panchayat)

### 🔧 **Backend Features**
- ✅ Real-time notifications (Socket.io)
- ✅ Secure authentication (JWT)
- ✅ Role-based access control
- ✅ Data validation & sanitization
- ✅ API rate limiting
- ✅ Automated alerts

---

## 💻 Tech Stack

| Component | Technology | Reason |
|-----------|-----------|--------|
| **Frontend (Web)** | React 18 + Tailwind CSS | Fast, responsive, great for dashboards |
| **Frontend (Mobile)** | React Native | Cross-platform (iOS + Android) |
| **Backend API** | Node.js + Express.js | JavaScript across stack, fast development |
| **Database** | PostgreSQL | Reliable, great for geospatial data |
| **Real-time** | Socket.io | Live notifications & updates |
| **Maps** | Google Maps API | Accurate location tracking |
| **File Storage** | AWS S3 / Cloudinary | Photo/document uploads |
| **Authentication** | JWT + bcrypt | Secure authentication |
| **Deployment** | Vercel (Frontend) + Railway (Backend) | Free tier available, easy scaling |

---

## 📁 Project Structure

```
value-of-water/
├── frontend/                    # React Web Dashboard
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Map.jsx
│   │   │   ├── ComplaintCard.jsx
│   │   │   └── Analytics.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Complaints.jsx
│   │   │   └── Analytics.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── auth.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── .env.example
│
├── mobile/                      # React Native Mobile App
│   ├── src/
│   │   ├── screens/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.js
│   ├── app.json
│   └── package.json
│
├── backend/                     # Node.js API Server
│   ├── routes/
│   │   ├── complaints.js
│   │   ├── users.js
│   │   ├── auth.js
│   │   └── analytics.js
│   ├── controllers/
│   │   ├── complaintController.js
│   │   ├── userController.js
│   │   └── authController.js
│   ├── models/
│   │   ├── Complaint.js
│   │   ├── User.js
│   │   └── Region.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── config/
│   │   └── database.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── database/                    # Database Schemas
│   ├── schema.sql
│   └── seed.sql
│
├── docs/
│   ├── API_DOCUMENTATION.md
│   ├── SETUP_GUIDE.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── DATABASE_SCHEMA.md
│   ├── SIH_SUBMISSION.md
│   └── USER_GUIDE.md
│
├── .gitignore
└── LICENSE
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- npm or yarn
- Git

### Installation

**1. Clone Repository**
```bash
git clone https://github.com/selva47official/value-of-water.git
cd value-of-water
```

**2. Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev
```

**3. Setup Frontend**
```bash
cd ../frontend
npm install
cp .env.example .env
# Edit .env with API URL
npm start
```

**4. Setup Database**
```bash
cd ../database
psql -U postgres -f schema.sql
psql -U postgres -f seed.sql
```

---

## 🏛️ Government Hierarchy (Tamil Nadu)

```
State Level (Chennai)
├── District (13 Districts)
│   ├── Madurai
│   ├── Coimbatore
│   ├── Tiruppur
│   └── ... (10 more)
├── Municipal Level
│   ├── City Corporations (5)
│   ├── Municipalities (77)
│   └── Town Panchayats (490)
└── Village Level (Gram Panchayat)
    └── 27,000+ villages
```

**Value of Water** supports all these levels!

---

## 📊 Data Points Tracked

### Complaint Information
- Complaint type (Color, Smell, Taste, Contamination, Low pressure)
- Severity level (Critical, High, Medium, Low)
- Photo evidence
- GPS coordinates
- Timestamp

### Water Test Parameters
- pH level
- TDS (Total Dissolved Solids)
- Turbidity
- Chlorine level
- Temperature

### Resolution Data
- Assigned officer name & ID
- Status updates
- Resolution time
- Cost estimation
- Completion notes

---

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing (bcrypt)
- ✅ Role-based access control (RBAC)
- ✅ API rate limiting
- ✅ Input validation & sanitization
- ✅ HTTPS enforcement
- ✅ SQL injection protection
- ✅ CORS configuration

---

## 🎯 Impact & Government Use

### Direct Benefits
- **Citizens:** Easy complaint filing, transparency, quick resolution
- **Government:** Real-time data, quick response, evidence-based decisions
- **Environment:** Better water resource management, pollution prevention

### Alignment with Government Missions
- ✅ **Jal Jeevan Mission** - Safe drinking water for all
- ✅ **Swachh Bharat Mission** - Clean water infrastructure
- ✅ **Digital India** - Digital governance
- ✅ **Pradhan Mantri Krishi Sinchayee Yojana** - Water conservation

### Expected Outcomes
- Reduce water contamination incidents by 40%
- Decrease complaint resolution time from 30 days to 5 days
- Increase transparency & citizen trust
- Create data-driven water quality policies
- Enable preventive maintenance

---

## 🏆 Smart India Hackathon 2024

**Category:** Software  
**Theme:** Water Quality & Management  
**State:** Tamil Nadu  
**Level:** All Government Levels (State, District, Municipal, Gram Panchayat)  
**Problem Statement:** Water Quality Monitoring System  

---

## 📚 Documentation

- [API Documentation](./docs/API_DOCUMENTATION.md)
- [Setup Guide](./docs/SETUP_GUIDE.md)
- [Deployment Guide](./docs/DEPLOYMENT_GUIDE.md)
- [Database Schema](./docs/DATABASE_SCHEMA.md)
- [User Guide](./docs/USER_GUIDE.md)
- [SIH Submission](./docs/SIH_SUBMISSION.md)

---

## 👥 Team

- **Lead Developer:** selva47official
- **Tech Stack:** Full Stack JavaScript (React, Node.js, PostgreSQL)
- **Timeline:** 4-6 weeks development
- **Target Release:** Smart India Hackathon Finals

---

## 📝 License

MIT License - See [LICENSE](./LICENSE) file

---

## 📞 Contact & Support

- **GitHub:** [@selva47official](https://github.com/selva47official)
- **For Issues:** Create a GitHub issue in this repository

---

## 🙏 Acknowledgments

- Government of Tamil Nadu
- Jal Shakti Ministry
- Smart India Hackathon Team
- Open Source Community

---

**Last Updated:** August 2026  
**Status:** 🚧 Under Active Development  
**Next Milestone:** Backend API Setup

```
💧 Value of Water - Making Clean Water Accessible to All 💧
```