#!/bin/bash

echo "🚀 Starting Nexus Mining Ultra-Advanced Dashboard..."

# Kill any existing processes
pkill -f "vite\|npm\|node" 2>/dev/null || true

# Navigate to frontend directory
cd "/Users/derahmanyelo/Documents/LYNX Code Vault/NexusMinig/packages/frontend"

# Clear cache
rm -rf node_modules/.vite .vite 2>/dev/null || true

# Install stable Vite
npm install vite@5.4.8 --save-dev

# Start development server
npm run dev
