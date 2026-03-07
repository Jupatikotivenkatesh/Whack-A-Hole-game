# Quick Reference Card

## Start the Game (3 Commands)

```bash
net start MySQL80           # Start MySQL
cd backend                  # Go to backend folder
mvn spring-boot:run         # Start server
```

Then open: **http://localhost:8080**

---

## Verify Setup

```bash
verify-setup.bat            # Check all prerequisites
```

---

## Test Server

```bash
curl http://localhost:8080/health
```

Expected: "Server is running!"

---

## File Locations

| File | Location |
|------|----------|
| Game HTML | `backend/src/main/resources/static/index.html` |
| Styles | `backend/src/main/resources/static/css/style.css` |
| Game Logic | `backend/src/main/resources/static/js/game.js` |
| View Config | `backend/src/main/java/com/whackamole/config/WebConfig.java` |
| API Controller | `backend/src/main/java/com/whackamole/controller/ScoreController.java` |
| Config | `backend/src/main/resources/application.properties` |

---

## Endpoints

| Endpoint | Purpose |
|----------|---------|
| `http://localhost:8080/` | Game page |
| `http://localhost:8080/health` | Health check |
| `http://localhost:8080/api/scores` | Save score (POST) |
| `http://localhost:8080/api/leaderboard` | Get top 10 (GET) |

---

## Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Blank page | Check browser console (F12) |
| 404 errors | Restart server, clear cache |
| Port in use | Change port in `application.properties` |
| Database error | Start MySQL: `net start MySQL80` |
| Server won't start | Run `mvn clean install` |

---

## Browser Debugging

1. Press **F12** to open Developer Tools
2. Go to **Console** tab - look for red errors
3. Go to **Network** tab - check for 404s
4. Refresh page (**Ctrl+R**)

---

## Key Configuration

### WebConfig.java
- Maps `/` to `index.html`
- Serves static resources from `classpath:/static/`

### ScoreController.java
- Uses `@RestController` for REST API
- Handles `/api/scores` and `/api/leaderboard`

### application.properties
- Database: `jdbc:mysql://localhost:3306/whackamole_db`
- Server port: `8080`
- Debug logging enabled

---

## Documentation

| File | Purpose |
|------|---------|
| `SETUP_COMPLETE.md` | Complete setup guide |
| `QUICKSTART.md` | 3-step quick start |
| `TROUBLESHOOTING.md` | Detailed debugging |
| `CHANGES.md` | All changes made |
| `backend/README.md` | Backend documentation |

---

## Success Indicators

✓ Server shows: "Started WhackAMoleApplication"
✓ `/health` returns success message
✓ Browser loads game with styling
✓ No errors in console
✓ Game is playable

---

## Emergency Reset

```bash
cd backend
mvn clean
mvn clean install
mvn spring-boot:run
```

Then clear browser cache (Ctrl+Shift+Delete) and try again.

---

**Need help?** Check `TROUBLESHOOTING.md` for detailed steps.
