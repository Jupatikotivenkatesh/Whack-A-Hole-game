# 🚀 MERN Stack Deployment Guide

## Quick Deployment (15 Minutes)

### Prerequisites
- MongoDB Atlas account (free)
- Render account (free)
- Vercel account (free)
- Git repository

---

## Part 1: Setup MongoDB Atlas (5 min)

### Step 1: Create Database

1. **Go to MongoDB Atlas**
   - https://www.mongodb.com/cloud/atlas

2. **Create Account & Cluster**
   - Sign up (free)
   - Create free cluster (M0)
   - Choose region closest to you

3. **Create Database User**
   - Database Access → Add New Database User
   - Username: `whackamole`
   - Password: Generate secure password
   - Save credentials

4. **Allow Network Access**
   - Network Access → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

5. **Get Connection String**
   - Clusters → Connect → Connect your application
   - Copy connection string:
     ```
     mongodb+srv://whackamole:<password>@cluster0.xxxxx.mongodb.net/whackamole?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual password

---

## Part 2: Deploy Backend to Render (5 min)

### Step 1: Prepare Code

1. **Commit changes:**
   ```bash
   git add .
   git commit -m "Migrate to MERN stack"
   git push
   ```

### Step 2: Create Web Service

1. **Go to Render**
   - https://dashboard.render.com

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your Git repository
   - Select repository

3. **Configure Service**
   ```
   Name: whackamole-server
   Environment: Node
   Region: Oregon (or closest)
   Branch: main
   Root Directory: (leave empty)
   Build Command: cd server && npm install
   Start Command: cd server && npm start
   ```

4. **Add Environment Variables**
   
   Click "Advanced" → "Add Environment Variable"
   
   ```
   MONGODB_URI=mongodb+srv://whackamole:password@cluster0.xxxxx.mongodb.net/whackamole
   PORT=5000
   CORS_ORIGINS=*
   NODE_ENV=production
   ```
   
   ⚠️ Replace with your actual MongoDB connection string

5. **Deploy**
   - Click "Create Web Service"
   - Wait 3-5 minutes
   - Check logs for: "✅ MongoDB Connected"
   - **Copy your backend URL:** `https://whackamole-server.onrender.com`

### Step 3: Test Backend

```bash
# Health check
curl https://whackamole-server.onrender.com/api/health

# Should return:
# {"status":"UP","message":"Whack-a-Mole API is running",...}
```

---

## Part 3: Deploy Frontend to Vercel (5 min)

### Step 1: Update Backend URL

1. **Edit `frontend/script.js`**
   
   Line 5:
   ```javascript
   const BACKEND_URL = 'https://whackamole-server.onrender.com';
   ```
   
   Replace with YOUR actual Render URL

2. **Commit changes:**
   ```bash
   git add frontend/script.js
   git commit -m "Update backend URL for production"
   git push
   ```

### Step 2: Deploy to Vercel

**Option A: Vercel Dashboard**

1. Go to https://vercel.com/new
2. Import your Git repository
3. Configure:
   ```
   Framework Preset: Other
   Root Directory: frontend
   Build Command: (leave empty)
   Output Directory: (leave empty)
   ```
4. Click "Deploy"
5. Wait 1-2 minutes
6. **Copy your frontend URL:** `https://your-game.vercel.app`

**Option B: Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod

# Follow prompts
```

### Step 3: Update CORS

1. **Go back to Render Dashboard**
2. Select your backend service
3. Click "Environment" tab
4. Update `CORS_ORIGINS`:
   ```
   CORS_ORIGINS=https://your-game.vercel.app
   ```
5. Click "Save Changes" (triggers redeploy)
6. Wait 1-2 minutes

---

## Part 4: Test Everything (2 min)

### Test Frontend
1. Open: `https://your-game.vercel.app`
2. Should see game splash screen
3. Open browser console (F12)
4. Check for errors

### Test Game Flow
1. Click "CHOOSE THEME"
2. Select theme
3. Select difficulty
4. Play game
5. Save score
6. Check leaderboard

### Test API
```bash
# Leaderboard
curl https://whackamole-server.onrender.com/api/leaderboard

# Should return array of scores
```

---

## 🎯 Deployment Checklist

### MongoDB Atlas
- [ ] Account created
- [ ] Cluster created
- [ ] Database user created
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string copied

### Backend (Render)
- [ ] Code pushed to Git
- [ ] Web Service created
- [ ] Environment variables set
- [ ] Deployment successful
- [ ] Health endpoint works
- [ ] Backend URL copied

### Frontend (Vercel)
- [ ] Backend URL updated in script.js
- [ ] Changes committed and pushed
- [ ] Deployed to Vercel
- [ ] Frontend URL copied

### Final Configuration
- [ ] CORS updated with frontend URL
- [ ] Backend redeployed
- [ ] Game tested end-to-end
- [ ] Scores save successfully
- [ ] Leaderboard displays

---

## 🐛 Common Issues

### Issue: MongoDB Connection Failed

**Error in Render logs:**
```
❌ Error connecting to MongoDB: MongoServerError
```

**Solutions:**
1. Check `MONGODB_URI` is correct
2. Verify password doesn't have special characters (URL encode if needed)
3. Confirm IP whitelist includes 0.0.0.0/0
4. Check database user has read/write permissions

### Issue: CORS Error

**Error in browser console:**
```
Access to fetch has been blocked by CORS policy
```

**Solutions:**
1. Update `CORS_ORIGINS` in Render with exact Vercel URL
2. No trailing slash in URL
3. Redeploy backend after updating
4. Clear browser cache

### Issue: Backend Sleeping (Free Tier)

**Symptom:** First request takes 30-60 seconds

**Explanation:** Render free tier spins down after 15 minutes of inactivity

**Solutions:**
1. Wait for cold start (normal behavior)
2. Upgrade to paid tier ($7/month) for no spin-down
3. Use a ping service to keep it awake

### Issue: Frontend Can't Connect

**Error:** Network error or timeout

**Solutions:**
1. Check `BACKEND_URL` in `frontend/script.js`
2. Verify backend is running (check health endpoint)
3. Check browser console for actual error
4. Verify CORS is configured

---

## 💰 Cost Breakdown

### Free Tier Limits

| Service | Free Tier | Limits |
|---------|-----------|--------|
| **MongoDB Atlas** | ✅ Free | 512MB storage, Shared CPU |
| **Render** | ✅ Free | 750 hours/month, Spins down after 15 min |
| **Vercel** | ✅ Free | 100GB bandwidth, Unlimited deployments |

**Total Cost: $0/month** 🎉

### When to Upgrade

**MongoDB Atlas Paid ($9/month):**
- More storage
- Dedicated resources
- Better performance

**Render Paid ($7/month):**
- No spin-down
- Faster response times
- Better for production

**Vercel Pro ($20/month):**
- More bandwidth
- Team collaboration
- Advanced analytics

---

## 📊 Environment Variables Reference

### Backend (.env)

```bash
# Required
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/whackamole
PORT=5000

# CORS (comma-separated)
CORS_ORIGINS=https://your-frontend.vercel.app,http://localhost:3000

# Optional
NODE_ENV=production
```

### Frontend (script.js)

```javascript
const BACKEND_URL = 'https://your-backend.onrender.com';
```

---

## 🔄 Making Updates

### Update Backend

```bash
# Make changes to server/ files
git add server/
git commit -m "Update backend"
git push

# Render auto-deploys ✅
```

### Update Frontend

```bash
# Make changes to frontend/ files
git add frontend/
git commit -m "Update frontend"
git push

# Vercel auto-deploys ✅
```

---

## 📈 Monitoring

### Render Dashboard
- View logs in real-time
- Monitor CPU/memory usage
- Check deployment history
- View metrics

### MongoDB Atlas
- Monitor database operations
- View query performance
- Check storage usage
- Set up alerts

### Vercel Dashboard
- View deployment logs
- Monitor bandwidth usage
- Check build times
- View analytics

---

## 🎉 Success!

Your MERN stack game is now live:

- **Frontend:** `https://your-game.vercel.app`
- **Backend:** `https://your-backend.onrender.com`
- **Database:** MongoDB Atlas

Share your game URL with friends! 🎮

---

## 📚 Additional Resources

- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com/
- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **Express.js Docs:** https://expressjs.com/
- **Mongoose Docs:** https://mongoosejs.com/

---

**Need help?** Check `MERN_MIGRATION_GUIDE.md` for detailed setup instructions.
