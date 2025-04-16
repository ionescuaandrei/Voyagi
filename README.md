# 📱 Voyagi – Project Overview

This application leverages AI (Gemini API) to optimize travelers’ experiences by providing intelligent recommendations for flights, accommodations, and detailed travel itineraries.

---

## 🚀 Core Features:

### AI-Driven Travel Planning:
- Recommend optimal flights, hotels/accommodations.
- Generate a detailed itinerary based on user inputs:
  - **Duration of stay** (`x days`)
  - **Number of travelers** (`y people`)
  - **Budget**
  - **Destination preferences**

### User Authentication & Management:
- Firebase Authentication (Google Sign-in, Email/password, Apple Sign-in)

### CRUD & History Management:
- Firebase Firestore to store:
  - User profiles
  - Travel history and itineraries
  - Favorite destinations, flights, or hotels

### Hot Deals Section:
- Dynamically generated personalized offers using APIs like Skyscanner, Booking.com, or Expedia.

---

## 🗂 Proposed React Native File Structure:

```
TravelApp/
├── app/
│   ├── (auth)/
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   └── start.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── profile.tsx
│   │   ├── offers.tsx
│   │   └── home.tsx
│   ├── (stack)/
│   │   ├── travel-planner.tsx
│   │   ├── itinerary.tsx
│   │   └── history.tsx
│   ├── components/
│   ├── _layout.tsx
│   └── index.tsx
├── assets/
│   ├── images/
│   └── icons/
├── constants/
├── context/
├── navigation/
│   ├── AppNavigator.tsx
│   └── AuthNavigator.tsx
├── services/
│   ├── FirebaseService.ts
│   ├── GeminiService.ts
│   └── TravelAPIService.ts
├── styles/
│   ├── colors.ts
│   ├── fonts.ts
│   └── theme.ts
├── utils/
│   └── helpers.ts
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## 💠 Backend & AI Integrations:

### Backend (Firebase):
- **Firestore Database** for user data, travel history, favorites, and caching hot deals.
- **Firebase Authentication** for robust user management.
- **Cloud Functions (optional)**: For complex server-side logic, caching API responses, etc.

### AI Integration (Gemini):
- REST API calls handled via `GeminiService.ts`.
- Efficient request handling and caching to optimize performance.

---

## 🎨 Branding Suggestions:

### App Name:
- **Voyagi** (memorable, suggests voyages and intelligent travel planning)

### Color Palette:
- Primary: **#4F46E5** (Royal Blue - confidence, innovation)
- Accent: **#F97316** (Bright Orange - enthusiasm, adventure)
- Neutral Background: **#F3F4F6** (Light Gray - clean, neutral)

### Typography:
- Heading: **"Poppins" (bold)**
- Body: **"Roboto" (regular)**

---

## 🌟 Logo Concept:
- Minimalistic icon combining a compass or airplane with abstract digital elements representing AI.
- Colors: Primary blue with accent orange highlights.

---

## 📏 App Architecture Diagram:

```
[Frontend React Native App (Tabs + Stacks)]
    │
    ├─ Firebase Authentication ── [User]
    │
    ├─ Firestore ── [CRUD operations, History, Profile]
    │
    └─ Gemini AI API ── [AI-driven recommendations & itineraries]
                  │
        [Travel APIs (Skyscanner, Expedia, Booking)]
```

---

## 📁 Feature Implementation Ideas:

### AI-Powered Recommendations:
1. **Collect user inputs:** duration, travelers, budget, destination preferences.
2. **Query Gemini API:** Provide tailored recommendations.
3. **Present:** Clear, attractive UI with detailed options.

### Hot Deals Section:
- Fetch and cache personalized offers regularly.
- Highlight user-tailored recommendations based on profile and travel history.

### User History & Profile:
- CRUD operations via Firestore collections.
- Seamless UI interactions and updates.

---

## 📌 Optional Features:
- Social itinerary sharing
- Notifications on price drops and deals
- Interactive map integrations (Google Maps/Mapbox)
- Offline itinerary and map support

