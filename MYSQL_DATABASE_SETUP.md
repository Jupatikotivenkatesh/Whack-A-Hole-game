# 🗄️ MySQL Database Setup - Complete Solution

## ✅ Your @SpringBootApplication Class is CORRECT!

**Location:** `backend/src/main/java/com/whackamole/WhackAMoleApplication.java`
**Package:** `com.whackamole`
**Status:** ✅ Correctly placed - Maven will find it!

The package matches your pom.xml groupId (`com.whackamole`), so this is perfect.

---

## 📊 SQL Commands for MySQL Workbench

### Option 1: Let Spring Boot Create It (RECOMMENDED)

You don't need to manually create the database! Spring Boot will do it automatically.

Just use this in your `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/whackamole_db?createDatabaseIfNotExist=true
```

The `createDatabaseIfNotExist=true` parameter tells MySQL to create the database if it doesn't exist.

### Option 2: Manual Creation (If You Prefer)

If you want to create it manually in MySQL Workbench:

**Step 1: Open MySQL Workbench**

**Step 2: Connect to your MySQL server**
- Click on your local connection
- Enter password (usually "root")

**Step 3: Run these SQL commands:**

```sql
-- Create the database
CREATE DATABASE IF NOT EXISTS whackamole_db;

-- Use the database
USE whackamole_db;

-- Verify it was created
SHOW DATABASES LIKE 'whackamole_db';

-- Optional: Create the scores table manually (or let Hibernate do it)
CREATE TABLE IF NOT EXISTS scores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(255) NOT NULL,
    score INT NOT NULL,
    date DATETIME NOT NULL,
    theme VARCHAR(50),
    difficulty VARCHAR(20),
    INDEX idx_score_date (score DESC, date DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Verify table was created
SHOW TABLES;
DESCRIBE scores;
```

**Step 4: Grant permissions (if needed):**
```sql
GRANT ALL PRIVILEGES ON whackamole_db.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

---

## 📄 EXACT application.properties Code

Copy this ENTIRE configuration to:
`backend/src/main/resources/application.properties`

```properties
# ============================================================================
# DATABASE CONFIGURATION
# ============================================================================
spring.datasource.url=jdbc:mysql://localhost:3306/whackamole_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Connection Pool Settings
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000

# ============================================================================
# JPA / HIBERNATE CONFIGURATION
# ============================================================================
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.open-in-view=false
spring.jpa.properties.hibernate.jdbc.time_zone=UTC

# ============================================================================
# SERVER CONFIGURATION
# ============================================================================
server.port=8080
server.error.include-message=always
server.error.include-binding-errors=always
server.error.include-stacktrace=never

# ============================================================================
# LOGGING CONFIGURATION
# ============================================================================
logging.level.root=INFO
logging.level.org.springframework.web=INFO
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
logging.level.com.whackamole=DEBUG

# ============================================================================
# STATIC RESOURCES CONFIGURATION
# ============================================================================
spring.web.resources.static-locations=classpath:/static/
spring.web.resources.add-mappings=true
spring.mvc.view.suffix=.html

# ============================================================================
# JACKSON JSON CONFIGURATION
# ============================================================================
spring.jackson.serialization.write-dates-as-timestamps=false
spring.jackson.time-zone=UTC
spring.jackson.serialization.fail-on-empty-beans=false
```

### 🔐 If Your MySQL Password is Different

Change this line:
```properties
spring.datasource.password=YOUR_ACTUAL_PASSWORD
```

Common scenarios:
- **No password:** `spring.datasource.password=`
- **Default:** `spring.datasource.password=root`
- **Custom:** `spring.datasource.password=your_password`

---

## 🔍 Package Structure Verification

Your project structure is CORRECT:

```
backend/
├── src/main/java/
│   └── com/whackamole/              ← Base package (matches groupId)
│       ├── WhackAMoleApplication.java   ← ✅ Main class HERE
│       ├── config/
│       │   └── WebConfig.java
│       ├── controller/
│       │   ├── ScoreController.java
│       │   └── HealthController.java
│       ├── entity/
│       │   └── Score.java
│       ├── repository/
│       │   └── ScoreRepository.java
│       └── dto/
│           └── ScoreRequest.java
└── pom.xml
```

**Why this is correct:**
- ✅ `@SpringBootApplication` is in `com.whackamole` package
- ✅ All other classes are in sub-packages of `com.whackamole`
- ✅ Maven will scan `com.whackamole` and all sub-packages
- ✅ Package matches pom.xml groupId

---

## 🚀 Commands to Run

### Step 1: Test MySQL Connection
```bash
mysql -u root -p
```
Enter your password and verify you can connect.

### Step 2: (Optional) Create Database Manually
```sql
CREATE DATABASE IF NOT EXISTS whackamole_db;
exit
```

### Step 3: Run Spring Boot
```bash
cd backend
mvn clean install -DskipTests -U spring-boot:run
```

---

## 🐛 Common Build Failure Causes & Solutions

### Error: "Access denied for user 'root'@'localhost'"

**Cause:** Wrong MySQL password

**Solution:**
1. Find your actual MySQL password
2. Update `application.properties`:
   ```properties
   spring.datasource.password=YOUR_ACTUAL_PASSWORD
   ```

**Test password:**
```bash
mysql -u root -p
# Enter password - if it works, use that password
```

### Error: "Unknown database 'whackamole_db'"

**Cause:** Database doesn't exist and auto-create failed

**Solution:**
1. Create database manually in MySQL Workbench:
   ```sql
   CREATE DATABASE whackamole_db;
   ```
2. Or ensure your URL has `createDatabaseIfNotExist=true`

### Error: "Communications link failure"

**Cause:** MySQL not running or wrong host/port

**Solution:**
```bash
# Check MySQL is running
net start MySQL80

# Verify MySQL is on port 3306
netstat -ano | findstr :3306
```

### Error: "The server time zone value 'XXX' is unrecognized"

**Cause:** Missing timezone in connection URL

**Solution:** Already fixed in the application.properties above with:
```properties
serverTimezone=UTC
```

### Error: "Public Key Retrieval is not allowed"

**Cause:** SSL/authentication issue

**Solution:** Already fixed in the application.properties above with:
```properties
allowPublicKeyRetrieval=true&useSSL=false
```

### Error: "Failed to configure a DataSource"

**Cause:** MySQL connector dependency missing or wrong configuration

**Solution:**
1. Verify `mysql-connector-j` is in pom.xml (it is ✓)
2. Check application.properties has correct URL
3. Run: `mvn clean install -U`

---

## 🔍 Verify Database Connection

### Test 1: MySQL Command Line
```bash
mysql -u root -p
```
```sql
SHOW DATABASES;
USE whackamole_db;
SHOW TABLES;
```

### Test 2: Check Spring Boot Logs
When you run `mvn spring-boot:run`, look for:
```
HikariPool-1 - Starting...
HikariPool-1 - Start completed.
Hibernate: create table scores (...)
```

### Test 3: Check Application Endpoint
After server starts:
```bash
curl http://localhost:8080/health
```

---

## 📊 Database Schema

Spring Boot will automatically create this table:

```sql
CREATE TABLE scores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(255) NOT NULL,
    score INT NOT NULL,
    date DATETIME NOT NULL,
    theme VARCHAR(50),
    difficulty VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

You'll see this in the console when the app starts (if `spring.jpa.show-sql=true`).

---

## ✅ Complete Checklist

Before running `mvn spring-boot:run`:

- [ ] MySQL80 service is running (`net start MySQL80`)
- [ ] You can connect to MySQL (`mysql -u root -p`)
- [ ] `application.properties` has correct password
- [ ] Database URL includes `createDatabaseIfNotExist=true`
- [ ] `@SpringBootApplication` is in `com.whackamole` package ✓
- [ ] All Java files are in sub-packages of `com.whackamole` ✓
- [ ] `pom.xml` groupId matches package (`com.whackamole`) ✓

---

## 🎯 Quick Reference

| Task | Command/Location |
|------|------------------|
| **Main Class** | `backend/src/main/java/com/whackamole/WhackAMoleApplication.java` ✓ |
| **Package** | `com.whackamole` ✓ |
| **Config File** | `backend/src/main/resources/application.properties` |
| **Database Name** | `whackamole_db` |
| **MySQL User** | `root` |
| **Server Port** | `8080` |
| **Test Connection** | `mysql -u root -p` |
| **Run App** | `mvn clean install -DskipTests -U spring-boot:run` |
| **Open Game** | `http://localhost:8080` |

---

## 🚀 Final Command Sequence

```bash
# 1. Test MySQL connection
mysql -u root -p
# (Enter password, then type: exit)

# 2. Navigate to backend
cd backend

# 3. Run the application
mvn clean install -DskipTests -U spring-boot:run

# 4. Wait for "Started WhackAMoleApplication"

# 5. Open browser
# http://localhost:8080
```

---

## 📝 Summary

**Your @SpringBootApplication class:** ✅ CORRECT
- Location: `backend/src/main/java/com/whackamole/WhackAMoleApplication.java`
- Package: `com.whackamole`
- Maven will find it: YES

**SQL to create database:**
```sql
CREATE DATABASE IF NOT EXISTS whackamole_db;
```
Or let Spring Boot create it automatically with `createDatabaseIfNotExist=true`

**application.properties:** See complete configuration above

**Most likely issue:** MySQL password in application.properties doesn't match your actual password

**Fix:** Update this line with your actual password:
```properties
spring.datasource.password=YOUR_ACTUAL_PASSWORD
```

---

**Everything is configured correctly! Just update the password if needed and run the command.** 🚀
