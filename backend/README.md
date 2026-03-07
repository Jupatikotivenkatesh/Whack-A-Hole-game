# 🕹️ Whack-A-Hole: Ultimate Edition
A high-performance, full-stack arcade game built with **Spring Boot 3.2**, **MySQL**, and **Modern JavaScript**. This project features 10 unique themes, dynamic difficulty scaling, and a persistent global leaderboard.

---

## 🚀 Top Features
* **10 Immersive Themes**: Choose from *Space Defender*, *Zombie Survival*, *Cricket Challenge*, and more!
* **Dynamic Difficulty**: Easy, Medium, and Hard modes with progressive spawn rates.
* **Global Leaderboard**: Real-time high scores persisted via a MySQL database.
* **Modern UI/UX**: Sleek glassmorphism effects, smooth animations, and a responsive design for all devices.
* **Local Backup**: Score history backup in `localStorage` for offline play.

---

## 🛠️ Technical Stack
| Layer | Technology |
| :--- | :--- |
| **Backend** | Java 17, Spring Boot 3.2.0, Spring Data JPA |
| **Database** | MySQL 8.0 (HikariCP Connection Pooling) |
| **Frontend** | HTML5, CSS3 (Flexbox/Grid), Vanilla JavaScript (ES6+) |
| **Build Tool** | Maven 3.9.x |

---

## 🔧 Installation & Setup

### 1. Database Configuration
The application will auto-create the `whackamole_db` on the first run. Ensure your credentials in `src/main/resources/application.properties` match your local MySQL:
```properties
spring.datasource.username=root
spring.datasource.password=root