# Secret Code - Detective Mystery App

A web-based interactive "scavenger hunt" / mystery puzzle application built with **Next.js**. The user must solve a series of secret phrase challenges to unlock the next stage, culminating in a personalized final reward screen.

Designed with a **"Detective / Noir" aesthetic** (moss green, parchment textures, typewriter fonts) and smooth animations.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom configuration for theme colors/fonts)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Transitions, shake effects, carousel)
- **State Management**: React Hooks (`useState`, `useEffect`) + `localStorage` for persistence.
- **Icons/Assets**: CSS-based shapes and standard emojis (no external heavy icon libraries).

---

## 🚀 Features

- **Multi-stage Progression**: Configurable number of stages, each with a unique secret phrase and hint.
- **Client-side Persistence**: Progress is saved automatically to `localStorage`. Users can refresh or close the browser without losing their place.
- **Interactive UI**:
  - **Shake Animation**: Visual feedback on incorrect input.
  - **Progress Bar**: Shows completion percentage and current stage.
  - **Review Mode**: After completion, users can navigate back through all solved stages to review hints and answers.
- **Dynamic Backgrounds**: The final screen features a multi-row, varying-speed infinite image carousel.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.

---

## 📂 Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles, variables, & custom animations
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main application logic (State machine & view controller)
│
├── components/
│   ├── SecretInput.tsx      # Controlled input component with validation & shake effect
│   ├── HintDisplay.tsx      # "Classified File" style hint card
│   ├── ProgressIndicator.tsx # Visual progress tracking
│   ├── CompletedStageView.tsx # Read-only view for reviewed stages
│   ├── ImageCarousel.tsx    # Infinite scrolling background (4 rows, diff speeds)
│   └── FinalMessage.tsx     # Celebration overlay with glassmorphism
│
└── config/
    └── config.ts        # ⚙️ CENTRAL CONFIGURATION FILE
```

---

## ⚙️ Configuration

The application is data-driven. You can customize the entire experience by editing **`src/config/config.ts`**.

### 1. Secret Phrases & Hints
Modify the `stages` array. Each object represents a level.
```typescript
stages: [
  { 
    phrase: "secret-code-1", // The answer (case-sensitive)
    hint: "The clue displayed to the user..." 
  },
  // Add as many stages as needed
]
```

### 2. Final Message
Customize the reward screen text.
```typescript
finalMessage: {
  title: "Mission Accomplished!",
  subtitle: "All codes decrypted",
  message: "Your personal message here..."
}
```

### 3. Background Images
Update the `images` array with URLs for the final carousel.
```typescript
images: [
  "https://example.com/image1.jpg",
  "https://example.com/image2.jpg",
  // ...
]
```

---

## 📦 Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd secretcode
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

4.  **Build for production**:
    ```bash
    npm run build
    npm start
    ```

---

## 🎨 Theming

Colors and fonts are defined in `tailwind.config.js` and `globals.css`.

- **Colors**:
  - `moss-*`: Primary green palette (dark, medium, light, accent).
  - `parchment`: Background paper color.
  - `gold-accent`: Highlights and borders.
- **Fonts**:
  - `font-detective`: Serif font (Georgia/Times New Roman) for headings.
  - `font-mono`: Monospace font (Courier New) for code/inputs.

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
