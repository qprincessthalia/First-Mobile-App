import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

// Scrollable page with the themed background and standard padding.
export default function ScreenContainer({ children }) {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 20,
  },
});