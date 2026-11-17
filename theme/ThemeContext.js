import { createContext, useContext, useMemo, useState } from 'react';

// Light mode colors (default).
export const lightColors = {
  background: '#EEF3FB',
  surface: '#FFFFFF',
  surfaceAlt: '#F4F7FD',
  border: '#D7E0F0',
  primary: '#2F6FEB',
  gold: '#C98A00',
  text: '#12203F',
  muted: '#5F6F8F',
  onPrimary: '#FFFFFF',
  done: '#0E9F6E', // completed
  pending: '#D97706', // pending
  iconBg: '#E4ECFB',
  overlay: 'rgba(18, 32, 63, 0.35)',
  shadow: '#12203F',
};

// Dark mode colors.
export const darkColors = {
  background: '#0A0F1E',
  surface: '#121A2F',
  surfaceAlt: '#1A2440',
  border: '#24304D',
  primary: '#4C8DFF',
  gold: '#FFC857',
  text: '#EAF0FF',
  muted: '#8C9BBD',
  onPrimary: '#FFFFFF',
  done: '#34D399',
  pending: '#FBBF24',
  iconBg: '#EAF0FF',
  overlay: 'rgba(0, 0, 0, 0.45)',
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

  const value = useMemo(
    () => ({
      isDark,
      colors: isDark ? darkColors : lightColors,
      toggleTheme: () => setIsDark((previous) => !previous),
    }),
    [isDark]
  );

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