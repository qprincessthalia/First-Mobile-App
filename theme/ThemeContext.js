
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = 'settings:isDark';

// LIGHT MODE COLORS
export const lightColors = {
  background: '#FFFDF4',
  surface: '#FFFFFF',
  surfaceAlt: '#FFF4E4',
  border: '#1F1B18',
  primary: '#FFA7A0',
  gold: '#75B5D9',
  text: '#1F1B18',
  muted: '#827A70',
  onPrimary: '#1F1B18',
  done: '#A6D6BE',
  pending: '#FFC67C',
  danger: '#F08078',
  iconBg: '#DCE8C9',
  overlay: 'rgba(31, 27, 24, 0.35)',
  shadow: '#1F1B18',
};

// DARK MODE COLORS
export const darkColors = {
  background: '#211C1A',
  surface: '#302724',
  surfaceAlt: '#463832',
  border: '#8B766B',
  primary: '#FFA7A0',
  gold: '#75B5D9',
  text: '#FFFDF4',
  muted: '#D0BFB2',
  onPrimary: '#211C1A',
  done: '#8FC5A8',
  pending: '#FFC67C',
  danger: '#FF8982',
  iconBg: '#40594E',
  overlay: 'rgba(0, 0, 0, 0.5)',
  shadow: '#000000',
};

// FREDOKA FONT WEIGHTS
export const fonts = {
  regular: 'Fredoka_400Regular',
  medium: 'Fredoka_500Medium',
  semiBold: 'Fredoka_600SemiBold',
  bold: 'Fredoka_700Bold',
};

const ThemeContext = createContext(null);

// THEME PROVIDER
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [ready, setReady] = useState(false);

  // Load saved theme when the app opens.
  useEffect(() => {
    let active = true;

    AsyncStorage.getItem(THEME_KEY)
      .then((saved) => {
        if (active && saved === 'true') {
          setIsDark(true);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) {
          setReady(true);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  // Theme values and toggle function.
  const value = useMemo(() => {
    const toggleTheme = () => {
      const next = !isDark;

      setIsDark(next);
      AsyncStorage.setItem(THEME_KEY, String(next)).catch(() => {});
    };

    return {
      isDark,
      colors: isDark ? darkColors : lightColors,
      toggleTheme,
    };
  }, [isDark]);

  if (!ready) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// CUSTOM THEME HOOK
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside <ThemeProvider>');
  }

  return context;
}
