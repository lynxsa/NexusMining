#!/bin/bash

echo "🏭 Starting Nexus Mining Advanced Application..."
echo "📍 Current directory: $(pwd)"
echo "🔍 Node version: $(node --version)"
echo "🔍 NPM version: $(npm --version)"

echo "🚀 Installing dependencies if needed..."
npm install

echo "🌟 Starting the Advanced Nexus Mining Dashboard..."
echo "🌐 This will open on http://localhost:5173"
echo "📊 Features: Ultra-Advanced Dashboard, Cesium 3D Globe, Real-time KPIs"

npm run dev
