# Troubleshooting Guide - Localhost:8080 Not Showing Game

## Quick Checks

### 1. Verify Server is Running
Open a new terminal and run:
```bash
curl http://localhost:8080/health
```

**Expected output:** `Server is running! Static resources should be available at http://localhost:8080/`

If this works, the server is running correctly.

### 2. Check Static Files
Verify files exist:
```bash
# Windows PowerShell
Test-Path "backend/src/main/resources/static/index.html"
Test-Path "backend/src/main/resources/static/css/style.css"
Test-Path "backend/src/main/resources/static/js/game.js"

# Linux/Mac
ls -la backend/src/main/resources/static/
ls -la backend/src/main/resources/static/css/
ls -la backend/src/main/resources/static/js/
```

All should return `True` or show the files.

### 3. Check Browser Console
1. Open browser to `http://localhost:8080`
2. Press F12 to open Developer Tools
3. Go to Console tab
4. Look for errors (red text)

**Common errors and fixes:**

#### Error: "Failed to load resource: net::ERR_CONNECTION_REFUSED"
**Cause:** Server is not running
**Fix:** 
```bash
cd backend
mvn spring-boot:run
```

#### Error: "404 Not Found" for /css/style.css or /js/game.js
**Cause:** Files not in correct location
**Fix:** Verify files are in `backend/src/main/resources/static/css/` and `backend/src/main/resources/static/js/`

#### Error: "MIME type mismatch"
**Cause:** Files served with wrong content type
**Fix:** Already handled by WebConfig.java

### 4. Check Network Tab
1. Open browser to `http://localhost:8080`
2. Press F12 to open Developer Tools
3. Go to Network tab
4. Refresh page (Ctrl+R)
5. Look at the requests

**What you should see:**
- `localhost:8080/` → Status 200 (HTML file)
- `localhost:8080/css/style.css` → Status 200 (CSS file)
- `localhost:8080/js/game.js` → Status 200 (JavaScript file)

**If you see 404 errors:**
- Check file locations
- Restart Spring Boot server
- Clear browser cache (Ctrl+Shift+Delete)

### 5. Verify Maven Build
```bash
cd backend
mvn clean install
```

Look for `BUILD SUCCESS` message.

### 6. Check Port 8080
Make sure nothing else is using port 8080:

**Windows:**
```bash
netstat -ano | findstr :8080
```

**Linux/Mac:**
```bash
lsof -i :8080
```

If another process is using it, either:
- Stop that process
- Change port in `application.properties`:
  ```properties
  server.port=8081
  ```
  Then access at `http://localhost:8081`

## Step-by-Step Debugging

### Step 1: Clean Restart
```bash
# Stop the server (Ctrl+C in the terminal running it)
cd backend
mvn clean
mvn spring-boot:run
```

### Step 2: Check Server Logs
Look for these messages in the console:

✓ **Good signs:**
```
Started WhackAMoleApplication in X seconds
Tomcat started on port(s): 8080 (http)
```

✗ **Bad signs:**
```
Port 8080 was already in use
Failed to configure a DataSource
```

### Step 3: Test Endpoints Manually

**Test health endpoint:**
```bash
curl http://localhost:8080/health
```

**Test index.html:**
```bash
curl http://localhost:8080/index.html
```

**Test CSS:**
```bash
curl http://localhost:8080/css/style.css
```

**Test JS:**
```bash
curl http://localhost:8080/js/game.js
```

All should return content (not 404).

### Step 4: Browser Cache
Clear browser cache completely:
1. Press Ctrl+Shift+Delete
2. Select "All time"
3. Check "Cached images and files"
4. Click "Clear data"
5. Close and reopen browser
6. Try `http://localhost:8080` again

### Step 5: Try Different Browser
If Chrome doesn't work, try:
- Firefox
- Edge
- Safari

### Step 6: Check Firewall
Make sure your firewall isn't blocking port 8080:

**Windows:**
```bash
netsh advfirewall firewall add rule name="Allow 8080" dir=in action=allow protocol=TCP localport=8080
```

**Linux:**
```bash
sudo ufw allow 8080
```

## Common Issues and Solutions

### Issue 1: Blank White Page
**Symptoms:** Page loads but shows nothing
**Causes:**
- CSS not loading
- JavaScript errors
- HTML file empty or corrupted

**Solutions:**
1. Check browser console for errors
2. Verify CSS file has content:
   ```bash
   cat backend/src/main/resources/static/css/style.css | head -20
   ```
3. Verify JS file has content:
   ```bash
   cat backend/src/main/resources/static/js/game.js | head -20
   ```

### Issue 2: "Whitelabel Error Page"
**Symptoms:** Spring Boot error page instead of game
**Cause:** index.html not found or not served correctly

**Solutions:**
1. Verify WebConfig.java exists in `backend/src/main/java/com/whackamole/config/`
2. Restart server
3. Check file permissions (Linux/Mac):
   ```bash
   chmod 644 backend/src/main/resources/static/index.html
   ```

### Issue 3: API Calls Failing
**Symptoms:** Game loads but leaderboard doesn't work
**Cause:** Backend API not responding

**Solutions:**
1. Test API manually:
   ```bash
   curl http://localhost:8080/api/leaderboard
   ```
2. Check MySQL is running
3. Check database credentials in `application.properties`

### Issue 4: Database Connection Error
**Symptoms:** Server starts but crashes when saving scores
**Cause:** MySQL not running or wrong credentials

**Solutions:**
1. Start MySQL:
   ```bash
   # Windows
   net start MySQL80
   
   # Linux/Mac
   sudo systemctl start mysql
   ```
2. Test connection:
   ```bash
   mysql -u root -p
   ```
3. Update credentials in `application.properties` if needed

## Advanced Debugging

### Enable Debug Logging
Already configured in `application.properties`:
```properties
logging.level.org.springframework.web=DEBUG
logging.level.com.whackamole=DEBUG
```

Look for these log messages:
```
Mapped URL path [/] onto handler
Looking for resource in classpath:/static/
Found resource: class path resource [static/index.html]
```

### Check Classpath
Verify static resources are in the JAR:
```bash
cd backend
mvn clean package
jar -tf target/whackamole-backend-1.0.0.jar | grep static
```

Should show:
```
BOOT-INF/classes/static/index.html
BOOT-INF/classes/static/css/style.css
BOOT-INF/classes/static/js/game.js
```

### Test with Built JAR
```bash
cd backend
mvn clean package
java -jar target/whackamole-backend-1.0.0.jar
```

Then try `http://localhost:8080`

## Still Not Working?

### Verify Complete Setup

1. **Java Version:**
   ```bash
   java -version
   ```
   Should be 17 or higher

2. **Maven Version:**
   ```bash
   mvn -version
   ```
   Should be 3.6 or higher

3. **MySQL Running:**
   ```bash
   mysql -u root -p
   ```
   Should connect successfully

4. **File Structure:**
   ```
   backend/
   ├── src/main/
   │   ├── java/com/whackamole/
   │   │   ├── config/
   │   │   │   └── WebConfig.java ✓
   │   │   └── controller/
   │   │       ├── ScoreController.java ✓
   │   │       └── HealthController.java ✓
   │   └── resources/
   │       ├── static/
   │       │   ├── index.html ✓
   │       │   ├── css/style.css ✓
   │       │   └── js/game.js ✓
   │       └── application.properties ✓
   ```

### Last Resort: Fresh Start

1. Stop the server (Ctrl+C)
2. Clean everything:
   ```bash
   cd backend
   mvn clean
   rm -rf target/
   ```
3. Rebuild:
   ```bash
   mvn clean install
   ```
4. Run:
   ```bash
   mvn spring-boot:run
   ```
5. Wait for "Started WhackAMoleApplication"
6. Open **new** browser window (incognito mode)
7. Go to `http://localhost:8080`

## Getting Help

If still not working, gather this information:

1. **Server logs** (copy the console output)
2. **Browser console errors** (F12 → Console tab)
3. **Network tab** (F12 → Network tab, refresh page)
4. **File structure** (run `tree backend/src` or `ls -R backend/src`)
5. **Java version** (`java -version`)
6. **Maven version** (`mvn -version`)
7. **Operating system**

## Success Checklist

When everything works, you should see:

✓ Server starts without errors
✓ `http://localhost:8080/health` returns success message
✓ `http://localhost:8080` shows the game
✓ Browser console has no red errors
✓ Network tab shows all resources loaded (200 status)
✓ Game is playable
✓ Scores save to database
✓ Leaderboard displays correctly

---

**Note:** After making any changes to Java files, you must restart the Spring Boot server for changes to take effect.
