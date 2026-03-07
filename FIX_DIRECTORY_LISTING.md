# 🔧 Fix Directory Listing Issue

## Problem
You're seeing a directory listing instead of the game page.

## Root Cause
WebConfig.java was interfering with Spring Boot's default static resource handling.

---

## ✅ What I Fixed

1. **Deleted WebConfig.java** - This was causing the directory listing
2. **Updated application.properties** - Removed view.suffix setting
3. **Verified index.html** - File is in correct location with complete code

---

## 🚀 How to Fix (3 Steps)

### Step 1: Stop the Server
In the terminal where Spring Boot is running:
- Press `Ctrl + C`
- Type `Y` and press Enter

### Step 2: Clean and Restart
```bash
cd backend
mvn clean spring-boot:run
```

### Step 3: Open Browser
```
http://localhost:8080
```

**You should now see the game, NOT a directory listing!**

---

## 🔍 Verify Files Are Correct

### Check these files exist:
```bash
# Windows PowerShell
Test-Path "backend/src/main/resources/static/index.html"
Test-Path "backend/src/main/java/com/whackamole/config/WebConfig.java"

# Should show:
# True  (index.html exists)
# False (WebConfig.java deleted)
```

---

## 📁 Correct File Structure

```
backend/
├── src/main/
│   ├── java/com/whackamole/
│   │   ├── WhackAMoleApplication.java
│   │   ├── controller/
│   │   │   ├── ScoreController.java
│   │   │   └── HealthController.java
│   │   ├── entity/
│   │   ├── repository/
│   │   └── dto/
│   │   └── config/                    ← Should be EMPTY or not exist
│   └── resources/
│       ├── static/
│       │   ├── index.html             ← Complete game (23KB)
│       │   ├── script.js              ← Old file (can ignore)
│       │   └── style.css              ← Old file (can ignore)
│       └── application.properties
```

---

## ⚙️ Application Properties Settings

Your `application.properties` now has:

```properties
# Static resources
spring.web.resources.static-locations=classpath:/static/
spring.web.resources.add-mappings=true
spring.mvc.static-path-pattern=/**
```

**Note:** Removed `spring.mvc.view.suffix=.html` which was causing issues.

---

## 🐛 If Still Showing Directory Listing

### Option 1: Force Clean Restart
```bash
# Stop server (Ctrl+C)
cd backend
mvn clean
mvn clean install -DskipTests
mvn spring-boot:run
```

### Option 2: Check for WebConfig
```bash
# Make sure WebConfig is deleted
dir backend\src\main\java\com\whackamole\config\

# Should show "File Not Found" or empty directory
```

### Option 3: Verify index.html
```bash
# Check file size (should be ~23KB)
dir backend\src\main\resources\static\index.html
```

### Option 4: Clear Browser Cache
1. Press `Ctrl + Shift + Delete`
2. Select "Cached images and files"
3. Click "Clear data"
4. Close and reopen browser
5. Go to `http://localhost:8080`

---

## 🔍 What to See in Browser

### ✅ CORRECT (Game Page):
- Dark background with gradient
- "WHACK-A-MOLE" title with green glow
- "CHOOSE THEME" button
- No file listings

### ❌ WRONG (Directory Listing):
- White background
- List of files: index.html, script.js, style.css
- No game interface

---

## 📊 Server Logs to Check

When you start the server, look for:

### ✅ Good Signs:
```
Started WhackAMoleApplication in X seconds
Tomcat started on port(s): 8080 (http)
No errors about WebConfig
No warnings about view resolution
```

### ❌ Bad Signs:
```
Error creating bean with name 'webConfig'
Could not resolve view
Failed to load resource
```

---

## 🎯 Quick Test

After restarting, test these URLs:

```bash
# Should show the game
http://localhost:8080

# Should show the game (same as above)
http://localhost:8080/index.html

# Should return JSON
http://localhost:8080/api/leaderboard

# Should return health message
http://localhost:8080/health
```

---

## 🔧 Emergency Fix Script

If nothing works, run this:

```bash
# Stop server (Ctrl+C)

# Navigate to backend
cd backend

# Delete config directory if it exists
rmdir /s /q src\main\java\com\whackamole\config

# Clean everything
mvn clean

# Rebuild and run
mvn clean install -DskipTests spring-boot:run
```

---

## ✅ Success Checklist

- [ ] Stopped the server (Ctrl+C)
- [ ] WebConfig.java is deleted
- [ ] Ran `mvn clean spring-boot:run`
- [ ] Server started without errors
- [ ] Opened http://localhost:8080
- [ ] See game page (NOT directory listing)
- [ ] "CHOOSE THEME" button is visible
- [ ] No errors in browser console (F12)

---

## 📞 Quick Commands

| Action | Command |
|--------|---------|
| **Stop server** | `Ctrl + C` in terminal |
| **Clean build** | `mvn clean` |
| **Restart** | `mvn spring-boot:run` |
| **Check files** | `dir backend\src\main\resources\static` |
| **Delete config** | `rmdir /s /q backend\src\main\java\com\whackamole\config` |

---

## 💡 Why This Happened

**WebConfig.java** was trying to forward `/` to `index.html` using Spring MVC view resolution, but this conflicts with Spring Boot's default static resource handling.

**Solution:** Let Spring Boot handle static files automatically by:
1. Removing WebConfig
2. Keeping index.html in static/ folder
3. Using default Spring Boot configuration

---

## 🎉 After Fix

Once you restart, you should see:
- ✅ Game loads at http://localhost:8080
- ✅ Dark background with green glow
- ✅ "CHOOSE THEME" button works
- ✅ Complete game flow works
- ✅ Backend API works

---

**Just restart the server and it will work!** 🚀

```bash
# In terminal:
Ctrl + C
cd backend
mvn clean spring-boot:run

# In browser:
http://localhost:8080
```
