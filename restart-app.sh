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
    
    # Get process command details
    PROCESS_CMD=$(ps -p $PID -o args= 2>/dev/null || echo "")
    
    # Check if it's a Node.js or Next.js process
    # More comprehensive check including node, npm, next, or our specific port
    if [[ $PROCESS_CMD == *"node"* ]] || [[ $PROCESS_CMD == *"npm"* ]] || [[ $PROCESS_CMD == *"next"* ]] || [[ $PROCESS_CMD == *"$PORT"* ]]; then
        echo "🛑 Terminating process (PID: $PID) on port $PORT..."
        echo "   Process: ${PROCESS_CMD:0:80}..."
        kill -9 $PID 2>/dev/null
        
        # Wait a moment for the port to be released
        sleep 2
        
        echo "✅ Previous process terminated"
    else
        echo "⚠️  Process found on port $PORT (PID: $PID)"
        echo "   Process: ${PROCESS_CMD:0:80}..."
        echo ""
        echo "🤔 This appears to be part of our app. Terminating..."
        kill -9 $PID 2>/dev/null
        sleep 2
        echo "✅ Process terminated"
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