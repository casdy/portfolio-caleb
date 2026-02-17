import { motion } from 'framer-motion';

import { useLocation } from 'react-router-dom';

const Logo = ({ className = "" }) => {
    const location = useLocation();
    
    // Determine subtext based on current path
    let subText = "Ojukwu";
    if (location.pathname === '/culinary') subText = ".Culinary";
    else if (location.pathname === '/service') subText = ".Service";

    return (
        <motion.div 
            className={`flex items-center gap-2 font-display font-bold text-2xl ${className}`}
            whileHover="hover"
            initial="initial"
        >
            <div className="relative w-8 h-8 flex items-center justify-center">
                <motion.div
                    className="absolute inset-0 bg-blue-600 dark:bg-blue-500 rounded-lg transform rotate-3"
                    variants={{
                        initial: { rotate: 3, scale: 1 },
                        hover: { rotate: 12, scale: 1.1 }
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                <motion.div
                    className="absolute inset-0 bg-zinc-900 dark:bg-white rounded-lg opacity-10"
                    variants={{
                        initial: { rotate: -3, scale: 1 },
                        hover: { rotate: -6, scale: 1.1 }
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                <motion.span 
                    className="relative text-white dark:text-zinc-900 z-10 text-xl"
                    variants={{
                        initial: { scale: 1 },
                        hover: { scale: 1.2 }
                    }}
                >
                    C
                </motion.span>
            </div>
            <div className="flex flex-col leading-none">
                <span className="text-zinc-900 dark:text-white tracking-tight">Caleb</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium tracking-widest uppercase">
                    {subText}
                </span>
            </div>
        </motion.div>
    );
};

export default Logo;
