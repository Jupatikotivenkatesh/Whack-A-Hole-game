# 🚀 Render Deployment Guide - Whack-a-Mole Game

## ✅ What's Been Updated for Cloud Deployment

Your application is now **cloud-ready** with the following changes:

### 1. **application.properties** - Environment Variables
- Database URL: `${DB_URL:jdbc:mysql://localhost:3306/whackamole_db?...}`
- Database Username: `${DB_USER:root}`
- Database Password: `${DB_PASSWORD:root}`
- Server Port: `${PORT:8080}`

### 2. **WebConfig.java** - CORS Configuration
- Allows cross-origin requests from production URLs
- Configurable via `CORS_ALLOWED_ORIGINS` environment variable
- Defaults to localhost for local development

### 3. **index.html** - Dynamic API URL
- Added `BASE_URL` variable that auto-detects environment
- Works on localhost: `http://localhost:8080`
- Works on production: `https://your-app.onrender.com`

### 4. **pom.xml** - Build Configuration
- Spring Boot Maven Plugin configured for executable JAR
- Ready for `mvn clean package` deployment

---

## 📋 Prerequisites

Before deploying to Render, ensure you have:

1. ✅ A [Render account](https://render.com) (free tier available)
2. ✅ Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. ✅ MySQL database credentials ready

---

## 🗄️ Step 1: Create MySQL Database on Render

### Option A: Use Render's Managed MySQL (Recommended)
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **PostgreSQL** (Note: Render doesn't offer managed MySQL, see alternatives below)

### Option B: Use External MySQL Provider
Since Render doesn't provide managed MySQL, use one of these:

#### **PlanetScale** (Recommended - Free Tier)
1. Sign up at [planetscale.com](https://planetscale.com)
2. Create a new database: `whackamole_db`
3. Get connection string from dashboard
4. Format: `mysql://username:password@host:3306/whackamole_db`

#### **Railway** (Alternative)
1. Sign up at [railway.app](https://railway.app)
2. Create MySQL database
3. Copy connection details

#### **AWS RDS** (Production Grade)
1. Create MySQL instance on AWS RDS
2. Configure security groups for Render IP ranges
3. Get connection endpoint

---

## 🚀 Step 2: Deploy Backend to Render

### 2.1 Create Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **Web Service**
3. Connect your Git repository
4. Configure the service:

```
Name: whackamole-backend
Environment: Java
Region: Choose closest to your users
Branch: main (or your default branch)
Build Command: cd backend && mvn clean package -DskipTests
Start Command: cd backend && java -jar target/whackamole-backend-1.0.0.jar
```

### 2.2 Set Environment Variables

In the Render dashboard, add these environment variables:

| Key | Value | Example |
|-----|-------|---------|
| `DB_URL` | Your MySQL connection URL | `jdbc:mysql://aws.connect.psdb.cloud/whackamole_db?sslMode=VERIFY_IDENTITY` |
| `DB_USER` | Database username | `your_db_username` |
| `DB_PASSWORD` | Database password | `your_db_password` |
| `PORT` | Server port (Render sets this) | `8080` (auto-set by Render) |
| `CORS_ALLOWED_ORIGINS` | Your frontend URL | `https://whackamole-backend.onrender.com` |

**Important Notes:**
- For PlanetScale, use SSL connection: add `?sslMode=VERIFY_IDENTITY` to URL
- `PORT` is automatically set by Render, but you can override if needed
- `CORS_ALLOWED_ORIGINS` should include your Render app URL

### 2.3 Advanced Settings (Optional)

```
Health Check Path: /api/health
Auto-Deploy: Yes (deploys on git push)
```

---

## 🌐 Step 3: Verify Deployment

### 3.1 Check Build Logs
1. Go to your service in Render dashboard
2. Click **Logs** tab
3. Wait for build to complete (5-10 minutes first time)
4. Look for: `Started WhackAMoleApplication in X seconds`

### 3.2 Test API Endpoints

Once deployed, test your endpoints:

```bash
# Health check
curl https://your-app.onrender.com/api/health

# Get leaderboard
curl https://your-app.onrender.com/api/leaderboard

# Post score (test)
curl -X POST https://your-app.onrender.com/api/scores \
  -H "Content-Type: application/json" \
  -d '{"playerName":"TestPlayer","score":100,"theme":"classic","difficulty":"easy"}'
```

### 3.3 Access Your Game

Open your browser and go to:
```
https://your-app.onrender.com
```

The game should load and connect to the backend automatically!

---

## 🔧 Step 4: Update CORS for Production

After deployment, update the CORS configuration:

1. Get your Render URL: `https://whackamole-backend.onrender.com`
2. In Render dashboard, update environment variable:
   ```
   CORS_ALLOWED_ORIGINS=https://whackamole-backend.onrender.com,http://localhost:8080
   ```
3. Click **Save Changes** (this will redeploy)

---

## 🐛 Troubleshooting

### Issue: "Application failed to start"
**Solution:** Check logs for database connection errors
- Verify `DB_URL`, `DB_USER`, `DB_PASSWORD` are correct
- Ensure database allows connections from Render IPs
- For PlanetScale, verify SSL mode is set

### Issue: "CORS error in browser console"
**Solution:** Update CORS configuration
- Add your Render URL to `CORS_ALLOWED_ORIGINS`
- Format: `https://your-app.onrender.com` (no trailing slash)
- Redeploy after changing environment variables

### Issue: "502 Bad Gateway"
**Solution:** Check if application is listening on correct port
- Render sets `PORT` environment variable automatically
- Verify `server.port=${PORT:8080}` in application.properties
- Check logs for port binding errors

### Issue: "Database connection timeout"
**Solution:** Verify database accessibility
- Check database is running and accessible
- Verify connection string format
- For PlanetScale: use `?sslMode=VERIFY_IDENTITY`
- For Railway: check if database is sleeping (free tier)

### Issue: "Build fails with Maven errors"
**Solution:** Verify build command
- Ensure `cd backend` is in build command
- Try: `cd backend && mvn clean package -DskipTests -U`
- Check Java version matches (Java 17)

---

## 📊 Monitoring & Maintenance

### View Logs
```bash
# In Render dashboard
1. Go to your service
2. Click "Logs" tab
3. Filter by severity (Info, Warning, Error)
```

### Database Maintenance
- Monitor database size (free tiers have limits)
- Consider adding indexes for better performance:
  ```sql
  CREATE INDEX idx_score ON scores(score DESC);
  CREATE INDEX idx_date ON scores(date DESC);
  ```

### Performance Optimization
- Enable connection pooling (already configured in application.properties)
- Monitor response times in Render metrics
- Consider upgrading to paid tier for better performance

---

## 💰 Cost Considerations

### Free Tier Limits
- **Render Web Service:** Free tier available (spins down after inactivity)
- **PlanetScale:** 5GB storage, 1 billion row reads/month
- **Railway:** $5 free credit/month

### Paid Tier Benefits
- No spin-down (instant response)
- Better performance
- More database storage
- Custom domains

---

## 🎯 Next Steps

1. ✅ Deploy to Render following steps above
2. ✅ Test all game features in production
3. ✅ Share your game URL with friends!
4. 🔄 Set up custom domain (optional)
5. 📈 Monitor usage and performance

---

## 📞 Support

If you encounter issues:
1. Check Render logs first
2. Verify all environment variables
3. Test database connection separately
4. Review this guide's troubleshooting section

---

## 🎉 Success Checklist

- [ ] MySQL database created and accessible
- [ ] Environment variables configured in Render
- [ ] Build completes successfully
- [ ] Application starts without errors
- [ ] Health endpoint responds: `/api/health`
- [ ] Leaderboard loads: `/api/leaderboard`
- [ ] Game loads in browser
- [ ] Can save scores successfully
- [ ] CORS working (no console errors)

---

**Your Whack-a-Mole game is now production-ready! 🎮🚀**
