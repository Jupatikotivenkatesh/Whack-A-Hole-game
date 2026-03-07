# 📍 Where is pom.xml?

## ✅ Your pom.xml Location

```
📁 whack-a-mole/              ← You are probably here
   │
   └── 📁 backend/            ← Navigate here first!
       │
       └── 📄 pom.xml         ← ✅ YOUR POM.XML IS HERE!
```

---

## 🎯 Exact Location

**File Path:** `backend/pom.xml`

**Full Path Example:**
- Windows: `C:\Users\YourName\whack-a-mole\backend\pom.xml`
- Linux/Mac: `/home/username/whack-a-mole/backend/pom.xml`

---

## 🚀 How to Run Maven Commands

### Step-by-Step

**1. Open Terminal/Command Prompt**

**2. Navigate to backend folder:**
```bash
cd backend
```

**3. Run Maven command:**
```bash
mvn spring-boot:run
```

---

## 💡 Visual Guide

### ❌ WRONG - Running from root directory
```
C:\whack-a-mole> mvn spring-boot:run
ERROR: No POM found!
```

### ✅ CORRECT - Running from backend directory
```
C:\whack-a-mole> cd backend
C:\whack-a-mole\backend> mvn spring-boot:run
SUCCESS: Application starts!
```

---

## 🔍 Verify pom.xml Exists

### Windows:
```bash
cd backend
dir pom.xml
```

### Linux/Mac:
```bash
cd backend
ls -la pom.xml
```

**Expected output:** File should be listed ✓

---

## 📋 Your pom.xml Contains

✅ **spring-boot-starter-web** - Web server & REST API
✅ **spring-boot-starter-data-jpa** - Database access
✅ **mysql-connector-j** - MySQL driver
✅ **spring-boot-maven-plugin** - Enables `mvn spring-boot:run`

**Everything you need is already there!**

---

## 🎮 Complete Startup

```bash
# 1. Start MySQL
net start MySQL80

# 2. Go to backend folder
cd backend

# 3. Run the game
mvn spring-boot:run

# 4. Open browser
http://localhost:8080
```

---

## 📚 More Information

- **Complete Maven guide:** See `MAVEN_GUIDE.md`
- **Project structure:** See `PROJECT_STRUCTURE.txt`
- **Quick start:** See `START_HERE.md`

---

## ✅ Summary

**Location:** `backend/pom.xml` ✓
**Status:** Already exists and configured ✓
**Action:** Just run `cd backend && mvn spring-boot:run` ✓

**You're all set!** 🎉
