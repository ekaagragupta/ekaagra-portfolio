import { motion } from 'framer-motion';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <motion.h1 
        className="title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        My Portfolio
      </motion.h1>
      
      <motion.p 
        className="subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Advanced User Experience Portfolio built with React & Framer Motion
      </motion.p>
    </div>
  );
}

export default App;