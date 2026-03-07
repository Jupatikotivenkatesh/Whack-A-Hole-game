# 🎮 START HERE - Quick Start Guide

## ✅ All Issues Fixed!

Your project had 3 issues - all are now resolved:

1. ✅ **Directory listing** → Fixed with WebConfig
2. ✅ **MySQL tables** → Fixed with ddl-auto=update
3. ✅ **API communication** → Fixed with @CrossOrigin

---

## 🚀 Run Your Game (3 Steps)

### Step 1: Start MySQL
```bash
net start MySQL80
```

### Step 2: Start Server
```bash
cd backend
mvn spring-boot:run
```

**Wait for:** `Started WhackAMoleApplication in X seconds`

### Step 3: Open Browser
```
http://localhost:8080
```

**You should see:** Your game (NOT a directory listing!) 🎮

---

## 🔍 What to Expect

### First Time Running
When you start the server for the first time, you'll see:

```sql
Hibernate: create table scores (
    id bigint not null auto_increment,
    date datetime(6),
    difficulty varchar(20),
    player_name varchar(255),
    score integer not null,
    theme varchar(50),
    primary key (id)
) engine=InnoDB
```

This means the database table is being created automatically! ✅

### In Browser
- ✅ Game loads with full styling
- ✅ Theme selection screen appears
- ✅ No errors in console (F12)
- ✅ Game is playable
- ✅ Scores save to database
- ✅ Leaderboard displays

---

## 🐛 Quick Troubleshooting

### Still seeing directory listing?
```bash
# Clear browser cache
Ctrl + Shift + Delete

# Try incognito mode
Ctrl + Shift + N

# Hard refresh
Ctrl + Shift + R
```

### MySQL not starting?
```bash
# Check if MySQL is installed
mysql --version

# Try starting manually
net start MySQL80
```

### Server won't start?
```bash
# Clean and rebuild
cd backend
mvn clean install
mvn spring-boot:run
```

---

## 📚 Documentation

- **ISSUES_FIXED.md** - Detailed explanation of all fixes
- **verify-fixes.bat** - Run this to verify all fixes are in place
- **RECONSTRUCTION_COMPLETE.md** - Complete project structure
- **TROUBLESHOOTING.md** - Comprehensive debugging guide

---

## ✅ Verification

Run this to verify everything is configured correctly:
```bash
verify-fixes.bat
```

All checks should pass! ✓

---

## 🎯 What Was Fixed

### 1. WebConfig Created
Maps root URL `/` to `index.html` so you see the game instead of directory listing.

**File:** `backend/src/main/java/com/whackamole/config/WebConfig.java`

### 2. Database Auto-Creation Enabled
`spring.jpa.hibernate.ddl-auto=update` creates tables automatically.

**File:** `backend/src/main/resources/application.properties`

### 3. CORS Enabled
`@CrossOrigin("*")` allows frontend to call backend API.

**File:** `backend/src/main/java/com/whackamole/controller/ScoreController.java`

---

## 🎮 Game Features

- **10 Themes:** Defender, Space, Zombie, Jungle, Food, Environment, Cyber, Cricket, Treasure, Crime
- **3 Difficulties:** Easy (1.7s), Medium (1.4s), Hard (1.25s)
- **45-second gameplay** with progressive difficulty
- **Global leaderboard** with top 10 scores
- **Player names** tracked in MySQL database

---

## 🎉 You're Ready!

Just run these 3 commands:

```bash
net start MySQL80
cd backend && mvn spring-boot:run
# Open http://localhost:8080
```

**Happy Gaming! 🎮**
