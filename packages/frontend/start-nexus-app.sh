#!/bin/bash

echo "🏭 Starting Nexus Mining Ultra-Advanced Application"
echo "=================================================="
echo ""
echo "🔧 Node.js version: $(node --version)"
echo "📦 NPM version: $(npm --version)"
echo ""

echo "🚀 Starting development server with all enhanced dependencies..."
echo "📍 Application will be available at: http://localhost:5173"
echo ""
echo "✨ Features included:"
echo "   📊 Ultra-Advanced Dashboard with 8 KPI cards"
echo "   🌍 3D Cesium Globe visualization"
echo "   🗺️ Interactive 2D Leaflet maps"
echo "   📡 Real-time IoT data feeds"
echo "   🚛 Equipment tracking and management"
echo "   📈 Advanced analytics and reporting"
echo "   🛡️ Safety monitoring systems"
echo ""

# Clear any existing processes on port 5173
echo "🧹 Clearing port 5173..."
lsof -ti:5173 | xargs kill -9 2>/dev/null || true

echo "🎯 Starting Vite development server..."
npm run dev
