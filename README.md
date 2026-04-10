# CrossAppWidgetSystem 🧠

A production-ready React Native application designed to aggregate cross-app intelligence and deliver contextual insights via dynamic Home Screen widgets on Android and iOS.

---

## 🌟 Features

- **Contextual Suggestion Engine**: A modular, rule-based engine that processes signals from Calendar, App Usage, Contacts, and Health data.
- **Dynamic Widgets**:
  - **Android**: Powered by **Jetpack Glance** (Compose-based widgets) with Small, Medium, and Large variants.
  - **iOS**: Powered by **WidgetKit & SwiftUI** with lock screen support.
- **Intelligence Bridge**: Real-time native modules (Kotlin/Swift) that gather system signals with graceful permission handling.
- **Privacy-First UX**: Progressive onboarding flow that explains *why* permissions are needed before requesting them.
- **Premium Design System**: Modern, indigo-themed interface with smooth animations and lucide iconography.
- **Full Test Suite**: Comprehensive Jest coverage for logic, hooks, and native bridges.

---

## 🏗️ Architecture

The project follows a **Decoupled Event-Driven Architecture**:

1.  **Native Layer**: Observers & Native Modules (Kotlin/Swift) gather raw signals (e.g., upcoming meetings).
2.  **Bridge Layer**: Serializes native objects into a unified Signal Schema.
3.  **Intelligence Hub (JS)**: Orchestrates modular `SuggestionProviders`.
4.  **Suggestion Engine**: Calculates `relevanceScore` based on recency, frequency, and context.
5.  **Output Layer**: Syncs computed intelligence back to Native Shared Storage (AppGroups/MMKV) for Widgets to render without waking the JS bundle.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 22.11.0)
- React Native CLI
- Android Studio (for Android)
- Xcode (for iOS)

### Installation
1.  **Clone the repository**
2.  **Run the setup script**:
    ```bash
    # On Windows
    .\setup.ps1
    
    # On macOS/Linux
    ./setup.sh
    ```

---

## 📱 Commands

| Platform | Command |
| :--- | :--- |
| **Android** | `npm run android` |
| **iOS** | `cd ios && pod install && cd .. && npm run ios` |
| **Test** | `npm test` |
| **Lint** | `npm run lint` |

---

## 🔐 Permissions Explanation

The app requests access to:
- **Calendar**: To display upcoming events and calculate meeting relevance.
- **Contacts**: To prioritize insights from favorite contacts.
- **App Usage (Android only)**: To provide screen-time intelligence.
- **Health (Mocked)**: To suggest activity breaks based on step count.

**Privacy Note**: All data processing happens on-device. No personal signals are ever uploaded to a server.

---

## 🧪 Assumptions & Mock Data
- **Health Data**: Currently uses mock signals as HealthKit/Google Fit integration requires enterprise entitlement.
- **App Usage (iOS)**: Uses mock data as Apple restricts Screen Time APIs for general applications.
- **Widget Refresh**: Updated every 15 minutes to balance battery life and data freshness.

---

## 🛠️ Troubleshooting

- **Android Widget not updating**: Ensure "Battery Optimization" is disabled for the app, as it can delay `AppWidgetProvider` updates.
- **iOS Pod Install Fail**: Check if you have the latest CocoaPods installed (`sudo gem install cocoapods`).
- **Jest Path Error**: If running on Windows with spaces in path, use `npm test -- <path>` or `npx jest`.

---

## 🔮 Future Improvements
- **Local ML**: Integrate TensorFlow Lite for advanced predictive pattern matching.
- **Provider API**: Open-source the `SuggestionProvider` interface to allow 3rd party developers to contribute signal sources.
- **Rich Notifications**: Pair widget updates with high-priority sticky notifications for critical events.
