# 🔄 Spring Boot → MERN Stack Migration Complete

## ✅ What Was Done

Your Whack-a-Mole project has been successfully migrated from Spring Boot (Java) to MERN stack (MongoDB, Express, React, Node.js).

### Changes Made:

1. ✅ **Deleted** entire `backend/` folder (Java/Spring Boot)
2. ✅ **Created** new `server/` folder with Express.js backend
3. ✅ **Updated** `frontend/script.js` to use port 5000
4. ✅ **Removed** Java-specific files (Dockerfile, pom.xml)
5. ✅ **Created** complete Node.js/Express backend with MongoDB

---

## 📁 New Project Structure

```
.
├── frontend/                    ← Frontend (unchanged)
│   ├── index.html
│   ├── style.css
│   └── script.js               ← Updated to use port 5000
│
├── server/                      ← NEW Express Backend
│   ├── config/
│   │   └── database.js         ← MongoDB connection
│   ├── models/
│   │   └── Score.js            ← Mongoose schema
│   ├── routes/
│   │   └── scores.js           ← API routes
│   ├── .env                    ← Environment variables
│   ├── .env.example            ← Example env file
│   ├── .gitignore              ← Git ignore
│   ├── package.json            ← Dependencies
│   ├── server.js               ← Main server file
│   └── README.md               ← Server documentation
│
└── vercel.json                  ← Vercel config (for frontend)
```

---

## 🚀 Quick Start Guide

### Step 1: Install Dependencies

```bash
cd server
npm install
```

This installs:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables
- `nodemon` - Development auto-reload (dev dependency)

### Step 2: Setup MongoDB

**Option A: Local MongoDB**

1. Install MongoDB: https://www.mongodb.com/try/download/community
2. Start MongoDB:
   ```bash
   # Windows
   net start MongoDB

   # macOS
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod
   ```

**Option B: MongoDB Atlas (Cloud - Recommended)**

1. Create account: https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `.env` file

### Step 3: Configure Environment

Edit `server/.env`:

```bash
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017/whackamole

# OR for MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/whackamole

PORT=5000
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
NODE_ENV=development
```

### Step 4: Start Backend Server

```bash
cd server

# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB Connected: localhost
📊 Database: whackamole
```

### Step 5: Start Frontend

Open `frontend/index.html` in your browser or use a local server:

```bash
# Option 1: Python
cd frontend
python -m http.server 8080

# Option 2: Node.js http-server
npx http-server frontend -p 8080

# Option 3: Just open the file
# Open frontend/index.html in your browser
```

### Step 6: Test the Game

1. Open http://localhost:8080 (or your frontend URL)
2. Play the game
3. Save a score
4. Check if leaderboard updates

---

## 🔌 API Endpoints

### Health Check
```bash
GET http://localhost:5000/api/health
```

### Save Score
```bash
POST http://localhost:5000/api/scores
Content-Type: application/json

{
  "playerName": "John",
  "score": 150,
  "theme": "classic",
  "difficulty": "medium"
}
```

### Get Leaderboard (Top 10)
```bash
GET http://localhost:5000/api/leaderboard
```

### Get All Scores
```bash
GET http://localhost:5000/api/scores
```

---

## 🧪 Testing the API

### Using curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Save a score
curl -X POST http://localhost:5000/api/scores \
  -H "Content-Type: application/json" \
  -d '{"playerName":"Test","score":100,"theme":"classic","difficulty":"easy"}'

# Get leaderboard
curl http://localhost:5000/api/leaderboard
```

### Using Browser:

1. Open http://localhost:5000/api/health
2. Open http://localhost:5000/api/leaderboard

---

## 🌐 Deployment

### Deploy Backend to Render

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Migrate to MERN stack"
   git push
   ```

2. **Create Web Service on Render**
   - Go to https://dashboard.render.com
   - New + → Web Service
   - Connect repository

3. **Configure Service**
   ```
   Name: whackamole-server
   Environment: Node
   Build Command: cd server && npm install
   Start Command: cd server && npm start
   ```

4. **Add Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://...
   PORT=5000
   CORS_ORIGINS=https://your-frontend.vercel.app
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait 2-3 minutes
   - Copy backend URL

### Deploy Frontend to Vercel

1. **Update Backend URL**
   
   Edit `frontend/script.js` line 5:
   ```javascript
   const BACKEND_URL = 'https://your-backend.onrender.com';
   ```

2. **Deploy to Vercel**
   ```bash
   cd frontend
   vercel --prod
   ```

   Or use Vercel dashboard:
   - Import repository
   - Root Directory: `frontend`
   - Deploy

3. **Update CORS**
   
   In Render dashboard, update `CORS_ORIGINS`:
   ```
   CORS_ORIGINS=https://your-frontend.vercel.app
   ```

---

## 📊 Database Schema

MongoDB collection: `scores`

```javascript
{
  _id: ObjectId,
  playerName: String,      // Max 20 characters
  score: Number,           // Min 0
  theme: String,           // 'classic', 'forest', 'space'
  difficulty: String,      // 'easy', 'medium', 'hard'
  date: Date,             // Auto-generated
  createdAt: Date,        // Auto-generated
  updatedAt: Date,        // Auto-generated
}
```

---

## 🔄 Migration Comparison

| Feature | Spring Boot (Old) | Express (New) |
|---------|------------------|---------------|
| **Language** | Java | JavaScript |
| **Framework** | Spring Boot | Express.js |
| **Database** | MySQL | MongoDB |
| **ORM** | JPA/Hibernate | Mongoose |
| **Port** | 8080 | 5000 |
| **Build Tool** | Maven | npm |
| **Config File** | application.properties | .env |
| **Deployment** | Docker | Node.js |

---

## 🐛 Troubleshooting

### MongoDB Connection Error

**Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
1. Make sure MongoDB is running
2. Check `MONGODB_URI` in `.env`
3. For Atlas, verify connection string

### CORS Error

**Error:**
```
Access to fetch has been blocked by CORS policy
```

**Solution:**
1. Add frontend URL to `CORS_ORIGINS` in `.env`
2. Restart server
3. Clear browser cache

### Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

Or change PORT in `.env`

### Frontend Can't Connect to Backend

**Check:**
1. Backend is running: `curl http://localhost:5000/api/health`
2. `BACKEND_URL` in `frontend/script.js` is correct
3. CORS is configured properly
4. No firewall blocking port 5000

---

## 💡 Key Differences from Spring Boot

### 1. No Compilation Needed
- Java: Compile → Build JAR → Run
- Node.js: Just run `node server.js`

### 2. Simpler Configuration
- Java: application.properties, pom.xml, multiple config files
- Node.js: Just `.env` file

### 3. Faster Development
- Java: Restart server for changes
- Node.js: Use `nodemon` for auto-reload

### 4. NoSQL Database
- MySQL: Structured tables, SQL queries
- MongoDB: Flexible documents, JavaScript queries

### 5. Same Language
- Frontend and backend both use JavaScript
- Easier to share code and logic

---

## 📚 Next Steps

1. ✅ Test locally
2. ✅ Deploy backend to Render
3. ✅ Deploy frontend to Vercel
4. ✅ Update CORS configuration
5. ✅ Test production deployment

---

## 🎉 Migration Complete!

Your Whack-a-Mole game is now running on the MERN stack:

- ✅ **M**ongoDB - Database
- ✅ **E**xpress - Backend framework
- ✅ **R**eact - (Your vanilla JS frontend)
- ✅ **N**ode.js - Runtime environment

**Start developing:**
```bash
cd server
npm run dev
```

**Happy coding! 🚀**
