# 🔐 Authentication System Guide

## Overview

Your Whack-a-Mole game now includes a complete user authentication system with login, signup, and profile management!

---

## 🗄️ Database Information

### Current Configuration
- **Database:** MySQL 8.0+
- **Host:** localhost:3306
- **Database Name:** whackamole_db
- **Username:** root
- **Password:** root (CHANGE FOR PRODUCTION!)

### Tables Created
1. **users** - User accounts and profiles
2. **scores** - Game scores linked to users

---

## 📁 New Files Added

### Backend Files
1. `backend/src/main/java/com/whackamole/entity/User.java` - User entity
2. `backend/src/main/java/com/whackamole/repository/UserRepository.java` - User data access
3. `backend/src/main/java/com/whackamole/controller/AuthController.java` - Auth endpoints
4. `backend/src/main/java/com/whackamole/dto/LoginRequest.java` - Login DTO
5. `backend/src/main/java/com/whackamole/dto/SignupRequest.java` - Signup DTO
6. `backend/src/main/java/com/whackamole/dto/UserResponse.java` - User response DTO

### Database Scripts
1. `database/reset_database.sql` - Reset entire database
2. `database/clear_data.sql` - Clear all data
3. `database/sample_data.sql` - Add sample users/scores

### Documentation
1. `DATABASE_INFO.md` - Complete database documentation
2. `AUTH_SYSTEM_GUIDE.md` - This file

---

## 🔧 How to Clear Existing Data

### Option 1: Using SQL Script (Recommended)
```bash
# Open MySQL
mysql -u root -p

# Run clear script
source database/clear_data.sql
```

### Option 2: Manual
```sql
USE whackamole_db;
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE scores;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;
```

### Option 3: Complete Reset
```bash
mysql -u root -p < database/reset_database.sql
```

---

## 🚀 API Endpoints

### Authentication

#### 1. Signup
```http
POST /api/auth/signup
Content-Type: application/json

{
  "username": "player1",
  "email": "player1@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "player1",
    "email": "player1@example.com",
    "fullName": "John Doe",
    "createdAt": "2024-03-09T10:30:00",
    "lastLogin": null
  }
}
```

#### 2. Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "player1",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "player1",
    "email": "player1@example.com",
    "fullName": "John Doe",
    "createdAt": "2024-03-09T10:30:00",
    "lastLogin": "2024-03-09T11:00:00"
  }
}
```

#### 3. Get Profile
```http
GET /api/auth/profile/{userId}
```

#### 4. Update Profile
```http
PUT /api/auth/profile/{userId}
Content-Type: application/json

{
  "fullName": "John Updated",
  "email": "newemail@example.com"
}
```

### Scores (Updated)

#### Save Score (with user)
```http
POST /api/scores
Content-Type: application/json

{
  "userId": 1,
  "playerName": "John Doe",
  "score": 150,
  "theme": "classic",
  "difficulty": "medium"
}
```

---

## 🎨 Frontend Implementation (Next Steps)

### 1. Add Login/Signup UI
The frontend needs to be updated with:
- Login/Signup buttons in top-right corner
- Modal/popup for login/signup forms
- Profile button (bottom-left)
- Logout button (bottom-left)

### 2. Store User Session
```javascript
// After successful login
localStorage.setItem('user', JSON.stringify(userData));
localStorage.setItem('userId', userData.id);

// Check if logged in
const user = JSON.parse(localStorage.getItem('user'));
if (user) {
  // User is logged in
}

// Logout
localStorage.removeItem('user');
localStorage.removeItem('userId');
```

### 3. Update Score Saving
```javascript
// Include userId when saving score
const userId = localStorage.getItem('userId');
await fetch(`${BACKEND_URL}/api/scores`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: userId,  // Add this
    playerName: playerName,
    score: score,
    theme: selectedTheme,
    difficulty: selectedDifficulty
  })
});
```

---

## ⚠️ Security Notes

### Current Implementation
- **Password Storage:** Plain text (NOT SECURE!)
- **Authentication:** Basic (no tokens)
- **Session:** Client-side only

### For Production
1. **Hash Passwords:** Use BCrypt
   ```java
   // Add to pom.xml
   <dependency>
       <groupId>org.springframework.security</groupId>
       <artifactId>spring-security-crypto</artifactId>
   </dependency>
   
   // In AuthController
   BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
   String hashedPassword = encoder.encode(request.getPassword());
   ```

2. **Add JWT Tokens:** For secure authentication
3. **Enable HTTPS:** For production
4. **Add Rate Limiting:** Prevent brute force
5. **Validate Input:** Prevent SQL injection

---

## 🧪 Testing

### Test Signup
```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"test123","fullName":"Test User"}'
```

### Test Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'
```

### Test Profile
```bash
curl http://localhost:8080/api/auth/profile/1
```

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME,
    is_active BOOLEAN DEFAULT TRUE
);
```

### Scores Table (Updated)
```sql
CREATE TABLE scores (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,  -- NEW: Links to users table
    player_name VARCHAR(20) NOT NULL,
    score INT NOT NULL,
    theme VARCHAR(20),
    difficulty VARCHAR(20),
    date DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## ✅ What's Working

- ✅ User signup with validation
- ✅ User login with authentication
- ✅ Profile retrieval
- ✅ Profile updates
- ✅ Scores linked to users
- ✅ Database scripts for data management
- ✅ Complete API documentation

---

## 🚧 What's Next (Frontend)

1. Create login/signup modal UI
2. Add auth buttons to header
3. Add profile/logout buttons
4. Implement session management
5. Update score saving with userId
6. Show user-specific stats

---

## 📞 Quick Commands

### Clear All Data
```bash
mysql -u root -p < database/clear_data.sql
```

### Reset Database
```bash
mysql -u root -p < database/reset_database.sql
```

### Add Sample Data
```bash
mysql -u root -p < database/sample_data.sql
```

### View Users
```sql
USE whackamole_db;
SELECT * FROM users;
```

### View Scores
```sql
USE whackamole_db;
SELECT s.*, u.username FROM scores s 
LEFT JOIN users u ON s.user_id = u.id 
ORDER BY s.score DESC;
```

---

## 🎉 Summary

Your backend now has:
- ✅ Complete user authentication
- ✅ User profiles
- ✅ Scores linked to users
- ✅ Database management scripts
- ✅ Full API documentation

**Next:** Implement the frontend UI for login/signup!

See `DATABASE_INFO.md` for more database details.
