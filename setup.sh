#!/bin/bash

# CrossAppWidgetSystem - Full Setup Script

echo "🚀 Starting CrossAppWidgetSystem Setup..."

# 1. Install NPM dependencies
echo "📦 Installing dependencies..."
npm install

# 2. Configure iOS Pods (if on macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Setting up iOS Pods..."
    cd ios && pod install && cd ..
else
    echo "ℹ️ Skipping Pod installation (Not on macOS)"
fi

# 3. Cache Clean (Optional but recommended for production-ready setups)
echo "🧹 Cleaning Metro cache..."
npm start -- --reset-cache &
METRO_PID=$!
sleep 5
kill $METRO_PID

# 4. Verify Project Structure
echo "📁 Verifying folder structure..."
REQUIRED_DIRS=("app" "app/components" "app/hooks" "app/screens" "app/services" "app/utils" "android" "ios" "docs" "tests")

for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ Found $dir"
    else
        echo "⚠️ Missing $dir - Creating it..."
        mkdir -p "$dir"
    fi
done

echo "✨ Project setup complete!"
echo "To run the app:"
echo "  Android: npm run android"
echo "  iOS: npm run ios"
