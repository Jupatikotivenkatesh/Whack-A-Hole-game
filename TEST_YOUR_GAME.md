# 🎮 Test Your Game - Quick Guide

## ✅ Your Backend is Running!

Since your Spring Boot backend is already running on port 8080, you just need to refresh your browser!

---

## 🚀 Quick Test (3 Steps)

### Step 1: Refresh Browser
Press `Ctrl + Shift + R` (hard refresh) or just `F5`

### Step 2: Open Console
Press `F12` to open Developer Tools → Go to Console tab

### Step 3: Test the Flow
1. Click **"CHOOSE THEME"** ✓
2. Select a theme ✓
3. Click **"Next"** ✓
4. Select difficulty ✓
5. Click **"Start Game"** ✓
6. Play for 30 seconds ✓
7. Enter your name ✓
8. Click **"Save Score"** ✓
9. See leaderboard ✓

---

## 🔍 What to Check in Console

### Good Messages (Everything Working):
```
Showing screen: themeScreen
Theme selected: classic
Showing screen: difficultyScreen
Difficulty selected: medium
Starting game with theme: classic difficulty: medium
Hit! Score: 10
Game ended. Final score: 120
Saving score: {playerName: "John", score: 120, ...}
Score saved successfully!
Loading leaderboard...
Leaderboard loaded: [...]
```

### Error Messages (Something Wrong):
```
Error saving score: TypeError: Failed to fetch
→ Backend not running or wrong URL

Failed to save score. Status: 400
→ Invalid data (check player name)

Failed to save score. Status: 500
→ Backend error (check backend console)
```

---

## 🎯 Expected Behavior

### Splash Screen
- ✅ Shows "WHACK-A-MOLE" title with glow effect
- ✅ "CHOOSE THEME" button is clickable
- ✅ Clicking button shows theme selection

### Theme Selection
- ✅ Shows 3 themes: Classic, Forest, Space
- ✅ Clicking a theme highlights it (green glow)
- ✅ "Next" button becomes enabled
- ✅ "Back" button returns to splash

### Difficulty Selection
- ✅ Shows 3 difficulties: Easy, Medium, Hard
- ✅ Clicking difficulty highlights it
- ✅ "Start Game" button becomes enabled
- ✅ "Back" button returns to theme selection

### Game Screen
- ✅ Shows score (starts at 0)
- ✅ Shows timer (starts at 30)
- ✅ Moles appear randomly
- ✅ Clicking mole increases score by 10
- ✅ Timer counts down
- ✅ Game ends when timer reaches 0

### Game Over Screen
- ✅ Shows final score
- ✅ Input field for player name
- ✅ "Save Score" button
- ✅ "Play Again" button
- ✅ Leaderboard displays

---

## 🐛 Quick Fixes

### Problem: Page is blank
**Fix:** Hard refresh: `Ctrl + Shift + R`

### Problem: Old version still showing
**Fix:** Clear cache:
1. Press `Ctrl + Shift + Delete`
2. Select "Cached images and files"
3. Click "Clear data"
4. Refresh page

### Problem: "CHOOSE THEME" still doesn't work
**Fix:** 
1. Check console for errors (F12)
2. Make sure you saved the new index.html
3. Restart backend:
   ```bash
   # Stop: Ctrl + C
   cd backend
   mvn spring-boot:run
   ```

### Problem: Score doesn't save
**Fix:**
1. Check backend console for errors
2. Verify MySQL is running: `net start MySQL80`
3. Check browser console for error message
4. Try manually: `curl http://localhost:8080/api/leaderboard`

---

## 📊 Test Checklist

Copy this and check off as you test:

```
[ ] Backend running (mvn spring-boot:run)
[ ] Browser open to http://localhost:8080
[ ] Console open (F12)
[ ] Splash screen shows
[ ] "CHOOSE THEME" button works
[ ] Theme selection shows
[ ] Can select theme (card highlights)
[ ] "Next" button works
[ ] Difficulty selection shows
[ ] Can select difficulty (card highlights)
[ ] "Start Game" button works
[ ] Game board shows
[ ] Moles appear
[ ] Can click moles
[ ] Score increases
[ ] Timer counts down
[ ] Game ends at 0 seconds
[ ] Game over screen shows
[ ] Can enter name
[ ] "Save Score" works
[ ] Leaderboard shows
[ ] "Play Again" works
[ ] No errors in console
```

---

## 🎮 Game Controls

| Action | How To |
|--------|--------|
| Navigate | Click buttons |
| Select theme | Click theme card |
| Select difficulty | Click difficulty card |
| Whack mole | Click on mole when it appears |
| Save score | Enter name, click "Save Score" |
| Play again | Click "Play Again" |

---

## 💡 Pro Tips

### Tip 1: Watch the Console
Keep F12 open to see what's happening behind the scenes.

### Tip 2: Test All Themes
Try all 3 themes to see different mole icons:
- Classic: 🐹
- Forest: 🦝
- Space: 👽

### Tip 3: Test All Difficulties
- Easy: Moles stay longer (2s)
- Medium: Normal speed (1.5s)
- Hard: Fast pace (1s)

### Tip 4: Check Leaderboard
After saving a few scores, verify they appear in the leaderboard.

### Tip 5: Test Backend Connection
Open a new tab and go to:
```
http://localhost:8080/api/leaderboard
```
You should see JSON data with scores.

---

## 🔧 Backend Verification

### Check if backend is responding:
```bash
# Test health endpoint
curl http://localhost:8080/health

# Test leaderboard endpoint
curl http://localhost:8080/api/leaderboard

# Test save score endpoint
curl -X POST http://localhost:8080/api/scores \
  -H "Content-Type: application/json" \
  -d '{"playerName":"Test","score":100,"theme":"classic","difficulty":"easy"}'
```

---

## ✅ Success Indicators

When everything works:

**In Browser:**
- ✅ Game loads without errors
- ✅ All buttons work
- ✅ Navigation flows smoothly
- ✅ Moles appear and can be clicked
- ✅ Score saves successfully
- ✅ Leaderboard displays

**In Console:**
- ✅ No red error messages
- ✅ Debug messages show correct flow
- ✅ "Score saved successfully" message
- ✅ Leaderboard data loads

**In Backend Console:**
- ✅ No errors
- ✅ SQL statements show (if logging enabled)
- ✅ POST /api/scores returns 201
- ✅ GET /api/leaderboard returns 200

---

## 🎉 You're Ready!

Your game is now fully functional with:
- ✅ Working navigation
- ✅ Functional game mechanics
- ✅ Backend integration
- ✅ Leaderboard system
- ✅ Modern UI

**Just refresh your browser and start playing!** 🎮

---

## 📞 Quick Reference

| Issue | Solution |
|-------|----------|
| Blank page | Hard refresh (Ctrl+Shift+R) |
| Old version | Clear cache |
| Button doesn't work | Check console for errors |
| Score doesn't save | Check backend is running |
| No leaderboard | Check MySQL is running |
| Console errors | Read error message, check guide |

---

**Happy Gaming!** 🎯
