# 🎮 Whack-a-Mole - Enhanced Edition

An exciting, feature-rich Whack-a-Mole game with Spring Boot backend, MySQL database, and dynamic gameplay mechanics.

## ✨ New Features

### 🎨 5 Exciting Themes
- **Classic** 🐹 - Traditional mole whacking
- **Forest** 🦝 - Woodland creatures adventure
- **Space** 👽 - Alien invasion theme
- **Ocean** 🐙 - Deep sea challenge (NEW!)
- **Candy** 🍭 - Sweet treats theme (NEW!)

### 🎯 Advanced Scoring System
- **Correct Hit**: +10 points ✅
- **Wrong Hit**: -10 points ❌
- **Strategic Gameplay**: Avoid wrong targets!
- **45-Second Timer**: Fast-paced action

### 🏆 Live Leaderboard
- Real-time top 10 players
- Auto-refreshes every 10 seconds
- Medal system (🥇🥈🥉)
- Persistent scores in MySQL database

### 🎊 Dynamic Animations
- **New High Score**: Fireworks celebration 🎆
- **Same Score**: Motivational animation 💪
- **Lower Score**: Encouragement message 🌟
- **Smooth Transitions**: Professional UI/UX

### 📊 Scoring Rules Display
- Clear rules shown before game starts
- Visual indicators for correct/wrong targets
- Real-time score feedback

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Maven 3.6+
- MySQL 8.0+
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd whackamole-game
   ```

2. **Setup MySQL Database**
   ```bash
   # Start MySQL service
   # Windows: net start MySQL80
   # Mac: brew services start mysql
   # Linux: sudo systemctl start mysql

   # Create database (optional - auto-created by app)
   mysql -u root -p
   CREATE DATABASE whackamole_db;
   ```

3. **Configure Database**
   
   Edit `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```

4. **Build and Run Backend**
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```

5. **Open Frontend**
   
   Open `frontend/index.html` in your browser or use a local server:
   ```bash
   # Python
   cd frontend
   python -m http.server 8080
   
   # Node.js
   npx http-server frontend -p 8080
   ```

6. **Play the Game!**
   
   Navigate to `http://localhost:8080`

## 📁 Project Structure

```
whackamole-game/
├── backend/                          # Spring Boot Backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/whackamole/
│   │       │   ├── controller/      # REST Controllers
│   │       │   ├── entity/          # JPA Entities
│   │       │   ├── repository/      # Data Repositories
│   │       │   ├── dto/             # Data Transfer Objects
│   │       │   └── WhackAMoleApplication.java
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml                      # Maven Dependencies
│
├── frontend/                         # Frontend Files
│   ├── index.html                   # Main HTML
│   ├── style.css                    # Styles & Animations
│   └── script.js                    # Game Logic
│
└── README.md                        # This file
```

## 🎮 How to Play

1. **Choose Theme**: Select from 5 exciting themes
2. **View Rules**: Check scoring rules before starting
3. **Select Difficulty**: Easy, Medium, or Hard
4. **Play**: 
   - Hit correct targets (green background) for +10 points
   - Avoid wrong targets (red background) or lose 10 points
5. **Save Score**: Enter your name and save to leaderboard
6. **Compete**: Try to beat the top scores!

## 🔌 API Endpoints

### Health Check
```
GET /api/health
Response: {"status": "UP", "message": "Whack-a-Mole API is running"}
```

### Save Score
```
POST /api/scores
Body: {
  "playerName": "John",
  "score": 150,
  "theme": "classic",
  "difficulty": "medium"
}
Response: {
  "success": true,
  "score": {...},
  "animation": "celebration",
  "message": "New High Score! 🎉"
}
```

### Get Leaderboard
```
GET /api/leaderboard
Response: [
  {
    "id": 1,
    "playerName": "John",
    "score": 150,
    "theme": "classic",
    "difficulty": "medium",
    "date": "2024-03-09T10:30:00"
  },
  ...
]
```

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: MySQL 8.0
- **ORM**: JPA/Hibernate
- **Build Tool**: Maven

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern animations & gradients
- **JavaScript**: Vanilla JS (ES6+)
- **Design**: Responsive, mobile-friendly

## 🎨 Game Mechanics

### Difficulty Levels
- **Easy**: 2s target display, 1.5s spawn rate
- **Medium**: 1.5s target display, 1s spawn rate
- **Hard**: 1s target display, 0.7s spawn rate

### Target System
- 70% chance of correct target
- 30% chance of wrong target
- 1-2 targets spawn simultaneously
- Strategic decision-making required

### Animation System
- **Celebration**: Fireworks for new high scores
- **Encouragement**: Pulsing animation for lower scores
- **Same Score**: Steady animation for matching previous best
- **Hit Feedback**: Visual feedback for every hit

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check if MySQL is running
mysql -u root -p

# Check port 8080 is available
netstat -ano | findstr :8080

# Verify Java version
java -version  # Should be 17+
```

### Database Connection Error
```bash
# Update application.properties with correct credentials
spring.datasource.username=your_username
spring.datasource.password=your_password

# Ensure MySQL service is running
```

### Frontend Can't Connect
```bash
# Verify backend is running
curl http://localhost:8080/api/health

# Check BACKEND_URL in frontend/script.js
const BACKEND_URL = 'http://localhost:8080';
```

## 📊 Database Schema

```sql
CREATE TABLE scores (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    player_name VARCHAR(20) NOT NULL,
    score INT NOT NULL,
    theme VARCHAR(20),
    difficulty VARCHAR(20),
    date DATETIME NOT NULL
);
```

## 🎯 Future Enhancements

- [ ] Multiplayer mode
- [ ] Power-ups and bonuses
- [ ] Achievement system
- [ ] Sound effects
- [ ] Mobile app version
- [ ] Social media sharing

## 📝 License

MIT License - Feel free to use for learning and portfolio projects

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ using Spring Boot and Vanilla JavaScript**

Enjoy the game! 🎮🎉
