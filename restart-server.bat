@echo off
echo ========================================
echo  Restarting Server to Fix Directory Listing
echo ========================================
echo.

echo [1/3] Navigating to backend...
cd backend
if %errorlevel% neq 0 (
    echo Error: Could not find backend folder
    pause
    exit /b 1
)
echo Done!
echo.

echo [2/3] Cleaning old build files...
mvn clean
if %errorlevel% neq 0 (
    echo Error: Maven clean failed
    pause
    exit /b 1
)
echo Done!
echo.

echo [3/3] Starting server...
echo.
echo ========================================
echo  Server is starting...
echo  Wait for: "Started WhackAMoleApplication"
echo  Then open: http://localhost:8080
echo ========================================
echo.

mvn spring-boot:run

pause
