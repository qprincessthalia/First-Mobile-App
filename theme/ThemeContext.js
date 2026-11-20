import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = 'settings:isDark'; // where the light/dark choice is saved

// Light mode colors (default): cream-blue page, pastel blue panels.
export const lightColors = {
  background: '#EEF6FF', // the page
  surface: '#FFFFFF', // cards
  surfaceAlt: '#D6EAFD', // pastel blue panels and input boxes
  border: '#8FBCE6', // outlines
  primary: '#4A9ADF', // buttons and links (sky blue)
  gold: '#2A6FB0', // accent for titles and lines (deeper blue)
  text: '#12304F',
  muted: '#5A7898',
  onPrimary: '#0A2540', // text on top of buttons
  done: '#1E9E6A', // completed
  pending: '#D8861B', // pending
  danger: '#DD4B4B', // overdue and errors
  iconBg: '#CFE5FA',
  overlay: 'rgba(18, 48, 79, 0.35)',
  shadow: '#12304F',
};

// Dark mode colors: deep navy with pastel blue accents.
export const darkColors = {
  background: '#0F1B2D',
  surface: '#162841',
  surfaceAlt: '#1F3858',
  border: '#3A5E8A',
  primary: '#7CC0F5',
  gold: '#A8D8FF',
  text: '#EAF4FF',
  muted: '#93AFCF',
  onPrimary: '#0A2540',
  done: '#4ADE9A',
  pending: '#FBBF4A',
  danger: '#FF7A7A',
  iconBg: '#EAF4FF',
  overlay: 'rgba(0, 0, 0, 0.5)',
  shadow: '#000000',
};

// Poppins weights (loaded in App.js).
export const fonts = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semiBold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
};

const ThemeContext = createContext(null);

// Wrap the whole app with this so every screen can read the current theme.
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false); // app starts in light mode
  const [ready, setReady] = useState(false); // true once the saved choice is loaded

  // Loads the saved light/dark choice when the app opens.
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

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// Use inside any screen: const { colors, isDark, toggleTheme } = useTheme();
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside <ThemeProvider>');
  }
  return context;
}