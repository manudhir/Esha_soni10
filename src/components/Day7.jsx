import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Day7({ shayariData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  // Guard: if shayaris array is missing or empty, show error
  if (!shayariData.shayaris || shayariData.shayaris.length === 0) {
    return (
      <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF1493', fontSize: '1.2rem'}}>
        Error: No shayaris data found
      </div>
    );
  }

  const currentShayari = shayariData.shayaris[currentIndex];
  const mediaSrc = currentShayari.video || currentShayari.image || null;
  const isVideo = mediaSrc && (mediaSrc.endsWith('.mp4') || mediaSrc.endsWith('.webm') || mediaSrc.endsWith('.ogg'));
  const mediaFit = currentShayari.fit || 'cover';
  const mediaPosition = currentShayari.position || 'center';
  const [mediaError, setMediaError] = useState(false);

  useEffect(() => {
    setMediaError(false);
    if (!mediaSrc) return;
    // try a quick fetch to detect unreachable files (HEAD may be blocked on some servers)
    fetch(mediaSrc, { method: 'GET' })
      .then((res) => {
        if (!res.ok) {
          console.warn('Media not reachable:', mediaSrc, res.status);
          setMediaError(true);
        }
      })
      .catch((err) => {
        console.warn('Media fetch error:', mediaSrc, err.message);
        setMediaError(true);
      });
  }, [mediaSrc, currentIndex]);

  const currentTrack = (currentShayari && currentShayari.music && currentShayari.music.url) || (shayariData.music && shayariData.music.url) || null;
  const currentTrackTitle = (currentShayari && currentShayari.music && currentShayari.music.title) || (shayariData.music && shayariData.music.title) || '';

  useEffect(() => {
    // Update audio element source when track changes
    if (audioRef.current) {
      if (currentTrack) {
        audioRef.current.src = currentTrack;
      }
      try {
        if (isPlaying) {
          audioRef.current.load();
          audioRef.current.play().catch((e) => {
            console.warn('Autoplay blocked or play failed:', e.message);
          });
        }
      } catch (e) {
        console.warn('Audio play/load error', e.message);
      }
    }
  }, [currentTrack, isPlaying]);

  const nextShayari = () => {
    setCurrentIndex((prev) => (prev + 1) % shayariData.shayaris.length);
  };

  const prevShayari = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? shayariData.shayaris.length - 1 : prev - 1
    );
  };

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  // Auto-play the current track when the slide changes (after intro is dismissed).
  useEffect(() => {
    if (!showIntro) {
      // If current slide is a video, play the video's audio and pause the global audio
      if (isVideo && videoRef.current) {
        // pause global audio
        try { if (audioRef.current) { audioRef.current.pause(); setIsPlaying(false); } } catch (e) {}
        videoRef.current.muted = false;
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch((err) => {
          console.warn('Video autoplay failed:', err.message);
          // if autoplay blocked, keep it muted so it can autoplay silently
          videoRef.current.muted = true;
        });
      } else {
        // For images (or non-video), ensure any video is paused and play the track
        if (videoRef.current) {
          try {
            videoRef.current.pause();
            videoRef.current.muted = true;
            videoRef.current.currentTime = 0;
          } catch (e) {}
        }
        if (audioRef.current && currentTrack) {
          audioRef.current.src = currentTrack;
          audioRef.current.loop = false;
          audioRef.current.load();
          audioRef.current.play()
            .then(() => setIsPlaying(true))
            .catch((err) => {
              console.warn('Autoplay blocked or failed on slide change:', err.message);
              setIsPlaying(false);
            });
        }
      }
    }
  }, [currentIndex, currentTrack, showIntro]);

  if (showIntro) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          position: "relative",
          zIndex: 10,
          background: "linear-gradient(135deg, rgba(255,182,193,0.1) 0%, rgba(255,105,180,0.1) 50%, rgba(220,20,60,0.1) 100%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          style={{ maxWidth: "38ch", textAlign: "center", marginBottom: "3rem" }}
        >
          <p
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(2rem, 5vw, 2.5rem)",
              lineHeight: "1.6",
              color: "#EAEAEA",
              whiteSpace: "pre-wrap",
              marginBottom: "2rem",
            }}
          >
            {shayariData.introText}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowIntro(false)}
            style={{
              border: "2px solid #FF1493",
              padding: "0.75rem 2.5rem",
              color: "#FF1493",
              backgroundColor: "transparent",
              cursor: "pointer",
              fontSize: "1rem",
              fontFamily: "Inter, sans-serif",
              fontWeight: "600",
              letterSpacing: "0.05em",
              transition: "all 0.3s ease-out",
              borderRadius: "4px",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "rgba(255,20,147,0.15)";
              e.target.style.boxShadow = "0 0 20px rgba(255,20,147,0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.boxShadow = "none";
            }}
          >
            Continue
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* Music Player - src set dynamically via JS */}
      <audio ref={audioRef} loop />

      {/* Main Carousel Section */}
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          paddingTop: "4rem",
          paddingBottom: "4rem",
          position: "relative",
          zIndex: 10,
          background: "linear-gradient(135deg, rgba(255,192,203,0.05) 0%, rgba(255,182,193,0.05) 50%, rgba(255,160,122,0.05) 100%)",
        }}
      >
        {/* Image/Video with Animation */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            width: "100%",
            maxWidth: "600px",
            marginBottom: "3rem",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(255,20,147,0.3)",
          }}
        >
          {isVideo ? (
            mediaError ? (
              <div style={{
                width: '100%',
                height: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #FF1493 0%, #FF69B4 100%)',
                color: '#0E0E0E',
                fontFamily: 'Inter, sans-serif'
              }}>
                <span>Video not reachable: {mediaSrc}</span>
              </div>
            ) : (
              <video
                ref={videoRef}
                src={mediaSrc}
                autoPlay
                muted={true}
                loop
                onError={() => setMediaError(true)}
                style={{
                  width: "100%",
                  height: mediaFit === 'cover' ? '400px' : 'auto',
                  maxHeight: '60vh',
                  objectFit: mediaFit,
                  objectPosition: mediaPosition,
                  display: "block",
                }}
              />
            )
          ) : (
            mediaError ? (
              <div style={{
                width: '100%',
                height: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #FF1493 0%, #FF69B4 100%)',
                color: '#0E0E0E',
                fontFamily: 'Inter, sans-serif'
              }}>
                <span>Image not reachable: {mediaSrc}</span>
              </div>
            ) : (
              <img
                src={mediaSrc}
                alt="Rose Day"
                style={{
                  width: "100%",
                  height: mediaFit === 'cover' ? '400px' : 'auto',
                  maxHeight: '60vh',
                  objectFit: mediaFit,
                  objectPosition: mediaPosition,
                  display: "block",
                }}
                onError={(e) => {
                  console.warn('Image onError', mediaSrc);
                  setMediaError(true);
                }}
              />
            )
          )}

          {/* Debug overlay: shows current media path and status */}
          <div style={{
            position: 'absolute',
            right: '1rem',
            top: '1rem',
            background: 'rgba(0,0,0,0.5)',
            color: '#fff',
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
            fontSize: '0.75rem',
            maxWidth: 'calc(100% - 2rem)',
            zIndex: 20,
            pointerEvents: 'none'
          }}>
            <div style={{fontWeight: 600}}>media:</div>
            <div style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '220px'}}>{mediaSrc || '—'}</div>
            <div style={{marginTop: '0.25rem'}}>{mediaError ? 'status: ERROR' : 'status: OK'}</div>
          </div>
        </motion.div>

        {/* Shayari Text */}
        <motion.div
          key={`text-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
          style={{
            maxWidth: "38ch",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          <p
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(1.3rem, 4vw, 1.75rem)",
              lineHeight: "1.8",
              color: "#EAEAEA",
              whiteSpace: "pre-wrap",
              fontStyle: "italic",
            }}
          >
            {currentShayari.text}
          </p>
        </motion.div>

        {/* Counter */}
        <div
          style={{
            fontSize: "0.875rem",
            color: "#9A9A9A",
            marginBottom: "2rem",
            letterSpacing: "0.05em",
          }}
        >
          {currentIndex + 1} / {shayariData.shayaris.length}
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.4 }}
          style={{
            display: "flex",
            gap: "1.5rem",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            onClick={prevShayari}
            style={{
              padding: "0.75rem 1.5rem",
              border: "2px solid #FF1493",
              backgroundColor: "transparent",
              color: "#FF1493",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontFamily: "Inter, sans-serif",
              fontWeight: "600",
              transition: "all 0.3s ease-out",
              borderRadius: "4px",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "rgba(255,20,147,0.15)";
              e.target.style.boxShadow = "0 0 15px rgba(255,20,147,0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.boxShadow = "none";
            }}
          >
            ← Previous
          </button>

          <button
            onClick={toggleMusic}
            style={{
              padding: "0.75rem 1.5rem",
              border: "2px solid #FFB6C1",
              backgroundColor: isPlaying ? "rgba(255,182,193,0.2)" : "transparent",
              color: "#FFB6C1",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontFamily: "Inter, sans-serif",
              fontWeight: "600",
              transition: "all 0.3s ease-out",
              borderRadius: "4px",
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = "0 0 15px rgba(255,182,193,0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = "none";
            }}
          >
            {isPlaying ? "🔊 Pause" : "🔇 Play"} {currentTrackTitle || shayariData.music.title}
          </button>

          <button
            onClick={nextShayari}
            style={{
              padding: "0.75rem 1.5rem",
              border: "2px solid #FF1493",
              backgroundColor: "transparent",
              color: "#FF1493",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontFamily: "Inter, sans-serif",
              fontWeight: "600",
              transition: "all 0.3s ease-out",
              borderRadius: "4px",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "rgba(255,20,147,0.15)";
              e.target.style.boxShadow = "0 0 15px rgba(255,20,147,0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.boxShadow = "none";
            }}
          >
            Next →
          </button>
        </motion.div>

        {/* Indicator Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.5 }}
          style={{
            display: "flex",
            gap: "0.5rem",
            marginTop: "2rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {shayariData.shayaris.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                border: "none",
                backgroundColor:
                  index === currentIndex ? "#FF1493" : "#9A9A9A",
                cursor: "pointer",
                transition: "all 0.3s ease-out",
                opacity: index === currentIndex ? 1 : 0.5,
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
              }}
            />
          ))}
        </motion.div>
      </div>
    </>
  );
}
