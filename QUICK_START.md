# ⚡ Quick Start Guide

## Get Your Enhanced Whack-a-Mole Game Running in 5 Minutes!

### Step 1: Start MySQL (1 min)
```bash
# Windows
net start MySQL80

# macOS
brew services start mysql

# Linux
sudo systemctl start mysql
```

### Step 2: Start Backend (2 min)
```bash
cd backend
mvn spring-boot:run
```

Wait for: `Started WhackAMoleApplication`

### Step 3: Open Frontend (1 min)
```bash
# Option 1: Direct
Open frontend/index.html in your browser

# Option 2: Local Server
cd frontend
python -m http.server 8080
# Then open http://localhost:8080
```

### Step 4: Play! (1 min)
1. Choose from 5 themes
2. View scoring rules
3. Select difficulty
4. Play and compete!

## ✨ New Features You'll Love

- **5 Themes**: Classic, Forest, Space, Ocean, Candy
- **Smart Scoring**: +10 for correct, -10 for wrong
- **Live Leaderboard**: Updates every 10 seconds
- **Celebrations**: Fireworks for new high scores!
- **Animations**: Visual feedback for every action

## 🎮 How to Play

1. **Hit Green Targets** ✅ → +10 points
2. **Avoid Red Targets** ❌ → -10 points
3. **45 Seconds** ⏱️ → Beat the clock!
4. **Save Score** 💾 → Enter leaderboard!

## 🐛 Quick Fixes

**Backend won't start?**
```bash
# Check MySQL is running
mysql -u root -p

# Check port 8080
netstat -ano | findstr :8080
```

**Frontend can't connect?**
```bash
# Verify backend is running
curl http://localhost:8080/api/health
```

## 🎉 You're Ready!

Enjoy the enhanced Whack-a-Mole experience! 🎮
