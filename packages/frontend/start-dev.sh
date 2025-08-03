#!/bin/bash
cd "$(dirname "$0")"
echo "🚀 Starting NexusMining Development Server..."
echo "📁 Current directory: $(pwd)"
echo "📦 Installing dependencies..."
npm install
echo "🔧 Starting development server..."
npm run dev
