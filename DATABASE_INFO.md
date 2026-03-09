# 🗄️ Database Information

## Current Database Configuration

### Connection Details
- **Database Type:** MySQL 8.0+
- **Host:** localhost
- **Port:** 3306
- **Database Name:** whackamole_db
- **Username:** root
- **Password:** root (default - change for production!)

### Connection String
```
jdbc:mysql://localhost:3306/whackamole_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
```

---

## Database Schema

### Tables

#### 1. `users` Table
Stores user authentication and profile information.

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

#### 2. `scores` Table
Stores game scores for each user.

```sql
CREATE TABLE scores (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    player_name VARCHAR(20) NOT NULL,
    score INT NOT NULL,
    theme VARCHAR(20),
    difficulty VARCHAR(20),
    date DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## How to Access Database

### Using MySQL Command Line
```bash
# Login to MySQL
mysql -u root -p

# Enter password: root

# Use the database
USE whackamole_db;

# View all tables
SHOW TABLES;

# View users
SELECT * FROM users;

# View scores
SELECT * FROM scores;
```

### Using MySQL Workbench
1. Open MySQL Workbench
2. Create new connection:
   - Connection Name: Whack-a-Mole
   - Hostname: localhost
   - Port: 3306
   - Username: root
   - Password: root
3. Click "Test Connection"
4. Open connection and browse tables

---

## Database Scripts

### Clear All Data
See `database/clear_data.sql`

### Reset Database
See `database/reset_database.sql`

### Sample Data
See `database/sample_data.sql`

---

## Environment Variables

For production deployment, use environment variables:

```bash
DB_URL=jdbc:mysql://your-host:3306/whackamole_db
DB_USER=your_username
DB_PASSWORD=your_secure_password
```

---

## Backup Database

```bash
# Backup
mysqldump -u root -p whackamole_db > backup.sql

# Restore
mysql -u root -p whackamole_db < backup.sql
```

---

## Security Notes

⚠️ **IMPORTANT:**
- Default password is `root` - CHANGE THIS for production!
- Never commit real passwords to Git
- Use environment variables for sensitive data
- Enable SSL for production databases
- Use strong passwords (min 12 characters)

---

## Troubleshooting

### Can't connect to database?
```bash
# Check if MySQL is running
# Windows
net start MySQL80

# macOS
brew services start mysql

# Linux
sudo systemctl start mysql
```

### Database doesn't exist?
The application will create it automatically on first run due to:
```
createDatabaseIfNotExist=true
```

### Access denied?
Check username and password in `application.properties`

---

## Production Database Options

### Free Options:
1. **PlanetScale** - Free MySQL hosting
2. **Railway** - $5 free credit
3. **AWS RDS Free Tier** - 12 months free

### Paid Options:
1. **AWS RDS** - Scalable, reliable
2. **Google Cloud SQL** - Managed MySQL
3. **Azure Database** - Enterprise-grade

---

**Last Updated:** 2024
