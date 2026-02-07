import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import Background from "./components/Background";
import Landing from "./pages/Landing";
import Story from "./pages/Story";
import Locked from "./components/Locked";

export default function App() {
  const [entered, setEntered] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = dayjs().date();
    const isInRange = today >= 7 && today <= 14;
    setIsLocked(!isInRange);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <>
        <Background />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </>
    );
  }

  if (isLocked) {
    return (
      <>
        <Background />
        <Locked />
      </>
    );
  }

  return (
    <>
      <Background />
      <div style={{position: 'fixed', right: 12, top: 12, zIndex: 9999, background: 'rgba(0,0,0,0.5)', color: '#fff', padding: '6px 10px', borderRadius: 6, fontSize: 12, pointerEvents: 'none'}}>
        <div>entered: {String(entered)}</div>
        <div>isLocked: {String(isLocked)}</div>
      </div>
      <motion.div
        key={entered ? "story" : "landing"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {entered ? <Story /> : <Landing onEnter={() => setEntered(true)} />}
      </motion.div>
    </>
  );
}
