#!/bin/bash

echo "🔧 Installing missing dependencies for Nexus Mining..."

# Install react-leaflet and related packages
echo "📦 Installing react-leaflet and leaflet..."
npm install react-leaflet leaflet @types/leaflet

# Install any other potentially missing packages
echo "📦 Installing additional mapping dependencies..."
npm install leaflet-defaulticon-compatibility

echo "✅ Dependencies installed successfully!"
echo "🚀 Restarting development server..."

# Restart the dev server
npm run dev
