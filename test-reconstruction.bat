@echo off
echo ========================================
echo  Testing Project Reconstruction
echo ========================================
echo.

echo [1/6] Checking static files...
if exist "backend\src\main\resources\static\index.html" (
    echo ✓ index.html found
) else (
    echo ✗ index.html NOT found
    goto :error
)

if exist "backend\src\main\resources\static\style.css" (
    echo ✓ style.css found
) else (
    echo ✗ style.css NOT found
    goto :error
)

if exist "backend\src\main\resources\static\script.js" (
    echo ✓ script.js found
) else (
    echo ✗ script.js NOT found
    goto :error
)
echo.

echo [2/6] Checking old directories removed...
if not exist "backend\src\main\resources\static\css" (
    echo ✓ css/ directory removed
) else (
    echo ⚠ css/ directory still exists
)

if not exist "backend\src\main\resources\static\js" (
    echo ✓ js/ directory removed
) else (
    echo ⚠ js/ directory still exists
)
echo.

echo [3/6] Checking ViewController...
if exist "backend\src\main\java\com\whackamole\controller\ViewController.java" (
    echo ✓ ViewController.java found
) else (
    echo ✗ ViewController.java NOT found
    goto :error
)
echo.

echo [4/6] Checking WebConfig removed...
if not exist "backend\src\main\java\com\whackamole\config\WebConfig.java" (
    echo ✓ WebConfig.java removed
) else (
    echo ⚠ WebConfig.java still exists (should be removed)
)
echo.

echo [5/6] Checking file paths in index.html...
findstr /C:"href=\"/style.css\"" "backend\src\main\resources\static\index.html" >nul
if %errorlevel% equ 0 (
    echo ✓ CSS path is correct: /style.css
) else (
    echo ✗ CSS path is incorrect
    goto :error
)

findstr /C:"src=\"/script.js\"" "backend\src\main\resources\static\index.html" >nul
if %errorlevel% equ 0 (
    echo ✓ JS path is correct: /script.js
) else (
    echo ✗ JS path is incorrect
    goto :error
)
echo.

echo [6/6] Checking application.properties...
findstr /C:"spring.mvc.view.suffix=.html" "backend\src\main\resources\application.properties" >nul
if %errorlevel% equ 0 (
    echo ✓ View suffix configured
) else (
    echo ✗ View suffix NOT configured
    goto :error
)

findstr /C:"spring.web.resources.static-locations=classpath:/static/" "backend\src\main\resources\application.properties" >nul
if %errorlevel% equ 0 (
    echo ✓ Static locations configured
) else (
    echo ✗ Static locations NOT configured
    goto :error
)
echo.

echo ========================================
echo  ✅ ALL CHECKS PASSED!
echo ========================================
echo.
echo Your project is correctly reconstructed.
echo.
echo Next steps:
echo 1. Start MySQL: net start MySQL80
echo 2. Run server: cd backend ^&^& mvn spring-boot:run
echo 3. Open browser: http://localhost:8080
echo.
goto :end

:error
echo.
echo ========================================
echo  ✗ CHECKS FAILED
echo ========================================
echo.
echo Please review the errors above.
echo See RECONSTRUCTION_COMPLETE.md for details.
echo.

:end
pause
