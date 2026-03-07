# ⚡ QUICK MySQL Fix

## ✅ Your @SpringBootApplication is CORRECT!

**Location:** `backend/src/main/java/com/whackamole/WhackAMoleApplication.java`
**Package:** `com.whackamole` ✓
**Maven will find it:** YES ✓

---

## 📊 SQL Command for MySQL Workbench

### Option 1: Let Spring Boot Create It (EASIEST)

You don't need to create the database manually! Just run the app and Spring Boot will create it automatically because your `application.properties` has:

```properties
createDatabaseIfNotExist=true
```

### Option 2: Create Manually

Open MySQL Workbench and run:

```sql
CREATE DATABASE IF NOT EXISTS whackamole_db;
```

That's it! Or use the file: `create-database.sql`

---

## 📄 EXACT application.properties

I've updated your file at:
`backend/src/main/resources/application.properties`

Key settings:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/whackamole_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=update
server.port=8080
```

**If your MySQL password is NOT "root":**
Edit the file and change:
```properties
spring.datasource.password=YOUR_ACTUAL_PASSWORD
```

---

## 🚀 Run This Command

```bash
cd backend
mvn clean install -DskipTests -U spring-boot:run
```

---

## 🔍 Test Your MySQL Password

Before running, test your password:

```bash
mysql -u root -p
```

If it asks for a password and you can connect, use that password in `application.properties`.

---

## ✅ What to Expect

**In console:**
```
HikariPool-1 - Starting...
Hibernate: create table scores (...)
Started WhackAMoleApplication in X seconds
```

**In browser:**
Open `http://localhost:8080` → Game loads! 🎮

---

## 🐛 If It Still Fails

**Most common issue:** Wrong MySQL password

**Fix:**
1. Test: `mysql -u root -p`
2. Enter your password
3. If it works, update `application.properties` with that password

---

## 📚 More Help

- **Complete guide:** See `MYSQL_DATABASE_SETUP.md`
- **SQL script:** See `create-database.sql`
- **Build fixes:** See `BUILD_FIX_GUIDE.md`

---

**Your package structure is perfect! Just update the password if needed and run the command.** 🚀
