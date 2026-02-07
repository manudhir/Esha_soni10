# Valentine Experience

A cinematic, minimal, editorial-style Valentine experience website built with React, Vite, and Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Project Structure

```
src/
├── components/
│   ├── Background.jsx       # Gradient background & vignette
│   ├── FadeSection.jsx      # Animated text sections
│   └── Locked.jsx           # Date-locked screen
├── pages/
│   ├── Landing.jsx          # Entry screen
│   └── Story.jsx            # Main scrollable story
├── data/
│   └── Story.js             # ✏️ EDITABLE: Story content & images
├── App.jsx                  # Main app component
├── main.jsx                 # React entry point
├── index.css                # Tailwind + vignette styles
└── App.css                  # App-specific styles
```

## Design System

### Colors (Exact Hex Values)
- **Background**: `#0E0E0E` (Dark Charcoal)
- **Primary Text**: `#EAEAEA` (Off-white)
- **Muted Text**: `#9A9A9A` (Gray)
- **Accent**: `#C9A24D` (Soft Antique Gold)

### Typography
- **Serif Font**: Playfair Display (emotional text)
- **Sans-serif Font**: Inter (UI & body)
- **Line Height**: 1.7 (generous)
- **Max Line Width**: 38 characters (poetic feel)

### Animation Rules
All animations use Framer Motion with:
- Duration: 1.4s (slow, intentional)
- Easing: `easeOut` (subtle, no bounce)
- Type: Opacity + small translateY only

## Editing Content

### Edit Story Text & Images

Edit [src/data/Story.js](src/data/Story.js):

The `story` array contains 8 objects (days 7-14). Each object has:

```javascript
{
  day: 7,                    // Day of month (7-14)
  text: "Your text here",    // Supports \n for line breaks
  image: null                // Add image path when ready: "/images/day7.jpg"
}
```

### How It Works

- **Day 7-14**: Each day unlocks progressively (shown if current date ≤ day)
- **Outside Range**: Shows "Some things are meant for the right time."
- **Text**: Emotional, minimal, poetic tone
- **Images**: Optional, centered, subtle (low opacity)

### Example: Add an Image

1. Place image in `public/images/day7.jpg`
2. Update Story.js:
   ```javascript
   {
     day: 7,
     text: "Not every rose is about romance.\nSome are just about presence.",
     image: "/images/day7.jpg"
   }
   ```

## Site Flow

1. **Landing Screen** (Any Date)
   - Centered text: "I made something. Not to impress. Just to be honest."
   - Gold outline button: "Enter"

2. **Story Screens** (Feb 7-14)
   - Full-viewport sections, one per day
   - Text fades in with subtle motion
   - Optional images
   - Smooth scroll between days

3. **Locked Screen** (Outside Feb 7-14)
   - Shows: "Some things are meant for the right time."
   - Returns on Feb 7

## Tech Stack

- **React 19** + **Vite** (build tool)
- **Tailwind CSS 4** (styling)
- **Framer Motion 12** (animations)
- **Day.js** (date handling)
- **Google Fonts**: Playfair Display + Inter

## Design Principles

✓ **No Hearts, No Pink Overload** - Editorial, not clichéd  
✓ **No Navigation Bar** - Fullscreen immersion  
✓ **Mobile-First** - Perfect on phones first  
✓ **Dark Editorial** - Cinematic, calm, intentional  
✓ **Subtle Animations** - Motion serves the story  
✓ **Easy Maintenance** - Separated data from UI  

## Build for Production

```bash
npm run build
npm run preview
```

Output: `dist/` folder (deploy to any static host)

## Customization Tips

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  dark: "#0E0E0E",   // Background
  text: "#EAEAEA",   // Primary text
  muted: "#9A9A9A",  // Muted text
  gold: "#C9A24D"    // Accent
}
```

### Change Typography Sizes
Edit animation durations in [src/components/FadeSection.jsx](src/components/FadeSection.jsx):
```javascript
transition={{ duration: 1.4, ease: "easeOut" }}  // Change 1.4 to slower/faster
```

### Change Button Styling
Edit [src/pages/Landing.jsx](src/pages/Landing.jsx) button classes.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- Website only accessible Feb 7-14 (configurable in Day.js logic)
- No analytics, no tracking, minimal JavaScript
- Fully responsive (tested on mobile, tablet, desktop)
- All animations GPU-accelerated for smooth 60fps

---

**Built with intention. Quiet. Confident. Editorial.**
