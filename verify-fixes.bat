@echo off
echo ========================================
echo  Verifying All 3 Fixes
echo ========================================
echo.

echo [Fix 1] Checking WebConfig for root mapping...
if exist "backend\src\main\java\com\whackamole\config\WebConfig.java" (
    echo ✓ WebConfig.java exists
    findstr /C:"forward:/index.html" "backend\src\main\java\com\whackamole\config\WebConfig.java" >nul
    if %errorlevel% equ 0 (
        echo ✓ Root URL mapped to index.html
    ) else (
        echo ✗ Root URL mapping not found
    )
) else (
    echo ✗ WebConfig.java NOT found
)
echo.

echo [Fix 2] Checking ddl-auto configuration...
findstr /C:"spring.jpa.hibernate.ddl-auto=update" "backend\src\main\resources\application.properties" >nul
if %errorlevel% equ 0 (
    echo ✓ ddl-auto=update configured
    echo   Tables will be created automatically
) else (
    echo ✗ ddl-auto=update NOT configured
)
echo.

echo [Fix 3] Checking CORS configuration...
findstr /C:"@CrossOrigin" "backend\src\main\java\com\whackamole\controller\ScoreController.java" >nul
if %errorlevel% equ 0 (
    echo ✓ @CrossOrigin found in ScoreController
    echo   Frontend can communicate with API
) else (
    echo ✗ @CrossOrigin NOT found
)
echo.

echo [Bonus] Checking static files location...
if exist "backend\src\main\resources\static\index.html" (
    echo ✓ index.html in static/
) else (
    echo ✗ index.html NOT in static/
)

if exist "backend\src\main\resources\static\style.css" (
    echo ✓ style.css in static/
) else (
    echo ✗ style.css NOT in static/
)

if exist "backend\src\main\resources\static\script.js" (
    echo ✓ script.js in static/
) else (
    echo ✗ script.js NOT in static/
)
echo.

echo ========================================
echo  Verification Complete
echo ========================================
echo.
echo All 3 issues should be fixed!
echo.
echo To run the game:
echo 1. net start MySQL80
echo 2. cd backend ^&^& mvn spring-boot:run
echo 3. Open http://localhost:8080
echo.
echo See ISSUES_FIXED.md for details.
echo.
pause
