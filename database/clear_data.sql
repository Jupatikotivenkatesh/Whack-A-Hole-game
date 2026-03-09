-- ============================================
-- Clear All Data from Whack-a-Mole Database
-- ============================================
-- This script removes all data but keeps tables

USE whackamole_db;

-- Disable foreign key checks temporarily
SET FOREIGN_KEY_CHECKS = 0;

-- Clear all scores
TRUNCATE TABLE scores;

-- Clear all users
TRUNCATE TABLE users;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Verify data is cleared
SELECT 'Users cleared:' AS Status, COUNT(*) AS Count FROM users;
SELECT 'Scores cleared:' AS Status, COUNT(*) AS Count FROM scores;

-- Success message
SELECT 'All data cleared successfully!' AS Result;
