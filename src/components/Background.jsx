export default function Background() {
  return (
    <>
      {/* Gradient Base - Subtle Rose Tint */}
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -30,
          background: 'linear-gradient(135deg, rgba(14,14,14,0.98) 0%, rgba(20,10,15,0.97) 50%, rgba(14,14,14,0.98) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Vignette Overlay - Enhanced */}
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -20,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, rgba(255, 192, 203, 0.08) 0%, rgba(0, 0, 0, 0.5) 65%, rgba(0, 0, 0, 0.85) 100%)',
        }}
      />
    </>
  );
}
