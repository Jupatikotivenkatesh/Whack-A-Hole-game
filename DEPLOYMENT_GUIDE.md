# 🚀 Complete Deployment Guide - Whack-a-Mole Game

## 📋 Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Running the Project](#running-the-project)
3. [Deployment Options](#deployment-options)
4. [Troubleshooting](#troubleshooting)

---

## 🛠️ Local Development Setup

### Prerequisites
- **Java 17+** - [Download](https://www.oracle.com/java/technologies/downloads/)
- **Maven 3.6+** - [Download](https://maven.apache.org/download.cgi)
- **MySQL 8.0+** - [Download](https://dev.mysql.com/downloads/mysql/)
- **Modern Web Browser** (Chrome, Firefox, Edge)

### Step 1: Install MySQL

#### Windows:
```bash
# Download MySQL Installer from https://dev.mysql.com/downloads/installer/
# Run installer and set root password

# Start MySQL service
net start MySQL80
```

#### macOS:
```bash
brew install mysql
brew services start mysql
```

#### Linux:
```bash
sudo apt-get install mysql-server
sudo systemctl start mysql
```

### Step 2: Create Database
```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE whackamole_db;

# Exit MySQL
exit;
```

### Step 3: Configure Backend
Edit `backend/src/main/resources/application.properties`:
```properties
# Update with your MySQL password
spring.datasource.password=your_mysql_password
```

---

## 🎮 Running the Project

### Option 1: Using Command Line (Recommended)

#### Terminal 1 - Start Backend:
```bash
# Navigate to backend folder
cd backend

# Clean and build
mvn clean install

# Run Spring Boot application
mvn spring-boot:run
```

Wait for: `Started WhackAMoleApplication in X seconds`

Backend will run on: `http://localhost:8080`

#### Terminal 2 - Start Frontend:

**Option A: Using Python (if installed)**
```bash
cd frontend
python -m http.server 8000
```
Open: `http://localhost:8000`

**Option B: Using Node.js (if installed)**
```bash
cd frontend
npx http-server -p 8000
```
Open: `http://localhost:8000`

**Option C: Direct File Access**
```bash
# Simply open frontend/index.html in your browser
# Right-click on index.html → Open with → Chrome/Firefox
```

### Option 2: Using IDE

#### IntelliJ IDEA:
1. Open project folder
2. Right-click on `WhackAMoleApplication.java`
3. Click "Run 'WhackAMoleApplication'"
4. Open `frontend/index.html` in browser

#### VS Code:
1. Open project folder
2. Install "Spring Boot Extension Pack"
3. Press F5 to run backend
4. Use "Live Server" extension for frontend

---

## 🌐 Deployment Options

### Option 1: Deploy to Render (Free - Recommended)

#### A. Deploy Backend

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create MySQL Database**
   - Click "New +" → "PostgreSQL" (Free tier)
   - Or use external MySQL: [PlanetScale](https://planetscale.com) (Free)
   - Note down connection details

3. **Deploy Backend**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Settings:
     ```
     Name: whackamole-backend
     Environment: Docker
     Region: Choose nearest
     Branch: main
     Root Directory: backend
     Build Command: mvn clean package -DskipTests
     Start Command: java -jar target/*.jar
     ```
   - Environment Variables:
     ```
     DB_URL=jdbc:mysql://your-db-host:3306/whackamole_db
     DB_USER=your_db_username
     DB_PASSWORD=your_db_password
     PORT=8080
     ```
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment
   - Note your backend URL: `https://whackamole-backend.onrender.com`

4. **Update Frontend**
   Edit `frontend/script.js`:
   ```javascript
   const BACKEND_URL = 'https://whackamole-backend.onrender.com';
   ```

#### B. Deploy Frontend

**Option 1: Netlify (Easiest)**
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop `frontend` folder
3. Done! Get URL like: `https://whackamole-game.netlify.app`

**Option 2: Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Set root directory to `frontend`
4. Deploy

**Option 3: GitHub Pages**
1. Create new repository
2. Upload frontend files
3. Go to Settings → Pages
4. Select branch and folder
5. Get URL: `https://username.github.io/whackamole`

---

### Option 2: Deploy to Railway (Free $5 Credit)

1. **Create Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Backend**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Add MySQL database from Railway
   - Set environment variables
   - Deploy

3. **Deploy Frontend**
   - Same as Render option above

---

### Option 3: Deploy to AWS (Advanced)

#### Backend (Elastic Beanstalk):
```bash
# Package application
cd backend
mvn clean package

# Create Elastic Beanstalk application
eb init -p java-17 whackamole-backend

# Create environment
eb create whackamole-env

# Deploy
eb deploy
```

#### Frontend (S3 + CloudFront):
```bash
# Upload to S3
aws s3 sync frontend/ s3://whackamole-frontend

# Enable static website hosting
aws s3 website s3://whackamole-frontend --index-document index.html
```

---

### Option 4: Deploy to Heroku

#### Backend:
```bash
cd backend

# Create Heroku app
heroku create whackamole-backend

# Add MySQL addon
heroku addons:create jawsdb:kitefin

# Deploy
git push heroku main
```

#### Frontend:
- Use Netlify or Vercel (free)

---

## 🔧 Troubleshooting

### Issue: White Screen in Browser

**Solution 1: Check Console**
```
1. Open browser
2. Press F12 (Developer Tools)
3. Go to Console tab
4. Look for errors
```

**Solution 2: CORS Error**
```
Error: "Access to fetch at 'http://localhost:8080' has been blocked by CORS"

Fix: Backend WebConfig.java is now included (already fixed)
```

**Solution 3: Backend Not Running**
```
Error: "Failed to fetch" or "net::ERR_CONNECTION_REFUSED"

Fix: Make sure backend is running on port 8080
Check: http://localhost:8080/api/health
```

### Issue: Targets Disappearing Too Early

**Fixed in latest code:**
- Each target now has individual timeout
- Targets only disappear when hit or timeout completes
- No premature clearing

### Issue: MySQL Connection Failed

**Solution:**
```bash
# Check MySQL is running
mysql -u root -p

# Check application.properties has correct password
# Check database exists:
SHOW DATABASES;
```

### Issue: Port 8080 Already in Use

**Solution:**
```bash
# Windows - Find and kill process
netstat -ano | findstr :8080
taskkill /PID <process_id> /F

# macOS/Linux
lsof -ti:8080 | xargs kill -9
```

---

## 📊 Testing Deployment

### Test Backend:
```bash
# Health check
curl https://your-backend-url.com/api/health

# Should return:
{"status":"UP","message":"Whack-a-Mole API is running"}
```

### Test Frontend:
1. Open deployed URL
2. Click "START GAME"
3. Select theme
4. Select difficulty
5. Play game
6. Save score
7. Check leaderboard

---

## 🎯 Quick Commands Reference

### Local Development:
```bash
# Start MySQL
net start MySQL80  # Windows
brew services start mysql  # macOS

# Start Backend
cd backend && mvn spring-boot:run

# Start Frontend
cd frontend && python -m http.server 8000
```

### Build for Production:
```bash
# Backend JAR
cd backend && mvn clean package

# Frontend (no build needed - static files)
# Just upload frontend folder
```

---

## 📝 Environment Variables for Deployment

### Backend:
```
DB_URL=jdbc:mysql://host:3306/whackamole_db
DB_USER=your_username
DB_PASSWORD=your_password
PORT=8080
CORS_ALLOWED_ORIGINS=https://your-frontend-url.com
```

### Frontend:
Update `script.js`:
```javascript
const BACKEND_URL = 'https://your-backend-url.com';
```

---

## ✅ Deployment Checklist

- [ ] MySQL database created
- [ ] Backend application.properties configured
- [ ] Backend runs locally without errors
- [ ] Frontend opens in browser locally
- [ ] Game works end-to-end locally
- [ ] Backend deployed to cloud
- [ ] Database connected to deployed backend
- [ ] Frontend BACKEND_URL updated
- [ ] Frontend deployed to cloud
- [ ] Test deployed game completely
- [ ] Check leaderboard functionality
- [ ] Verify score saving works

---

## 🆘 Need Help?

1. Check console errors (F12 in browser)
2. Check backend logs
3. Verify all environment variables
4. Test API endpoints directly
5. Check CORS configuration

---

## 🎉 Success!

Your Whack-a-Mole game is now live!

Share your game URL and enjoy! 🎮
