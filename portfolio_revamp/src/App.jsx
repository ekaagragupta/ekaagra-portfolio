import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './App.css';
import LetterGlitch from './components/LetterGlitch';





function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // If we are loading, show the Splash Screen!
  if (isLoading) {
    return (
      <div className="loading-container" style={{ position: 'relative' }}>

        {/* BACKGROUND GLITCH ANIMATION */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <LetterGlitch glitchSpeed={50} centerVignette={true} outerVignette={false} smooth={true} />
        </div>

        {/* YOUR TEXT ON TOP */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.h1
            className="title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            hey user
          </motion.h1>

          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ marginTop: '2rem', color: '#ff8a00' }}
          >
            Loading...
          </motion.p>
        </div>

      </div>
    );
  }


  // If loading is finished, show the Main Portfolio!
  return (
    <div className="app-container">
      <motion.h1
        className="title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Hey, I am Ekaagra Gupta
      </motion.h1>

      <motion.p
        className="subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Welcome to my Advanced User Experience Portfolio
      </motion.p>
    </div>
  );
}


export default App;