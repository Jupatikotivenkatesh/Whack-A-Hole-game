@echo off
echo ========================================
echo   WHACK-A-MOLE GAME - STARTUP SCRIPT
echo ========================================
echo.

echo [1/3] Starting MySQL...
net start MySQL80
if %errorlevel% neq 0 (
    echo MySQL is already running or failed to start
)
echo.

echo [2/3] Starting Backend...
echo Please wait, this may take 30-60 seconds...
cd backend
start cmd /k "mvn spring-boot:run"
cd ..
echo Backend starting in new window...
echo.

echo [3/3] Waiting for backend to start...
timeout /t 30 /nobreak
echo.

echo [4/4] Opening game in browser...
start frontend\index.html
echo.

echo ========================================
echo   GAME IS READY!
echo ========================================
echo.
echo Backend: http://localhost:8080
echo Frontend: Opened in your browser
echo.
echo Press any key to exit this window...
echo (Keep the backend window open!)
pause >nul
