/* =====================================================
   Whack-a-Mole — Enhanced Edition
   script.js
   ===================================================== */

// ── Backend URL ──────────────────────────────────────────────────────────────
const BACKEND_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8080'
    : 'https://whack-a-hole-game.onrender.com';

// ── Wake up Render backend on page load (free tier spins down after 15 min) ──
// Silently pings /api/health so the server is warm before the user hits signup
(function pingBackend() {
    fetch(`${BACKEND_URL}/api/health`, { method: 'GET' })
        .catch(() => { /* silent — just waking the server */ });
})();

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

// ── State ────────────────────────────────────────────
let currentUser   = null;
let selectedTheme = null;
let selectedDiff  = null;
let score         = 0;
let hitCount      = 0;
let timeLeft      = 45;
let gameInterval  = null;
let spawnInterval = null;
let lbInterval    = null;
let targets       = [];

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
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        showToast('Waking up server… first load may take 30s ⏳', 'info', 8000);
    }

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
            showToast('Server is waking up — please try again in a moment ⏳', 'error', 5000);
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
            showToast('Server is waking up — please try again in a moment ⏳', 'error', 5000);
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
    currentUser = null; selectedTheme = null; selectedDiff = null;
    clearIntervals();
    document.getElementById('mainContainer').classList.add('hidden');
    document.getElementById('authWrapper').classList.remove('hidden');
    document.getElementById('leaderboardPanel').classList.remove('visible');
    showScreen('splashScreen');
    document.getElementById('loginForm').reset();
    document.getElementById('signupForm').reset();
    switchAuthTab('login');
}

async function loadSplashStats() {
    try {
        const res = await fetch(`${BACKEND_URL}/api/leaderboard`);
        if (!res.ok) return;
        const scores = await res.json();
        const container = document.getElementById('splashStats');
        const myBest = scores.find(s => s.playerName === currentUser.username);
        const html = [];
        if (myBest) html.push(`<div class="splash-stat"><div class="splash-stat-val">${myBest.score}</div><div class="splash-stat-lbl">Your Best</div></div>`);
        if (scores.length > 0) {
            html.push(`<div class="splash-stat"><div class="splash-stat-val">${scores[0].score}</div><div class="splash-stat-lbl">Top Score</div></div>`);
            html.push(`<div class="splash-stat"><div class="splash-stat-val">${scores.length}</div><div class="splash-stat-lbl">Players</div></div>`);
        }
        container.innerHTML = html.join('');
    } catch { /* silent */ }
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}
function showSplash()            { showScreen('splashScreen'); }
function showThemeSelection()    { showScreen('themeScreen'); }
function showDifficultySelection() {
    if (!selectedTheme) { showToast('Pick a theme first!', 'error'); return; }
    showScreen('difficultyScreen');
}

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
}

function startGame() {
    if (!selectedTheme || !selectedDiff) { showToast('Select theme and difficulty!', 'error'); return; }
    score = 0; hitCount = 0; timeLeft = 45; targets = [];
    document.getElementById('score').textContent    = '0';
    document.getElementById('hitCount').textContent = '0';
    document.getElementById('timer').textContent    = '45';
    document.getElementById('timer').closest('.stat-card').classList.remove('urgent');
    buildBoard();
    showScreen('gameScreen');
    document.getElementById('leaderboardPanel').classList.add('visible');
    loadLeaderboard();
    lbInterval = setInterval(loadLeaderboard, 10000);
    gameInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 10) document.getElementById('timer').closest('.stat-card').classList.add('urgent');
        if (timeLeft <= 0) endGame();
    }, 1000);
    const cfg = DIFFICULTY[selectedDiff];
    spawnInterval = setInterval(spawnTarget, cfg.spawnRate);
    spawnTarget();
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
        t.timeoutId = setTimeout(() => removeTarget(idx), DIFFICULTY[selectedDiff].targetTime);
    }
}

function removeTarget(idx) {
    const i = targets.findIndex(t => t.index === idx);
    if (i === -1) return;
    targets.splice(i, 1);
    const hole = holeAt(idx);
    if (hole) {
        hole.querySelector('.hole-emoji').textContent = '';
        hole.classList.remove('active-correct', 'active-wrong');
    }
}

function hitTarget(idx) {
    const ti = targets.findIndex(t => t.index === idx);
    if (ti === -1) return;
    const t = targets[ti];
    const hole = holeAt(idx);
    clearTimeout(t.timeoutId);
    if (t.isCorrect) {
        score += 10; hitCount++;
        hole.classList.add('hit-correct');
        showPopup(idx, '+10', '#48bb78');
    } else {
        score -= 10;
        hole.classList.add('hit-wrong');
        showPopup(idx, '−10', '#f56565');
    }
    document.getElementById('score').textContent    = score;
    document.getElementById('hitCount').textContent = hitCount;
    hole.querySelector('.hole-emoji').textContent = '';
    hole.classList.remove('active-correct', 'active-wrong');
    targets.splice(ti, 1);
    setTimeout(() => hole.classList.remove('hit-correct', 'hit-wrong'), 500);
}

function showPopup(idx, text, color) {
    const hole = holeAt(idx);
    const el = document.createElement('div');
    el.className = 'score-popup';
    el.textContent = text;
    el.style.cssText = `position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:1.8rem;font-weight:900;color:${color};pointer-events:none;z-index:10;animation:scorePopup 0.9s ease forwards;text-shadow:0 2px 8px rgba(0,0,0,0.5);`;
    hole.appendChild(el);
    setTimeout(() => el.remove(), 900);
}

function endGame() {
    clearIntervals();
    targets.forEach(t => removeTarget(t.index));
    targets = [];
    document.getElementById('finalScore').textContent = score;
    document.getElementById('scoreMeta').textContent  = `${hitCount} hits · ${selectedTheme} · ${selectedDiff}`;
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
}

async function saveScore() {
    let playerName;
    if (currentUser && !currentUser.guest) {
        playerName = currentUser.username;
    } else {
        playerName = document.getElementById('playerName').value.trim();
        if (!playerName) { showToast('Enter your name to save!', 'error'); return; }
    }
    try {
        const body = { playerName, score, theme: selectedTheme, difficulty: selectedDiff };
        if (currentUser && currentUser.id) body.userId = currentUser.id;
        const res = await fetch(`${BACKEND_URL}/api/scores`, {
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

function playAgain() {
    selectedTheme = null; selectedDiff = null;
    document.getElementById('scoreMessage').className = 'score-message';
    document.getElementById('scoreMessage').textContent = '';
    document.getElementById('leaderboardPanel').classList.remove('visible');
    document.querySelectorAll('.theme-card, .difficulty-card').forEach(c => c.classList.remove('selected'));
    document.getElementById('themeNextBtn').disabled = true;
    document.getElementById('difficultyNextBtn').disabled = true;
    showSplash();
    if (currentUser && !currentUser.guest) loadSplashStats();
}

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
        const v = 55 + Math.random() * 55;
        p.style.setProperty('--tx', Math.cos(angle) * v + 'px');
        p.style.setProperty('--ty', Math.sin(angle) * v + 'px');
        document.getElementById('fireworksContainer').appendChild(p);
        setTimeout(() => p.remove(), 1200);
    }
}

function generateParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 18; i++) {
        const dot = document.createElement('div');
        const size = 2 + Math.random() * 3;
        dot.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:rgba(0,255,204,${0.05 + Math.random() * 0.1});left:${Math.random() * 100}%;top:${Math.random() * 100}%;animation:floatDot ${8 + Math.random() * 12}s ease-in-out infinite;animation-delay:${Math.random() * 8}s;`;
        container.appendChild(dot);
    }
    const style = document.createElement('style');
    style.textContent = `@keyframes floatDot{0%,100%{transform:translateY(0) translateX(0);}33%{transform:translateY(-30px) translateX(15px);}66%{transform:translateY(20px) translateX(-10px);}}`;
    document.head.appendChild(style);
}

function holeAt(idx) {
    return document.querySelector(`.hole[data-index="${idx}"]`);
}
