import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../hooks/useDarkMode';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
    const { isDark, toggleTheme } = useThemeStore();

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`relative p-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
                isDark
                    ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700 shadow-[0_0_10px_rgba(250,204,21,0.15)]'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 shadow-sm'
            }`}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
            <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                    <motion.div
                        key="sun"
                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.15 }}
                    >
                        <Sun size={18} strokeWidth={2.5} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="moon"
                        initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.15 }}
                    >
                        <Moon size={18} strokeWidth={2.5} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};

export default ThemeToggle;
