import { Moon, Sun } from 'lucide-react';
import useDarkMode from '../../hooks/useDarkMode';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
    const [theme, toggleTheme] = useDarkMode();

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-yellow-400 transition-colors focus:outline-none"
            aria-label="Toggle Dark Mode"
        >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
    );
};

export default ThemeToggle;
