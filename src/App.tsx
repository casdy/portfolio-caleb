import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BackgroundAnimation from './components/common/BackgroundAnimation';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollProgress from './components/common/ScrollProgress';
import { GlobalChatbot } from './components/GlobalChatbot';
import { SkeletonModal } from './components/ui/Skeleton';

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

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Suspense fallback={<SkeletonModal />}><Home /></Suspense></PageTransition>} />
        <Route path="/culinary" element={<PageTransition><Suspense fallback={<SkeletonModal />}><Culinary /></Suspense></PageTransition>} />
        <Route path="/service" element={<PageTransition><Suspense fallback={<SkeletonModal />}><Service /></Suspense></PageTransition>} />
        <Route path="/labtools" element={<PageTransition><Suspense fallback={<SkeletonModal />}><LabTools /></Suspense></PageTransition>} />
      </Routes>
    </AnimatePresence>
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
