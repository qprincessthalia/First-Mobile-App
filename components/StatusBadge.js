import { StyleSheet, Text, View } from 'react-native';

import { fonts, useTheme } from '../theme/ThemeContext';
import { isOverdue } from '../utils/dates';

// Small tag showing Pending, Completed or Overdue for a task.
export default function StatusBadge({ task }) {
  const { colors } = useTheme();

  let label = 'Pending';
  let color = colors.pending;

  if (task.status === 'Completed') {
    label = 'Completed';
    color = colors.done;
  } else if (isOverdue(task)) {
    label = 'Overdue';
    color = colors.danger;
  }

  return (
    <View style={[styles.badge, { borderColor: color }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },

  text: {
    fontFamily: fonts.semiBold,
    fontSize: 12,
  },
});