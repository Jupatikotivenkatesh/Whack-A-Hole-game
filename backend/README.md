# Whack-a-Mole Backend API

Spring Boot backend with MySQL for managing game scores and leaderboard.

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+

## Setup Instructions

### 1. Install MySQL

Download and install MySQL from [https://dev.mysql.com/downloads/](https://dev.mysql.com/downloads/)

### 2. Configure Database

The application will auto-create the database `whackamole_db` on first run.

Update credentials in `src/main/resources/application.properties` if needed:
```properties
spring.datasource.username=root
spring.datasource.password=root
```

### 3. Run the Application

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The server will start on `http://localhost:8080`

### 4. Access the Game

Open your browser and navigate to: **http://localhost:8080**

The game frontend is served automatically by Spring Boot from the static resources.

### 5. Test the API (Optional)

**Save a score**:
```bash
curl -X POST http://localhost:8080/api/scores \
  -H "Content-Type: application/json" \
  -d '{
    "playerName": "John Doe",
    "score": 150,
    "theme": "space",
    "difficulty": "hard"
  }'
```

**Get leaderboard**:
```bash
curl http://localhost:8080/api/leaderboard
```

## API Endpoints

### POST /api/scores
Save a new score to the database

**Request Body**:
```json
{
  "playerName": "string (required)",
  "score": "integer (required)",
  "theme": "string (optional)",
  "difficulty": "string (optional)"
}
```

**Response**: 201 Created with saved Score object

### GET /api/leaderboard
Get top 10 highest scores

**Response**: 200 OK with array of Score objects

## Database Schema

```sql
CREATE TABLE scores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(255) NOT NULL,
    score INT NOT NULL,
    date DATETIME NOT NULL,
    theme VARCHAR(50),
    difficulty VARCHAR(20),
    INDEX idx_score_date (score DESC, date DESC)
);
```

## Project Structure

```
backend/
├── src/
│   └── main/
│       ├── java/com/whackamole/
│       │   ├── WhackAMoleApplication.java
│       │   ├── controller/
│       │   │   └── ScoreController.java
│       │   ├── entity/
│       │   │   └── Score.java
│       │   ├── repository/
│       │   │   └── ScoreRepository.java
│       │   └── dto/
│       │       └── ScoreRequest.java
│       └── resources/
│           ├── application.properties
│           └── static/                    # Frontend files
│               ├── index.html             # Main game page
│               ├── css/
│               │   └── style.css          # Game styles
│               └── js/
│                   └── game.js            # Game logic
├── pom.xml
└── README.md
```

## Technologies Used

- Spring Boot 3.2.0
- Spring Data JPA
- MySQL Connector
- Lombok
- Bean Validation


## Troubleshooting

### Issue: Webpage not loading or showing blank page

**Solution**: 
1. Ensure you're accessing `http://localhost:8080` (not opening the HTML file directly)
2. Check browser console for errors (F12)
3. Verify all static files exist in `src/main/resources/static/`
4. Clear browser cache and hard refresh (Ctrl+Shift+R)

### Issue: CSS/JS files not loading (404 errors)

**Solution**:
1. Verify file structure matches the project structure above
2. Check that files are in the correct locations:
   - `src/main/resources/static/css/style.css`
   - `src/main/resources/static/js/game.js`
3. Restart the Spring Boot application
4. Check that no controller is mapped to `/` or `/css/*` or `/js/*`

### Issue: Database connection failed

**Solution**:
1. Verify MySQL is running:
   ```bash
   # Windows
   net start MySQL80
   
   # Linux/Mac
   sudo systemctl status mysql
   ```
2. Check credentials in `application.properties`
3. Ensure MySQL is listening on port 3306
4. Try connecting manually: `mysql -u root -p`

### Issue: Port 8080 already in use

**Solution**: Change the port in `application.properties`:
```properties
server.port=8081
```
Then access the game at `http://localhost:8081`

### Issue: Leaderboard not updating

**Solution**:
1. Check browser console for API errors
2. Verify backend is running and accessible
3. Test API endpoints manually using curl or Postman
4. Check CORS configuration in `ScoreController.java`

## Game Features

- **10 Unique Themes**: Defender, Space Defender, Zombie Survival, Jungle Hunter, Food Fight, Environment Protector, Cyber Robot Battle, Cricket Challenge, Treasure Hunter, City Crime Buster
- **3 Difficulty Levels**: Easy (1.7s hover), Medium (1.4s hover), Hard (1.25s hover)
- **Progressive Difficulty**: Spawn rate increases during gameplay
- **Global Leaderboard**: Top 10 scores with player names, themes, and difficulty
- **Score History**: Local storage backup for offline play
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Glassmorphism effects, smooth animations, dynamic backgrounds

## How to Play

1. Click "Choose Theme" to start
2. Select your preferred game theme from 10 options
3. Choose difficulty level (Easy, Medium, or Hard)
4. Click "Start Game"
5. Click on the good items (shields, rockets, etc.) to gain +10 points
6. Avoid clicking bad items (swords, aliens, etc.) which give -5 points
7. Game lasts 45 seconds
8. Enter your name to save your score to the leaderboard
9. Try to beat your high score!

## Development

### Making Frontend Changes

Edit files in `src/main/resources/static/`:
- **HTML**: `index.html`
- **CSS**: `css/style.css`
- **JavaScript**: `js/game.js`

Changes will be reflected after restarting the Spring Boot application.

### Making Backend Changes

Edit Java files in `src/main/java/com/whackamole/`:
- **API Endpoints**: `controller/ScoreController.java`
- **Database Model**: `entity/Score.java`
- **Repository**: `repository/ScoreRepository.java`
- **DTOs**: `dto/ScoreRequest.java`

Spring Boot DevTools will auto-reload most changes.

## Notes

- The game uses relative URLs (`/api/scores`, `/api/leaderboard`) to communicate with the backend
- Static resources are served by Spring Boot's default static resource handler
- CORS is configured to allow all origins for development (update for production)
- The database schema is auto-created by Hibernate on first run
- Scores are saved both locally (localStorage) and to the MySQL database
