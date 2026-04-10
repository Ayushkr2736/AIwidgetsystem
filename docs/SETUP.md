# CrossAppWidgetSystem Setup Guide

## Requirements
- Node.js (>= 22.11.0)
- React Native CLI
- Android Studio / Xcode
- CocoaPods (for iOS)

## Folder Structure
- `app/`: Source code
  - `components/`: Reusable UI components
  - `hooks/`: Custom React hooks
  - `screens/`: Application screens
  - `services/`: API and third-party services
  - `utils/`: Helper functions
- `android/`: Native Android project
- `ios/`: Native iOS project
- `docs/`: Documentation
- `tests/`: Jest and integration tests

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **iOS Setup (macOS only)**
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Run Android**
   ```bash
   npm run android
   ```

4. **Run iOS**
   ```bash
   npm run ios
   ```

## Design System
The app uses a premium design system with:
- **Colors**: Sleek dark mode elements, Indigo primary accents (#6366F1).
- **Icons**: Lucide React Native.
- **Typography**: System default (premium feel with font weight variations).

## Configuration
- **Hermes**: Enabled by default in `android/gradle.properties` and `ios/Podfile`.
- **Navigation**: Uses React Navigation Native Stack.
