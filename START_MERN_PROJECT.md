# ⚡ Quick Start - MERN Stack Whack-a-Mole

## 🚀 Get Running in 5 Minutes

### Step 1: Install Dependencies (1 min)

```bash
cd server
npm install
```

### Step 2: Setup MongoDB (2 min)

**Option A: Use MongoDB Atlas (Recommended)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create free cluster (M0)
4. Get connection string
5. Update `server/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/whackamole
   ```

**Option B: Use Local MongoDB**

1. Install MongoDB: https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Keep default in `server/.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/whackamole
   ```

### Step 3: Start Backend (1 min)

```bash
cd server
npm run dev
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB Connected
```

### Step 4: Open Frontend (1 min)

**Option A: Direct File**
- Open `frontend/index.html` in your browser

**Option B: Local Server**
```bash
# Python
cd frontend
python -m http.server 8080

# Node.js
npx http-server frontend -p 8080
```

Then open: http://localhost:8080

### Step 5: Play! 🎮

1. Click "CHOOSE THEME"
2. Select theme and difficulty
3. Play the game
4. Save your score
5. Check the leaderboard

---

## ✅ Verification Checklist

- [ ] Backend running on port 5000
- [ ] MongoDB connected (check terminal)
- [ ] Frontend opens without errors
- [ ] Can play the game
- [ ] Can save scores
- [ ] Leaderboard displays scores

---

## 🐛 Quick Troubleshooting

### Backend won't start?
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Or change port in server/.env
PORT=3001
```

### MongoDB connection error?
```bash
# Check .env file
cat server/.env

# Verify MongoDB is running (if local)
mongosh
```

### Frontend can't connect?
```bash
# Check backend is running
curl http://localhost:5000/api/health

# Check BACKEND_URL in frontend/script.js
# Should be: http://localhost:5000
```

---

## 📚 Documentation

- **Full Migration Guide:** `MERN_MIGRATION_GUIDE.md`
- **Deployment Guide:** `MERN_DEPLOYMENT_GUIDE.md`
- **Server README:** `server/README.md`

---

## 🎉 You're Ready!

Your MERN stack game is running locally. Ready to deploy? Check `MERN_DEPLOYMENT_GUIDE.md`!
