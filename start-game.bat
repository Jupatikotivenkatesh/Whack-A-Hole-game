@echo off
echo ========================================
echo  Whack-a-Mole: Ultimate Edition
echo ========================================
echo.

echo [1/3] Checking MySQL...
net start MySQL80 >nul 2>&1
if %errorlevel% equ 0 (
    echo MySQL is running!
) else (
    echo MySQL is already running or failed to start
    echo Please ensure MySQL is installed and running
)
echo.

echo [2/3] Starting Spring Boot application...
cd backend
echo Please wait, this may take a minute...
echo.
call mvn spring-boot:run

pause
