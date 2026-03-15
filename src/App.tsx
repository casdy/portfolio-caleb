import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { Suspense, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BackgroundAnimation from './components/common/BackgroundAnimation';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollProgress from './components/common/ScrollProgress';
import { GlobalChatbot } from './components/GlobalChatbot';
import { PageSplash } from './components/ui/Skeleton';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Culinary = React.lazy(() => import('./pages/Culinary'));
const Service = React.lazy(() => import('./pages/Service'));
const LabTools = React.lazy(() => import('./pages/LabTools'));

import type { PageTransitionProps } from './types';

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
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
  const [navigating, setNavigating] = useState(false);
  const [currentType, setCurrentType] = useState<'tech' | 'culinary' | 'service' | 'labtools'>('tech');

  // Map path to splash type
  const getPathType = (path: string): 'tech' | 'culinary' | 'service' | 'labtools' => {
    if (path === '/culinary') return 'culinary';
    if (path === '/service') return 'service';
    if (path === '/labtools') return 'labtools';
    return 'tech';
  };

  useEffect(() => {
    const type = getPathType(location.pathname);
    setCurrentType(type);
    
    // Trigger splash
    setNavigating(true);
    
    // Minimum splash duration for visual impact (1500ms)
    const timer = setTimeout(() => {
      setNavigating(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {navigating && (
          <motion.div
            key="page-splash-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100]"
          >
            <PageSplash type={currentType} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Suspense fallback={null}><Home /></Suspense></PageTransition>} />
          <Route path="/culinary" element={<PageTransition><Suspense fallback={null}><Culinary /></Suspense></PageTransition>} />
          <Route path="/service" element={<PageTransition><Suspense fallback={null}><Service /></Suspense></PageTransition>} />
          <Route path="/labtools" element={<PageTransition><Suspense fallback={null}><LabTools /></Suspense></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollProgress />
      <BackgroundAnimation />
      <div className="flex flex-col min-h-screen bg-transparent font-sans text-white transition-colors duration-300 relative z-10">
        <Navbar />
        <main className="flex-grow pt-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full">
          <AnimatedRoutes />
        </main>
        <Footer />
        <GlobalChatbot />
      </div>
    </Router>
  );
}

export default App;
