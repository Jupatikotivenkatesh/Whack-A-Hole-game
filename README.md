<div align="center">
  <strong style="font-size: 24px;">MOLE MAYHEM 🕳️⛳</strong>
</div>

# 🎯 Whack-a-Mole — Enhanced Edition

![Java](https://img.shields.io/badge/Java-17+-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8+-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Render](https://img.shields.io/badge/Deployed_on-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

> A fast-paced, reflex-testing browser game. Whack the right targets, dodge the wrong ones, and climb the leaderboard before the clock runs out.

---

## 📖 Table of Contents

- [About the Game](#-about-the-game)
- [Getting Started](#-getting-started)
- [Login & Account](#-login--account)
- [How to Play](#-how-to-play)
- [Themes](#-themes)
- [Difficulty Levels](#-difficulty-levels)
- [Scoring Rules](#-scoring-rules)
- [Leaderboard](#-leaderboard)
- [Tips & Strategy](#-tips--strategy)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Tech Stack](#-tech-stack)
- [Run with Docker](#-run-with-docker)
- [Environment Variables](#-environment-variables)
- [License](#-license)

---

## 🕹 About the Game

Whack-a-Mole Enhanced Edition is a single-page browser game where targets randomly pop up on a 3×3 grid of holes. Your job is simple — hit the **correct** target as fast as possible and avoid the **wrong** ones. Every correct hit earns you points, every wrong hit costs you points, and you have exactly **45 seconds** to rack up the highest score you can.

The game supports:
- **5 unique visual themes**, each with its own correct and wrong target pair
- **3 difficulty levels** that control how fast targets appear and disappear
- **User accounts** with login, signup, and personal best tracking
- **A live leaderboard** showing the top 10 scores across all players

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Maven 3.8+
- MySQL 8+
- Any modern browser (Chrome, Firefox, Edge)

### 1 — Start the backend

```bash
# Windows — set environment variables
set SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/whackamole_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
set SPRING_DATASOURCE_USERNAME=root
set SPRING_DATASOURCE_PASSWORD=yourpassword

# Run the backend
cd whack-a-hole-game/backend
mvnw spring-boot:run

```

Backend starts at `http://localhost:8080`

### 2 — Open the frontend

**Option A** — Double-click `whack-a-hole-game/frontend/index.html` in File Explorer

**Option B** — VS Code Live Server: right-click `index.html` → Open with Live Server

**Option C** — Terminal:

```bash
npx serve whack-a-hole-game/frontend
# then open http://localhost:3000

```

> ⚠️ Do not open the folder URL in a browser — always open `index.html` directly.

---

## 🔐 Login & Account

When you open the game, you land on the **auth screen** before anything else. This is where you either create a new account or sign in to an existing one.

### Creating a New Account (Sign Up)

Click the **Sign Up** tab and fill in:

| Field | Description |
| --- | --- |
| Full Name | Your display name (e.g. John Doe) |
| Username | Unique game handle used to log in (e.g. johnd99) |
| Email | Your email address |
| Password | Minimum 6 characters — a strength meter guides you |

Once submitted, your account is created and you're taken straight into the game.

### Logging In to an Existing Account

Click the **Login** tab and enter:

| Field | Description |
| --- | --- |
| Username | The username you registered with |
| Password | Your account password |

After a successful login, your username appears in the top navigation bar and your personal best score is shown on the lobby screen.

### Playing as a Guest

If you don't want to create an account, click **Play as Guest**. You can play the full game and submit scores to the leaderboard using any display name — but scores won't be linked to a profile.

### Logging Out

Click the **🚪 Logout** button in the top-right corner at any time. You'll be returned to the login screen.

---

## 🎲 How to Play

The game flows through five stages:

```
Auth Screen → Theme Selection → Difficulty Selection → Game → Game Over

```

### Stage 1 — Auth

Log in, sign up, or continue as guest (covered above).

### Stage 2 — Theme Selection

Choose one of 5 themes. Each theme changes the emoji targets that appear on the board. Select a theme and click **Next →**.

### Stage 3 — Difficulty Selection

Choose Easy, Medium, or Hard. This controls how long targets stay visible and how often new ones appear. Click **Start Game 🎮**.

### Stage 4 — Game

* A **3×3 grid** of 9 holes appears
* Targets randomly pop up in the holes
* Click/tap a target to whack it
* Up to **2 targets** can appear at the same time
* The timer counts down from **45 seconds**
* Your score and hit count update in real time
* The timer card pulses red when ≤ 10 seconds remain
* The leaderboard slides in on the right so you can track your position live

### Stage 5 — Game Over

When the timer hits zero:

* Your final score, total hits, theme, and difficulty are displayed
* Logged-in users have their name pre-filled
* Guests type a display name to save their score
* Click **💾 Save Score** to submit to the leaderboard
* Click **🔄 Play Again** to go back to theme selection

---

## 🎨 Themes

Each theme is a complete visual skin for the game. The **correct target** earns you +10 points when hit. The **wrong target** costs you −10 points — they look similar, so stay sharp.

---

### 🐹 Classic

The original Whack-a-Mole experience. A friendly brown mole pops up from the holes and you need to whack it before it disappears. Watch out for the sneaky mouse that looks almost identical — hitting it will cost you points.

|  | Target |
| --- | --- |
| ✅ Correct | 🐹 Mole |
| ❌ Wrong | 🐭 Mouse |

---

### 🦝 Forest

Set in a woodland environment, this theme brings forest creatures to life. A raccoon is your target — but squirrels are also scurrying around the holes trying to trick you. Quick eyes and steady clicks are key here.

|  | Target |
| --- | --- |
| ✅ Correct | 🦝 Raccoon |
| ❌ Wrong | 🐿️ Squirrel |

---

### 👽 Space

An alien invasion has begun and you're the last line of defence. Whack the aliens before they escape, but don't hit the space invaders — they're on your side. This theme has the most visually similar pair, making it the trickiest to distinguish under pressure.

|  | Target |
| --- | --- |
| ✅ Correct | 👽 Alien |
| ❌ Wrong | 👾 Space Invader |

---

### 🐙 Ocean

Dive into the deep sea and take on the ocean's most elusive creatures. Octopuses are your targets — they're slippery and fast. Squids look almost the same but hitting one will drag your score down. Great theme for players who like a visual challenge.

|  | Target |
| --- | --- |
| ✅ Correct | 🐙 Octopus |
| ❌ Wrong | 🦑 Squid |

---

### 🍭 Candy

A sweet and colourful theme perfect for a lighter game session. Lollipops are popping up everywhere and you need to grab them fast. Hard candies are the imposters here — they look tempting but cost you points. Easiest theme to distinguish visually.

|  | Target |
| --- | --- |
| ✅ Correct | 🍭 Lollipop |
| ❌ Wrong | 🍬 Hard Candy |

---

## ⚡ Difficulty Levels

There are 3 difficulty levels. The difference between them is how long a target stays visible and how frequently new targets spawn. Higher difficulty = faster targets + less time to react.

---

### 🟢 Easy

Targets stay on screen for **3 seconds** and new ones appear every **2.5 seconds**. This gives you enough time to look at both targets if two appear at once, identify the correct one, and click it without rushing. Recommended for first-time players or anyone warming up.

**Rules:**

* Target visible for: 3 seconds
* New target spawns every: 2.5 seconds
* Up to 2 targets at once
* Same scoring as all levels (+10 / −10)

---

### 🟡 Medium

Targets stay for **2.5 seconds** and spawn every **2 seconds**. The pace picks up noticeably — you'll need to react faster and can't afford to hesitate. Two targets appearing simultaneously becomes more common, and you'll need to make quick decisions about which one to hit first.

**Rules:**

* Target visible for: 2.5 seconds
* New target spawns every: 2 seconds
* Up to 2 targets at once
* Misreads are more costly at this pace

---

### 🔴 Hard

Targets only stay for **2 seconds** and spawn every **1.5 seconds**. At this level the board is almost always active with targets appearing and disappearing rapidly. You have very little time to think — muscle memory and pattern recognition take over. One wrong click can undo two correct ones.

**Rules:**

* Target visible for: 2 seconds
* New target spawns every: 1.5 seconds
* Up to 2 targets at once
* **Escalating Penalty Active:** Mistakes are punishing (see Scoring Rules below).

---

## 📊 Scoring Rules

| Action | Points |
| --- | --- |
| Hit the correct target | **+10** |
| Hit the wrong target (Easy/Medium) | **−10** |
| Target disappears (miss) | **0** |
| Click an empty hole | **0** |

* Your score **can go negative** if you keep hitting wrong targets
* There is no bonus for speed — only accuracy matters
* The game always runs for exactly **45 seconds** regardless of score
* After saving, the game compares your score to your previous best and shows one of four messages:
* 🎉 **New High Score** — beat your personal best
* 💪 **Same as your best** — matched it exactly
* 💜 **Keep trying** — below your best
* 🎮 **First score** — your first ever submission



### ⚠️ Hard Mode Escalating Penalty System

*(Note: This rule matrix is also displayed in-game on the Difficulty Selection Screen, Game Instructions Screen, and Help / Rules Modal)*

Hard Mode is explicitly designed to heavily reward precision and strictly punish careless clicking. When playing on Hard Mode, your performance is tracked via an escalating penalty threshold:

| Game Event / Threshold | Score Modification | Mechanic Details & Visual Feedback |
| --- | --- | --- |
| **Correct Target Hit** | **+10 Points** | Standard score advancement for accurate hits. |
| **1st & 2nd Wrong Click** | **-10 Points each** | Initial base penalty deduction for early mismatches. |
| **3rd Wrong Click Onward** | **-15 Points each** | **Escalated Penalty Activated:** Automatically increases by +5 structural deduction for the remainder of the session. |
| **Threshold Breach** | *Visual Warning* | An instantaneous visual notification flashes on screen the exact moment the enhanced penalty tier activates. |
| **Score Floor Limit** | *Negative Allowed* | Your overall score will continue dropping below zero if continuous inaccurate targeting persists. |

---

## 🏆 Leaderboard

* Displays the **top 10 scores** across all players globally
* Visible as a side panel during gameplay
* Auto-refreshes every **10 seconds** while a game is active
* Can be manually refreshed with the **🔄 Refresh** button
* Top 3 positions show 🥇 🥈 🥉 medals
* Logged-in users can see their **personal best** on the lobby screen before starting

---

## 💡 Tips & Strategy

* **Identify before you click** — glance at both targets when two appear. One wrong click costs as much as a correct one earns.
* **Beware the Hard Mode Penalty** — on Hard Mode, spam-clicking will ruin your score. Once that −15 penalty activates, it's very hard to recover.
* **Focus on correct targets only** — ignoring a wrong target costs nothing. Hitting it costs 10 points.
* **On Hard mode, prioritise** — if two targets appear, go for the correct one immediately and let the wrong one disappear.
* **Don't panic near the end** — the last 10 seconds feel rushed but the scoring rules don't change. Stay accurate.
* **Guest scores still count** — you can top the leaderboard as a guest, just enter a memorable name at game over.
* **Space theme is the hardest visually** — 👽 and 👾 look very similar at speed. If you're new, start with Candy or Classic.

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
│   │   ├── service/        (extend here)
│   │   ├── exception/      (extend here)
│   │   └── WhackAMoleApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── Dockerfile
│   └── pom.xml
├── frontend/
│   ├── index.html          Single-page app — auth + all game screens
│   ├── style.css           All styles and animations
│   ├── script.js           All game logic, auth, leaderboard
│   └── assets/             images / sounds / icons
├── docs/
│   ├── screenshots/
│   ├── architecture/
│   └── api-docs/
├── docker-compose.yml
├── LICENSE
└── README.md

```

---

## 🔌 API Reference

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/health` | Server health check |
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login with username + password |
| GET | `/api/auth/profile/:id` | Get user profile |
| PUT | `/api/auth/profile/:id` | Update user profile |
| POST | `/api/scores` | Submit a score |
| GET | `/api/leaderboard` | Get top 10 scores |

---

## 🛠 Tech Stack

| Layer | Technology |
| --- | --- |
| Backend | Java 17, Spring Boot 3.2, Spring Data JPA |
| Database | MySQL 8 |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Fonts | Orbitron, Inter (Google Fonts) |
| Build | Maven |
| Deploy | Docker / Render / Netlify |

---

## 🐳 Run with Docker

```bash
docker-compose up --build

```

Starts MySQL and the Spring Boot backend together. Then open `frontend/index.html` in your browser.

---

## ⚙️ Environment Variables

| Variable | Default | Description |
| --- | --- | --- |
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://localhost:3306/whackamole_db` | MySQL connection URL |
| `SPRING_DATASOURCE_USERNAME` | `root` | Database username |
| `SPRING_DATASOURCE_PASSWORD` | `root` | Database password |
| `PORT` | `8080` | Backend server port |

---

## 📄 License

MIT — see [LICENSE](https://www.google.com/search?q=LICENSE)

```

```
