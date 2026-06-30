# 3D Word Builder Adventure - Impact Hub Egypt Educational Collection (Game #3)

A premium, AAA-quality educational spelling game designed specifically for preschool children (aged 3–6). It teaches children how to construct words in Arabic, English, French, and German by matching colorful, physical-feeling letter blocks to empty word slots.

## 🌟 Game Highlights

- **Multilingual Excellence**: Native support for **Arabic (RTL with Cairo font)**, **English**, **Français**, and **Deutsch** with real-time Speech Synthesis (vocal audio) in all languages.
- **Durable Learning Modes**:
  1. **Full Word**: Build the entire target word from scrambled blocks.
  2. **Missing Letters**: Fill in specific missing letters (cloze/fill-in-the-blank style).
  3. **Extra & Distractors**: Identify correct spelling blocks amongst noisy/distractor letters.
- **Physical Feel & Snapping Interactions**: Supports mouse click/touch-to-move and drag gestures with fluid physics transitions powered by Framer Motion.
- **Retro Audio Synth**: Generates all game sound effects (pops, clicks, positive arpeggios, wrong buzzes) offline using the HTML5 **Web Audio API** — requiring zero asset downloads and loading at 60 FPS instantly on low-end Android/iOS tablets.
- **Parent & Teacher Zone**: Includes diagnostic reports, stats trackers (stars, completed levels, spelling accuracy), and speed controllers.
- **Egyptian Certificate of Achievement**: Kids can capture and save a high-resolution PDF-style Certificate of Achievement from Impact Hub Egypt directly to their devices.

---

## 📂 Project Structure

This workspace is structured into three clean, production-ready modules:

1. **Vite / React App** (Runs in the active container preview):
   - `/src/App.tsx`: Central game controller, screens, and progress tracker.
   - `/src/types.ts`: Strictly-typed game models and configurations.
   - `/src/data/words.ts`: Multilingual database (words, SVG art configurations, phonetic vocal tags).
   - `/src/components/AudioEngine.ts`: Real-time speech synthesis + Web Audio chip-tune synthesizer.
   - `/src/components/FloatingIsland.tsx`: Layered 3D-styled animated platform casting perspective shadows on the grass.
   - `/src/components/WordBuilder.tsx`: Spelling tiles, slots, and snapping layout.
   - `/src/components/ParentDashboard.tsx`: Teacher cockpit + parent stats tracker.
   - `/src/components/ScreenshotModal.tsx`: Canvas certificate generator.
   - `/src/index.css`: Google Fonts Cairo / Inter imports + animations.

2. **Standalone Pure HTML5 Version**:
   - `/standalone/index.html`: A self-contained, offline-first, single-file HTML version. Double-click it on any tablet, smartboard, or phone to play the full game completely offline. Perfect for classrooms in Egypt with limited connectivity.

3. **Next.js Production Package**:
   - `/nextjs-export/`: Contains files ready for deployment on Vercel or GitHub pages (`page.tsx`, `layout.tsx`, `globals.css`, `package.json`).

---

## 🚀 How to Run the Project

### Method A: Vite Dev Server (Active Preview)
The development server is pre-configured and runs automatically inside our sandbox container on port `3000`.
- Build the app: `npm run build`
- Run the server: `npm run dev`

### Method B: Standalone Offline Play
1. Locate `/standalone/index.html` in the file tree.
2. Open this file in any modern browser (Chrome, Safari, Firefox, Edge).
3. The game will boot instantly without needing a server, bundler, or internet connection.

### Method C: Next.js Production Deploy (Vercel)
1. Open a terminal inside the `/nextjs-export` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Launch development server:
   ```bash
   npm run dev
   ```
4. Build for static production hosting:
   ```bash
   npm run build
   ```

---

## 🎨 Pedagogical Customization
To replace the Speech Synthesis with real studio voice recordings in the future:
1. Open `/src/components/AudioEngine.ts`.
2. Locate the `speak()` method.
3. Replace the `window.speechSynthesis.speak()` calls with standard HTML5 `new Audio('/audio/' + text + '.mp3').play()`. No alterations to the core game logic or layout are required.
