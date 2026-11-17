import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

// The button in the header that switches between light and dark mode.
export default function ThemeToggle() {
  const { isDark, colors, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      onPress={toggleTheme}
      accessibilityLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Text style={[styles.icon, { color: colors.gold }]}>{isDark ? '☀' : '☾'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    fontSize: 24,
  },
});