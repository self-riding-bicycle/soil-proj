#!/bin/bash

# Port configuration
PORT=4450
APP_NAME="soil-proj"

echo "🔄 Restarting $APP_NAME on port $PORT..."

# Check if something is running on port 4450
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "📍 Found process running on port $PORT"
    
    # Get the PID of the process using port 4450
    PID=$(lsof -Pi :$PORT -sTCP:LISTEN -t)
    
    # Get process details to confirm it's a Node/Next.js process
    PROCESS_INFO=$(ps -p $PID -o comm=)
    
    if [[ $PROCESS_INFO == *"node"* ]]; then
        echo "🛑 Terminating Node.js process (PID: $PID) on port $PORT..."
        kill -9 $PID
        
        # Wait a moment for the port to be released
        sleep 2
        
        echo "✅ Previous process terminated"
    else
        echo "⚠️  Non-Node.js process found on port $PORT. Please handle manually."
        exit 1
    fi
else
    echo "✅ Port $PORT is available"
fi

# Start the Next.js app on port 4450
echo "🚀 Starting $APP_NAME on port $PORT..."
echo "📱 Access the app at http://localhost:$PORT"
echo ""
echo "Press Ctrl+C to stop the server"
echo "────────────────────────────────────"
echo ""

# Run the Next.js development server on port 4450
npm run dev -- -p $PORT