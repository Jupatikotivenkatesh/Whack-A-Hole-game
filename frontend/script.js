// ============================================================================
// BACKEND API CONFIGURATION
// ============================================================================
// IMPORTANT: Update this URL with your Render backend URL after deployment
const BACKEND_URL = 'https://your-backend-app.onrender.com';
// For local testing, use: const BACKEND_URL = 'http://localhost:8080';

console.log('Backend API URL:', BACKEND_URL);

// Game State
let selectedTheme = null;
let selectedDifficulty = null;
let score = 0;
let timeLeft = 30;
let gameInterval = null;
let moleInterval = null;
let currentMole = null;
let moleTimeout = null;

// Theme icons
const themeIcons = {
    classic: '🐹',
    forest: '🦝',
    space: '👽'
};

// Difficulty settings
const difficultySettings = {
    easy: { moleTime: 2000, spawnRate: 1500 },
    medium: { moleTime: 1500, spawnRate: 1000 },
    hard: { moleTime: 1000, spawnRate: 700 }
};

// Screen Navigation
function showScreen(screenId) {
    console.log('Showing screen:', screenId);
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function showSplash() {
    showScreen('splashScreen');
}

function showThemeSelection() {
    console.log('Showing theme selection');
    showScreen('themeScreen');
}

function showDifficultySelection() {
    if (!selectedTheme) {
        alert('Please select a theme first!');
        return;
    }
    console.log('Showing difficulty selection');
    showScreen('difficultyScreen');
}

// Theme Selection
function selectTheme(theme) {
    console.log('Theme selected:', theme);
    selectedTheme = theme;
    
    // Update UI
    document.querySelectorAll('.theme-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.target.closest('.theme-card').classList.add('selected');
    
    // Enable next button
    document.getElementById('themeNextBtn').disabled = false;
    
    // Update mole icons
    const moleIcon = themeIcons[theme];
    document.querySelectorAll('.mole').forEach(mole => {
        mole.textContent = moleIcon;
    });
}

// Difficulty Selection
function selectDifficulty(difficulty) {
    console.log('Difficulty selected:', difficulty);
    selectedDifficulty = difficulty;
    
    // Update UI
    document.querySelectorAll('.difficulty-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.target.closest('.difficulty-card').classList.add('selected');
    
    // Enable start button
    document.getElementById('difficultyNextBtn').disabled = false;
}

// Game Logic
function startGame() {
    if (!selectedTheme || !selectedDifficulty) {
        alert('Please select theme and difficulty!');
        return;
    }

    console.log('Starting game with theme:', selectedTheme, 'difficulty:', selectedDifficulty);
    
    // Reset game state
    score = 0;
    timeLeft = 30;
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = timeLeft;
    
    // Show game screen
    showScreen('gameScreen');
    
    // Start game timer
    gameInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
    
    // Start spawning moles
    const settings = difficultySettings[selectedDifficulty];
    spawnMole();
    moleInterval = setInterval(spawnMole, settings.spawnRate);
}

function spawnMole() {
    // Remove previous mole
    if (currentMole !== null) {
        const holes = document.querySelectorAll('.hole');
        holes[currentMole].classList.remove('active');
    }
    
    // Spawn new mole
    const randomHole = Math.floor(Math.random() * 9);
    currentMole = randomHole;
    const holes = document.querySelectorAll('.hole');
    holes[randomHole].classList.add('active');
    
    // Auto-hide mole after time
    const settings = difficultySettings[selectedDifficulty];
    clearTimeout(moleTimeout);
    moleTimeout = setTimeout(() => {
        if (currentMole === randomHole) {
            holes[randomHole].classList.remove('active');
            currentMole = null;
        }
    }, settings.moleTime);
}

function whackMole(holeIndex) {
    if (currentMole === holeIndex) {
        console.log('Hit! Score:', score + 10);
        score += 10;
        document.getElementById('score').textContent = score;
        
        // Remove mole
        const holes = document.querySelectorAll('.hole');
        holes[holeIndex].classList.remove('active');
        currentMole = null;
        
        // Spawn new mole immediately
        clearTimeout(moleTimeout);
        spawnMole();
    }
}

function endGame() {
    console.log('Game ended. Final score:', score);
    
    // Stop intervals
    clearInterval(gameInterval);
    clearInterval(moleInterval);
    clearTimeout(moleTimeout);
    
    // Remove active mole
    if (currentMole !== null) {
        const holes = document.querySelectorAll('.hole');
        holes[currentMole].classList.remove('active');
    }
    
    // Show game over screen
    document.getElementById('finalScore').textContent = score;
    showScreen('gameOverScreen');
    
    // Load leaderboard
    loadLeaderboard();
}

// Backend API Integration
async function saveScore() {
    const playerName = document.getElementById('playerName').value.trim();
    
    if (!playerName) {
        alert('Please enter your name!');
        return;
    }
    
    console.log('Saving score:', { playerName, score, selectedTheme, selectedDifficulty });
    
    try {
        const response = await fetch(`${BACKEND_URL}/api/scores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                playerName: playerName,
                score: score,
                theme: selectedTheme,
                difficulty: selectedDifficulty
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('Score saved successfully:', data);
            alert('Score saved successfully!');
            loadLeaderboard();
        } else {
            const error = await response.text();
            console.error('Failed to save score. Status:', response.status, 'Error:', error);
            alert('Failed to save score. Backend might not be running.');
        }
    } catch (error) {
        console.error('Error saving score:', error);
        alert('Error connecting to backend. Make sure backend is deployed and BACKEND_URL is correct.');
    }
}

async function loadLeaderboard() {
    console.log('Loading leaderboard...');
    
    try {
        const response = await fetch(`${BACKEND_URL}/api/leaderboard`);
        
        if (response.ok) {
            const scores = await response.json();
            console.log('Leaderboard loaded:', scores);
            displayLeaderboard(scores);
        } else {
            console.error('Failed to load leaderboard. Status:', response.status);
            document.getElementById('leaderboardList').innerHTML = '<p>Failed to load leaderboard</p>';
        }
    } catch (error) {
        console.error('Error loading leaderboard:', error);
        document.getElementById('leaderboardList').innerHTML = '<p>Backend not connected</p>';
    }
}

function displayLeaderboard(scores) {
    const leaderboardList = document.getElementById('leaderboardList');
    
    if (scores.length === 0) {
        leaderboardList.innerHTML = '<p>No scores yet. Be the first!</p>';
        return;
    }
    
    leaderboardList.innerHTML = scores.map((entry, index) => `
        <div class="leaderboard-item">
            <span>#${index + 1} ${entry.playerName}</span>
            <span>${entry.score} pts</span>
        </div>
    `).join('');
}

function playAgain() {
    console.log('Playing again...');
    selectedTheme = null;
    selectedDifficulty = null;
    showSplash();
}

// Load leaderboard on page load
window.addEventListener('load', () => {
    console.log('Page loaded. Backend URL:', BACKEND_URL);
    console.log('Remember to update BACKEND_URL in script.js with your Render backend URL!');
});
