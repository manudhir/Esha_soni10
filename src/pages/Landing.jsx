import { useState } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";

export default function Landing({ onEnter }) {
  const [error, setError] = useState("");

  const enter = () => {
    onEnter();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        position: 'relative',
        zIndex: 10,
        background: 'linear-gradient(135deg, rgba(255,192,203,0.08) 0%, rgba(255,182,193,0.08) 50%, rgba(255,160,122,0.08) 100%)',
      }}
    >
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
        style={{ textAlign: 'center', maxWidth: '38ch' }}
      >
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2rem, 5vw, 2.25rem)',
            lineHeight: '1.6',
            color: '#EAEAEA',
            marginBottom: '2rem',
            textShadow: '0 4px 20px rgba(255,20,147,0.2)',
          }}
        >
          I made something.
          <br />
          Not to impress.
          <br />
          Just to be honest.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
          onClick={enter}
          style={{
            border: '2px solid #FF1493',
            padding: '0.75rem 2rem',
            color: '#FF1493',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            fontSize: '1rem',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '600',
            letterSpacing: '0.05em',
            transition: 'all 0.3s ease-out',
            borderRadius: '4px',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(255,20,147,0.15)';
            e.target.style.boxShadow = '0 0 20px rgba(255,20,147,0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.boxShadow = 'none';
          }}
        >
          Enter
        </motion.button>

        {error && (
          <p style={{ color: '#9A9A9A', fontSize: '0.875rem', marginTop: '1rem' }}>
            {error}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
