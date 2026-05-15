# Whack-a-Mole — Enhanced Edition

Full-stack browser game with user auth, leaderboard, and multiple themes.

---

## Tech Stack

| Layer    | Technology |
|----------|-----------|
| Backend  | Java 17, Spring Boot 3.2, Spring Data JPA |
| Database | MySQL 8+ |
| Frontend | HTML5, CSS3, Vanilla JS |
| Build    | Maven |

---

## Project Structure

```
whack-a-hole-game/
├── backend/
│   ├── src/main/java/com/jkv/whackamole/
│   │   ├── controller/   AuthController, ScoreController
│   │   ├── service/      (extend here)
│   │   ├── repository/   UserRepository, ScoreRepository
│   │   ├── model/        User, Score
│   │   ├── dto/          LoginRequest, SignupRequest, ScoreRequest, UserResponse
│   │   ├── config/       WebConfig (CORS)
│   │   ├── exception/    (extend here)
│   │   └── WhackAMoleApplication.java
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   ├── static/
│   │   └── templates/
│   ├── pom.xml
│   └── .gitignore
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── assets/  images/ sounds/ icons/
│   ├── pages/
│   └── .gitignore
├── docs/
│   ├── screenshots/
│   ├── architecture/
│   └── api-docs/
├── README.md
├── LICENSE
└── .gitignore
```

---

## Local Development

### Prerequisites
- Java 17+
- Maven 3.8+
- MySQL 8+
- Any modern browser

### 1 — Database setup

```sql
CREATE DATABASE whackamole_db;
```

### 2 — Configure environment

Set these environment variables (or edit `application.properties`):

```bash
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/whackamole_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=yourpassword
```

### 3 — Run the backend

```bash
cd backend
./mvnw spring-boot:run
# Windows: mvnw.cmd spring-boot:run
```

Backend starts at `http://localhost:8080`

### 4 — Open the frontend

Open `frontend/index.html` directly in a browser, or serve it:

```bash
# Python
python -m http.server 3000 --directory frontend

# Node (npx)
npx serve frontend
```

---

## API Endpoints

| Method | Endpoint              | Description        |
|--------|-----------------------|--------------------|
| GET    | /api/health           | Health check       |
| POST   | /api/auth/signup      | Register user      |
| POST   | /api/auth/login       | Login user         |
| GET    | /api/auth/profile/:id | Get profile        |
| PUT    | /api/auth/profile/:id | Update profile     |
| POST   | /api/scores           | Save score         |
| GET    | /api/leaderboard      | Top 10 scores      |

---

## Deployment Guide

### Option A — Single JAR (backend serves frontend)

1. Copy frontend files into `backend/src/main/resources/static/`
2. Build the fat JAR:
   ```bash
   cd backend
   ./mvnw clean package -DskipTests
   ```
3. Run:
   ```bash
   java -jar target/whackamole-backend.jar \
     --SPRING_DATASOURCE_URL=jdbc:mysql://DB_HOST:3306/whackamole_db \
     --SPRING_DATASOURCE_USERNAME=root \
     --SPRING_DATASOURCE_PASSWORD=secret
   ```
4. Visit `http://your-server:8080`

---

### Option B — Separate deployment (recommended for production)

#### Backend — Deploy to a VPS / cloud VM

```bash
# Build
cd backend && ./mvnw clean package -DskipTests

# Transfer JAR
scp target/whackamole-backend.jar user@server:/opt/whackamole/

# Run as a systemd service (Linux)
sudo nano /etc/systemd/system/whackamole.service
```

```ini
[Unit]
Description=Whack-a-Mole Backend
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/opt/whackamole
ExecStart=/usr/bin/java -jar whackamole-backend.jar
Environment="SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/whackamole_db?useSSL=false&serverTimezone=UTC"
Environment="SPRING_DATASOURCE_USERNAME=root"
Environment="SPRING_DATASOURCE_PASSWORD=secret"
Environment="PORT=8080"
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable whackamole
sudo systemctl start whackamole
```

#### Frontend — Deploy to Netlify / Vercel / GitHub Pages

1. Update `BACKEND_URL` in `frontend/script.js` to your server's public URL:
   ```js
   const BACKEND_URL = 'https://api.yourdomain.com';
   ```
2. Push `frontend/` to GitHub and connect to Netlify/Vercel, or:
   ```bash
   # Netlify CLI
   npx netlify deploy --dir frontend --prod
   ```

#### CORS — Update for production

In `WebConfig.java`, replace `*` with your frontend domain:
```java
.allowedOrigins("https://yourgame.netlify.app")
```

---

### Option C — Docker Compose

Create `docker-compose.yml` at project root:

```yaml
version: '3.8'
services:
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: whackamole_db
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql

  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/whackamole_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: secret
    depends_on:
      - db

volumes:
  db_data:
```

Add a `Dockerfile` inside `backend/`:

```dockerfile
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/whackamole-backend.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

Run everything:
```bash
docker-compose up --build
```

---

## Environment Variables Reference

| Variable                  | Default                          | Description          |
|---------------------------|----------------------------------|----------------------|
| SPRING_DATASOURCE_URL     | jdbc:mysql://localhost:3306/...  | MySQL connection URL |
| SPRING_DATASOURCE_USERNAME| root                             | DB username          |
| SPRING_DATASOURCE_PASSWORD| root                             | DB password          |
| PORT                      | 8080                             | Server port          |
