-- ============================================
-- Reset Whack-a-Mole Database
-- ============================================
-- This script drops and recreates the entire database

-- Drop database if exists
DROP DATABASE IF EXISTS whackamole_db;

-- Create fresh database
CREATE DATABASE whackamole_db;

-- Use the database
USE whackamole_db;

-- Create users table
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_username (username),
    INDEX idx_email (email)
);

-- Create scores table
CREATE TABLE scores (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    player_name VARCHAR(20) NOT NULL,
    score INT NOT NULL,
    theme VARCHAR(20),
    difficulty VARCHAR(20),
    date DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_score (score DESC),
    INDEX idx_date (date DESC)
);

-- Success message
SELECT 'Database reset successfully!' AS Result;
SELECT 'Tables created: users, scores' AS Info;
