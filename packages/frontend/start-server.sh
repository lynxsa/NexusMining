#!/bin/bash

echo "🏭 Starting Nexus Mining Cesium Application..."
echo "📍 Working directory: $(pwd)"
echo "🔍 Checking Node.js version:"
node --version

echo "🔍 Checking npm version:"
npm --version

echo "🔍 Checking if package.json exists:"
ls -la package.json

echo "🚀 Starting development server..."
npm run dev
