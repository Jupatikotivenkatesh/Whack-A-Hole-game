/* =====================================================
   Mole Mayhem — Enhanced Edition
   script.js
   ===================================================== */

// ── Backend URL ──────────────────────────────────────────────────────────────
const BACKEND_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:8080'
    : 'https://whack-a-hole-game.onrender.com';

// ── Server warm-up ───────────────────────────────────────────────────────────
let serverReady = false;

function updateStatus(title, sub, pct, done = false) {
    const el    = document.getElementById('serverStatus');
    const tEl   = document.getElementById('statusTitle');
    const sEl   = document.getElementById('statusSub');
    const bar   = document.getElementById('statusBarFill');
    if (!el) return;
    if (tEl) tEl.textContent = title;
    if (sEl) sEl.textContent = sub;
    if (bar) bar.style.width = pct + '%';
    if (done) {
        el.classList.add('ready');
        setTimeout(() => el.classList.add('hidden'), 2000);
    }
}

async function warmUpServer() {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocal) {
        document.getElementById('serverStatus')?.classList.add('hidden');
        serverReady = true;
        return;
    }

    updateStatus('Connecting to server…', 'Waking up — this takes up to 30s on first visit', 5);

    const steps = [
        { delay: 2000,  pct: 15, sub: 'Starting backend…' },
        { delay: 5000,  pct: 30, sub: 'Loading database connection…' },
        { delay: 10000, pct: 50, sub: 'Almost there…' },
        { delay: 18000, pct: 70, sub: 'Still waking up — nearly ready…' },
        { delay: 26000, pct: 85, sub: 'Taking a little longer than usual…' },
    ];
    const timers = steps.map(s =>
        setTimeout(() => updateStatus(
            document.getElementById('statusTitle')?.textContent || 'Connecting…',
            s.sub, s.pct
        ), s.delay)
    );

    const start = Date.now();
    while (Date.now() - start < 55000) {
        try {
            const res = await fetch(`${BACKEND_URL}/api/health`, {
                method: 'GET',
                signal: AbortSignal.timeout(6000),
            });
            if (res.ok) {
                timers.forEach(clearTimeout);
                serverReady = true;
                updateStatus('✅ Mole Mayhem API ready!', 'You can sign up or log in now', 100, true);
                return;
            }
        } catch { /* keep retrying */ }
        await new Promise(r => setTimeout(r, 3000));
    }

    timers.forEach(clearTimeout);
    updateStatus('⚠️ Server slow to respond', 'Try signing up anyway — it may still work', 90);
    serverReady = true;
}

warmUpServer();

// ── Themes ──────────────────────────────────────────
const THEMES = {
    classic: { correct: '🐹', wrong: '🐭', name: 'Classic' },
    forest:  { correct: '🦝', wrong: '🐿️', name: 'Forest' },
    space:   { correct: '👽', wrong: '👾',  name: 'Space' },
    ocean:   { correct: '🐙', wrong: '🦑',  name: 'Ocean' },
    candy:   { correct: '🍭', wrong: '🍬',  name: 'Candy' },
};

// ── Difficulty ───────────────────────────────────────
const DIFFICULTY = {
    easy:   { targetTime: 3000, spawnRate: 2500 },
    medium: { targetTime: 2500, spawnRate: 2000 },
    hard:   { targetTime: 2000, spawnRate: 1500 },
};

// ── Core State ───────────────────────────────────────
let currentUser   = null;
let selectedTheme = null;
let selectedDiff  = null;
let score         = 0;
let hitCount      = 0;
let missCount     = 0;
let timeLeft      = 45;
let gameInterval  = null;
let spawnInterval = null;
let lbInterval    = null;
let targets       = [];

// ── New State Variables ──────────────────────────────
let comboCount        = 0;
let bestCombo         = 0;
let wrongClickCount   = 0;
let hardPenaltyActive = false;
let isPaused          = false;
let totalGamesPlayed  = 0;
let totalHitsAllTime  = 0;
let totalMissesAllTime = 0;
let localBestScore    = 0;
let globalBestCombo   = 0;

// Progressive difficulty tracking
let elapsedSeconds         = 0;
let currentSpawnRate       = 0;
let progressiveSpawnHandle = null;

// Achievements unlocked this session (by key)
let gameAchievementsEarned = [];

// ── Achievement Definitions ───────────────────────────
const ACHIEVEMENTS = {
    firstHit:        { key: 'firstHit',       icon: '🎯', title: 'First Hit',        desc: 'Score any points in your first game' },
    moleHunter:      { key: 'moleHunter',     icon: '🔨', title: 'Mole Hunter',      desc: 'Get 10+ correct hits in one game' },
    comboMaster:     { key: 'comboMaster',    icon: '⚡', title: 'Combo Master',     desc: 'Achieve a combo of 5 or more' },
    precisionExpert: { key: 'precisionExpert',icon: '🎖', title: 'Precision Expert', desc: 'Finish with 90%+ accuracy (min 10 hits)' },
    speedDemon:      { key: 'speedDemon',     icon: '💨', title: 'Speed Demon',      desc: '15+ correct hits in Hard mode' },
    mayhemKing:      { key: 'mayhemKing',     icon: '👑', title: 'Mayhem King',      desc: 'Score 150+ points in one game' },
};

// ── Load persisted stats from localStorage ────────────
function loadLocalStats() {
    totalGamesPlayed   = parseInt(localStorage.getItem('mm_gamesPlayed')   || '0', 10);
    totalHitsAllTime   = parseInt(localStorage.getItem('mm_totalHits')     || '0', 10);
    totalMissesAllTime = parseInt(localStorage.getItem('mm_totalMisses')   || '0', 10);
    localBestScore     = parseInt(localStorage.getItem('mm_bestScore')     || '0', 10);
    globalBestCombo    = parseInt(localStorage.getItem('mm_bestCombo')     || '0', 10);
}

function saveLocalStats() {
    localStorage.setItem('mm_gamesPlayed', totalGamesPlayed);
    localStorage.setItem('mm_totalHits',   totalHitsAllTime);
    localStorage.setItem('mm_totalMisses', totalMissesAllTime);
    localStorage.setItem('mm_bestScore',   localBestScore);
    localStorage.setItem('mm_bestCombo',   globalBestCombo);
}

function getUnlockedAchievements() {
    try { return JSON.parse(localStorage.getItem('mm_achievements') || '[]'); }
    catch { return []; }
}

function saveUnlockedAchievement(key) {
    const unlocked = getUnlockedAchievements();
    if (!unlocked.includes(key)) {
        unlocked.push(key);
        localStorage.setItem('mm_achievements', JSON.stringify(unlocked));
    }
}

// ════════════════════════════════════════════════════
//  TOAST
// ════════════════════════════════════════════════════
function showToast(msg, type = 'info', duration = 3000) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = `toast ${type} show`;
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), duration);
}

// ════════════════════════════════════════════════════
//  ACHIEVEMENT TOAST
// ════════════════════════════════════════════════════
function showAchievementToast(achievement) {
    const el    = document.getElementById('achievementToast');
    const icon  = document.getElementById('achievementToastIcon');
    const title = document.getElementById('achievementToastTitle');
    const desc  = document.getElementById('achievementToastDesc');
    if (!el) return;
    icon.textContent  = achievement.icon;
    title.textContent = '🏆 Achievement Unlocked!';
    desc.textContent  = `${achievement.title} — ${achievement.desc}`;
    el.classList.add('show');
    clearTimeout(el._timer);
    el._timer = setTimeout(() => el.classList.remove('show'), 4000);
}

// ════════════════════════════════════════════════════
//  HARD MODE PENALTY ALERT
// ════════════════════════════════════════════════════
function showHardPenaltyAlert() {
    const el = document.getElementById('hardPenaltyAlert');
    if (!el) return;
    el.classList.add('show');
    clearTimeout(el._timer);
    el._timer = setTimeout(() => el.classList.remove('show'), 3000);
}

// ════════════════════════════════════════════════════
//  AUTH
// ════════════════════════════════════════════════════
function switchAuthTab(tab) {
    document.getElementById('loginTab').classList.toggle('active', tab === 'login');
    document.getElementById('signupTab').classList.toggle('active', tab === 'signup');
    document.getElementById('loginForm').classList.toggle('active', tab === 'login');
    document.getElementById('signupForm').classList.toggle('active', tab === 'signup');
}

function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    const isText = input.type === 'text';
    input.type = isText ? 'password' : 'text';
    btn.textContent = isText ? '👁' : '🙈';
}

document.addEventListener('DOMContentLoaded', () => {
    loadLocalStats();

    const pwInput = document.getElementById('signupPassword');
    if (pwInput) {
        pwInput.addEventListener('input', () => {
            const val = pwInput.value;
            const bar = document.getElementById('passwordStrength');
            let strength = 0;
            if (val.length >= 6)  strength++;
            if (val.length >= 10) strength++;
            if (/[A-Z]/.test(val)) strength++;
            if (/[0-9]/.test(val)) strength++;
            if (/[^A-Za-z0-9]/.test(val)) strength++;
            const pct   = ['0%','20%','40%','65%','85%','100%'][strength];
            const color = ['transparent','#f56565','#ed8936','#ecc94b','#48bb78','#00ffcc'][strength];
            bar.style.setProperty('--strength', pct);
            bar.style.setProperty('--strength-color', color);
        });
    }
    generateParticles();
});

async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const btn = document.getElementById('loginBtn');

    if (!serverReady) {
        showToast('Server is still waking up — please wait a moment ⏳', 'info', 4000);
        return;
    }

    setAuthLoading(btn, true);
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 35000);
        const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            signal: controller.signal,
        });
        clearTimeout(timeout);
        const data = await res.json();
        if (data.success) {
            currentUser = data.user;
            enterGame();
            showToast(`Welcome back, ${currentUser.username}! 🎮`, 'success');
        } else {
            showToast(data.message || 'Login failed', 'error');
        }
    } catch (err) {
        if (err.name === 'AbortError') {
            showToast('Server took too long — please try again ⏳', 'error', 5000);
        } else {
            showToast('Cannot reach server. Check your connection.', 'error');
        }
    } finally {
        setAuthLoading(btn, false);
    }
}

async function handleSignup(e) {
    e.preventDefault();
    const fullName = document.getElementById('signupFullName').value.trim();
    const username = document.getElementById('signupUsername').value.trim();
    const email    = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const btn = document.getElementById('signupBtn');

    if (!serverReady) {
        showToast('Server is still waking up — please wait a moment ⏳', 'info', 4000);
        return;
    }

    setAuthLoading(btn, true);
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 35000);
        const res = await fetch(`${BACKEND_URL}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, username, email, password }),
            signal: controller.signal,
        });
        clearTimeout(timeout);
        const data = await res.json();
        if (data.success) {
            currentUser = data.user;
            enterGame();
            showToast(`Account created! Let's play, ${currentUser.username}! 🎉`, 'success');
        } else {
            showToast(data.message || 'Signup failed', 'error');
        }
    } catch (err) {
        if (err.name === 'AbortError') {
            showToast('Server took too long — please try again ⏳', 'error', 5000);
        } else {
            showToast('Cannot reach server. Check your connection.', 'error');
        }
    } finally {
        setAuthLoading(btn, false);
    }
}

function continueAsGuest() {
    currentUser = { guest: true, username: 'Guest' };
    enterGame();
    showToast('Playing as Guest — scores won\'t be saved to your profile.', 'info');
}

function setAuthLoading(btn, loading) {
    btn.disabled = loading;
    btn.querySelector('.btn-text').classList.toggle('hidden', loading);
    btn.querySelector('.btn-loader').classList.toggle('hidden', !loading);
}

function enterGame() {
    document.getElementById('authWrapper').classList.add('hidden');
    document.getElementById('mainContainer').classList.remove('hidden');
    const label = currentUser.guest ? '🕹 Guest' : `👤 ${currentUser.username}`;
    document.getElementById('navUser').textContent = label;
    document.getElementById('playerName').value = currentUser.username || '';
    if (!currentUser.guest) loadSplashStats();
}

function logout() {
    currentUser = null;
    selectedTheme = null;
    selectedDiff  = null;
    clearIntervals();
    document.getElementById('mainContainer').classList.add('hidden');
    document.getElementById('authWrapper').classList.remove('hidden');
    document.getElementById('leaderboardPanel').classList.remove('visible');
    showScreen('splashScreen');
    document.getElementById('loginForm').reset();
    document.getElementById('signupForm').reset();
    switchAuthTab('login');
}

// ════════════════════════════════════════════════════
//  SPLASH STATS
// ════════════════════════════════════════════════════
async function loadSplashStats() {
    try {
        const res = await fetch(`${BACKEND_URL}/api/leaderboard`);
        if (!res.ok) return;
        const scores = await res.json();
        const container = document.getElementById('splashStats');
        const myBest = scores.find(s => s.playerName === currentUser.username);
        const html = [];
        if (myBest) {
            html.push(`<div class="splash-stat"><div class="splash-stat-val">${myBest.score}</div><div class="splash-stat-lbl">Your Best</div></div>`);
        }
        if (scores.length > 0) {
            html.push(`<div class="splash-stat"><div class="splash-stat-val">${scores[0].score}</div><div class="splash-stat-lbl">Top Score</div></div>`);
            html.push(`<div class="splash-stat"><div class="splash-stat-val">${scores.length}</div><div class="splash-stat-lbl">Players</div></div>`);
        }
        if (localBestScore > 0) {
            html.push(`<div class="splash-stat"><div class="splash-stat-val">${localBestScore}</div><div class="splash-stat-lbl">Local Best</div></div>`);
        }
        container.innerHTML = html.join('');
    } catch { /* silent */ }
}

// ════════════════════════════════════════════════════
//  SCREEN NAVIGATION
// ════════════════════════════════════════════════════
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}
function showSplash()         { showScreen('splashScreen'); }
function showThemeSelection() { showScreen('themeScreen'); }
function showDifficultySelection() {
    if (!selectedTheme) { showToast('Pick a theme first!', 'error'); return; }
    // Show/hide hard mode rules based on current selection
    const hardRules = document.getElementById('hardModeRules');
    if (hardRules) hardRules.style.display = selectedDiff === 'hard' ? 'block' : 'none';
    showScreen('difficultyScreen');
}

// ════════════════════════════════════════════════════
//  THEME & DIFFICULTY
// ════════════════════════════════════════════════════
function selectTheme(theme, el) {
    selectedTheme = theme;
    document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('themeNextBtn').disabled = false;
}

function selectDifficulty(diff, el) {
    selectedDiff = diff;
    document.querySelectorAll('.difficulty-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('difficultyNextBtn').disabled = false;

    // Show hard mode rules inline when hard is selected
    const hardRules = document.getElementById('hardModeRules');
    if (hardRules) hardRules.style.display = diff === 'hard' ? 'block' : 'none';
}

// ════════════════════════════════════════════════════
//  STATS MODAL
// ════════════════════════════════════════════════════
function showStats() {
    loadLocalStats();
    const accuracy = (totalHitsAllTime + totalMissesAllTime) > 0
        ? Math.round((totalHitsAllTime / (totalHitsAllTime + totalMissesAllTime)) * 100)
        : 0;
    document.getElementById('statsGamesPlayed').textContent = totalGamesPlayed;
    document.getElementById('statsTotalHits').textContent   = totalHitsAllTime;
    document.getElementById('statsAccuracy').textContent    = accuracy + '%';
    document.getElementById('statsBestCombo').textContent   = globalBestCombo;
    document.getElementById('statsBestScore').textContent   = localBestScore;
    document.getElementById('statsModal').classList.remove('hidden');
}

function closeStats(event) {
    // Close if clicking overlay background or the X button
    if (!event || event.target === document.getElementById('statsModal') || event.currentTarget === event.target) {
        document.getElementById('statsModal').classList.add('hidden');
    }
}

// ════════════════════════════════════════════════════
//  PAUSE / RESUME
// ════════════════════════════════════════════════════
function pauseGame() {
    if (isPaused) return;
    isPaused = true;
    clearInterval(gameInterval);
    clearInterval(spawnInterval);
    clearInterval(progressiveSpawnHandle);
    document.getElementById('pauseOverlay').classList.remove('hidden');
}

function resumeGame() {
    if (!isPaused) return;
    isPaused = false;
    document.getElementById('pauseOverlay').classList.add('hidden');

    gameInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 10) document.getElementById('timer').closest('.stat-card').classList.add('urgent');
        if (timeLeft <= 0) endGame();
        elapsedSeconds++;
        checkProgressiveDifficulty();
    }, 1000);

    spawnInterval = setInterval(spawnTarget, currentSpawnRate);
}

function restartGame() {
    document.getElementById('pauseOverlay').classList.add('hidden');
    clearIntervals();
    targets.forEach(t => clearTimeout(t.timeoutId));
    targets = [];
    playAgain();
}

// ════════════════════════════════════════════════════
//  GAME LOGIC
// ════════════════════════════════════════════════════
function startGame() {
    if (!selectedTheme || !selectedDiff) { showToast('Select theme and difficulty!', 'error'); return; }

    // Reset all state
    score         = 0;
    hitCount      = 0;
    missCount     = 0;
    timeLeft      = 45;
    targets       = [];
    comboCount    = 0;
    bestCombo     = 0;
    wrongClickCount   = 0;
    hardPenaltyActive = false;
    isPaused          = false;
    elapsedSeconds    = 0;
    gameAchievementsEarned = [];

    const cfg = DIFFICULTY[selectedDiff];
    currentSpawnRate = cfg.spawnRate;

    document.getElementById('score').textContent    = '0';
    document.getElementById('hitCount').textContent = '0';
    document.getElementById('timer').textContent    = '45';
    document.getElementById('comboCount').textContent = '0';
    document.getElementById('timer').closest('.stat-card').classList.remove('urgent');

    // Show hard mode badge
    const badge = document.getElementById('hardModeBadge');
    if (badge) badge.classList.toggle('hidden', selectedDiff !== 'hard');

    buildBoard();
    showScreen('gameScreen');
    document.getElementById('leaderboardPanel').classList.add('visible');
    loadLeaderboard();
    lbInterval = setInterval(loadLeaderboard, 10000);

    gameInterval = setInterval(() => {
        timeLeft--;
        elapsedSeconds++;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 10) document.getElementById('timer').closest('.stat-card').classList.add('urgent');
        if (timeLeft <= 0) endGame();
        checkProgressiveDifficulty();
    }, 1000);

    spawnInterval = setInterval(spawnTarget, currentSpawnRate);
    spawnTarget();
}

function checkProgressiveDifficulty() {
    // Every 10 seconds, reduce spawn interval by 150ms (min 800ms)
    if (elapsedSeconds > 0 && elapsedSeconds % 10 === 0) {
        const newRate = Math.max(800, currentSpawnRate - 150);
        if (newRate !== currentSpawnRate) {
            currentSpawnRate = newRate;
            clearInterval(spawnInterval);
            clearInterval(progressiveSpawnHandle);
            spawnInterval = setInterval(spawnTarget, currentSpawnRate);
            progressiveSpawnHandle = spawnInterval;
        }
    }
}

function buildBoard() {
    const board = document.getElementById('gameBoard');
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const hole = document.createElement('div');
        hole.className = 'hole';
        hole.dataset.index = i;
        hole.onclick = () => hitTarget(i);
        const span = document.createElement('span');
        span.className = 'hole-emoji';
        hole.appendChild(span);
        board.appendChild(hole);
    }
}

function spawnTarget() {
    const count     = Math.random() < 0.65 ? 1 : 2;
    const occupied  = targets.map(t => t.index);
    const available = [0,1,2,3,4,5,6,7,8].filter(i => !occupied.includes(i));

    for (let i = 0; i < count && available.length > 0; i++) {
        const ri   = Math.floor(Math.random() * available.length);
        const idx  = available.splice(ri, 1)[0];
        const isOk = Math.random() < 0.7;
        const theme = THEMES[selectedTheme];
        const t = { index: idx, isCorrect: isOk, timeoutId: null };
        targets.push(t);

        const hole = holeAt(idx);
        hole.querySelector('.hole-emoji').textContent = isOk ? theme.correct : theme.wrong;
        hole.classList.add(isOk ? 'active-correct' : 'active-wrong');

        t.timeoutId = setTimeout(() => {
            if (t.isCorrect) missCount++; // missed a correct target
            removeTarget(idx, true);
        }, DIFFICULTY[selectedDiff].targetTime);
    }
}

function removeTarget(idx, isMiss = false) {
    const i = targets.findIndex(t => t.index === idx);
    if (i === -1) return;
    const t = targets[i];
    targets.splice(i, 1);
    const hole = holeAt(idx);
    if (hole) {
        hole.querySelector('.hole-emoji').textContent = '';
        hole.classList.remove('active-correct', 'active-wrong');
    }
    // If a correct target expires without being hit — reset combo
    if (isMiss && t && t.isCorrect) {
        comboCount = 0;
        updateComboDisplay();
    }
}

function hitTarget(idx) {
    const ti = targets.findIndex(t => t.index === idx);
    if (ti === -1) return;
    const t    = targets[ti];
    const hole = holeAt(idx);
    clearTimeout(t.timeoutId);

    if (t.isCorrect) {
        // ── Correct hit ──
        let points = 10;

        // Increment combo
        comboCount++;
        if (comboCount > bestCombo) bestCombo = comboCount;

        // Combo bonus points
        if (comboCount >= 10) {
            points += 20;
        } else if (comboCount >= 5) {
            points += 10;
        } else if (comboCount >= 3) {
            points += 5;
        }

        score += points;
        hitCount++;
        hole.classList.add('hit-correct');
        showPopup(idx, `+${points}`, '#48bb78');

        // Show combo popup for combos >= 3
        if (comboCount === 10) {
            showComboPopup(idx, '💥 x10 COMBO +20!');
        } else if (comboCount === 5) {
            showComboPopup(idx, '⚡ x5 COMBO +10!');
        } else if (comboCount === 3) {
            showComboPopup(idx, '🔥 x3 COMBO +5!');
        } else if (comboCount > 10 && comboCount % 5 === 0) {
            showComboPopup(idx, `💥 x${comboCount} COMBO!`);
        }

        updateComboDisplay();
    } else {
        // ── Wrong hit ──
        let deduct = 10;
        if (selectedDiff === 'hard') {
            wrongClickCount++;
            if (wrongClickCount >= 3) {
                deduct = 15;
                if (!hardPenaltyActive) {
                    hardPenaltyActive = true;
                    showHardPenaltyAlert();
                }
            }
        }
        score -= deduct;
        hole.classList.add('hit-wrong');
        showPopup(idx, `−${deduct}`, '#f56565');

        // Reset combo on wrong hit
        comboCount = 0;
        updateComboDisplay();
    }

    document.getElementById('score').textContent    = score;
    document.getElementById('hitCount').textContent = hitCount;
    hole.querySelector('.hole-emoji').textContent = '';
    hole.classList.remove('active-correct', 'active-wrong');
    targets.splice(ti, 1);
    setTimeout(() => hole.classList.remove('hit-correct', 'hit-wrong'), 500);
}

function updateComboDisplay() {
    const countEl = document.getElementById('comboCount');
    const card    = document.getElementById('comboCard');
    if (countEl) countEl.textContent = comboCount;
    if (card) {
        if (comboCount >= 3) {
            card.classList.add('combo-active');
        } else {
            card.classList.remove('combo-active');
        }
    }
}

function showPopup(idx, text, color) {
    const hole = holeAt(idx);
    const el   = document.createElement('div');
    el.className = 'score-popup';
    el.textContent = text;
    el.style.cssText = `position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
        font-size:1.8rem;font-weight:900;color:${color};pointer-events:none;z-index:10;
        animation:scorePopup 0.9s ease forwards;text-shadow:0 2px 8px rgba(0,0,0,0.5);`;
    hole.appendChild(el);
    setTimeout(() => el.remove(), 900);
}

function showComboPopup(idx, text) {
    const hole = holeAt(idx);
    const el   = document.createElement('div');
    el.className = 'combo-popup';
    el.textContent = text;
    hole.appendChild(el);
    setTimeout(() => el.remove(), 1100);
}

// ════════════════════════════════════════════════════
//  ACHIEVEMENTS
// ════════════════════════════════════════════════════
function checkAndAwardAchievements() {
    const unlocked     = getUnlockedAchievements();
    const newlyEarned  = [];
    const totalAttempts = hitCount + missCount;
    const accuracy      = totalAttempts > 0 ? (hitCount / totalAttempts) * 100 : 0;

    function tryAward(key) {
        if (!unlocked.includes(key)) {
            saveUnlockedAchievement(key);
            newlyEarned.push(key);
            gameAchievementsEarned.push(key);
        }
    }

    if (score > 0)                                                    tryAward('firstHit');
    if (hitCount >= 10)                                               tryAward('moleHunter');
    if (bestCombo >= 5)                                               tryAward('comboMaster');
    if (accuracy >= 90 && totalAttempts >= 10)                        tryAward('precisionExpert');
    if (selectedDiff === 'hard' && hitCount >= 15)                    tryAward('speedDemon');
    if (score >= 150)                                                 tryAward('mayhemKing');

    // Show toasts for new achievements (staggered)
    newlyEarned.forEach((key, i) => {
        setTimeout(() => showAchievementToast(ACHIEVEMENTS[key]), i * 4500);
    });

    return gameAchievementsEarned;
}

function renderAchievementBadges(keys) {
    const container = document.getElementById('achievementBadges');
    if (!container) return;
    if (!keys || keys.length === 0) {
        container.innerHTML = '';
        return;
    }
    container.innerHTML = keys.map(key => {
        const a = ACHIEVEMENTS[key];
        if (!a) return '';
        return `<span class="achievement-badge">${a.icon} ${a.title}</span>`;
    }).join('');
}

// ════════════════════════════════════════════════════
//  END GAME
// ════════════════════════════════════════════════════
function endGame() {
    clearIntervals();
    targets.forEach(t => {
        clearTimeout(t.timeoutId);
        removeTarget(t.index);
    });
    targets = [];

    // Update global best combo
    if (bestCombo > globalBestCombo) globalBestCombo = bestCombo;
    if (score > localBestScore)       localBestScore  = score;

    // Update all-time stats
    totalGamesPlayed++;
    totalHitsAllTime   += hitCount;
    totalMissesAllTime += missCount;
    saveLocalStats();

    // Calculate accuracy
    const totalAttempts = hitCount + missCount;
    const accuracy = totalAttempts > 0
        ? Math.round((hitCount / totalAttempts) * 100)
        : 0;

    // Check achievements
    const earnedKeys = checkAndAwardAchievements();

    // Update game over UI
    document.getElementById('finalScore').textContent  = score;
    document.getElementById('scoreMeta').textContent   =
        `${hitCount} hits · ${accuracy}% accuracy · best combo: ${bestCombo} · ${selectedTheme} · ${selectedDiff}`;
    document.getElementById('gameOverAccuracy').textContent  = accuracy + '%';
    document.getElementById('gameOverBestCombo').textContent = bestCombo;

    renderAchievementBadges(earnedKeys);

    // Pre-fill name
    if (currentUser && !currentUser.guest) {
        document.getElementById('playerName').value = currentUser.username;
        document.getElementById('nameInputGroup').style.display = 'none';
    } else {
        document.getElementById('nameInputGroup').style.display = 'block';
    }

    showScreen('gameOverScreen');
}

function clearIntervals() {
    clearInterval(gameInterval);
    clearInterval(spawnInterval);
    clearInterval(lbInterval);
    clearInterval(progressiveSpawnHandle);
}

// ════════════════════════════════════════════════════
//  SAVE SCORE
// ════════════════════════════════════════════════════
async function saveScore() {
    let playerName;
    if (currentUser && !currentUser.guest) {
        playerName = currentUser.username;
    } else {
        playerName = document.getElementById('playerName').value.trim();
        if (!playerName) { showToast('Enter your name to save!', 'error'); return; }
    }

    try {
        const body = {
            playerName,
            score,
            theme: selectedTheme,
            difficulty: selectedDiff,
        };
        if (currentUser && currentUser.id) body.userId = currentUser.id;

        const res  = await fetch(`${BACKEND_URL}/api/scores`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        if (data.success) {
            const msgEl = document.getElementById('scoreMessage');
            msgEl.textContent = data.message;
            msgEl.className   = `score-message ${data.animation}`;
            if (data.animation === 'celebration') triggerFireworks();
            loadLeaderboard();
            showToast('Score saved! 🎉', 'success');
        } else {
            showToast('Failed to save score.', 'error');
        }
    } catch {
        showToast('Server unreachable. Score not saved.', 'error');
    }
}

// ════════════════════════════════════════════════════
//  PLAY AGAIN
// ════════════════════════════════════════════════════
function playAgain() {
    selectedTheme = null; selectedDiff = null;
    document.getElementById('scoreMessage').className = 'score-message';
    document.getElementById('scoreMessage').textContent = '';
    document.getElementById('leaderboardPanel').classList.remove('visible');
    document.querySelectorAll('.theme-card, .difficulty-card').forEach(c => c.classList.remove('selected'));
    document.getElementById('themeNextBtn').disabled = true;
    document.getElementById('difficultyNextBtn').disabled = true;
    // Reset hard mode rules panel
    const hardRules = document.getElementById('hardModeRules');
    if (hardRules) hardRules.style.display = 'none';
    showSplash();
    if (currentUser && !currentUser.guest) loadSplashStats();
}

// ════════════════════════════════════════════════════
//  LEADERBOARD
// ════════════════════════════════════════════════════
async function loadLeaderboard() {
    try {
        const res = await fetch(`${BACKEND_URL}/api/leaderboard`);
        if (res.ok) renderLeaderboard(await res.json());
        else document.getElementById('leaderboardList').innerHTML = '<div class="loading">Failed to load</div>';
    } catch {
        document.getElementById('leaderboardList').innerHTML = '<div class="loading">Backend offline</div>';
    }
}

function renderLeaderboard(scores) {
    const list = document.getElementById('leaderboardList');
    if (!scores.length) { list.innerHTML = '<div class="loading">No scores yet!</div>'; return; }
    const medals = ['🥇','🥈','🥉'];
    list.innerHTML = scores.map((s, i) => `
        <div class="leaderboard-item ${i < 3 ? `rank-${i+1}` : ''}">
            <div class="player-info">
                <span class="rank-badge">${i < 3 ? medals[i] : `#${i+1}`}</span>
                <span class="player-name">${escHtml(s.playerName)}</span>
            </div>
            <span class="player-score">${s.score}</span>
        </div>`).join('');
}

function escHtml(str) {
    return str.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ════════════════════════════════════════════════════
//  FIREWORKS
// ════════════════════════════════════════════════════
function triggerFireworks() {
    const colors = ['#ff4757','#2ed573','#1e90ff','#ffa502','#ff6b81','#00ffcc'];
    for (let i = 0; i < 60; i++) {
        setTimeout(() => createFirework(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight * 0.6,
            colors[Math.floor(Math.random() * colors.length)]
        ), i * 80);
    }
}

function createFirework(x, y, color) {
    const n = 28;
    for (let i = 0; i < n; i++) {
        const p = document.createElement('div');
        p.className = 'firework';
        p.style.left = x + 'px';
        p.style.top  = y + 'px';
        p.style.background = color;
        const angle = (Math.PI * 2 * i) / n;
        const v     = 55 + Math.random() * 55;
        p.style.setProperty('--tx', Math.cos(angle) * v + 'px');
        p.style.setProperty('--ty', Math.sin(angle) * v + 'px');
        document.getElementById('fireworksContainer').appendChild(p);
        setTimeout(() => p.remove(), 1200);
    }
}

// ════════════════════════════════════════════════════
//  PARTICLES (background)
// ════════════════════════════════════════════════════
function generateParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 18; i++) {
        const dot = document.createElement('div');
        const size = 2 + Math.random() * 3;
        dot.style.cssText = `
            position:absolute;
            width:${size}px;height:${size}px;
            border-radius:50%;
            background:rgba(0,255,204,${0.05 + Math.random() * 0.1});
            left:${Math.random() * 100}%;
            top:${Math.random() * 100}%;
            animation:floatDot ${8 + Math.random() * 12}s ease-in-out infinite;
            animation-delay:${Math.random() * 8}s;
        `;
        container.appendChild(dot);
    }
    const style = document.createElement('style');
    style.textContent = `@keyframes floatDot {
        0%,100%{transform:translateY(0) translateX(0);}
        33%{transform:translateY(-30px) translateX(15px);}
        66%{transform:translateY(20px) translateX(-10px);}
    }`;
    document.head.appendChild(style);
}

// ════════════════════════════════════════════════════
//  HELPERS
// ════════════════════════════════════════════════════
function holeAt(idx) {
    return document.querySelector(`.hole[data-index="${idx}"]`);
}
