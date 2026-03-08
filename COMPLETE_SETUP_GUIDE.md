# 🎮 Complete Project Setup - From Start to Finish

## 📋 Prerequisites Check

Before starting, make sure you have these installed:

### 1. Check Java (Need 17+)
```bash
java -version
```
**Expected:** `openjdk version "17.x.x"` or higher

**If not installed:** Download from https://adoptium.net/

### 2. Check Maven (Need 3.6+)
```bash
mvn -version
```
**Expected:** `Apache Maven 3.x.x`

**If not installed:**
- Windows: `choco install maven`
- Or download from: https://maven.apache.org/download.cgi

### 3. Check MySQL (Need 8.0+)
```bash
mysql --version
```
**Expected:** `mysql Ver 8.0.x`

**If not installed:** Download from https://dev.mysql.com/downloads/

---

## 🚀 Complete Setup (6 Steps)

### Step 1: Start MySQL

```bash
net start MySQL80
```

**Expected output:**
```
The MySQL80 service is starting.
The MySQL80 service was started successfully.
```

**Or:**
```
The requested service has already been started.
```

**If error:** Try `net start MySQL` or `net start MySQL57`

---

### Step 2: Test MySQL Connection

```bash
mysql -u root -p
```

**Enter your password** (usually "root" or empty)

**If successful, you'll see:**
```
mysql>
```

**Type:** `exit` and press Enter

**Important:** Remember this password! You'll need it in Step 4.

---

### Step 3: Navigate to Your Project

```bash
cd C:\Users\jupat\OneDrive\Desktop\new
```

**Verify you're in the right place:**
```bash
dir
```

**You should see:**
- backend (folder)
- README.md
- Various .md files

---

### Step 4: Configure Database Password

**Only if your MySQL password is NOT "root":**

Edit this file: `backend/src/main/resources/application.properties`

Find this line:
```properties
spring.datasource.password=root
```

Change to your actual password:
```properties
spring.datasource.password=YOUR_ACTUAL_PASSWORD
```

**Save the file!**

---

### Step 5: Build and Run the Project

```bash
cd backend
mvn clean install -DskipTests -U spring-boot:run
```

**What this does:**
- `clean` - Removes old build files
- `install` - Compiles your code
- `-DskipTests` - Skips tests (faster)
- `-U` - Updates dependencies
- `spring-boot:run` - Starts the server

**This will take 1-2 minutes the first time** (downloading dependencies)

---

### Step 6: Wait for Success Message

**Watch the console output. Wait for:**

```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.0)

...
Hibernate: create table scores (...)
...
Started WhackAMoleApplication in 5.234 seconds (JVM running for 6.123)
```

**✅ When you see "Started WhackAMoleApplication" - you're ready!**

---

## 🌐 Open the Game

### Open your browser and go to:
```
http://localhost:8080
```

**You should see:**
- Dark background with gradient
- "WHACK-A-MOLE" title (glowing green)
- "CHOOSE THEME" button

**✅ Success! Your game is running!**

---

## 🎮 Play the Game

1. Click **"CHOOSE THEME"**
2. Select a theme (Classic, Forest, or Space)
3. Click **"Next"**
4. Select difficulty (Easy, Medium, or Hard)
5. Click **"Start Game"**
6. Click moles when they appear!
7. After 30 seconds, enter your name
8. Click **"Save Score"**
9. See the leaderboard!

---

## 🛑 How to Stop the Server

When you're done:
1. Go to the terminal/command prompt
2. Press `Ctrl + C`
3. Type `Y` and press Enter

---

## 🔄 How to Restart

If you need to restart:

```bash
# Stop server (Ctrl+C)
cd backend
mvn spring-boot:run
```

**Or use the script:** Double-click `restart-server.bat`

---

## 📊 Complete Command Summary

```bash
# 1. Start MySQL
net start MySQL80

# 2. Test MySQL
mysql -u root -p
exit

# 3. Navigate to project
cd C:\Users\jupat\OneDrive\Desktop\new

# 4. Go to backend
cd backend

# 5. Run the project
mvn clean install -DskipTests -U spring-boot:run

# 6. Open browser
http://localhost:8080
```

---

## 🐛 Troubleshooting

### Problem: "mvn: command not found"
**Solution:** Maven not installed
```bash
# Check if installed
mvn -version

# If not, install:
choco install maven
```

### Problem: "MySQL80 service not found"
**Solution:** MySQL not installed or different name
```bash
# Try these:
net start MySQL
net start MySQL57

# Or install MySQL from:
https://dev.mysql.com/downloads/
```

### Problem: "Access denied for user 'root'"
**Solution:** Wrong password
1. Find your MySQL password
2. Update `backend/src/main/resources/application.properties`
3. Change: `spring.datasource.password=YOUR_PASSWORD`

### Problem: "Port 8080 already in use"
**Solution:** Another app using port 8080
```bash
# Find what's using it
netstat -ano | findstr :8080

# Kill it (replace PID with number shown)
taskkill /PID <PID> /F

# Or change port in application.properties:
server.port=8081
```

### Problem: "Failed to configure a DataSource"
**Solution:** Database connection issue
1. Check MySQL is running: `net start MySQL80`
2. Check password in `application.properties`
3. Test connection: `mysql -u root -p`

### Problem: Directory listing instead of game
**Solution:** 
```bash
# Stop server (Ctrl+C)
cd backend
mvn clean spring-boot:run
```

### Problem: Build failure
**Solution:**
```bash
# Clean everything and rebuild
cd backend
mvn clean
mvn clean install -DskipTests -U spring-boot:run
```

---

## ✅ Success Checklist

- [ ] Java 17+ installed (`java -version`)
- [ ] Maven 3.6+ installed (`mvn -version`)
- [ ] MySQL 8.0+ installed (`mysql --version`)
- [ ] MySQL service running (`net start MySQL80`)
- [ ] Can connect to MySQL (`mysql -u root -p`)
- [ ] Password configured in `application.properties`
- [ ] Navigated to project folder
- [ ] Ran `mvn clean install -DskipTests -U spring-boot:run`
- [ ] Saw "Started WhackAMoleApplication" message
- [ ] Opened http://localhost:8080
- [ ] Game loads (NOT directory listing)
- [ ] Can click "CHOOSE THEME"
- [ ] Game is playable

---

## 🎯 What Happens During Setup

### First Time Running:
1. **Maven downloads dependencies** (~2 minutes)
   - Spring Boot libraries
   - MySQL connector
   - Validation libraries
   
2. **Compiles Java code** (~30 seconds)
   - WhackAMoleApplication
   - Controllers
   - Entities
   - Repositories
   
3. **Connects to MySQL** (~5 seconds)
   - Creates database `whackamole_db`
   - Creates table `scores`
   
4. **Starts web server** (~5 seconds)
   - Tomcat starts on port 8080
   - Serves static files (HTML, CSS, JS)
   - Exposes API endpoints

**Total time:** ~3-4 minutes first time, ~30 seconds after that

---

## 📁 Project Structure

```
C:\Users\jupat\OneDrive\Desktop\new\
│
├── backend/                           ← Your Spring Boot project
│   ├── src/
│   │   └── main/
│   │       ├── java/                  ← Java code
│   │       │   └── com/whackamole/
│   │       │       ├── WhackAMoleApplication.java
│   │       │       ├── controller/
│   │       │       ├── entity/
│   │       │       ├── repository/
│   │       │       └── dto/
│   │       └── resources/
│   │           ├── application.properties  ← Configuration
│   │           └── static/            ← Frontend files
│   │               └── index.html     ← Game page
│   ├── pom.xml                        ← Maven configuration
│   └── target/                        ← Build output
│
├── restart-server.bat                 ← Quick restart script
├── COMPLETE_SETUP_GUIDE.md           ← This file
└── [other documentation files]
```

---

## 🔧 Configuration Files

### application.properties
Location: `backend/src/main/resources/application.properties`

**Key settings:**
```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/whackamole_db?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=root

# Server
server.port=8080

# JPA
spring.jpa.hibernate.ddl-auto=update
```

### pom.xml
Location: `backend/pom.xml`

**Key dependencies:**
- spring-boot-starter-web
- spring-boot-starter-data-jpa
- mysql-connector-j
- spring-boot-starter-validation

---

## 🎮 Game Features

### Themes:
- **Classic** 🐹 - Traditional mole
- **Forest** 🦝 - Raccoon
- **Space** 👽 - Alien

### Difficulties:
- **Easy** 🟢 - 2 seconds per mole
- **Medium** 🟡 - 1.5 seconds per mole
- **Hard** 🔴 - 1 second per mole

### Gameplay:
- 30-second timer
- 9 holes (3x3 grid)
- +10 points per hit
- Leaderboard with top 10 scores
- Save scores with player name

---

## 📞 Quick Reference

| Task | Command |
|------|---------|
| **Start MySQL** | `net start MySQL80` |
| **Test MySQL** | `mysql -u root -p` |
| **Navigate to project** | `cd C:\Users\jupat\OneDrive\Desktop\new` |
| **Go to backend** | `cd backend` |
| **Run project** | `mvn clean install -DskipTests -U spring-boot:run` |
| **Open game** | `http://localhost:8080` |
| **Stop server** | `Ctrl + C` |
| **Restart** | `mvn spring-boot:run` |
| **Clean build** | `mvn clean` |

---

## 🎉 You're All Set!

Follow the 6 steps above and your game will be running!

**Quick start:**
```bash
net start MySQL80
cd C:\Users\jupat\OneDrive\Desktop\new\backend
mvn clean install -DskipTests -U spring-boot:run
```

Then open: **http://localhost:8080**

**Happy Gaming!** 🎮🎯
