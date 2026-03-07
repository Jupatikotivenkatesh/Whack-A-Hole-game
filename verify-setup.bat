@echo off
echo ========================================
echo  Whack-a-Mole Setup Verification
echo ========================================
echo.

echo [1/5] Checking Java...
java -version 2>&1 | findstr "version"
if %errorlevel% equ 0 (
    echo ✓ Java is installed
) else (
    echo ✗ Java not found - Please install Java 17+
)
echo.

echo [2/5] Checking Maven...
mvn -version 2>&1 | findstr "Apache Maven"
if %errorlevel% equ 0 (
    echo ✓ Maven is installed
) else (
    echo ✗ Maven not found - Please install Maven 3.6+
)
echo.

echo [3/5] Checking MySQL...
mysql --version 2>&1 | findstr "mysql"
if %errorlevel% equ 0 (
    echo ✓ MySQL is installed
) else (
    echo ✗ MySQL not found - Please install MySQL 8.0+
)
echo.

echo [4/5] Checking file structure...
if exist "backend\src\main\resources\static\index.html" (
    echo ✓ index.html found
) else (
    echo ✗ index.html NOT found
)

if exist "backend\src\main\resources\static\css\style.css" (
    echo ✓ style.css found
) else (
    echo ✗ style.css NOT found
)

if exist "backend\src\main\resources\static\js\game.js" (
    echo ✓ game.js found
) else (
    echo ✗ game.js NOT found
)

if exist "backend\src\main\java\com\whackamole\config\WebConfig.java" (
    echo ✓ WebConfig.java found
) else (
    echo ✗ WebConfig.java NOT found
)
echo.

echo [5/5] Checking file sizes...
for %%F in ("backend\src\main\resources\static\index.html") do echo index.html: %%~zF bytes
for %%F in ("backend\src\main\resources\static\css\style.css") do echo style.css: %%~zF bytes
for %%F in ("backend\src\main\resources\static\js\game.js") do echo game.js: %%~zF bytes
echo.

echo ========================================
echo  Verification Complete
echo ========================================
echo.
echo If all checks passed, run: start-game.bat
echo.
pause
