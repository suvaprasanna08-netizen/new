# A Little Universe for Vasilisa

A cinematic, interactive birthday celebration website created especially for **Vasilisa** (Birthday: October 13). It features an enchanted garden, an interactive multi-tier birthday cake ceremony, a luxurious gift room, a wax-sealed personal letter, a celestial celebration gallery, and a fireworks finale.

---

## 🌟 Features & Scene Architecture

1. **Scene 1: The Mysterious Welcome**
   - Midnight-blue & violet starfield with drifting particles, shooting stars, and an interactive 3D envelope with a golden wax seal monogram ("V").
   - Clicking opens the envelope with chime sound effects and unveils the universe.

2. **Scene 2: The Grand Birthday Reveal**
   - Dramatic transformation into illuminated celebration with blooming botanical vines, floating balloons, fairy lights, and celebratory confetti.
   - Elegant bilingual typography in English and Russian:
     - *"Happy Birthday, Vasilisa!"*
     - *«С днём рождения, Василиса!»*
     - *"Today, this little universe celebrates YOU."*

3. **Scene 3: The Enchanted Garden**
   - Dreamy interactive garden with glowing fairy lights, garden arches, roses, tulips, and butterflies.
   - Interactive objects:
     - Touch Velvet Rose or Golden Tulip to trigger blooming animations.
     - Touch butterflies to make them flutter across the sky with sparkles.
     - Touch glowing lanterns and stars to reveal hidden birthday wishes.

4. **Scene 4: The Birthday Cake Ceremony**
   - Multi-tier illustrated cake on an ornamental stand with ivory/pink icing, pearls, and golden swags.
   - 5 interactive candles with flickering flames and extinguish smoke puffs.
   - *"Blow Out / Relight"* toggle.
   - *"Make a Wish"* button with spiraling particle energy.
   - *"Celebrate!"* button with celebratory confetti bursts.

5. **Scene 5: The Gift Room**
   - Four beautifully wrapped presents with distinct ribbons and patterns:
     - **Gift 1: A Sweet Surprise** (Warm birthday message).
     - **Gift 2: The Playful Surprise** (Humorous message with celebration confetti).
     - **Gift 3: The Friendship Surprise** (Heartfelt note about friendship across borders and distance).
     - **Gift 4: The Secret Surprise** (Locked velvet chest with "Reveal the Secret" button and suspense animation).

6. **Scene 6: The Heartfelt Letter**
   - Wax-sealed letter with paper texture and floral crest.
   - Realistic envelope opening and unfolding parchment paper.
   - Complete personal letter easily editable in one central configuration file.

7. **Scene 7: The Dreamy Celebration Gallery**
   - 4 curatorial art panels with original SVG botanical, horizon, lantern, and constellation compositions inside gilded frames:
     - *"Little Things Worth Celebrating"*
     - *"A World Full of Possibilities"*
     - *"More Reasons to Smile"*
     - *"Beautiful Things Ahead"*
   - Carousel navigation, keyboard controls, and thumbnail indicators.

8. **Scene 8: The Grand Finale**
   - Twilight sky, glowing golden particles, fireworks bursts, balloons, and confetti.
   - Final English and Russian greetings.
   - Replay buttons: Replay Finale, Return to Celebration World, or Restart from Chapter 1.

---

## 🎵 Music & Audio Engine

The application includes a built-in **Web Audio API procedural celesta & music box synthesizer** that creates a gentle, dreamy lullaby melody in real time.

- **Zero External Dependencies**: Works out-of-the-box without requiring any audio files or paid APIs.
- **Audio Controls**: Visible play/pause toggle, volume slider, and mute button in the top bar.
- **Sound Effects**: Procedural chimes for envelope opening, candle flickers, wish confirmations, and gift unwrapping.
- **How to add a custom audio track**:
  1. Place your audio file in the `public/` directory (e.g. `public/birthday-song.mp3`).
  2. Open `src/config/birthdayData.ts`.
  3. Set `customAudioUrl: '/birthday-song.mp3'`.
  4. If the file cannot be loaded or is unavailable, the application gracefully falls back to the built-in procedural synthesizer.

---

## ✏️ How to Customize Messages & Text

All customizable texts are stored in a single, well-documented file:

👉 **`src/config/birthdayData.ts`**

You can easily modify:
- **Recipient name & date**: `recipient.name`, `recipient.nameCyrillic`, `recipient.birthdayDate`
- **Headings & greetings**: `reveal.headline`, `reveal.cyrillicHeadline`, `reveal.subheading`
- **Garden hidden wishes**: `garden.secrets`
- **Gift messages & quotes**: `gifts` array
- **Heartfelt letter text**: `letter.paragraphs`, `letter.salutation`, `letter.closing`
- **Gallery art panels**: `gallery` array
- **Finale message**: `finale.message`

---

## 🛠️ Local Development & Build

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 3. Build for production
```bash
npm run build
```
The compiled, optimized static assets will be output to the `dist/` folder.

### 4. Preview the production build
```bash
npm run preview
```

---

## 🚀 Deployment

The project is a standard React SPA built with Vite and Tailwind CSS. It can be deployed to any static hosting provider for free:

- **Vercel**: Run `npx vercel` or link your repository.
- **Netlify**: Drag and drop the `dist/` folder or connect via GitHub.
- **GitHub Pages**: Deploy the `dist/` folder using `gh-pages`.
- **Firebase Hosting**: Run `firebase deploy`.
