-- ============================================================================
-- WHACK-A-MOLE DATABASE SETUP
-- Run this in MySQL Workbench or MySQL Command Line
-- ============================================================================

-- Create the database
CREATE DATABASE IF NOT EXISTS whackamole_db;

-- Use the database
USE whackamole_db;

-- Verify database was created
SHOW DATABASES LIKE 'whackamole_db';

-- Optional: Create the scores table manually
-- (Spring Boot will create it automatically, but you can create it manually if you prefer)
CREATE TABLE IF NOT EXISTS scores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    player_name VARCHAR(255) NOT NULL,
    score INT NOT NULL,
    date DATETIME NOT NULL,
    theme VARCHAR(50),
    difficulty VARCHAR(20),
    INDEX idx_score_date (score DESC, date DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Verify table was created
SHOW TABLES;

-- Show table structure
DESCRIBE scores;

-- Grant permissions to root user (if needed)
GRANT ALL PRIVILEGES ON whackamole_db.* TO 'root'@'localhost';
FLUSH PRIVILEGES;

-- Success message
SELECT 'Database whackamole_db created successfully!' AS Status;
