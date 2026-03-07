# 🔧 DIRECTORY LISTING FIX - Quick Solution

## Problem
You're seeing a directory listing (list of files) instead of the game.

## Solution
WebConfig.java was causing the issue. I've deleted it.

---

## 🚀 Fix in 3 Steps

### Step 1: Stop the Server
In your terminal where Spring Boot is running:
```
Press: Ctrl + C
Type: Y
Press: Enter
```

### Step 2: Restart the Server
```bash
cd backend
mvn clean spring-boot:run
```

### Step 3: Refresh Browser
```
Go to: http://localhost:8080
Press: Ctrl + Shift + R (hard refresh)
```

**You should now see the game!** 🎮

---

## ⚡ Even Faster - Use the Script

**Double-click:** `restart-server.bat`

This will:
1. Navigate to backend
2. Clean old files
3. Restart server

Then open: `http://localhost:8080`

---

## ✅ What I Fixed

1. **Deleted** `backend/src/main/java/com/whackamole/config/WebConfig.java`
2. **Updated** `application.properties` (removed view.suffix)
3. **Verified** `index.html` is in correct location

---

## 🔍 What You Should See

### ✅ CORRECT:
- Dark background with gradient
- "WHACK-A-MOLE" title (glowing green)
- "CHOOSE THEME" button
- Modern game interface

### ❌ WRONG:
- White background
- List of files (index.html, script.js, style.css)
- No game interface

---

## 🐛 If Still Not Working

### Try this:
```bash
# Stop server (Ctrl+C)
cd backend
mvn clean
mvn clean install -DskipTests
mvn spring-boot:run
```

### Then:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Close browser completely
3. Reopen browser
4. Go to http://localhost:8080

---

## 📊 Files Status

| File | Status |
|------|--------|
| `index.html` | ✅ Exists (23KB, complete game) |
| `WebConfig.java` | ✅ Deleted (was causing issue) |
| `application.properties` | ✅ Updated (correct settings) |
| `ScoreController.java` | ✅ Working (API endpoints) |

---

## 🎯 Quick Test

After restarting:

1. Open http://localhost:8080
2. Should see game (NOT file list)
3. Click "CHOOSE THEME"
4. Should show theme selection
5. Press F12 - no errors in console

---

## ✅ Success Indicators

When it works:
- ✅ Dark background
- ✅ Glowing title
- ✅ "CHOOSE THEME" button
- ✅ No file listings
- ✅ No errors in console

---

## 📞 Commands Summary

```bash
# Stop server
Ctrl + C

# Restart
cd backend
mvn clean spring-boot:run

# Open game
http://localhost:8080
```

---

**Just restart the server and it will work!** 🚀
