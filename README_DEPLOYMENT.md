# 🎮 Whack-a-Mole Game - Deployment Guide

## ⚠️ IMPORTANT: Vercel Cannot Deploy Spring Boot

**Your project has TWO parts that need SEPARATE deployments:**

1. **Frontend** (HTML/CSS/JS) → Deploy to **Vercel** ✅
2. **Backend** (Spring Boot Java) → Deploy to **Render** ✅

**Why?** Vercel only supports static files and serverless functions (Node.js, Python, Go). It **cannot** run Java Spring Boot applications.

---

## 🚀 Quick Deployment (10 Minutes)

### Step 1: Deploy Backend to Render
```
1. Go to https://dashboard.render.com
2. Create Web Service → Connect Git repo
3. Settings: Environment = Docker
4. Set environment variables (DB_URL, DB_USER, DB_PASSWORD)
5. Deploy → Copy backend URL
```

### Step 2: Update Frontend
```
1. Open frontend/script.js
2. Line 5: const BACKEND_URL = 'https://your-backend.onrender.com'
3. Save and push to Git
```

### Step 3: Deploy Frontend to Vercel
```
1. Go to https://vercel.com/new
2. Import Git repository
3. Root Directory: frontend
4. Deploy → Copy frontend URL
```

### Step 4: Update CORS
```
1. Go back to Render dashboard
2. Update CORS_ALLOWED_ORIGINS = 'https://your-frontend.vercel.app'
3. Save (auto-redeploys)
```

**Done!** Open your Vercel URL and play! 🎉

---

## 📁 Project Structure

```
.
├── frontend/                    ← Deploy to Vercel
│   ├── index.html              ← Game UI
│   ├── style.css               ← Styles
│   └── script.js               ← Game logic (UPDATE BACKEND_URL HERE)
│
├── backend/                     ← Deploy to Render
│   ├── pom.xml                 ← Maven config
│   └── src/                    ← Spring Boot code
│
├── vercel.json                  ← Vercel config (already set up)
├── Dockerfile                   ← Render Docker config (already set up)
└── render.yaml                  ← Render blueprint (already set up)
```

---

## 📚 Documentation

### Quick Start
- **VERCEL_QUICK_START.md** - 10-minute deployment guide

### Detailed Guides
- **VERCEL_DEPLOYMENT_GUIDE.md** - Complete step-by-step instructions
- **DEPLOYMENT_ARCHITECTURE.md** - How everything works together
- **RENDER_DEPLOYMENT_GUIDE.md** - Backend deployment details

### Configuration
- **ENVIRONMENT_VARIABLES.md** - All environment variables explained
- **DOCKER_DEPLOYMENT_GUIDE.md** - Docker configuration details

---

## ✅ What's Already Configured

### Frontend (Vercel)
- ✅ `vercel.json` created
- ✅ `frontend/` folder with all files
- ✅ Static site configuration
- ⚠️ **YOU NEED TO:** Update `BACKEND_URL` in `frontend/script.js`

### Backend (Render)
- ✅ `Dockerfile` created with correct WORKDIR
- ✅ `render.yaml` blueprint
- ✅ `application.properties` with environment variables
- ✅ `pom.xml` with all dependencies
- ✅ CORS configuration in `WebConfig.java`
- ⚠️ **YOU NEED TO:** Set environment variables in Render dashboard

---

## 🔧 Configuration Checklist

### Before Deploying

- [ ] MySQL database created (PlanetScale/Railway)
- [ ] Database connection details ready
- [ ] Code pushed to Git repository

### Backend Deployment (Render)

- [ ] Web Service created
- [ ] Environment variables set:
  - [ ] `DB_URL`
  - [ ] `DB_USER`
  - [ ] `DB_PASSWORD`
  - [ ] `CORS_ALLOWED_ORIGINS`
- [ ] Backend deployed successfully
- [ ] Backend URL copied

### Frontend Deployment (Vercel)

- [ ] `frontend/script.js` updated with backend URL
- [ ] Changes committed and pushed
- [ ] Vercel project created
- [ ] Root directory set to `frontend`
- [ ] Frontend deployed successfully
- [ ] Frontend URL copied

### Final Steps

- [ ] CORS updated with frontend URL
- [ ] Backend redeployed
- [ ] Game tested end-to-end
- [ ] Scores can be saved
- [ ] Leaderboard displays correctly

---

## 🐛 Common Issues

### Issue: "Vercel build fails"
**Cause:** Trying to deploy entire project including backend

**Solution:**
1. Set Root Directory to `frontend` in Vercel settings
2. Vercel should only deploy the frontend folder

### Issue: "CORS error in browser"
**Cause:** Backend doesn't allow requests from frontend domain

**Solution:**
1. Update `CORS_ALLOWED_ORIGINS` in Render
2. Set to your exact Vercel URL (no trailing slash)
3. Redeploy backend

### Issue: "Cannot connect to backend"
**Cause:** Wrong backend URL in frontend

**Solution:**
1. Check `BACKEND_URL` in `frontend/script.js`
2. Should match your Render backend URL exactly
3. Commit and redeploy frontend

### Issue: "Database connection failed"
**Cause:** Wrong database credentials

**Solution:**
1. Verify `DB_URL`, `DB_USER`, `DB_PASSWORD` in Render
2. Test database connection separately
3. Check database allows remote connections

---

## 💰 Cost

**Total: $0/month** (using free tiers)

- **Vercel:** Free tier (100GB bandwidth/month)
- **Render:** Free tier (750 hours/month, spins down after 15 min)
- **PlanetScale:** Free tier (5GB storage)

---

## 🎯 Your URLs

After deployment, you'll have:

```
Frontend: https://your-game.vercel.app
Backend:  https://your-backend.onrender.com
```

Share the **frontend URL** with friends to play your game!

---

## 📞 Need Help?

1. **Quick Start:** Read `VERCEL_QUICK_START.md`
2. **Detailed Guide:** Read `VERCEL_DEPLOYMENT_GUIDE.md`
3. **Architecture:** Read `DEPLOYMENT_ARCHITECTURE.md`
4. **Troubleshooting:** Check the guides above

---

## 🎉 Ready to Deploy?

Follow these guides in order:

1. **VERCEL_QUICK_START.md** - Start here (10 minutes)
2. **VERCEL_DEPLOYMENT_GUIDE.md** - Detailed instructions
3. **DEPLOYMENT_ARCHITECTURE.md** - Understand how it works

**Good luck! Your game will be live soon! 🚀**
