# 🚀 Vercel + Render Deployment Guide

## 🎯 Architecture Overview

Your Whack-a-Mole game uses a **split deployment** architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  VERCEL (Frontend)              RENDER (Backend)             │
│  ├── HTML/CSS/JS                ├── Spring Boot              │
│  ├── Static hosting             ├── MySQL Database           │
│  └── Free tier                  └── REST API                 │
│                                                               │
│  https://your-game.vercel.app   https://your-api.onrender.com│
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**Why this setup?**
- ✅ Vercel is perfect for static frontend (HTML/CSS/JS)
- ✅ Render is perfect for Spring Boot backend (Java)
- ✅ Both have free tiers
- ✅ Easy to deploy and manage

---

## 📁 Project Structure

```
.
├── frontend/                    ← Deploy to Vercel
│   ├── index.html              ← Main game page
│   ├── style.css               ← Styles
│   └── script.js               ← Game logic + API calls
│
├── backend/                     ← Deploy to Render
│   ├── pom.xml                 ← Maven config
│   └── src/                    ← Spring Boot code
│
├── vercel.json                  ← Vercel configuration
├── Dockerfile                   ← Render Docker config
└── render.yaml                  ← Render blueprint
```

---

## 🚀 PART 1: Deploy Backend to Render

### Step 1: Create MySQL Database

**Option A: PlanetScale (Recommended - Free)**
1. Go to https://planetscale.com
2. Sign up and create database: `whackamole_db`
3. Get connection string:
   ```
   jdbc:mysql://aws.connect.psdb.cloud/whackamole_db?sslMode=VERIFY_IDENTITY
   ```

**Option B: Railway**
1. Go to https://railway.app
2. Create MySQL database
3. Copy connection details

### Step 2: Deploy Backend to Render

1. **Go to Render Dashboard**
   - https://dashboard.render.com

2. **Create Web Service**
   - Click **New +** → **Web Service**
   - Connect your Git repository

3. **Configure Service**
   ```
   Name: whackamole-backend
   Environment: Docker
   Dockerfile Path: ./Dockerfile
   Docker Context: .
   Region: Oregon (or closest)
   ```

4. **Set Environment Variables**
   ```
   DB_URL=jdbc:mysql://your-db-host:3306/whackamole_db?sslMode=VERIFY_IDENTITY
   DB_USER=your_username
   DB_PASSWORD=your_password
   CORS_ALLOWED_ORIGINS=https://your-game.vercel.app
   ```
   
   **IMPORTANT:** You'll update `CORS_ALLOWED_ORIGINS` after deploying frontend

5. **Deploy**
   - Click **Create Web Service**
   - Wait 5-10 minutes
   - Copy your backend URL: `https://whackamole-backend.onrender.com`

6. **Test Backend**
   ```bash
   curl https://whackamole-backend.onrender.com/api/health
   # Should return: {"status":"UP"}
   ```

---

## 🌐 PART 2: Deploy Frontend to Vercel

### Step 1: Update Backend URL

1. **Open `frontend/script.js`**
2. **Update line 5:**
   ```javascript
   const BACKEND_URL = 'https://whackamole-backend.onrender.com';
   ```
   Replace with your actual Render backend URL

3. **Save and commit:**
   ```bash
   git add frontend/script.js
   git commit -m "Update backend URL for production"
   git push
   ```

### Step 2: Deploy to Vercel

**Option A: Vercel Dashboard (Easiest)**

1. **Go to Vercel**
   - https://vercel.com/new

2. **Import Project**
   - Click **Add New** → **Project**
   - Import your Git repository

3. **Configure Project**
   ```
   Framework Preset: Other
   Root Directory: frontend
   Build Command: (leave empty)
   Output Directory: (leave empty)
   Install Command: (leave empty)
   ```

4. **Deploy**
   - Click **Deploy**
   - Wait 1-2 minutes
   - Copy your URL: `https://your-game.vercel.app`

**Option B: Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? whackamole-game
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

### Step 3: Update CORS in Backend

1. **Go to Render Dashboard**
2. **Select your backend service**
3. **Go to Environment tab**
4. **Update `CORS_ALLOWED_ORIGINS`:**
   ```
   CORS_ALLOWED_ORIGINS=https://your-game.vercel.app,http://localhost:8080
   ```
   Replace with your actual Vercel URL

5. **Save Changes** (triggers redeploy)

---

## ✅ PART 3: Test Your Deployment

### Test Frontend
1. Open your Vercel URL: `https://your-game.vercel.app`
2. Game should load with splash screen
3. Open browser console (F12)
4. Check for errors

### Test Backend Connection
1. Play the game
2. Save a score
3. Check if leaderboard updates
4. If errors, check console for CORS issues

### Common Issues

**Issue: CORS Error**
```
Access to fetch at 'https://...' has been blocked by CORS policy
```

**Solution:**
1. Verify `CORS_ALLOWED_ORIGINS` in Render includes your Vercel URL
2. Make sure there's no trailing slash
3. Redeploy backend after updating

**Issue: Backend URL Not Found**
```
Failed to fetch
```

**Solution:**
1. Check `BACKEND_URL` in `frontend/script.js`
2. Verify backend is running on Render
3. Test backend health endpoint directly

**Issue: Database Connection Failed**
```
Could not create connection to database server
```

**Solution:**
1. Check `DB_URL`, `DB_USER`, `DB_PASSWORD` in Render
2. Verify database is running
3. Check database allows connections from Render

---

## 📊 Deployment Checklist

### Backend (Render)
- [ ] MySQL database created
- [ ] Backend deployed to Render
- [ ] Environment variables set
- [ ] Health endpoint works: `/api/health`
- [ ] Leaderboard endpoint works: `/api/leaderboard`
- [ ] Backend URL copied

### Frontend (Vercel)
- [ ] `BACKEND_URL` updated in `script.js`
- [ ] Changes committed and pushed to Git
- [ ] Frontend deployed to Vercel
- [ ] Game loads in browser
- [ ] No console errors
- [ ] Vercel URL copied

### Integration
- [ ] `CORS_ALLOWED_ORIGINS` updated with Vercel URL
- [ ] Backend redeployed after CORS update
- [ ] Can play game end-to-end
- [ ] Can save scores
- [ ] Leaderboard displays correctly

---

## 🔧 Configuration Files

### vercel.json (Already Created)
```json
{
  "version": 2,
  "name": "whackamole-game",
  "buildCommand": "echo 'No build needed for static site'",
  "outputDirectory": "frontend"
}
```

### frontend/script.js (Update This)
```javascript
// Line 5 - UPDATE THIS URL
const BACKEND_URL = 'https://your-backend-app.onrender.com';
```

---

## 💰 Cost Breakdown

### Free Tier Limits

**Vercel Free Tier:**
- ✅ 100GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Custom domains
- ✅ Automatic HTTPS
- ✅ Perfect for this project

**Render Free Tier:**
- ✅ 750 hours/month
- ⚠️ Spins down after 15 min inactivity
- ⚠️ Cold start: 30-60 seconds
- ✅ Enough for hobby projects

**PlanetScale Free Tier:**
- ✅ 5GB storage
- ✅ 1 billion row reads/month
- ✅ More than enough

**Total Cost: $0/month** 🎉

---

## 🚀 Quick Commands Reference

### Deploy Frontend to Vercel
```bash
cd frontend
vercel --prod
```

### Update Backend URL
```bash
# Edit frontend/script.js
# Change BACKEND_URL to your Render URL
git add frontend/script.js
git commit -m "Update backend URL"
git push
```

### Test Endpoints
```bash
# Backend health
curl https://your-backend.onrender.com/api/health

# Leaderboard
curl https://your-backend.onrender.com/api/leaderboard

# Frontend
open https://your-game.vercel.app
```

---

## 📈 Monitoring

### Vercel Dashboard
- View deployments
- Check build logs
- Monitor bandwidth usage
- View analytics

### Render Dashboard
- View application logs
- Monitor CPU/memory
- Check response times
- View deployment history

---

## 🎉 Success!

Your game is now live:
- **Frontend:** `https://your-game.vercel.app`
- **Backend:** `https://your-backend.onrender.com`

Share your game URL with friends and start playing! 🎮

---

## 📚 Additional Resources

- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **PlanetScale Docs:** https://planetscale.com/docs

---

## 🐛 Troubleshooting

### Vercel Build Fails
- Check `vercel.json` is in root directory
- Verify `frontend/` folder exists
- Check all files are committed to Git

### Backend Not Responding
- Check Render logs for errors
- Verify environment variables are set
- Test database connection
- Check if service is sleeping (free tier)

### CORS Issues Persist
- Clear browser cache
- Check CORS_ALLOWED_ORIGINS exactly matches Vercel URL
- No trailing slashes in URLs
- Redeploy backend after CORS changes

---

**Your Whack-a-Mole game is now deployed! 🎊**
