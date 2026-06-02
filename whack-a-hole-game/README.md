# 🐹 Mole Mayhem

![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen?style=flat-square&logo=springboot)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=flat-square&logo=mysql)
![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-yellow?style=flat-square&logo=javascript)
![HTML5](https://img.shields.io/badge/HTML5-CSS3-orange?style=flat-square&logo=html5)
![Netlify](https://img.shields.io/badge/Netlify-Deployed-teal?style=flat-square&logo=netlify)
![Render](https://img.shields.io/badge/Render-Backend-purple?style=flat-square&logo=render)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

> **Whack Fast. Score Big.**
> A fast-paced arcade reflex browser game with combo systems, hard mode penalties, achievements, and a global leaderboard.

---

## 🔗 Live Demo

| Platform | URL |
|---|---|
| 🌐 Frontend (Netlify) | [Play Now](https://6a08391a4e797113d59cf528--lustrous-medovik-6f47cc.netlify.app/) |
| ⚙️ Backend API (Render) | [API Health](https://whack-a-hole-game.onrender.com/api/health) |

---

## 📸 Screenshots

> Screenshots are located in `docs/screenshots/`.

| Splash Screen | Gameplay | Game Over |
|---|---|---|
| *(coming soon)* | *(coming soon)* | *(coming soon)* |

---

## ✨ Features

### Core Gameplay
- 3×3 grid arcade game — whack correct targets, avoid wrong ones
- 45-second rounds with real-time score and hit counter
- Up to 2 simultaneous targets per spawn
- 5 visual themes, 3 difficulty levels

### Combo System
- Combo counter tracks consecutive correct hits
- Bonus points at combo milestones: x3 (+5 pts), x5 (+10 pts), x10 (+20 pts)
- Gold combo popup animations and glowing stat card
- Combo resets on any wrong hit or missed target

### Hard Mode Penalty System
- First 2 wrong clicks: −10 pts each (standard)
- 3rd wrong click onwards: −15 pts each (penalty mode)
- Penalty alert banner slides in from top when activated
- Wrong click counter resets each new game

### Achievement System
6 unlockable achievements with toast notifications:
- 🎯 **First Hit** — Score any points in your first game
- 🔨 **Mole Hunter** — 10+ correct hits in one game
- ⚡ **Combo Master** — Achieve a combo of 5 or more
- 🎖 **Precision Expert** — 90%+ accuracy with min 10 hits
- 💨 **Speed Demon** — 15+ correct hits in Hard mode
- 👑 **Mayhem King** — Score 150+ points in one game

### Stats Dashboard
Local stats tracked across all sessions:
- Games played
- Total hits
- All-time accuracy
- Best combo ever
- Best score

### Progressive Difficulty
- Every 10 seconds, spawn rate increases automatically
- Minimum rate cap at 800ms to keep the game playable
- Works across all three starting difficulties

### Pause/Resume
- Pause button in game header
- Full-screen pause overlay
- Resume continues exactly where you left off
- Restart option resets to theme selection

### Auth System
- Full account creation (full name, username, email, password)
- Login with username/password
- Guest mode (no account needed)
- Password strength meter
- Server warm-up banner for Render cold starts

### Leaderboard
- Global top-10 leaderboard via backend API
- Auto-refreshes every 10 seconds during gameplay
- Rank medals for top 3 positions
- Slide-in animation panel

### PWA-Ready
- Web App Manifest (`manifest.json`)
- `theme-color` meta tag
- Standalone display mode
- PWA-installable on mobile

---

## 🎮 How to Play

```
Auth → Theme Selection → Difficulty Selection → Game → Game Over
```

1. **Auth** — Log in, sign up, or continue as guest
2. **Theme** — Choose one of 5 emoji themes (Classic, Forest, Space, Ocean, Candy)
3. **Difficulty** — Easy (3s targets), Medium (2.5s), Hard (2s + penalty system)
4. **Play** — Whack correct targets, build combos, avoid wrong ones
5. **Game Over** — View accuracy + best combo, unlock achievements, save score

### Scoring

| Action | Points |
|---|---|
| Correct hit | +10 (base) |
| x3 Combo bonus | +5 extra |
| x5 Combo bonus | +10 extra |
| x10 Combo bonus | +20 extra |
| Wrong hit (normal) | −10 |
| Wrong hit (hard, 3rd+) | −15 |

---

## ⚡ Hard Mode Rules

Hard mode adds a penalty escalation system:
- Your first 2 wrong clicks cost **−10 pts** each (same as other difficulties)
- Your 3rd wrong click activates **Hard Mode Penalty** — each wrong click now costs **−15 pts**
- A penalty banner slides down from the top of the screen to warn you
- The wrong-click counter and penalty status reset at the start of each new game

---

## 🏆 Achievement System

Achievements are stored in `localStorage` and persist across sessions. When an achievement is unlocked for the first time, a purple toast notification slides in from the right.

| Achievement | Requirement |
|---|---|
| 🎯 First Hit | Score any points |
| 🔨 Mole Hunter | 10+ correct hits in one game |
| ⚡ Combo Master | Achieve a combo of 5+ |
| 🎖 Precision Expert | 90%+ accuracy (min 10 attempts) |
| 💨 Speed Demon | 15+ correct hits on Hard difficulty |
| 👑 Mayhem King | Score 150+ points in one game |

---

## 🎨 Themes

| Theme | Correct Target | Wrong Target |
|---|---|---|
| 🐹 Classic | Mole | Mouse |
| 🦝 Forest | Raccoon | Squirrel |
| 👽 Space | Alien | Space Invader |
| 🐙 Ocean | Octopus | Squid |
| 🍭 Candy | Lollipop | Hard Candy |

---

## 🛠 Tech Stack

| Layer | Technology | Details |
|---|---|---|
| Frontend | HTML5 + CSS3 + Vanilla JS | Single-page app, no framework |
| Fonts | Orbitron + Inter | Google Fonts |
| Backend | Java 17 + Spring Boot 3.2 | REST API |
| ORM | Spring Data JPA | Hibernate |
| Database | MySQL 8 | Hosted on Railway / local |
| Build | Maven 3.8 | `mvnw` wrapper included |
| Frontend Deploy | Netlify | Static hosting |
| Backend Deploy | Render | Free-tier Java service |
| Containerization | Docker + Compose | Optional local stack |
| Mobile | Capacitor | PWA wrapper config |

---

## 🚀 Local Development

### Prerequisites
- Java 17+
- Maven 3.8+
- MySQL 8+
- Modern browser

### 1 — Start the backend

```bash
# Set environment variables (Windows)
set SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/whackamole_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
set SPRING_DATASOURCE_USERNAME=root
set SPRING_DATASOURCE_PASSWORD=yourpassword

# Run
cd whack-a-hole-game/backend
./mvnw spring-boot:run
```

Backend starts at `http://localhost:8080`.

### 2 — Open the frontend

```bash
# Option A: serve directly
npx serve whack-a-hole-game/frontend

# Option B: VS Code Live Server
# Right-click index.html → Open with Live Server
```

---

## 🐳 Docker

```bash
docker-compose up --build
```

Starts MySQL + Spring Boot backend together. Then open `frontend/index.html`.

---

## ☁️ Deployment

### Frontend — Netlify
1. Drag the `frontend/` folder to [app.netlify.com](https://app.netlify.com/)
2. No build step needed — pure static files

### Backend — Render
1. Push the repo to GitHub
2. Create a new **Web Service** on Render, point to `/whack-a-hole-game/backend`
3. Set build command: `./mvnw package -DskipTests`
4. Set start command: `java -jar target/*.jar`
5. Add environment variables for DB connection

---

## 🔌 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server health check |
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Login with credentials |
| `GET` | `/api/auth/profile/:id` | Get user profile |
| `PUT` | `/api/auth/profile/:id` | Update user profile |
| `POST` | `/api/scores` | Submit a game score |
| `GET` | `/api/leaderboard` | Top 10 scores |

---

## ⚙️ Environment Variables

| Variable | Default | Description |
|---|---|---|
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://localhost:3306/whackamole_db` | MySQL connection |
| `SPRING_DATASOURCE_USERNAME` | `root` | DB username |
| `SPRING_DATASOURCE_PASSWORD` | `root` | DB password |
| `PORT` | `8080` | Server port |

---

## 🗂 Project Structure

```
whack-a-hole-game/
├── backend/
│   ├── src/main/java/com/jkv/whackamole/
│   │   ├── controller/     AuthController, ScoreController
│   │   ├── model/          User, Score
│   │   ├── repository/     UserRepository, ScoreRepository
│   │   ├── dto/            LoginRequest, SignupRequest, ScoreRequest, UserResponse
│   │   ├── config/         WebConfig (CORS)
│   │   └── WhackAMoleApplication.java
│   └── pom.xml
├── frontend/
│   ├── index.html          Single-page app
│   ├── style.css           All styles + animations
│   ├── script.js           Game logic, auth, leaderboard, achievements
│   ├── manifest.json       PWA manifest
│   ├── sitemap.xml         SEO sitemap
│   ├── robots.txt          Search crawler config
│   ├── capacitor.config.json  Mobile wrapper config
│   └── assets/             icons / images / sounds
├── docs/
│   ├── screenshots/
│   ├── architecture/
│   └── api-docs/
├── docker-compose.yml
├── Dockerfile
├── LICENSE
└── README.md
```

---

## 🔍 SEO Features

- Full meta tags (description, keywords, author, robots)
- Open Graph tags for social sharing
- Twitter Card tags
- JSON-LD structured data (`VideoGame` schema)
- Canonical URL tag
- `sitemap.xml` and `robots.txt`
- PWA `manifest.json` with `theme-color`

---

## 🚦 Performance Features

- Zero external JS dependencies — pure Vanilla JS
- CSS custom properties for theme-consistent design
- CSS animations via `@keyframes` — no JS animation libraries
- Backend warm-up progress bar for Render cold starts
- LocalStorage for instant stats access (no extra API calls)
- Leaderboard auto-refresh only while game is active

---

## 🗺 Roadmap

- [ ] Sound effects (hit, miss, combo, achievement)
- [ ] Multiplayer race mode
- [ ] Animated mole spritesheet instead of emoji
- [ ] Per-user achievement history on profile page
- [ ] Weekly leaderboard reset
- [ ] Mobile haptic feedback via Capacitor

---

## 📄 License

MIT — see [LICENSE](LICENSE)
