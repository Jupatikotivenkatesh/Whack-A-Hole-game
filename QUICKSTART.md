# Whack-a-Mole: Ultimate Edition - Quick Start Guide

## 🚀 Quick Start (3 Steps)

### Step 1: Start MySQL
Make sure MySQL is running on your system:

**Windows:**
```bash
net start MySQL80
```

**Linux/Mac:**
```bash
sudo systemctl start mysql
```

### Step 2: Run the Application
```bash
cd backend
mvn spring-boot:run
```

Wait for the message: `Started WhackAMoleApplication in X seconds`

### Step 3: Play the Game
Open your browser and go to: **http://localhost:8080**

That's it! 🎮

---

## 📋 First Time Setup

If this is your first time running the application:

1. **Install Java 17+**
   - Download from: https://adoptium.net/

2. **Install Maven**
   - Download from: https://maven.apache.org/download.cgi
   - Or use your package manager:
     - Windows: `choco install maven`
     - Mac: `brew install maven`
     - Linux: `sudo apt install maven`

3. **Install MySQL 8.0+**
   - Download from: https://dev.mysql.com/downloads/
   - During installation, set root password to `root` (or update `application.properties`)

4. **Verify installations:**
   ```bash
   java -version    # Should show Java 17 or higher
   mvn -version     # Should show Maven 3.6+
   mysql --version  # Should show MySQL 8.0+
   ```

---

## 🎮 How to Play

1. **Choose Theme**: Select from 10 unique themes (Defender, Space, Zombie, etc.)
2. **Select Difficulty**: Easy, Medium, or Hard
3. **Start Game**: Click "Start Game"
4. **Play**: 
   - Click GOOD items (shields, rockets, etc.) → +10 points
   - Avoid BAD items (swords, aliens, etc.) → -5 points
5. **Save Score**: Enter your name to appear on the leaderboard
6. **Compete**: Try to beat the top 10 scores!

---

## 🔧 Troubleshooting

### Game not loading?
- Make sure you're accessing `http://localhost:8080` (not opening HTML file directly)
- Check that Spring Boot is running (look for "Started WhackAMoleApplication" message)
- Clear browser cache (Ctrl+Shift+R)

### Database errors?
- Verify MySQL is running: `mysql -u root -p`
- Check credentials in `backend/src/main/resources/application.properties`
- Default username: `root`, password: `root`

### Port 8080 already in use?
- Change port in `backend/src/main/resources/application.properties`:
  ```properties
  server.port=8081
  ```
- Then access game at `http://localhost:8081`

---

## 📁 Project Structure

```
whack-a-mole/
├── backend/                          # Spring Boot application
│   ├── src/main/
│   │   ├── java/                     # Backend code
│   │   └── resources/
│   │       ├── application.properties # Configuration
│   │       └── static/               # Frontend files
│   │           ├── index.html        # Game page
│   │           ├── css/style.css     # Styles
│   │           └── js/game.js        # Game logic
│   ├── pom.xml                       # Maven dependencies
│   └── README.md                     # Detailed documentation
├── whack-a-mole.html                 # Original standalone version
└── QUICKSTART.md                     # This file
```

---

## 🌟 Features

- **10 Themes**: Defender, Space, Zombie, Jungle, Food, Environment, Cyber, Cricket, Treasure, Crime
- **3 Difficulties**: Easy (1.7s), Medium (1.4s), Hard (1.25s)
- **Global Leaderboard**: Top 10 scores with player names
- **Progressive Difficulty**: Game gets harder as you play
- **Modern UI**: Glassmorphism effects, smooth animations
- **Responsive**: Works on desktop, tablet, and mobile

---

## 📚 More Information

For detailed documentation, see:
- **Backend README**: `backend/README.md`
- **Design Document**: `backend/design.md`

---

## 🎯 Game Tips

1. **Start with Easy**: Get familiar with the game mechanics
2. **Focus on Good Items**: They give more points (+10 vs -5)
3. **Watch the Timer**: Game lasts 45 seconds
4. **Progressive Speed**: Items appear faster as time goes on
5. **Practice**: Your reflexes will improve with each game!

---

## 🛠️ Development

### Frontend Changes
Edit files in `backend/src/main/resources/static/`:
- `index.html` - Structure
- `css/style.css` - Styling
- `js/game.js` - Game logic

### Backend Changes
Edit files in `backend/src/main/java/com/whackamole/`:
- `controller/ScoreController.java` - API endpoints
- `entity/Score.java` - Database model
- `repository/ScoreRepository.java` - Database queries

Restart Spring Boot after changes: `mvn spring-boot:run`

---

## 📞 Support

If you encounter issues:
1. Check the Troubleshooting section above
2. Review `backend/README.md` for detailed setup
3. Verify all prerequisites are installed correctly
4. Check Spring Boot console for error messages

---

**Happy Gaming! 🎮🎯**
