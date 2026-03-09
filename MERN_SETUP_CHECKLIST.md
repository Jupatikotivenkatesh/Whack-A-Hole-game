# ✅ MERN Stack Setup Checklist

## 🎯 Migration Status: COMPLETE

Your project has been successfully migrated from Spring Boot to MERN stack!

---

## ✅ What Was Done

- [x] Deleted entire `backend/` folder (Java/Spring Boot)
- [x] Deleted `Dockerfile` (Java-based)
- [x] Deleted `pom.xml` (Maven configuration)
- [x] Created `server/` folder with Express.js backend
- [x] Created `server/package.json` with dependencies:
  - [x] express
  - [x] mongoose
  - [x] cors
  - [x] dotenv
  - [x] nodemon (dev dependency)
- [x] Created Express server (`server/server.js`)
- [x] Created Mongoose model (`server/models/Score.js`)
- [x] Created API routes (`server/routes/scores.js`)
- [x] Created database config (`server/config/database.js`)
- [x] Created environment files (`.env`, `.env.example`)
- [x] Updated `frontend/script.js` to use port 5000
- [x] Created comprehensive documentation

---

## 📋 Next Steps - Local Setup

### Step 1: Install Dependencies
```bash
cd server
npm install
```
- [ ] Dependencies installed successfully
- [ ] No errors in terminal

### Step 2: Setup MongoDB

**Option A: MongoDB Atlas (Recommended)**
- [ ] Created MongoDB Atlas account
- [ ] Created free cluster
- [ ] Created database user
- [ ] Whitelisted IP (0.0.0.0/0)
- [ ] Copied connection string
- [ ] Updated `server/.env` with connection string

**Option B: Local MongoDB**
- [ ] MongoDB installed
- [ ] MongoDB service started
- [ ] Using default connection string in `.env`

### Step 3: Configure Environment
```bash
cd server
# Edit .env file
```
- [ ] `MONGODB_URI` configured
- [ ] `PORT` set to 5000
- [ ] `CORS_ORIGINS` configured
- [ ] `NODE_ENV` set to development

### Step 4: Start Backend
```bash
cd server
npm run dev
```
- [ ] Server starts without errors
- [ ] See: "🚀 Server running on port 5000"
- [ ] See: "✅ MongoDB Connected"
- [ ] No connection errors

### Step 5: Test Backend
```bash
curl http://localhost:5000/api/health
```
- [ ] Health endpoint returns JSON
- [ ] Status is "UP"
- [ ] Database shows "Connected"

### Step 6: Test Frontend
- [ ] Open `frontend/index.html` in browser
- [ ] Game loads without errors
- [ ] No console errors (F12)
- [ ] Can see splash screen

### Step 7: Test Full Flow
- [ ] Click "CHOOSE THEME"
- [ ] Select a theme
- [ ] Select difficulty
- [ ] Play the game
- [ ] Save score with name
- [ ] Leaderboard displays score
- [ ] No errors in console

---

## 📋 Deployment Checklist

### Backend Deployment (Render)

- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] Web Service created
- [ ] Build command: `cd server && npm install`
- [ ] Start command: `cd server && npm start`
- [ ] Environment variables added:
  - [ ] `MONGODB_URI`
  - [ ] `PORT`
  - [ ] `CORS_ORIGINS`
  - [ ] `NODE_ENV`
- [ ] Deployment successful
- [ ] Health endpoint works
- [ ] Backend URL copied

### Frontend Deployment (Vercel)

- [ ] Backend URL updated in `frontend/script.js`
- [ ] Changes committed and pushed
- [ ] Vercel account created
- [ ] Project imported
- [ ] Root directory set to `frontend`
- [ ] Deployment successful
- [ ] Frontend URL copied

### Final Configuration

- [ ] CORS updated with frontend URL
- [ ] Backend redeployed
- [ ] Game tested in production
- [ ] Scores save successfully
- [ ] Leaderboard works

---

## 🧪 Testing Checklist

### Backend Tests
- [ ] `GET /api/health` returns 200
- [ ] `POST /api/scores` saves score
- [ ] `GET /api/leaderboard` returns top 10
- [ ] `GET /api/scores` returns all scores
- [ ] CORS headers present
- [ ] Error handling works

### Frontend Tests
- [ ] Game loads
- [ ] Theme selection works
- [ ] Difficulty selection works
- [ ] Game plays correctly
- [ ] Timer counts down
- [ ] Score increments
- [ ] Game ends properly
- [ ] Score saves to backend
- [ ] Leaderboard displays
- [ ] Play again works

### Integration Tests
- [ ] Frontend connects to backend
- [ ] No CORS errors
- [ ] Scores persist in database
- [ ] Leaderboard updates in real-time
- [ ] Multiple players can save scores
- [ ] Scores sorted correctly

---

## 📊 Verification Commands

### Check Backend
```bash
# Health check
curl http://localhost:5000/api/health

# Save test score
curl -X POST http://localhost:5000/api/scores \
  -H "Content-Type: application/json" \
  -d '{"playerName":"Test","score":100,"theme":"classic","difficulty":"easy"}'

# Get leaderboard
curl http://localhost:5000/api/leaderboard
```

### Check MongoDB
```bash
# Connect to MongoDB
mongosh

# Use database
use whackamole

# Show collections
show collections

# Find all scores
db.scores.find()

# Count scores
db.scores.countDocuments()
```

### Check Processes
```bash
# Check if server is running
netstat -ano | findstr :5000

# Check Node processes
ps aux | grep node
```

---

## 🐛 Troubleshooting Checklist

### MongoDB Issues
- [ ] MongoDB service is running
- [ ] Connection string is correct
- [ ] Database user has permissions
- [ ] IP is whitelisted (Atlas)
- [ ] Network allows MongoDB port

### Server Issues
- [ ] Port 5000 is not in use
- [ ] Dependencies are installed
- [ ] .env file exists and is configured
- [ ] No syntax errors in code
- [ ] Node.js version is 18+

### Frontend Issues
- [ ] BACKEND_URL is correct
- [ ] Backend is running
- [ ] CORS is configured
- [ ] No console errors
- [ ] Browser cache cleared

### Deployment Issues
- [ ] Environment variables set
- [ ] Build command is correct
- [ ] Start command is correct
- [ ] MongoDB Atlas is accessible
- [ ] CORS includes production URL

---

## 📚 Documentation Reference

- [ ] Read `START_MERN_PROJECT.md`
- [ ] Read `MERN_MIGRATION_GUIDE.md`
- [ ] Read `MERN_DEPLOYMENT_GUIDE.md`
- [ ] Read `server/README.md`
- [ ] Read `MIGRATION_SUMMARY.md`

---

## 🎉 Success Criteria

Your migration is successful when:

- [x] Backend folder deleted
- [x] Server folder created
- [x] Dependencies installed
- [ ] MongoDB connected
- [ ] Server running on port 5000
- [ ] Frontend connects to backend
- [ ] Game works end-to-end
- [ ] Scores save to database
- [ ] Leaderboard displays correctly
- [ ] No errors in console or logs

---

## 💡 Quick Commands

```bash
# Install dependencies
cd server && npm install

# Start development server
cd server && npm run dev

# Start production server
cd server && npm start

# Test API
curl http://localhost:5000/api/health

# Open frontend
open frontend/index.html
```

---

## 🚀 You're Ready!

Once all checkboxes are complete, your MERN stack Whack-a-Mole game is ready to go!

**Start developing:**
```bash
cd server
npm run dev
```

**Happy coding! 🎮**
