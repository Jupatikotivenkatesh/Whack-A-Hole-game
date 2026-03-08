# 🏗️ Deployment Architecture - Vercel + Render

## 🎯 Why Split Deployment?

Your project has **two different technologies**:
- **Frontend:** Static files (HTML, CSS, JavaScript)
- **Backend:** Java Spring Boot application

**Vercel** and **Render** each specialize in different types of applications:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│  ❌ WRONG: Deploy everything to Vercel                           │
│  Problem: Vercel doesn't support Java/Spring Boot                │
│                                                                   │
│  ❌ WRONG: Deploy everything to Render                           │
│  Problem: Inefficient for static frontend files                  │
│                                                                   │
│  ✅ CORRECT: Split deployment                                    │
│  Frontend → Vercel (optimized for static files)                  │
│  Backend → Render (supports Java/Docker)                         │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                         USER'S BROWSER                            │
│                                                                   │
│  Opens: https://your-game.vercel.app                             │
└───────────────────────────┬──────────────────────────────────────┘
                            │
                            │ Loads HTML/CSS/JS
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│                    VERCEL (Frontend Hosting)                      │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  frontend/                                                  │ │
│  │  ├── index.html    ← Game UI                               │ │
│  │  ├── style.css     ← Styling                               │ │
│  │  └── script.js     ← Game logic + API calls                │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  Features:                                                        │
│  ✅ Global CDN (fast loading worldwide)                          │
│  ✅ Automatic HTTPS                                              │
│  ✅ No spin-down (always fast)                                   │
│  ✅ Free tier: 100GB bandwidth/month                             │
└───────────────────────────┬──────────────────────────────────────┘
                            │
                            │ API Calls (fetch)
                            │ POST /api/scores
                            │ GET /api/leaderboard
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│                    RENDER (Backend Hosting)                       │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Docker Container                                           │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │  Spring Boot Application                              │ │ │
│  │  │  ├── REST API Endpoints                               │ │ │
│  │  │  │   ├── POST /api/scores                             │ │ │
│  │  │  │   ├── GET /api/leaderboard                         │ │ │
│  │  │  │   └── GET /api/health                              │ │ │
│  │  │  ├── JPA/Hibernate                                     │ │ │
│  │  │  └── MySQL Connector                                   │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  Features:                                                        │
│  ✅ Supports Docker/Java                                         │
│  ✅ Environment variables                                        │
│  ⚠️ Free tier spins down after 15 min                           │
│  ✅ 750 hours/month free                                         │
└───────────────────────────┬──────────────────────────────────────┘
                            │
                            │ JDBC Connection
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│                  PLANETSCALE (MySQL Database)                     │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  whackamole_db                                              │ │
│  │  ├── scores table                                           │ │
│  │  │   ├── id (PRIMARY KEY)                                  │ │
│  │  │   ├── playerName                                        │ │
│  │  │   ├── score                                             │ │
│  │  │   ├── theme                                             │ │
│  │  │   ├── difficulty                                        │ │
│  │  │   └── date                                              │ │
│  │  └── Indexes for performance                               │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  Features:                                                        │
│  ✅ Managed MySQL (no maintenance)                               │
│  ✅ Automatic backups                                            │
│  ✅ Free tier: 5GB storage                                       │
│  ✅ SSL/TLS encryption                                           │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Request Flow

### 1. User Opens Game
```
User → https://your-game.vercel.app
     → Vercel CDN serves index.html, style.css, script.js
     → Browser renders game UI
```

### 2. User Plays Game
```
User clicks moles → JavaScript updates score locally
                  → No backend calls (game runs in browser)
```

### 3. User Saves Score
```
User enters name → Click "Save Score"
                 → JavaScript calls: fetch('https://backend.onrender.com/api/scores')
                 → Render receives POST request
                 → Spring Boot validates data
                 → Saves to PlanetScale MySQL
                 → Returns success response
                 → Frontend shows "Score saved!"
```

### 4. Leaderboard Loads
```
Game Over screen → JavaScript calls: fetch('https://backend.onrender.com/api/leaderboard')
                 → Render receives GET request
                 → Spring Boot queries MySQL
                 → Returns top 10 scores
                 → Frontend displays leaderboard
```

---

## 🔐 Security & CORS

### Why CORS is Needed

```
Frontend Domain:  https://your-game.vercel.app
Backend Domain:   https://backend.onrender.com
                  ↑
                  Different domains = CORS required
```

### How CORS Works

1. **Browser makes request:**
   ```
   Origin: https://your-game.vercel.app
   → POST https://backend.onrender.com/api/scores
   ```

2. **Backend checks CORS:**
   ```java
   @Configuration
   public class WebConfig {
       allowedOrigins("https://your-game.vercel.app")
   }
   ```

3. **Backend responds:**
   ```
   Access-Control-Allow-Origin: https://your-game.vercel.app
   ```

4. **Browser allows request** ✅

### If CORS Not Configured

```
❌ Browser blocks request
❌ Console error: "blocked by CORS policy"
❌ Game can't save scores
```

---

## 📁 File Organization

### Root Directory
```
.
├── frontend/              ← Vercel deploys THIS folder
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/               ← Render deploys THIS folder
│   ├── pom.xml
│   └── src/
│
├── vercel.json            ← Vercel configuration
├── Dockerfile             ← Render Docker configuration
└── render.yaml            ← Render blueprint
```

### What Gets Deployed Where

**Vercel:**
- Only `frontend/` folder
- Serves as static files
- No build process needed
- Deployed to global CDN

**Render:**
- Entire `backend/` folder
- Builds Docker image
- Runs Spring Boot application
- Connects to MySQL database

---

## 💰 Cost Analysis

### Free Tier Comparison

| Feature | Vercel | Render | PlanetScale |
|---------|--------|--------|-------------|
| **Cost** | $0 | $0 | $0 |
| **Bandwidth** | 100GB/month | Unlimited | N/A |
| **Compute** | Unlimited | 750 hours/month | N/A |
| **Storage** | N/A | N/A | 5GB |
| **Spin-down** | Never | After 15 min | Never |
| **Cold start** | None | 30-60 sec | None |
| **Custom domain** | ✅ Yes | ✅ Yes | N/A |
| **HTTPS** | ✅ Auto | ✅ Auto | ✅ Required |

### When to Upgrade

**Vercel Pro ($20/month):**
- More bandwidth
- Team collaboration
- Advanced analytics

**Render Starter ($7/month):**
- No spin-down
- Faster response times
- Better for production

**PlanetScale Scaler ($29/month):**
- More storage
- More connections
- Production insights

---

## 🚀 Deployment Workflow

### Initial Deployment

```bash
# 1. Deploy Backend to Render
→ Create MySQL database
→ Deploy Spring Boot app
→ Get backend URL: https://backend.onrender.com

# 2. Update Frontend
→ Edit frontend/script.js
→ Set BACKEND_URL = 'https://backend.onrender.com'
→ Commit and push

# 3. Deploy Frontend to Vercel
→ Import Git repository
→ Set root directory: frontend
→ Deploy
→ Get frontend URL: https://your-game.vercel.app

# 4. Update CORS
→ Update CORS_ALLOWED_ORIGINS in Render
→ Set to: https://your-game.vercel.app
→ Redeploy backend
```

### Making Updates

**Frontend Changes:**
```bash
# Edit files in frontend/
git add frontend/
git commit -m "Update frontend"
git push
# Vercel auto-deploys ✅
```

**Backend Changes:**
```bash
# Edit files in backend/
git add backend/
git commit -m "Update backend"
git push
# Render auto-deploys ✅
```

---

## 🎯 Best Practices

### 1. Environment Variables
```
✅ DO: Use environment variables for URLs
❌ DON'T: Hardcode URLs in code

// Good
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

// Bad
const BACKEND_URL = 'https://backend.onrender.com';
```

### 2. Error Handling
```javascript
// Always handle API errors
try {
    const response = await fetch(`${BACKEND_URL}/api/scores`);
    if (!response.ok) {
        throw new Error('Failed to save score');
    }
} catch (error) {
    console.error('Error:', error);
    alert('Could not connect to backend');
}
```

### 3. CORS Configuration
```java
// Be specific with allowed origins
.allowedOrigins(
    "https://your-game.vercel.app",  // Production
    "http://localhost:8080"           // Local development
)

// Don't use "*" in production
.allowedOrigins("*")  // ❌ Security risk
```

### 4. Database Connections
```properties
# Use connection pooling
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5

# Set timeouts
spring.datasource.hikari.connection-timeout=30000
```

---

## 📊 Monitoring

### Vercel Dashboard
- Deployment history
- Build logs
- Bandwidth usage
- Analytics

### Render Dashboard
- Application logs
- CPU/Memory usage
- Response times
- Deployment history

### PlanetScale Dashboard
- Query insights
- Storage usage
- Connection count
- Slow queries

---

## 🎉 Summary

Your Whack-a-Mole game uses a modern, scalable architecture:

✅ **Frontend on Vercel** - Fast, global CDN, always available  
✅ **Backend on Render** - Docker-based, auto-scaling, easy deployment  
✅ **Database on PlanetScale** - Managed MySQL, automatic backups  

**Total Cost:** $0/month on free tiers  
**Performance:** Excellent for hobby/portfolio projects  
**Scalability:** Easy to upgrade when needed  

---

**Ready to deploy?** Follow `VERCEL_QUICK_START.md` for step-by-step instructions!
