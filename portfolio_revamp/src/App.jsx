import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './App.css';
import LetterGlitch from './components/LetterGlitch';
import LiquidEther from './LiquidEther';
import DecryptedText from './DecryptedText';
import StaggeredMenu from './components/StaggeredMenu';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '#' },
  { label: 'About', ariaLabel: 'Learn about us', link: '#about' },
  { label: 'Skills', ariaLabel: 'View our skills', link: '#skills' },
  { label: 'Experience', ariaLabel: 'View our experience', link: '#experience' },
  { label: 'Projects', ariaLabel: 'View our projects', link: '#projects' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' },
];

const socialItems = [
  { label: 'GitHub', link: 'https://github.com/ekaagragupta' },
  { label: 'LinkedIn', link: 'https://linkedin.com/in/ekaagragupta' },
];

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0f172a]">
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <LetterGlitch glitchSpeed={50} centerVignette={true} outerVignette={false} smooth={true} />
        </div>
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <DecryptedText
            text="Hacking into Ekaagra's life"
            animateOn="view"
            maxIterations={40}
            speed={140}
            parentClassName="loading-title"
            encryptedClassName="loading-title"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#0f172a]">
      {/* STAGGERED MENU COMPONENT (Fixed to top overlay) */}
      <StaggeredMenu 
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        isFixed={true}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#000000"
      />

      {/* SECTION 1: HERO */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
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
      </section>

      {/* SECTION 2: ABOUT ME */}
      <section id="about" className="relative w-full min-h-screen py-24 bg-[#1e293b] flex flex-col items-center">
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1200px', padding: '0 2rem' }}>
          <h2 className="title text-center" style={{ fontSize: '3rem', marginBottom: '4rem' }}>About Me</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#0f172a] p-8 rounded-2xl shadow-lg border border-[#334155]">
              <p className="text-white text-lg leading-relaxed font-light mb-4">
                I'm a passionate <span className="text-[#5227FF] font-semibold">2nd-year Computer Science Engineering Major</span> with a specialization in <span className="text-[#FF9FFC] font-semibold">Artificial Intelligence and Machine Learning</span>. Currently pursuing my B.Tech degree from Manipal University Jaipur, I'm deeply fascinated by the intersection of technology and innovation.
              </p>
              <p className="text-gray-400 text-base leading-relaxed font-light">
                My journey in tech started with curiosity about how machines can think and learn. Today, I'm actively exploring various domains including machine learning algorithms, Artificial Intelligence, web development, and competitive programming. I believe in learning by doing and constantly challenging myself with new projects and technologies.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#0f172a] p-6 rounded-2xl border border-[#334155] flex flex-col items-center text-center justify-center transition-transform hover:scale-105">
                <div className="w-12 h-12 bg-[#5227FF] rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Machine Learning</h3>
                <p className="text-gray-400 text-sm">Deep learning, neural networks, and AI algorithms</p>
              </div>
              
              <div className="bg-[#0f172a] p-6 rounded-2xl border border-[#334155] flex flex-col items-center text-center justify-center transition-transform hover:scale-105">
                <div className="w-12 h-12 bg-[#FF9FFC] rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0f172a]"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Web Development</h3>
                <p className="text-gray-400 text-sm">Full-stack development with modern frameworks</p>
              </div>
              
              <div className="bg-[#0f172a] p-6 rounded-2xl border border-[#334155] flex flex-col items-center text-center justify-center transition-transform hover:scale-105">
                <div className="w-12 h-12 bg-[#B497CF] rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0f172a]"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Data Science</h3>
                <p className="text-gray-400 text-sm">Data analysis, visualization and predictive models</p>
              </div>
              
              <div className="bg-[#0f172a] p-6 rounded-2xl border border-[#334155] flex flex-col items-center text-center justify-center transition-transform hover:scale-105">
                <div className="w-12 h-12 bg-[#5227FF] rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Problem Solving</h3>
                <p className="text-gray-400 text-sm">Competitive programming and algorithmic thinking</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default App;