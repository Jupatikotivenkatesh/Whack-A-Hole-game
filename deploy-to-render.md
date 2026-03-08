# 🚀 Quick Deploy to Render - Copy & Paste Guide

## Step-by-Step Deployment (15 minutes)

### 📋 Prerequisites Checklist
- [ ] Git repository with your code
- [ ] Render account (sign up at https://render.com)
- [ ] MySQL database ready (PlanetScale recommended)

---

## 🗄️ STEP 1: Create MySQL Database (5 min)

### Using PlanetScale (Recommended - Free)

1. Go to https://planetscale.com and sign up
2. Click **Create database**
3. Name: `whackamole_db`
4. Region: Choose closest to you
5. Click **Create database**
6. Click **Connect** → **Create password**
7. Copy these values:
   ```
   Host: aws.connect.psdb.cloud
   Username: [your_username]
   Password: pscale_pw_[your_password]
   ```

8. Build your connection URL:
   ```
   jdbc:mysql://aws.connect.psdb.cloud/whackamole_db?sslMode=VERIFY_IDENTITY
   ```

---

## 🚀 STEP 2: Deploy to Render (5 min)

### 2.1 Create Web Service

1. Go to https://dashboard.render.com
2. Click **New +** → **Web Service**
3. Click **Connect account** (GitHub/GitLab/Bitbucket)
4. Select your repository
5. Click **Connect**

### 2.2 Configure Service

Fill in these fields:

```
Name: whackamole-game
Environment: Docker
Region: Oregon (US West) or closest to you
Branch: main

Build Command:
cd backend && mvn clean package -DskipTests

Start Command:
cd backend && java -jar target/whackamole-backend-1.0.0.jar

Instance Type: Free
```

### 2.3 Add Environment Variables

Click **Advanced** → **Add Environment Variable**

Add these 4 variables:

#### Variable 1: DB_URL
```
Key: DB_URL
Value: jdbc:mysql://aws.connect.psdb.cloud/whackamole_db?sslMode=VERIFY_IDENTITY
```
(Replace with your actual PlanetScale host)

#### Variable 2: DB_USER
```
Key: DB_USER
Value: [your_planetscale_username]
```

#### Variable 3: DB_PASSWORD
```
Key: DB_PASSWORD
Value: pscale_pw_[your_planetscale_password]
```

#### Variable 4: CORS_ALLOWED_ORIGINS
```
Key: CORS_ALLOWED_ORIGINS
Value: https://whackamole-game.onrender.com
```
(Replace `whackamole-game` with your actual service name)

### 2.4 Deploy

1. Click **Create Web Service**
2. Wait for build (5-10 minutes)
3. Watch the logs for: `Started WhackAMoleApplication`

---

## ✅ STEP 3: Test Your Deployment (2 min)

### 3.1 Get Your URL

Your app will be at:
```
https://[your-service-name].onrender.com
```

Example: `https://whackamole-game.onrender.com`

### 3.2 Test Endpoints

Open these URLs in your browser:

1. **Game Homepage:**
   ```
   https://whackamole-game.onrender.com
   ```
   Should show: Whack-a-Mole splash screen

2. **Health Check:**
   ```
   https://whackamole-game.onrender.com/api/health
   ```
   Should show: `{"status":"UP"}`

3. **Leaderboard:**
   ```
   https://whackamole-game.onrender.com/api/leaderboard
   ```
   Should show: `[]` (empty array initially)

### 3.3 Play the Game!

1. Open your game URL
2. Click **CHOOSE THEME**
3. Select a theme (Classic, Forest, or Space)
4. Click **Next**
5. Select difficulty (Easy, Medium, or Hard)
6. Click **Start Game**
7. Play and save your score!

---

## 🔧 STEP 4: Update CORS (1 min)

After first deployment, update CORS to match your actual URL:

1. Go to Render Dashboard → Your Service
2. Click **Environment** tab
3. Find `CORS_ALLOWED_ORIGINS`
4. Update value to your actual URL:
   ```
   https://whackamole-game.onrender.com
   ```
5. Click **Save Changes** (triggers redeploy)

---

## 📊 Monitoring Your App

### View Logs
1. Render Dashboard → Your Service
2. Click **Logs** tab
3. See real-time application logs

### Check Metrics
1. Click **Metrics** tab
2. View CPU, Memory, Response times

### Manual Deploy
1. Click **Manual Deploy** → **Deploy latest commit**
2. Useful after making code changes

---

## 🐛 Troubleshooting

### Build Failed
**Check:** Build logs for Maven errors
**Fix:** Ensure `pom.xml` is in `backend/` folder

### Application Won't Start
**Check:** Logs for database connection errors
**Fix:** Verify `DB_URL`, `DB_USER`, `DB_PASSWORD` are correct

### CORS Error in Browser
**Check:** Browser console for CORS errors
**Fix:** Update `CORS_ALLOWED_ORIGINS` to match your Render URL

### 502 Bad Gateway
**Check:** Application logs for startup errors
**Fix:** Ensure app is listening on `$PORT` (already configured)

### Database Connection Timeout
**Check:** PlanetScale database is active
**Fix:** Verify connection string includes `?sslMode=VERIFY_IDENTITY`

---

## 🎯 Quick Reference

### Your URLs
```
Game: https://[your-service-name].onrender.com
API: https://[your-service-name].onrender.com/api
Health: https://[your-service-name].onrender.com/api/health
Leaderboard: https://[your-service-name].onrender.com/api/leaderboard
```

### Environment Variables Template
```bash
DB_URL=jdbc:mysql://aws.connect.psdb.cloud/whackamole_db?sslMode=VERIFY_IDENTITY
DB_USER=your_username
DB_PASSWORD=pscale_pw_your_password
CORS_ALLOWED_ORIGINS=https://your-app.onrender.com
```

### Useful Commands
```bash
# Test health endpoint
curl https://your-app.onrender.com/api/health

# Test leaderboard
curl https://your-app.onrender.com/api/leaderboard

# Test save score
curl -X POST https://your-app.onrender.com/api/scores \
  -H "Content-Type: application/json" \
  -d '{"playerName":"Test","score":100,"theme":"classic","difficulty":"easy"}'
```

---

## 🎊 Success Checklist

After deployment, verify:

- [ ] Build completed successfully (green checkmark)
- [ ] Application started (see logs)
- [ ] Game loads at your Render URL
- [ ] Can select theme and difficulty
- [ ] Can play the game
- [ ] Can save score with name
- [ ] Leaderboard displays scores
- [ ] No errors in browser console

---

## 🔄 Making Updates

To update your deployed app:

1. Make changes locally
2. Test on localhost
3. Commit and push to Git:
   ```bash
   git add .
   git commit -m "Update game"
   git push
   ```
4. Render auto-deploys (if enabled)
5. Or click **Manual Deploy** in dashboard

---

## 💰 Free Tier Limits

**Render Free Tier:**
- ✅ 750 hours/month (enough for 1 app)
- ⚠️ Spins down after 15 min inactivity
- ⚠️ Cold start takes 30-60 seconds

**PlanetScale Free Tier:**
- ✅ 5GB storage
- ✅ 1 billion row reads/month
- ✅ More than enough for this game

**Upgrade if needed:**
- Render: $7/month (no spin-down)
- PlanetScale: $29/month (more storage)

---

## 🎉 You're Done!

Your Whack-a-Mole game is now live on the internet! 🌐

Share your URL with friends:
```
https://whackamole-game.onrender.com
```

**Happy Gaming! 🎮🚀**

---

## 📚 Additional Resources

- Full Guide: `RENDER_DEPLOYMENT_GUIDE.md`
- Environment Variables: `ENVIRONMENT_VARIABLES.md`
- Summary: `CLOUD_READY_SUMMARY.md`
- Troubleshooting: `TROUBLESHOOTING.md`
