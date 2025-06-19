#!/bin/bash

# 🚀 AnimalCare Foundation - Quick Deploy Script
# This script helps you deploy to various platforms quickly

echo "🐾 AnimalCare Foundation - Deployment Assistant"
echo "=============================================="

# Build the project
echo "📦 Building production bundle..."
cd charitylite-client
npm run build:prod

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🚀 Your project is ready for deployment!"
    echo ""
    echo "Choose your deployment platform:"
    echo "1. Vercel (Recommended) - vercel.com"
    echo "2. Netlify - netlify.com" 
    echo "3. GitHub Pages - github.io"
    echo "4. Firebase - firebase.google.com"
    echo "5. Surge.sh - surge.sh"
    echo ""
    echo "📍 Build output location: dist/charitylite-client/"
    echo "📊 Bundle size: ~845KB (188KB gzipped)"
    echo ""
    echo "🔧 Next steps:"
    echo "• Set up environment variables on your chosen platform"
    echo "• Configure custom domain (optional)"
    echo "• Test all payment flows with test credentials"
    echo ""
    echo "📖 Full deployment guide: DEPLOYMENT_GUIDE.md"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
