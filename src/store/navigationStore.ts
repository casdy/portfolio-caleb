import { create } from 'zustand';

interface NavigationState {
  currentSection: string; // pathname like '/', '/culinary', '/labtools'
  isNavigating: boolean;
  setSection: (path: string) => void;
  setNavigating: (navigating: boolean) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentSection: '/',
  isNavigating: false,
  setSection: (path) => set({ currentSection: path }),
  setNavigating: (navigating) => set({ isNavigating: navigating }),
}));
