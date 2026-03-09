// Backend API Configuration
const BACKEND_URL = 'http://localhost:8080';

// Theme Configuration with correct and wrong targets
const THEMES = {
    classic: {
        correct: '🐹',
        wrong: '🐭',
        name: 'Classic'
    },
    forest: {
        correct: '🦝',
        wrong: '🐿️',
        name: 'Forest'
    },
    space: {
        correct: '👽',
        wrong: '👾',
        name: 'Space'
    },
    ocean: {
        correct: '🐙',
        wrong: '🦑',
        name: 'Ocean'
    },
    candy: {
        correct: '🍭',
        wrong: '🍬',
        name: 'Candy'
    }
};

// Difficulty Settings - Slower pace for better gameplay
const DIFFICULTY_SETTINGS = {
    easy: { targetTime: 3000, spawnRate: 2500 },
    medium: { targetTime: 2500, spawnRate: 2000 },
    hard: { targetTime: 2000, spawnRate: 1500 }
};

// Game State
let selectedTheme = null;
let selectedDifficulty = null;
let score = 0;
let timeLeft = 45;
let gameInterval = null;
let spawnInterval = null;
let currentTargets = [];
let playerPreviousBest = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Don't load leaderboard on startup - only during game
});

// Screen Navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function showSplash() {
    showScreen('splashScreen');
}

function showThemeSelection() {
    showScreen('themeScreen');
}

function showDifficultySelection() {
    if (!selectedTheme) {
        alert('Please select a theme first!');
        return;
    }
    showScreen('difficultyScreen');
}

// Theme Selection
function selectTheme(theme, element) {
    selectedTheme = theme;
    document.querySelectorAll('.theme-card').forEach(card => {
        card.classList.remove('selected');
    });
    element.classList.add('selected');
    document.getElementById('themeNextBtn').disabled = false;
}

// Difficulty Selection
function selectDifficulty(difficulty, element) {
    selectedDifficulty = difficulty;
    document.querySelectorAll('.difficulty-card').forEach(card => {
        card.classList.remove('selected');
    });
    element.classList.add('selected');
    document.getElementById('difficultyNextBtn').disabled = false;
}

// Game Logic
function startGame() {
    if (!selectedTheme || !selectedDifficulty) {
        alert('Please select theme and difficulty!');
        return;
    }

    // Reset game state
    score = 0;
    timeLeft = 45;
    currentTargets = [];
    
    // Update UI
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = timeLeft;
    
    // Create game board
    createGameBoard();
    
    // Show game screen and leaderboard
    showScreen('gameScreen');
    document.getElementById('leaderboardPanel').classList.add('visible');
    
    // Load and start refreshing leaderboard
    loadLeaderboard();
    const leaderboardRefresh = setInterval(loadLeaderboard, 10000);
    
    // Start game timer
    gameInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(leaderboardRefresh);
            endGame();
        }
    }, 1000);
    
    // Start spawning targets
    const settings = DIFFICULTY_SETTINGS[selectedDifficulty];
    spawnInterval = setInterval(() => spawnTarget(), settings.spawnRate);
    spawnTarget(); // Spawn first target immediately
}

function createGameBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
        const hole = document.createElement('div');
        hole.className = 'hole';
        hole.dataset.index = i;
        hole.onclick = () => hitTarget(i);
        
        // Create emoji container
        const emojiSpan = document.createElement('span');
        emojiSpan.className = 'hole-emoji';
        hole.appendChild(emojiSpan);
        
        gameBoard.appendChild(hole);
    }
}

function spawnTarget() {
    // Don't clear targets that are still active - let them timeout naturally
    // Only spawn new targets in empty holes
    
    // Spawn 1-2 targets
    const numTargets = Math.random() < 0.7 ? 1 : 2;
    
    // Get holes that don't have active targets
    const occupiedHoles = currentTargets.map(t => t.index);
    const availableHoles = [0, 1, 2, 3, 4, 5, 6, 7, 8].filter(i => !occupiedHoles.includes(i));
    
    for (let i = 0; i < numTargets && availableHoles.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * availableHoles.length);
        const holeIndex = availableHoles.splice(randomIndex, 1)[0];
        
        // 70% chance of correct target, 30% chance of wrong target
        const isCorrect = Math.random() < 0.7;
        const theme = THEMES[selectedTheme];
        
        const target = {
            index: holeIndex,
            isCorrect: isCorrect,
            emoji: isCorrect ? theme.correct : theme.wrong,
            timeoutId: null
        };
        
        currentTargets.push(target);
        
        const hole = document.querySelector(`[data-index="${holeIndex}"]`);
        const emojiSpan = hole.querySelector('.hole-emoji');
        if (emojiSpan) emojiSpan.textContent = target.emoji;
        hole.classList.add(isCorrect ? 'active-correct' : 'active-wrong');
        
        // Set individual timeout for this target
        const settings = DIFFICULTY_SETTINGS[selectedDifficulty];
        target.timeoutId = setTimeout(() => {
            // Only remove if target still exists (wasn't hit)
            const targetIndex = currentTargets.findIndex(t => t.index === holeIndex);
            if (targetIndex !== -1) {
                const hole = document.querySelector(`[data-index="${holeIndex}"]`);
                if (hole) {
                    const emojiSpan = hole.querySelector('.hole-emoji');
                    if (emojiSpan) emojiSpan.textContent = '';
                    hole.classList.remove('active-correct', 'active-wrong');
                }
                currentTargets.splice(targetIndex, 1);
            }
        }, settings.targetTime);
    }
}

function hitTarget(holeIndex) {
    const targetIndex = currentTargets.findIndex(t => t.index === holeIndex);
    
    if (targetIndex === -1) return; // No target at this hole
    
    const target = currentTargets[targetIndex];
    const hole = document.querySelector(`[data-index="${holeIndex}"]`);
    const emojiSpan = hole.querySelector('.hole-emoji');
    
    // Clear the timeout for this target
    if (target.timeoutId) {
        clearTimeout(target.timeoutId);
    }
    
    if (target.isCorrect) {
        // Correct hit: +10 points
        score += 10;
        hole.classList.add('hit-correct');
        showScorePopup(holeIndex, '+10', '#4caf50');
    } else {
        // Wrong hit: -10 points
        score -= 10;
        hole.classList.add('hit-wrong');
        showScorePopup(holeIndex, '-10', '#f44336');
    }
    
    // Update score display
    document.getElementById('score').textContent = score;
    
    // Remove target immediately when hit
    if (emojiSpan) emojiSpan.textContent = '';
    hole.classList.remove('active-correct', 'active-wrong');
    currentTargets.splice(targetIndex, 1);
    
    // Remove hit animation after delay
    setTimeout(() => {
        hole.classList.remove('hit-correct', 'hit-wrong');
    }, 500);
}

function showScorePopup(holeIndex, text, color) {
    const hole = document.querySelector(`[data-index="${holeIndex}"]`);
    const popup = document.createElement('div');
    popup.className = 'score-popup';
    popup.textContent = text;
    popup.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2rem;
        font-weight: bold;
        color: ${color};
        pointer-events: none;
        z-index: 100;
        animation: scorePopup 1s ease forwards;
    `;
    
    hole.appendChild(popup);
    
    setTimeout(() => {
        if (popup.parentNode) {
            popup.remove();
        }
    }, 1000);
}

function endGame() {
    // Stop intervals
    clearInterval(gameInterval);
    clearInterval(spawnInterval);
    
    // Clear targets
    currentTargets.forEach(target => {
        const hole = document.querySelector(`[data-index="${target.index}"]`);
        if (hole) {
            const emojiSpan = hole.querySelector('.hole-emoji');
            if (emojiSpan) emojiSpan.textContent = '';
            hole.classList.remove('active-correct', 'active-wrong');
        }
    });
    
    // Show game over screen
    document.getElementById('finalScore').textContent = score;
    showScreen('gameOverScreen');
}

// Save Score
async function saveScore() {
    const playerName = document.getElementById('playerName').value.trim();
    
    if (!playerName) {
        alert('Please enter your name!');
        return;
    }
    
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
            console.log('Score saved:', data);
            
            // Show appropriate message and animation
            const messageEl = document.getElementById('scoreMessage');
            messageEl.textContent = data.message;
            messageEl.className = `score-message ${data.animation}`;
            
            // Trigger celebration animation if new high score
            if (data.animation === 'celebration') {
                triggerFireworks();
            }
            
            // Reload leaderboard
            loadLeaderboard();
        } else {
            alert('Failed to save score. Please try again.');
        }
    } catch (error) {
        console.error('Error saving score:', error);
        alert('Error connecting to server. Make sure backend is running.');
    }
}

// Fireworks Animation
function triggerFireworks() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight * 0.5;
            createFirework(x, y, colors[Math.floor(Math.random() * colors.length)]);
        }, i * 100);
    }
}

function createFirework(x, y, color) {
    const particles = 30;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = color;
        
        const angle = (Math.PI * 2 * i) / particles;
        const velocity = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        document.getElementById('fireworksContainer').appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

// Load Leaderboard
async function loadLeaderboard() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/leaderboard`);
        
        if (response.ok) {
            const scores = await response.json();
            displayLeaderboard(scores);
        } else {
            document.getElementById('leaderboardList').innerHTML = 
                '<div class="loading">Failed to load leaderboard</div>';
        }
    } catch (error) {
        console.error('Error loading leaderboard:', error);
        document.getElementById('leaderboardList').innerHTML = 
            '<div class="loading">Backend not connected</div>';
    }
}

function displayLeaderboard(scores) {
    const leaderboardList = document.getElementById('leaderboardList');
    
    if (scores.length === 0) {
        leaderboardList.innerHTML = '<div class="loading">No scores yet. Be the first!</div>';
        return;
    }
    
    const medals = ['🥇', '🥈', '🥉'];
    
    leaderboardList.innerHTML = scores.map((entry, index) => {
        const rankClass = index < 3 ? `rank-${index + 1}` : '';
        const medal = index < 3 ? medals[index] : `#${index + 1}`;
        
        return `
            <div class="leaderboard-item ${rankClass}">
                <div class="player-info">
                    <span class="rank-badge">${medal}</span>
                    <span class="player-name">${entry.playerName}</span>
                </div>
                <span class="player-score">${entry.score}</span>
            </div>
        `;
    }).join('');
}

// Play Again
function playAgain() {
    selectedTheme = null;
    selectedDifficulty = null;
    document.getElementById('playerName').value = '';
    document.getElementById('scoreMessage').textContent = '';
    document.getElementById('leaderboardPanel').classList.remove('visible');
    showSplash();
}
