import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { fonts, useTheme } from '../theme/ThemeContext';

// One button for the whole app.
// variant: 'solid' (blue), 'outline' (blue border), 'ghost' (quiet border).
// style: optional, for sizing, for example { width: '48%' }.
export default function AppButton({ title, onPress, variant = 'solid', style }) {
  const { colors } = useTheme();

  const variants = {
    solid: {
      button: { backgroundColor: colors.primary, borderColor: colors.primary },
      text: { color: colors.onPrimary },
    },
    outline: {
      button: { backgroundColor: 'transparent', borderColor: colors.primary },
      text: { color: colors.primary },
    },
    ghost: {
      button: { backgroundColor: 'transparent', borderColor: colors.border },
      text: { color: colors.muted },
    },
  };

  const chosen = variants[variant] || variants.solid;

  return (
    <TouchableOpacity
      style={[styles.button, chosen.button, style]}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Text style={[styles.text, chosen.text]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
  },

  text: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
    letterSpacing: 0.8,
  },
});