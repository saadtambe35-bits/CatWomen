# 🐾 TASHMI's Little World — Digital Happiness Sanctuary

A beautiful, fully interactive, responsive digital sanctuary built with React, Tailwind CSS, and the Web Audio API. Created specifically as a warm, comforting, and playful space to bring peace, smiles, and gentle care to a close friend named **TASHMI** without any pressure.

![Screenshot / Concept](public/favicon.svg)

---

## ✨ Features Included

1. **🌸 Pastel Kawaii Aesthetic & Atmosphere**
   - Palette of pastel pinks, soft lavenders, creams, and baby blues.
   - Animated SVG illustrations: sleeping kitten on a cloud, butterflies, fluttering petals, and fairy lights.
   - Procedural Web Audio API background lullaby (peaceful music box/kalimba melody) that starts only after user interaction.
   - Procedural sound effects for meows, purrs, flower blooms, catching fish, and breathing bells with full mute/unmute control.
   - Smooth canvas-based falling cherry blossom petals (toggleable).

2. **🐱 Welcome Screen**
   - Animated kitten sleeping peacefully on a fluffy cloud with "zzz" bubbles.
   - Heartwarming greeting with the option to personalize the name anytime (saved in `localStorage`).
   - "Let's make today a little better ✨" button that smoothly enters the sanctuary.

3. **💭 Interactive Mood Selection (Zero-Pressure)**
   - 5 feelings:
     - 🥺 Need a little comfort
     - 😭 Having a rough day
     - 😂 Need something funny
     - 😴 Just want some peace
     - 😊 Feeling pretty good
   - Dynamically adapts with validating, comforting responses, interactive actions (virtual cat hugs, warm tea, sound toggles), and sanctuary recommendations.

4. **🐈 My Little Cat Café**
   - 4 unique kittens with individual personalities, artwork, sounds, and dialogues:
     - **Mochi**: Sleepy Calico who loves naps and pillows.
     - **Mikan**: Silly Orange Tabby with chaotic braincells and boxes.
     - **Yuki**: Fluffy White Persian princess who loves royal head scratches.
     - **Kuro**: Tiny Midnight Panther who loves pouncing and cuddles.
   - Interactions: **Pet**, **Feed Fish**, **Play with Yarn**, and **Tuck into Sleep** with real-time dialogues.

5. **🌷 The Happiness Garden**
   - Interactive garden where clicking flower buds makes them bloom with chimes and reveals positive affirmations.
   - Butterflies flutter across the screen.
   - "Plant a New Flower" interactive modal allowing her to pick a color, name a flower, and write a custom affirmation.

6. **☀️ Jar of Sunshine**
   - Animated mason jar with glowing fairy lights and folded origami notes.
   - Clicking shakes the jar and unfolds one of **25 unique comforting, validating messages**.
   - Includes favorite notes and "draw another" functionality.

7. **🎮 Mini Game: "Catch the Fishies!"**
   - Fully playable arcade game: Move the cute kitten basket via mouse, touch drag, or buttons to catch falling fish, golden stars, and hearts.
   - Dynamic score counter.
   - **Secret Milestone**: Catching 10 fish triggers a celebration confetti shower and unlocks a secret comfort letter and lifetime kitten cuddle voucher!

8. **☁️ Breathing & Relaxation Corner (4-4-6)**
   - Guided relaxation with an expanding and contracting lotus flower.
   - 4 seconds inhale, 4 seconds hold, 6 seconds exhale.
   - Gentle singing-bowl chime cues and counter of completed peaceful breaths.

9. **☕ Cozy Tea Station**
   - Brew a virtual warm drink: Chamomile Honey, Pastel Matcha, Lavender Sweet Milk, or Velvet Cat Cocoa.
   - Choose garnishes: Cat paw marshmallows, honey drizzle, or sugar stars, and take a warm sip.

10. **💗 A Little Appreciation Section**
    - Prominently showcases the heartfelt quote:
      *"Some people deserve a little extra kindness, not because they ask for it, but because the world can be a little too heavy sometimes."*
    - Displays all 5 favorite quotes in lovely aesthetic cards.

11. **💌 Final Surprise Handwritten Letter**
    - Animated wax-sealed envelope delivered by a tiny messenger kitten.
    - Clicking breaks the wax seal, releases confetti, and unfolds a handwritten letter with the exact sincere message.

12. **🐾 Special Touch: Bottom-Right Companion Cat**
    - Sits permanently in the bottom-right corner.
    - Clicking triggers sweet meows, purrs, and randomized speech bubbles:
      - *"pspsps... you need a break?"*
      - *"Human, drink some water!"*
      - *"Sending 1000 virtual hugs."*
      - *"Meow means you're doing great."*
      - *"No overthinking allowed for the next 5 minutes. 🐾"*

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the local Vite development server
npm run dev

# 3. Open in your browser
# http://localhost:5173
```

---

## 🌐 How to Deploy (Vercel / Netlify / GitHub Pages)

### Option 1: Vercel (Recommended — 2 minutes)
1. Push this folder to a GitHub repository (or run `npx vercel` directly in your terminal).
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Click **Deploy**!

### Option 2: Netlify
1. Run `npm run build` to generate the production files in `./dist`.
2. Drag and drop the `dist` folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or connect your GitHub repo.
3. Your live link will be ready immediately!
