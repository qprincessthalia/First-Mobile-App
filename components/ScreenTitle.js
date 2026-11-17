import { StyleSheet, Text, View } from 'react-native';
import { fonts, useTheme } from '../theme/ThemeContext';

// Page title with the gold line underneath.
export default function ScreenTitle({ title }) {
  const { colors } = useTheme();

  return (
    <View>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <View style={[styles.line, { backgroundColor: colors.gold }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.bold,
    fontSize: 22,
    textAlign: 'center',
    letterSpacing: 1,
  },

  line: {
    width: 48,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
});