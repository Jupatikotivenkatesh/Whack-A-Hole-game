#!/bin/bash

echo "========================================"
echo " Whack-a-Mole: Ultimate Edition"
echo "========================================"
echo ""

echo "[1/3] Checking MySQL..."
if command -v systemctl &> /dev/null; then
    sudo systemctl start mysql 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "✓ MySQL is running!"
    else
        echo "⚠ MySQL is already running or failed to start"
        echo "  Please ensure MySQL is installed and running"
    fi
elif command -v service &> /dev/null; then
    sudo service mysql start 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "✓ MySQL is running!"
    else
        echo "⚠ MySQL is already running or failed to start"
    fi
else
    echo "⚠ Could not detect MySQL service manager"
    echo "  Please start MySQL manually"
fi
echo ""

echo "[2/3] Starting Spring Boot application..."
cd backend
echo "Please wait, this may take a minute..."
echo ""
mvn spring-boot:run

echo ""
echo "Press any key to exit..."
read -n 1
