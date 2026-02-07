# Adding Media to Day 7 Experience

## How to Add Your Own Images & Videos

### Replace Placeholder Images
9 placeholder rose images are already created in `public/assets/` folder:
- `rose1.jpg` through `rose10.jpg`

**To add your real images:**
1. Delete the placeholder images (rose1.jpg - rose10.jpg)
2. Add your own images with the same names
3. Supported formats: JPG, PNG, WebP, GIF

**Example:**
```
public/assets/
├── rose1.jpg  (your image here)
├── rose2.jpg  (your image here)
├── rose3.jpg  (your image here)
... and so on
```

### Add Videos
To add videos to specific shayaris, update `src/data/Story.js`:

**Currently:** `image: "/assets/rose1.jpg"`

**To add video instead:**
```javascript
{
  text: "Your shayari...",
  image: null,
  video: "/assets/videos/shayari1.mp4"  // Add video path here
}
```

**Create a videos folder:**
1. Create `public/assets/videos/` folder
2. Add your MP4 or WebM files

## How to Add Background Music

### Download or Add Music File
1. Go to `public/assets/music/` folder
2. **Download a 90s song** (like "Teri Ada" by Kishore Kumar - free on YouTube Music)
3. Convert to MP3 format (if needed)
4. Rename to `teri-ada.mp3` or update the path in `src/data/Story.js`

**Example setup:**
```
public/assets/music/
├── teri-ada.mp3  (your music file)
```

**To use a different song:**
Edit `src/data/Story.js`:
```javascript
music: {
  title: "Your Song Title",
  url: "/assets/music/your-song.mp3"
}
```

### Royalty-Free Options:
- Free 90s music: Bensound.com, Free Music Archive
- Old Hindi songs: Archive.org, TheSoundCloud Hindi
- Ensure copyright permission before using

## File Structure

```
valentine-experience/
├── public/
│   └── assets/
│       ├── rose1.jpg (replace with your images)
│       ├── rose2.jpg
│       ├── ... (through rose10.jpg)
│       ├── videos/
│       │   └── (optional video files)
│       └── music/
│           └── teri-ada.mp3 (add your song here)
├── src/
│   └── data/
│       └── Story.js (edit paths if different)
```

## Image Quality Tips

- **Dimensions:** Ideally 600x400px or wider (maintains 1.5:1 aspect ratio)
- **File size:** Keep under 500KB for fast loading
- **Format:** JPG for photos, PNG for graphics with transparency
- **Optimization:** Use tools like TinyPNG before uploading

## Video Tips

- **Format:** MP4 (H.264 codec) works best
- **Duration:** 5-15 seconds each works well
- **File size:** Keep under 2MB for smooth playback
- **Resolution:** 1080p or lower
- **Encoding:** H.264 video codec, AAC audio

## How Shayaris Map to Images

Day 7 has 10 shayaris:
```
Shayari #1 ↔ rose1.jpg
Shayari #2 ↔ rose2.jpg
Shayari #3 ↔ rose3.jpg
... and so on
```

Each shayari automatically displays with its corresponding image.

---

**Ready to customize!** Just drop your images/videos in the folders and music will play automatically when the user clicks play button.
