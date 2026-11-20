import { useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { fonts, useTheme } from '../theme/ThemeContext';
import { useTasks } from '../context/TasksContext';
import { formatDate } from '../utils/dates';
import ScreenContainer from '../components/ScreenContainer';
import ScreenTitle from '../components/ScreenTitle';
import AppButton from '../components/AppButton';
import StatusBadge from '../components/StatusBadge';

export default function Status({ navigation }) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const { tasks } = useTasks();

  // Splits the tasks into two lists, nearest deadline first.
  const { pending, completed } = useMemo(() => {
    const sorted = [...tasks].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    return {
      pending: sorted.filter((task) => task.status !== 'Completed'),
      completed: sorted.filter((task) => task.status === 'Completed'),
    };
  }, [tasks]);

  // One task card inside a section.
  const renderTask = (task, edgeColor) => (
    <View key={task.id} style={[styles.activityBox, { borderLeftColor: edgeColor }]}>
      <View style={styles.rowHeader}>
        <Text style={styles.subjectLabel}>Subject: {task.subject}</Text>
        <StatusBadge task={task} />
      </View>
      <Text style={styles.taskTitle}>{task.title}</Text>
      <Text style={styles.deadline}>Deadline: {formatDate(task.deadline)}</Text>
    </View>
  );

  return (
    <ScreenContainer>
      <View style={styles.taskBox}>

        <ScreenTitle title="TASK STATUS" />

        {/* Pending section */}
        <View style={styles.sectionRow}>
          <View style={[styles.dot, { backgroundColor: colors.pending }]} />
          <Text style={styles.sectionHeader}>Pending Activities ({pending.length})</Text>
        </View>

        {pending.length === 0 && <Text style={styles.emptyText}>Nothing pending. Nice work!</Text>}
        {pending.map((task) => renderTask(task, colors.pending))}

        {/* Completed section */}
        <View style={styles.sectionRow}>
          <View style={[styles.dot, { backgroundColor: colors.done }]} />
          <Text style={styles.sectionHeader}>Completed Activities ({completed.length})</Text>
        </View>

        {completed.length === 0 && <Text style={styles.emptyText}>No completed activities yet.</Text>}
        {completed.map((task) => renderTask(task, colors.done))}

        {tasks.length > 0 && (
          <AppButton title="EDIT" onPress={() => navigation.navigate('Status Update')} />
        )}

      </View>
    </ScreenContainer>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    taskBox: {
      width: '100%',
      padding: 22,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 18,
    },

    sectionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      marginTop: 5,
    },

    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: 8,
    },

    sectionHeader: {
      fontFamily: fonts.semiBold,
      fontSize: 16,
      color: colors.text,
    },

    emptyText: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.muted,
      marginBottom: 16,
    },

    activityBox: {
      width: '100%',
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border,
      borderLeftWidth: 4,
      borderRadius: 12,
      backgroundColor: colors.surfaceAlt,
      marginBottom: 14,
    },

    rowHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },

    subjectLabel: {
      flex: 1,
      fontFamily: fonts.medium,
      fontSize: 13,
      color: colors.muted,
      marginRight: 10,
    },

    taskTitle: {
      fontFamily: fonts.semiBold,
      fontSize: 16,
      color: colors.text,
      marginBottom: 4,
    },

    deadline: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.gold,
    },
  });