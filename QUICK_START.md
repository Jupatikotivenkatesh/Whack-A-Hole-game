# ⚡ Quick Start Guide

## 🚀 Super Quick Start

### Windows:
```bash
# Double-click this file:
start-game.bat
```

### macOS/Linux:
```bash
chmod +x start-game.sh
./start-game.sh
```

---

## 📋 Manual Start

### Step 1: Start MySQL
```bash
# Windows
net start MySQL80

# macOS
brew services start mysql

# Linux
sudo systemctl start mysql
```

### Step 2: Start Backend
```bash
cd backend
mvn spring-boot:run
```
Wait for: `Started WhackAMoleApplication`

### Step 3: Open Game
Open `frontend/index.html` in your browser

---

## 🌐 Deploy

See **DEPLOYMENT_GUIDE.md** for complete instructions!

---

**Have fun! 🎮**
