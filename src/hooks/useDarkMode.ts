import { create } from 'zustand';

interface ThemeState {
  theme: string;
  isDark: boolean;
  toggleTheme: () => void;
}

// Initialize from localStorage or default to dark
const getInitialTheme = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('theme') || 'dark';
  }
  return 'dark';
};

const applyTheme = (theme: string) => {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  localStorage.setItem('theme', theme);
};

// Apply initial theme immediately
const initialTheme = getInitialTheme();
applyTheme(initialTheme);

export const useThemeStore = create<ThemeState>((set) => ({
  theme: initialTheme,
  isDark: initialTheme === 'dark',
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    return { theme: newTheme, isDark: newTheme === 'dark' };
  }),
}));

// Backward-compatible hook
const useDarkMode = (): [string, () => void] => {
  const { theme, toggleTheme } = useThemeStore();
  return [theme, toggleTheme];
};

export default useDarkMode;
