# EasyArt - Artist & Event Marketplace

EasyArt is a mobile application built with **React Native (Expo)** that serves as a marketplace for connecting artists with users. It allows users to discover artists, find creative events, manage their favorites, and more. The app currently uses a **fully simulated backend** with **Zustand** for state management and **AsyncStorage** for data persistence, making it a functional prototype. All data (users, artists, events, etc.) is stored locally on the device using AsyncStorage. A **Laravel-based backend** is planned for future development to replace the simulated backend.

## ✨ Key Features

- **User Authentication**: Full login/signup flow with persistent user sessions stored in AsyncStorage. New user registration includes a mandatory (simulated) payment step.
- **Artist & Event Discovery**: Browse lists of artists and events, with robust search and filtering capabilities by category and name.
- **Detailed Profiles**: View detailed, dynamic profile screens for both artists and events, showing bios, portfolios, and associated activities.
- **Dual Favorites System**: Users can favorite both artists and events, which are saved to a tabbed "My Favorites" screen, persisted in AsyncStorage.
- **Event Management**: Premium users can create their own events via a detailed form. All users can register to join existing events, with data stored locally.
- **Simulated Backend**: All application data (users, artists, events, favorites, chats) is managed through Zustand and persisted on the device with AsyncStorage to mimic a real server backend.
- **Simulated Chat**: A basic messaging feature allows users to initiate conversations with artists, with chat data stored locally.
- **Subscription Flow**: A dedicated screen explains premium benefits, leading to a simulated payment process that upgrades the user's account status across the app.
- **Dynamic Settings**: A functional settings screen to manage notification preferences, toggle dark/light mode, edit user profile information, and access support.
- **Data Reset**: A developer-focused feature to reset all app data or just content data for easy testing.

## 🛠️ Tech Stack

- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **State Management**: Zustand (with persist middleware for a persistent state)
- **Persistent Storage**: AsyncStorage (for simulating backend data storage)
- **Navigation**: React Navigation (Stack & Bottom Tabs)
- **UI & Icons**: Expo Vector Icons (Ionicons, Feather, etc.), Expo Linear Gradient
- **Native Modules**: Expo Image Picker, Community DateTimePicker
- **Planned Backend**: Laravel (to replace the simulated backend in future development)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- **Node.js** (LTS version recommended)
- **Yarn** or **npm**
- The **Expo Go** app on your iOS or Android device.
- *(Optional)* **Android Studio** or **Xcode** for running on emulators/simulators.

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>