# CrossAppWidgetSystem - Windows Setup Script

Write-Host "🚀 Starting CrossAppWidgetSystem Setup..." -ForegroundColor Cyan

# 1. Install NPM dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Green
npm install

# 2. Verify Project Structure
Write-Host "📁 Verifying folder structure..." -ForegroundColor Green
$RequiredDirs = @("app", "app/components", "app/hooks", "app/screens", "app/services", "app/utils", "android", "ios", "docs", "tests")

foreach ($dir in $RequiredDirs) {
    if (Test-Path $dir) {
        Write-Host "✅ Found $dir"
    } else {
        Write-Host "⚠️ Missing $dir - Creating it..." -ForegroundColor Yellow
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
}

Write-Host "✨ Project setup complete!" -ForegroundColor Cyan
Write-Host "To run the app:"
Write-Host "  Android: npm run android"
Write-Host "  iOS: Only supported on macOS" -ForegroundColor Gray
