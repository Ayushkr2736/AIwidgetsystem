# CrossAppWidgetSystem 🧠

A production-ready React Native application designed to aggregate cross-app intelligence and deliver context-aware updates to Home Screen widgets on both Android and iOS. This project demonstrates high-performance native integrations, modern widget development, and robust decoupled architecture.

---

## 🎯 Interviewer Quick Reference
This section directly maps the evaluation criteria to the implementation in this repository.

- [x] **High-level architectural diagram:** See the `docs/architecture.md` file for a full Mermaid diagram of the event-driven system.
- [x] **Low-level design:** Documented below in the Architecture section, detailing the data pipeline, caching tiers, and priority-scoring suggestion engine.
- [x] **Working Android + iOS widgets:** Built with modern native frameworks: Jetpack Glance (`android/app/src/main/java/com/crossappwidgetsystem/widget/`) and WidgetKit (`ios/IntelligenceWidget/`).
- [x] **Native modules:** Custom TypeScript bridges to native code handles system permissions and querying (`app/native/`, `android/.../intelligence/`, `ios/.../Intelligence/`).
- [x] **React Native hooks:** Extracted complex logic into clean React Hooks (`app/hooks/useWidget.ts`, `app/hooks/useContextualSuggestions.ts`).
- [x] **Tests for native modules:** Full Jest suite covering the modules, state management, and suggestion engine (`tests/nativeModules.test.ts`).
- [x] **Documentation:** Thoroughly documented codebase with clean code principles, this README, and an extensive `docs/architecture.md` file.

---

## 🌟 Core Features

- **Contextual Suggestion Engine**: A modular, rule-based engine that processes cross-app signals (Calendar, App Usage, Contacts) based on Recency, Relevance, and Criticality.
- **Dynamic Native Widgets**: Fully native Home Screen widgets that read from shared storage rather than waking up the main JS bundle, ensuring maximum battery efficiency.
- **Intelligence Bridge**: Real-time native modules (Kotlin/Swift) that gather system signals with graceful permission handling.
- **Privacy-First UX**: Progressive onboarding flow that explains *why* permissions are needed before requesting them.

---

## 🏗️ Architecture & Data Pipeline

The project follows a **Decoupled Event-Driven Architecture**.

### The Pipeline:
1. **Ingestion (Native):** Listeners in Kotlin/Swift detect system events (e.g. Calendar updates).
2. **Normalization (Bridge):** The React Native Bridge serializes native objects into a unified `Signal Schema`.
3. **Processing (Suggestion Engine):** A JS orchestrator calculates a `PriorityScore` based on the context.
4. **Distribution:** High-priority intelligence snippets are synced back to Native Layer Shared Storage (AppGroup/SharedPrefs).
5. **Rendering (Widgets):** Jetpack Glance (Android) and SwiftUI (iOS) read directly from shared storage to update the screen instantly.

*(Please view `docs/architecture.md` for the full visual diagram and caching strategy).*

---

## 📱 Tech Stack & Implementation Details

- **Framework:** React Native + TypeScript
- **State Management:** React Hooks
- **Android Widgets:** Jetpack Glance (Compose) + WorkManager
- **iOS Widgets:** WidgetKit (SwiftUI) + BGTaskScheduler
- **Testing:** Jest

---

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 22.11.0)
- Android Studio / Xcode
- React Native CLI

### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Ayushkr2736/AIwidgetsystem.git
    cd AIwidgetsystem
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the App:**
    ```bash
    # For Android
    npm run android

    # For iOS (Requires Mac)
    cd ios && pod install && cd ..
    npm run ios
    ```

---

## 🧪 Testing

The repository uses Jest to ensure stability. The test suite covers logic, React Hooks, and explicitly mocks the Native Modules to guarantee the bridge contract remains intact.

To run the test suite:
```bash
npm test
```

---

## 🔮 Future Improvements / Technical Assumptions
- **Health Data & Screen Time:** Both Android HealthKit and iOS Screen Time APIs require strict enterprise permissions/entitlements. These data points are mocked in the `SuggestionEngine` to demonstrate architecture capabilities without requiring special developer accounts.
- **Local Machine Learning:** The current suggestion engine uses rule-based heuristic scoring. A future iteration would port this to **TensorFlow Lite** for true on-device predictive pattern matching.
