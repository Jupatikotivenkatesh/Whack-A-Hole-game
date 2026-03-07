const gameStates = {
            IDLE: 'idle',
            RUNNING: 'running',
            ENDED: 'ended'
        };

        // Theme configurations with scoring info
        const themes = {
            defender: { 
                good: '🛡️', 
                bad: '⚔️', 
                goodLabel: 'Shield', 
                badLabel: 'Sword',
                goodInfo: 'Click Shields to defend (+10 pts)',
                badInfo: 'Avoid Swords (-5 pts)'
            },
            space: { 
                good: '🚀', 
                bad: '👾', 
                goodLabel: 'Rocket', 
                badLabel: 'Alien',
                goodInfo: 'Launch Rockets (+10 pts)',
                badInfo: 'Avoid Aliens (-5 pts)'
            },
            zombie: { 
                good: '💊', 
                bad: '🧟', 
                goodLabel: 'Medicine', 
                badLabel: 'Zombie',
                goodInfo: 'Grab Medicine (+10 pts)',
                badInfo: 'Avoid Zombies (-5 pts)'
            },
            jungle: { 
                good: '🌿', 
                bad: '🐍', 
                goodLabel: 'Plant', 
                badLabel: 'Snake',
                goodInfo: 'Collect Plants (+10 pts)',
                badInfo: 'Avoid Snakes (-5 pts)'
            },
            food: { 
                good: '🥗', 
                bad: '🍔', 
                goodLabel: 'Healthy Food', 
                badLabel: 'Junk Food',
                goodInfo: 'Eat Healthy Food (+10 pts)',
                badInfo: 'Avoid Junk Food (-5 pts)'
            },
            environment: { 
                good: '♻️', 
                bad: '🏭', 
                goodLabel: 'Recycle', 
                badLabel: 'Pollution',
                goodInfo: 'Recycle Items (+10 pts)',
                badInfo: 'Avoid Pollution (-5 pts)'
            },
            cyber: { 
                good: '🔒', 
                bad: '🤖', 
                goodLabel: 'Security', 
                badLabel: 'Virus Bot',
                goodInfo: 'Secure Systems (+10 pts)',
                badInfo: 'Avoid Virus Bots (-5 pts)'
            },
            cricket: { 
                good: '🏏', 
                bad: '🔴', 
                goodLabel: 'Bat', 
                badLabel: 'Out',
                goodInfo: 'Hit with Bat (+10 pts)',
                badInfo: 'Avoid Getting Out (-5 pts)'
            },
            treasure: { 
                good: '💎', 
                bad: '💣', 
                goodLabel: 'Gem', 
                badLabel: 'Bomb',
                goodInfo: 'Collect Gems (+10 pts)',
                badInfo: 'Avoid Bombs (-5 pts)'
            },
            crime: { 
                good: '👮', 
                bad: '🦹', 
                goodLabel: 'Police', 
                badLabel: 'Criminal',
                goodInfo: 'Catch Criminals (+10 pts)',
                badInfo: 'Avoid Hitting Police (-5 pts)'
            }
        };

        // Difficulty configurations (increased by 0.5 seconds)
        const difficulties = {
            easy: { hoverTime: 1700, spawnRate: 900 },
            medium: { hoverTime: 1400, spawnRate: 700 },
            hard: { hoverTime: 1250, spawnRate: 500 }
        };

        let gameState = gameStates.IDLE;
        let score = 0;
        let timeLeft = 45;
        let gameInterval;
        let spawnInterval;
        let currentSpawnRate = 800;
        let scoreTimeout;
        let gameStartTime;
        let selectedTheme = null;
        let selectedDifficulty = 'medium';
        let moleHoverTime = 900;

        const scoreElement = document.getElementById('scoreValue');
        const timerElement = document.getElementById('timerValue');
        const startScreen = document.getElementById('startScreen');
        const startButton = document.getElementById('startButton');
        const themeSelection = document.getElementById('themeSelection');
        const proceedButton = document.getElementById('proceedButton');
        const tryAgainButton = document.getElementById('tryAgainButton');
        const gameOver = document.getElementById('gameOver');
        const finalScoreElement = document.getElementById('finalScore');
        const scoreDisplay = document.querySelector('.score');
        const gridContainer = document.getElementById('gridContainer');
        const holes = document.querySelectorAll('.hole');
        const historyList = document.getElementById('historyList');
        const clearHistoryBtn = document.getElementById('clearHistory');
        const motivationalMessage = document.getElementById('motivationalMessage');
        const scoreComparison = document.getElementById('scoreComparison');
        const themeScoringInfo = document.getElementById('themeScoringInfo');
        const goodIcon = document.getElementById('goodIcon');
        const badIcon = document.getElementById('badIcon');
        const goodText = document.getElementById('goodText');
        const badText = document.getElementById('badText');

        // Set initial body state
        document.body.className = 'state-idle';

        // Motivational messages
        const celebrationMessages = [
            "🎉 Incredible! You've crushed your previous record! You're on fire!",
            "🚀 Amazing improvement! Your skills are getting sharper!",
            "⭐ Fantastic! You're climbing the ranks like a champion!",
            "💪 Outstanding! That's the spirit of a true winner!",
            "🏆 Phenomenal! You're mastering this game like a pro!",
            "✨ Brilliant! Your reflexes are getting faster and faster!",
            "🎯 Superb! You're setting new standards of excellence!",
            "🔥 Wow! That was an epic performance! Keep it up!"
        ];

        const encouragementMessages = [
            "💙 Don't worry! Every champion faces setbacks. You'll do better next time!",
            "🌟 You're getting better with each try! Keep practicing!",
            "💪 Close one! You've got this - give it another shot!",
            "🎯 Almost there! Your next attempt could be your best yet!",
            "🚀 Learning from mistakes makes you stronger! Go for it!",
            "✨ Every game is a step forward! You're improving!",
            "🎮 That's okay! Even the best have off days. Try again!",
            "💡 Practice makes perfect! Your breakthrough is coming!"
        ];

        const firstGameMessages = [
            "🎉 Welcome to the game! That's a great first score!",
            "🌟 Nice start! Let's see if you can beat this score!",
            "🚀 Excellent first attempt! Ready for round two?",
            "💪 Not bad for your first game! Let's go again!",
            "✨ Great beginning! Your journey to mastery starts now!",
            "🎯 Solid first score! Time to set a new record!"
        ];

        // Theme selection
        document.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                selectedTheme = option.dataset.theme;
                proceedButton.disabled = false;
                
                // Update scoring info display
                const themeConfig = themes[selectedTheme];
                goodIcon.textContent = themeConfig.good;
                badIcon.textContent = themeConfig.bad;
                goodText.textContent = themeConfig.goodInfo;
                badText.textContent = themeConfig.badInfo;
                themeScoringInfo.classList.add('visible');
            });
        });

        // Difficulty selection
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedDifficulty = btn.dataset.difficulty;
                moleHoverTime = difficulties[selectedDifficulty].hoverTime;
                currentSpawnRate = difficulties[selectedDifficulty].spawnRate;
            });
        });

        // Load score history from localStorage
        function loadScoreHistory() {
            const history = JSON.parse(localStorage.getItem('whackAMoleHistory') || '[]');
            return history;
        }

        // Save score to history
        function saveScore(score) {
            const history = loadScoreHistory();
            const newEntry = {
                score: score,
                date: new Date().toISOString(),
                timestamp: Date.now()
            };
            history.unshift(newEntry);
            // Keep only top 10 scores
            history.sort((a, b) => b.score - a.score);
            const topScores = history.slice(0, 10);
            localStorage.setItem('whackAMoleHistory', JSON.stringify(topScores));
            displayScoreHistory();
        }

        // Display score history
        function displayScoreHistory() {
            const history = loadScoreHistory();
            if (history.length === 0) {
                historyList.innerHTML = '<div class="no-history">No games played yet. Start playing to see your scores!</div>';
                return;
            }

            historyList.innerHTML = history.map((entry, index) => {
                const date = new Date(entry.date);
                const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                return `
                    <div class="history-item">
                        <div>
                            <div class="history-rank">#${index + 1}</div>
                            <div class="history-date">${formattedDate}</div>
                        </div>
                        <div class="history-score">${entry.score}</div>
                    </div>
                `;
            }).join('');
        }

        // Clear history
        clearHistoryBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all score history?')) {
                localStorage.removeItem('whackAMoleHistory');
                displayScoreHistory();
            }
        });

        // Initialize
        displayScoreHistory();

        startButton.addEventListener('click', () => {
            startScreen.style.display = 'none';
            themeSelection.style.display = 'flex';
        });

        proceedButton.addEventListener('click', () => {
            if (selectedTheme) {
                themeSelection.style.display = 'none';
                startGame();
            }
        });

        tryAgainButton.addEventListener('click', () => {
            gameOver.style.display = 'none';
            document.body.className = 'state-idle';
            themeSelection.style.display = 'flex';
        });

        function startGame() {
            gameState = gameStates.RUNNING;
            score = 0;
            timeLeft = 45;
            gameStartTime = Date.now();
            
            // Change background to playing state
            document.body.className = 'state-playing';
            
            // Set spawn rate based on difficulty
            currentSpawnRate = difficulties[selectedDifficulty].spawnRate;
            moleHoverTime = difficulties[selectedDifficulty].hoverTime;
            
            updateScore();
            updateTimer();
            gameOver.style.display = 'none';

            // Clear any existing moles
            holes.forEach(hole => {
                const existingMole = hole.querySelector('.mole');
                if (existingMole) existingMole.remove();
            });

            // Start timer
            gameInterval = setInterval(() => {
                timeLeft--;
                updateTimer();
                
                // Progressive difficulty (optional speed boost)
                const elapsedTime = 45 - timeLeft;
                if (elapsedTime === 15 && selectedDifficulty !== 'hard') {
                    currentSpawnRate = Math.max(currentSpawnRate - 100, 400);
                    restartSpawning();
                } else if (elapsedTime === 30 && selectedDifficulty !== 'hard') {
                    currentSpawnRate = Math.max(currentSpawnRate - 150, 300);
                    restartSpawning();
                }
                
                if (timeLeft <= 0) {
                    endGame();
                }
            }, 1000);

            // Start spawning moles
            spawnInterval = setInterval(spawnMole, currentSpawnRate);
        }

        function restartSpawning() {
            clearInterval(spawnInterval);
            spawnInterval = setInterval(spawnMole, currentSpawnRate);
        }

        function endGame() {
            gameState = gameStates.ENDED;
            clearInterval(gameInterval);
            clearInterval(spawnInterval);
            
            // Change background to ended state
            document.body.className = 'state-ended';
            
            // Clear all moles
            holes.forEach(hole => {
                const mole = hole.querySelector('.mole');
                if (mole) mole.remove();
            });
            
            // Get previous scores
            const history = loadScoreHistory();
            const previousBestScore = history.length > 0 ? history[0].score : null;
            const lastScore = history.length > 0 ? history[0].score : null;
            
            // Save current score to history (localStorage)
            saveScore(score);
            
            // Save score to backend
            saveScoreToBackend(score);
            
            // Display motivational message
            displayMotivationalMessage(score, previousBestScore, lastScore, history.length === 0);
            
            finalScoreElement.textContent = score;
            gameOver.style.display = 'flex';
        }

        // Save score to backend API
        async function saveScoreToBackend(finalScore) {
            const playerName = prompt('Enter your name for the leaderboard:', 'Player') || 'Anonymous';
            
            try {
                const response = await fetch('/api/scores', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        playerName: playerName,
                        score: finalScore,
                        theme: selectedTheme,
                        difficulty: selectedDifficulty
                    })
                });
                
                if (response.ok) {
                    console.log('Score saved to backend successfully');
                    // Refresh leaderboard
                    loadLeaderboard();
                } else {
                    console.error('Failed to save score to backend');
                }
            } catch (error) {
                console.error('Error saving score to backend:', error);
                // Fallback to localStorage only
            }
        }

        // Load leaderboard from backend
        async function loadLeaderboard() {
            try {
                const response = await fetch('/api/leaderboard');
                if (response.ok) {
                    const leaderboard = await response.json();
                    displayBackendLeaderboard(leaderboard);
                }
            } catch (error) {
                console.error('Error loading leaderboard:', error);
            }
        }

        // Display backend leaderboard
        function displayBackendLeaderboard(leaderboard) {
            if (leaderboard.length === 0) {
                historyList.innerHTML = '<div class="no-history">No games played yet. Be the first on the leaderboard!</div>';
                return;
            }

            historyList.innerHTML = leaderboard.map((entry, index) => {
                const date = new Date(entry.date);
                const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                const themeIcon = entry.theme ? themes[entry.theme]?.good || '🎮' : '🎮';
                return `
                    <div class="history-item">
                        <div>
                            <div class="history-rank">#${index + 1}</div>
                            <div class="history-date">${entry.playerName}</div>
                        </div>
                        <div>
                            <div class="history-score">${entry.score}</div>
                            <div class="history-date">${themeIcon} ${entry.difficulty || 'N/A'}</div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Load leaderboard on page load
        loadLeaderboard();
            gameOver.style.display = 'flex';
        }

        function displayMotivationalMessage(currentScore, previousBest, lastScore, isFirstGame) {
            let message = '';
            let messageClass = '';
            let comparisonText = '';
            let comparisonClass = '';
            
            if (isFirstGame) {
                // First game ever
                message = firstGameMessages[Math.floor(Math.random() * firstGameMessages.length)];
                messageClass = 'first-game';
            } else if (currentScore > previousBest) {
                // New high score!
                message = celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];
                messageClass = 'celebration';
                const improvement = currentScore - previousBest;
                comparisonText = `🎊 New Record! +${improvement} points from your best!`;
                comparisonClass = 'improved';
            } else if (currentScore > lastScore) {
                // Better than last game
                message = celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];
                messageClass = 'celebration';
                const improvement = currentScore - lastScore;
                comparisonText = `📈 Improved! +${improvement} points from last game!`;
                comparisonClass = 'improved';
            } else if (currentScore < lastScore) {
                // Lower than last game
                message = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
                messageClass = 'encouragement';
                const decline = lastScore - currentScore;
                comparisonText = `📉 ${decline} points below last game. You've got this!`;
                comparisonClass = 'declined';
            } else {
                // Same score
                message = "🎯 Same score as before! Can you beat it this time?";
                messageClass = 'encouragement';
            }
            
            motivationalMessage.textContent = message;
            motivationalMessage.className = `motivational-message ${messageClass}`;
            
            if (comparisonText) {
                scoreComparison.textContent = comparisonText;
                scoreComparison.className = `score-comparison ${comparisonClass}`;
                scoreComparison.style.display = 'inline-flex';
            } else {
                scoreComparison.style.display = 'none';
            }
        }

        function updateScore() {
            scoreElement.textContent = score;
        }

        function updateTimer() {
            timerElement.textContent = timeLeft;
        }

        function spawnMole() {
            if (gameState !== gameStates.RUNNING) return;

            // Get available holes (not occupied)
            const availableHoles = Array.from(holes).filter(hole => !hole.querySelector('.mole'));
            
            if (availableHoles.length === 0) return;

            // Select random hole
            const randomHole = availableHoles[Math.floor(Math.random() * availableHoles.length)];
            
            // Determine mole type (50% good, 50% bad)
            const isGood = Math.random() > 0.5;
            
            // Get theme icons
            const themeConfig = themes[selectedTheme];
            const icon = isGood ? themeConfig.good : themeConfig.bad;
            
            // Create mole
            const mole = document.createElement('div');
            mole.className = 'mole';
            mole.textContent = icon;
            mole.dataset.type = isGood ? 'good' : 'bad';
            
            randomHole.appendChild(mole);
            
            // Animate mole appearance
            setTimeout(() => {
                mole.classList.add('active');
            }, 10);
            
            // Add click handler
            mole.addEventListener('click', () => handleMoleClick(mole, randomHole));
            
            // Auto-hide after hover time based on difficulty
            setTimeout(() => {
                if (mole.parentNode && gameState === gameStates.RUNNING) {
                    mole.classList.remove('active');
                    setTimeout(() => mole.remove(), 300);
                }
            }, moleHoverTime);
        }

        function handleMoleClick(mole, hole) {
            if (gameState !== gameStates.RUNNING || mole.classList.contains('clicked')) return;
            
            mole.classList.add('clicked');
            
            const isGood = mole.dataset.type === 'good';
            // Reversed logic: clicking 'good' items (shields, rockets, etc.) gives +10 points
            // clicking 'bad' items (swords, aliens, etc.) gives -5 points
            const points = isGood ? 10 : -5;
            
            score += points;
            updateScore();
            
            // Show floating score
            showFloatingScore(points, hole);
            
            // Visual feedback
            if (points > 0) {
                flashScore('correct');
            } else {
                flashScore('incorrect');
                shakeScreen();
            }
            
            // Remove mole
            setTimeout(() => mole.remove(), 300);
        }

        function showFloatingScore(points, hole) {
            const floatingScore = document.createElement('div');
            floatingScore.className = 'floating-score';
            floatingScore.textContent = points > 0 ? `+${points}` : points;
            floatingScore.style.color = points > 0 ? '#34d399' : '#f87171';
            
            const rect = hole.getBoundingClientRect();
            floatingScore.style.position = 'fixed';
            floatingScore.style.left = rect.left + rect.width / 2 + 'px';
            floatingScore.style.top = rect.top + rect.height / 2 + 'px';
            floatingScore.style.transform = 'translate(-50%, -50%)';
            
            document.body.appendChild(floatingScore);
            
            setTimeout(() => floatingScore.remove(), 1000);
        }

        function flashScore(type) {
            clearTimeout(scoreTimeout);
            scoreDisplay.classList.remove('correct', 'incorrect');
            
            setTimeout(() => {
                scoreDisplay.classList.add(type);
                scoreTimeout = setTimeout(() => {
                    scoreDisplay.classList.remove(type);
                }, 300);
            }, 10);
        }

        function shakeScreen() {
            gridContainer.classList.add('shake');
            setTimeout(() => {
                gridContainer.classList.remove('shake');
            }, 300);
        }