export default function Locked() {
  return (
    <div 
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div 
        style={{
          textAlign: 'center',
          maxWidth: '38ch',
        }}
      >
        <p 
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2rem, 5vw, 2.25rem)',
            lineHeight: '1.5',
            color: '#EAEAEA',
          }}
        >
          Some things are meant
          <br />
          for the right time.
        </p>
      </div>
    </div>
  );
}
