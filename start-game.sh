#!/bin/bash

echo "========================================"
echo "  WHACK-A-MOLE GAME - STARTUP SCRIPT"
echo "========================================"
echo ""

echo "[1/3] Starting MySQL..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    brew services start mysql
else
    # Linux
    sudo systemctl start mysql
fi
echo ""

echo "[2/3] Starting Backend..."
echo "Please wait, this may take 30-60 seconds..."
cd backend
mvn spring-boot:run &
BACKEND_PID=$!
cd ..
echo "Backend starting (PID: $BACKEND_PID)..."
echo ""

echo "[3/3] Waiting for backend to start..."
sleep 30
echo ""

echo "[4/4] Opening game in browser..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open frontend/index.html
else
    # Linux
    xdg-open frontend/index.html
fi
echo ""

echo "========================================"
echo "  GAME IS READY!"
echo "========================================"
echo ""
echo "Backend: http://localhost:8080"
echo "Frontend: Opened in your browser"
echo ""
echo "Press Ctrl+C to stop the backend"
echo ""

# Wait for backend process
wait $BACKEND_PID
