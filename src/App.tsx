import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { Suspense, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollProgress from './components/common/ScrollProgress';
import { GlobalChatbot } from './components/GlobalChatbot';
import { PageSplash } from './components/ui/Skeleton';
import { useNavigationStore } from './store/navigationStore';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
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
  const [currentType, setCurrentType] = useState<'tech' | 'labtools'>('tech');

  const getPathType = (path: string): 'tech' | 'labtools' => {
    if (path === '/labtools') return 'labtools';
    return 'tech';
  };

  useEffect(() => {
    const type = getPathType(location.pathname);
    setCurrentType(type);
    
    // Trigger splash
    setNavigating(true);

    // Update Logo label and tab title mid-splash (500ms in)
    const labelTimer = setTimeout(() => {
      const titles: Record<string, string> = {
        '/': 'Caleb Labs | Tech Nexus',
        '/labtools': 'Caleb Labs | LabTools',
      };
      document.title = titles[location.pathname] || 'Caleb Labs';
      // Update shared navigation store so Logo picks it up during splash
      const { setSection } = useNavigationStore.getState();
      setSection(location.pathname);
    }, 500);
    
    // End splash after 1500ms
    const timer = setTimeout(() => {
      setNavigating(false);
    }, 1500);

    return () => {
      clearTimeout(labelTimer);
      clearTimeout(timer);
    };
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
      <div className="flex flex-col min-h-screen bg-transparent font-sans text-zinc-900 dark:text-white relative z-10">
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
