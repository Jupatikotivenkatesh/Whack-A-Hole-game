@echo off
echo ========================================
echo  WHACK-A-MOLE BUILD FIX AND RUN
echo ========================================
echo.

echo [1/3] Starting MySQL...
net start MySQL80 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ MySQL started
) else (
    echo ✓ MySQL already running
)
echo.

echo [2/3] Navigating to backend folder...
cd backend
if %errorlevel% neq 0 (
    echo ✗ Failed to find backend folder
    echo Make sure you're running this from the project root
    pause
    exit /b 1
)
echo ✓ In backend folder
echo.

echo [3/3] Running Maven build (this may take a minute)...
echo Command: mvn clean install -DskipTests -U spring-boot:run
echo.
echo Please wait...
echo.

mvn clean install -DskipTests -U spring-boot:run

echo.
echo ========================================
echo If the server started successfully,
echo open your browser to:
echo http://localhost:8080
echo ========================================
echo.
pause
