import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './App.css';
import LetterGlitch from './components/LetterGlitch';
import LiquidEther from './LiquidEther';
import DecryptedText from './DecryptedText';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
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

          <DecryptedText
            text="Hacking into Ekaagra's life"
            animateOn="view"
            maxIterations={40}
            speed={140}
            parentClassName="title"
            encryptedClassName="title"
          />

        </div>

      </div>
    );
  }


  // If loading is finished, show the Main Portfolio!
  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0f172a]">

      {/* BACKGROUND LIQUID ANIMATION */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
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
        />
      </div>

      {/* FOREGROUND TEXT */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
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
          style={{ marginTop: '1rem' }}
        >
          Welcome to my Advanced User Experience Portfolio
        </motion.p>
      </div>
    </div>
  );
}


export default App;