# ⚡ Vercel Deployment - Quick Start (10 Minutes)

## 🎯 What You Need

Your project has **TWO parts**:
1. **Frontend** (HTML/CSS/JS) → Deploy to **Vercel**
2. **Backend** (Spring Boot Java) → Deploy to **Render**

---

## 🚀 Step-by-Step Deployment

### STEP 1: Deploy Backend (5 minutes)

1. **Create MySQL Database**
   - Go to https://planetscale.com
   - Create database: `whackamole_db`
   - Copy connection string

2. **Deploy to Render**
   - Go to https://dashboard.render.com
   - New + → Web Service
   - Connect your Git repo
   - Settings:
     ```
     Environment: Docker
     Dockerfile Path: ./Dockerfile
     ```
   - Environment Variables:
     ```
     DB_URL=jdbc:mysql://your-db-host:3306/whackamole_db?sslMode=VERIFY_IDENTITY
     DB_USER=your_username
     DB_PASSWORD=your_password
     CORS_ALLOWED_ORIGINS=*
     ```
   - Click **Create Web Service**
   - **COPY YOUR BACKEND URL:** `https://whackamole-backend.onrender.com`

---

### STEP 2: Update Frontend (2 minutes)

1. **Open `frontend/script.js`**

2. **Find line 5 and update:**
   ```javascript
   const BACKEND_URL = 'https://whackamole-backend.onrender.com';
   ```
   ☝️ Replace with YOUR actual Render URL

3. **Save and commit:**
   ```bash
   git add frontend/script.js
   git commit -m "Update backend URL"
   git push
   ```

---

### STEP 3: Deploy Frontend (3 minutes)

1. **Go to Vercel**
   - https://vercel.com/new

2. **Import Project**
   - Click **Add New** → **Project**
   - Select your Git repository
   - Click **Import**

3. **Configure:**
   ```
   Framework Preset: Other
   Root Directory: frontend
   Build Command: (leave empty)
   Output Directory: (leave empty)
   ```

4. **Deploy**
   - Click **Deploy**
   - Wait 1-2 minutes
   - **COPY YOUR FRONTEND URL:** `https://your-game.vercel.app`

---

### STEP 4: Update CORS (1 minute)

1. **Go back to Render Dashboard**
2. **Select your backend service**
3. **Environment tab**
4. **Update `CORS_ALLOWED_ORIGINS`:**
   ```
   CORS_ALLOWED_ORIGINS=https://your-game.vercel.app
   ```
   ☝️ Replace with YOUR actual Vercel URL

5. **Save Changes** (auto-redeploys)

---

## ✅ Test Your Game

1. **Open your Vercel URL:** `https://your-game.vercel.app`
2. **Play the game**
3. **Save a score**
4. **Check leaderboard**

If everything works → **SUCCESS!** 🎉

---

## 🐛 If Something's Wrong

### Game loads but can't save scores

**Check:**
1. Open browser console (F12)
2. Look for CORS error
3. Verify `CORS_ALLOWED_ORIGINS` in Render matches your Vercel URL exactly
4. No trailing slashes!

**Fix:**
```
CORS_ALLOWED_ORIGINS=https://your-game.vercel.app
```
(Not: `https://your-game.vercel.app/`)

### Backend not responding

**Check:**
1. Go to Render dashboard
2. Check logs for errors
3. Verify environment variables are set
4. Test: `https://your-backend.onrender.com/api/health`

### Vercel deployment fails

**Check:**
1. Verify `frontend/` folder exists
2. Check `vercel.json` is in root directory
3. Make sure all files are pushed to Git

---

## 📝 Quick Reference

### Your URLs
```
Frontend: https://your-game.vercel.app
Backend:  https://whackamole-backend.onrender.com
```

### Files to Update
```
frontend/script.js → Line 5 → BACKEND_URL
```

### Environment Variables (Render)
```
DB_URL=jdbc:mysql://...
DB_USER=username
DB_PASSWORD=password
CORS_ALLOWED_ORIGINS=https://your-game.vercel.app
```

---

## 🎊 Done!

Your game is now live on the internet!

**Share it:** `https://your-game.vercel.app`

---

## 💡 Pro Tips

1. **Free Tier Limits:**
   - Render spins down after 15 min → First load takes 30-60 sec
   - Vercel has no spin-down → Always fast

2. **Custom Domain:**
   - Vercel: Settings → Domains → Add your domain
   - Update CORS_ALLOWED_ORIGINS with new domain

3. **Updates:**
   - Frontend: Just push to Git → Auto-deploys
   - Backend: Push to Git → Auto-deploys

---

**Need help?** Check `VERCEL_DEPLOYMENT_GUIDE.md` for detailed instructions.
