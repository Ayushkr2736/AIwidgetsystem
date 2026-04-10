# CrossApp Intelligence Widget System 🧠

A production-grade React Native application that aggregates cross-app system intelligence to deliver predictive, context-aware updates to Home Screen widgets on both Android and iOS. 

This project is built with a focus on performant native module bridging, custom React Native hooks, and decoupled event-driven architecture, ensuring widgets update dynamically without waking the main JavaScript bundle.

---

## 🌟 Key Features

- **Context-Aware Suggestion Engine:** A robust, rule-based algorithmic engine that evaluates signals from Calendar, App Usage, and Contacts based on Recency, Relevance, and Criticality.
- **Dynamic Native Widgets:** Designed using modern declarative native UI frameworks—**Jetpack Glance** (Android) and **WidgetKit** (iOS).
- **Intelligence Bridge (Native Modules):** Real-time native modules written in Kotlin and Swift to gather system-level data with graceful permission handling.
- **Predictive Caching Pipeline:** Uses MMKV and Shared AppGroups to ensure widgets have instant data access without battery drain.

---

## 🏗️ System Architecture & Low-Level Design

The application follows a **Decoupled Event-Driven Architecture** to separate data ingestion from UI rendering. 

*Note: For a visual representation of the architecture diagram, please refer to the dedicated [`docs/architecture.md`](./docs/architecture.md) file.*

### The Data Pipeline
1. **Ingestion (Native Layer):** Native Observers (Kotlin/Swift) detect background system events like Calendar modifications or Notification pushes.
2. **Signal Normalization (Native Modules):** The cross-platform Bridge serializes complex, asynchronous system objects into a unified `Signal Schema`.
3. **Processing (Suggestion Engine):** The React Native Intelligence Hub acts as the orchestrator. It calculates a `PriorityScore` based on the user's current context.
4. **Distribution (Hooks & State):** React Hooks (like `useWidget` and `useContextualSuggestions`) sync this state across the app. High-priority snippets are persisted back to **Native Shared Storage**.
5. **Widget Architecture:** The Android and iOS widgets bypass the JS bundle completely, reading directly from shared device storage for instantaneous, zero-latency rendering.

---

## 📂 Project Structure Highlights

The repository is modularly structured to enforce clean separation of concerns. Key implementation areas include:

- **`/android/.../widget/`** - Jetpack Glance implementation for Android dynamic widgets.
- **`/android/.../intelligence/`** - Native Kotlin modules for intercepting Android system events (Usage, Scheduling).
- **`/ios/IntelligenceWidget/`** - SwiftUI & WidgetKit implementation for iOS Lock/Home screen widgets.
- **`/ios/.../Intelligence/`** - Native Swift modules utilizing AppGroups and NSFileCoordinator.
- **`/app/hooks/`** - Critical React Native hooks including `useWidget.ts` and `useContextualSuggestions.ts` to manage the bridge state.
- **`/app/utils/`** - The core `SuggestionEngine.ts` handling the low-level data sorting and priority logic.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 22.11.0)
- React Native CLI
- Android Studio / Xcode

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Ayushkr2736/AIwidgetsystem.git
   cd AIwidgetsystem
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the project:
   ```bash
   # Android
   npm run android

   # iOS 
   cd ios && pod install && cd ..
   npm run ios
   ```

---

## 🧪 Testing Setup

Ensuring the integrity of the data bridge is critical. The codebase uses **Jest** to provide comprehensive coverage across logic, UI behavior, and Native boundaries.

- **Native Module Tests:** The test suite specifically mocks Native Modules (e.g., `tests/nativeModules.test.ts`) to verify that the bridge contract and signal ingestion behave predictably before deploying to a physical device.

```bash
# Run the test suite
npm test
```

---

## 🔮 Roadmap / Technical Constraints

- **HealthKit / Screen Time Dependencies:** Certain integrations (like deep Apple Screen Time metrics) require strict enterprise developer entitlements. In development builds, these specific edge cases are mocked safely within the Suggestion Engine to simulate flow.
- **Machine Learning Integration:** The current pipeline relies on a heuristic rule-set. A planned v2 iteration explores moving the suggestion engine to **TensorFlow Lite** for more personalized, on-device predictive processing.
