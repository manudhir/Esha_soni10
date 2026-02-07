import { motion } from "framer-motion";

export default function FadeSection({ text, image }) {
  return (
    <section 
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: '38ch', margin: '0 auto' }}>
        {image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            style={{ marginBottom: '2rem', overflow: 'hidden', borderRadius: '4px' }}
          >
            <img 
              src={image} 
              alt="" 
              style={{
                width: '100%',
                height: '20rem',
                objectFit: 'cover',
                opacity: 0.7,
                transition: 'opacity 0.5s duration-500 ease-out',
              }}
              onMouseEnter={(e) => e.target.style.opacity = 0.8}
              onMouseLeave={(e) => e.target.style.opacity = 0.7}
            />
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          style={{
            textAlign: 'center',
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.5rem, 4vw, 1.875rem)',
            lineHeight: '1.7',
            whiteSpace: 'pre-wrap',
            color: '#EAEAEA',
            margin: 0,
          }}
        >
          {text}
        </motion.p>
      </div>
    </section>
  );
}
