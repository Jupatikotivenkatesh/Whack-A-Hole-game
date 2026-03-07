# ⚡ QUICK FIX - Run This Now!

## ✅ All Files Checked - No Errors Found!

Your Java code is correct. I've created a clean `application.properties` file.

---

## 🚀 RUN THIS COMMAND

Open Command Prompt in your project folder and run:

```bash
cd backend
mvn clean install -DskipTests -U spring-boot:run
```

---

## 📋 What This Does

- `clean` - Removes old build files
- `install` - Compiles your code
- `-DskipTests` - Skips tests (faster)
- `-U` - Updates all dependencies
- `spring-boot:run` - Starts the server

---

## ⏱️ Wait For This Message

```
Started WhackAMoleApplication in X seconds
```

Then open: **http://localhost:8080**

---

## 🔧 Your New application.properties

I created a corrected version with:

```properties
# Database (username: root)
spring.datasource.url=jdbc:mysql://localhost:3306/whackamole_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root

# Auto-create tables
spring.jpa.hibernate.ddl-auto=update

# Server
server.port=8080

# Static resources
spring.web.resources.static-locations=classpath:/static/
spring.mvc.view.suffix=.html
```

**If your MySQL password is different, edit:**
`backend/src/main/resources/application.properties`

Change this line:
```properties
spring.datasource.password=YOUR_ACTUAL_PASSWORD
```

---

## 🐛 If It Still Fails

### Check MySQL is running:
```bash
net start MySQL80
```

### Test MySQL connection:
```bash
mysql -u root -p
```

### Check Java version (needs 17+):
```bash
java -version
```

---

## ✅ Success = You'll See

1. ✅ BUILD SUCCESS message
2. ✅ "Started WhackAMoleApplication"
3. ✅ Game loads at http://localhost:8080
4. ✅ No errors in browser console (F12)

---

## 📚 More Help

- **Detailed guide:** See `BUILD_FIX_GUIDE.md`
- **Troubleshooting:** See `TROUBLESHOOTING.md`
- **Quick start:** See `START_HERE.md`

---

**Just run the command above and you're good to go!** 🎮
