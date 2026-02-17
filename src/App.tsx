import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import BackgroundAnimation from './components/common/BackgroundAnimation';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollProgress from './components/common/ScrollProgress';
import Home from './pages/Home';
import Culinary from './pages/Culinary';
import Service from './pages/Service';
import React from 'react';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/culinary" element={<PageTransition><Culinary /></PageTransition>} />
        <Route path="/service" element={<PageTransition><Service /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <ScrollProgress />
      <BackgroundAnimation />
      <div className="flex flex-col min-h-screen bg-transparent font-sans text-zinc-900 dark:text-white transition-colors duration-300 relative z-10">
        <Navbar />
        <main className="flex-grow pt-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
