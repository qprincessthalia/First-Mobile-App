import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

// Small heart you tap to add or remove a favorite.
// active: true when the task is a favorite, onPress: runs when tapped.
export default function HeartButton({ active, onPress }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      onPress={onPress}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      accessibilityLabel={active ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Text style={[styles.heart, { color: active ? colors.primary : colors.muted }]}>
        {active ? '♥' : '♡'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 6,
    marginRight: 6,
  },

  heart: {
    fontSize: 26,
    lineHeight: 30,
  },
});