import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './App.css';
import LetterGlitch from './components/LetterGlitch';
// import LiquidEther from './LiquidEther';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // If we are loading, show the Splash Screen!
  if (isLoading) {
    return (
      <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0f172a]">

        {/* BACKGROUND GLITCH ANIMATION */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <LetterGlitch glitchSpeed={50} centerVignette={true} outerVignette={false} smooth={true} />
        </div>


        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.h1
            className="title"
            style={{ fontSize: '2.5rem' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            Retrieving intelligence
          </motion.h1>

          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ marginTop: '2rem', color: '#f7f9f8ff' }}
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
      {/* <div style={{ width: '100%', height: 600, position: 'relative' }}>
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B497CF']}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          color0="#5227FF"
          color1="#FF9FFC"
          color2="#B497CF"
        />
      </div> */}
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