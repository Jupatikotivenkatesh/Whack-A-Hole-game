-- ============================================
-- Sample Data for Whack-a-Mole Database
-- ============================================
-- This script adds sample users and scores for testing

USE whackamole_db;

-- Insert sample users
-- Note: Passwords are hashed with BCrypt
-- Plain passwords: user1 = "password123", user2 = "password456", user3 = "password789"

INSERT INTO users (username, email, password, full_name, created_at, is_active) VALUES
('player1', 'player1@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'John Doe', NOW(), TRUE),
('player2', 'player2@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Jane Smith', NOW(), TRUE),
('player3', 'player3@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Bob Johnson', NOW(), TRUE);

-- Insert sample scores
INSERT INTO scores (user_id, player_name, score, theme, difficulty, date) VALUES
(1, 'John Doe', 150, 'classic', 'medium', NOW() - INTERVAL 2 DAY),
(1, 'John Doe', 180, 'forest', 'hard', NOW() - INTERVAL 1 DAY),
(1, 'John Doe', 200, 'space', 'hard', NOW()),
(2, 'Jane Smith', 120, 'classic', 'easy', NOW() - INTERVAL 3 DAY),
(2, 'Jane Smith', 160, 'ocean', 'medium', NOW() - INTERVAL 1 DAY),
(3, 'Bob Johnson', 90, 'candy', 'easy', NOW() - INTERVAL 2 DAY),
(3, 'Bob Johnson', 140, 'classic', 'medium', NOW());

-- Verify data
SELECT 'Sample data inserted!' AS Result;
SELECT 'Users:' AS Info, COUNT(*) AS Count FROM users;
SELECT 'Scores:' AS Info, COUNT(*) AS Count FROM scores;

-- Show sample users
SELECT id, username, email, full_name, created_at FROM users;

-- Show sample scores
SELECT s.id, u.username, s.player_name, s.score, s.theme, s.difficulty, s.date 
FROM scores s 
JOIN users u ON s.user_id = u.id 
ORDER BY s.score DESC;
