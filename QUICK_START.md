# Quick Start Guide

## Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Then open your browser to `http://localhost:5173`

## What You'll See

### Landing Screen (Always Available)
- Centered text: "I made something. Not to impress. Just to be honest."
- Gold "Enter" button
- Click to continue to story

### Story Screens (Feb 7-14 Only)
- Scrollable sections, one per day
- Each day unlocks automatically based on current date
- Smooth fade-in animations as you scroll
- Current date: **Feb 7, 2026** ✓ (story is accessible)

### Locked Screen (Outside Feb 7-14)
- Shows: "Some things are meant for the right time."
- Try changing your system date to test

## Edit Story Content (Most Important)

Open [src/data/Story.js](src/data/Story.js)

Each day is an object:
```javascript
{
  day: 7,
  text: "Your message here.\nUse \\n for line breaks.",
  image: null  // or "/images/day7.jpg" when ready
}
```

### Example: Add Day 7 Image

1. Create `public/images/` folder
2. Add your image: `public/images/day7.jpg`
3. Update Story.js:
   ```javascript
   image: "/images/day7.jpg"
   ```

## Customize Colors

Edit [tailwind.config.js](tailwind.config.js):

```javascript
colors: {
  dark: "#0E0E0E",    // Background
  text: "#EAEAEA",    // Main text
  muted: "#9A9A9A",   // Gray text
  gold: "#C9A24D"     // Button accent
}
```

## Customize Button

Edit [src/pages/Landing.jsx](src/pages/Landing.jsx) - look for the `<button>` component.

## Customize Animations

Edit [src/components/FadeSection.jsx](src/components/FadeSection.jsx):

Change `duration: 1.4` to make animations faster/slower
- `1.0` = faster
- `1.6` = slower

## Production Build

```bash
npm run build
```

This creates an optimized `dist/` folder ready to deploy.

### Deploy to Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Deploy to Other Platforms
- **Netlify**: Drag `dist/` folder
- **GitHub Pages**: Push to repo, enable Pages
- **Any Static Host**: Upload `dist/` folder contents

## File Structure Overview

```
src/
├── components/
│   ├── Background.jsx       ← Gradient & vignette
│   ├── FadeSection.jsx      ← Animated text (CUSTOMIZE ANIMATIONS HERE)
│   └── Locked.jsx           ← Locked message (EDIT TEXT HERE)
├── pages/
│   ├── Landing.jsx          ← Entry screen (EDIT TEXT & BUTTON HERE)
│   └── Story.jsx            ← Story container
├── data/
│   └── Story.js             ← ⭐ EDIT CONTENT HERE (TEXT & IMAGES)
├── App.jsx                  ← Main app (DATE LOGIC HERE)
├── main.jsx
├── index.css                ← Tailwind setup
└── App.css
```

## Testing the Date Logic

1. Set your system date to **Feb 8** → Story shows only Day 7 & 8
2. Set your system date to **Feb 14** → All days unlock
3. Set your system date to **Feb 15** → Shows locked message
4. Set your system date to **Feb 1** → Shows locked message

## Troubleshooting

### "npm: command not found"
Install Node.js from [nodejs.org](https://nodejs.org)

### Styling looks broken
Make sure `src/index.css` is imported in `src/main.jsx`

### Fonts not loading
Check internet connection (uses Google Fonts)

### Images not showing
1. Check file path in Story.js
2. Make sure image file exists in that path
3. Try absolute path: `/images/filename.jpg`

## Key Design Decisions

✓ **No Navigation** - Full immersion, clean experience  
✓ **Dark Theme** - Elegant, cinematic, easy on eyes  
✓ **Slow Animations** - Intentional, meditative feel  
✓ **Mobile-First** - Works perfectly on phones  
✓ **Separated Data** - Easy to edit without touching code  
✓ **No External Libraries** - Minimal dependencies, fast loading  

## Need Help?

Check [EDITING_GUIDE.md](EDITING_GUIDE.md) for detailed instructions.

---

**Happy editing!**
