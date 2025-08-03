#!/bin/bash

echo "🚀 Starting NexusMining Development Server..."
echo "📁 Current directory: $(pwd)"

# Navigate to frontend directory
cd "/Users/derahmanyelo/Documents/LYNX Code Vault/NexusMinig/packages/frontend"

echo "📦 Installing/checking dependencies..."
npm install

echo "🔧 Starting development server..."
npm run dev
