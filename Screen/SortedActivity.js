import React, { useMemo, useState } from 'react';
import {
  StyleSheet, // allow customized design
  View, // hold the entire page
  Text, // display text
  TouchableOpacity, // allow buttons to be clickable
} from 'react-native';

import { fonts, useTheme } from '../theme/ThemeContext';
import { useTasks } from '../context/TasksContext';
import { formatDate } from '../utils/dates';
import ScreenContainer from '../components/ScreenContainer';
import ScreenTitle from '../components/ScreenTitle';
import StatusBadge from '../components/StatusBadge';

// Orders tasks by deadline, nearest first.
const byDeadline = (a, b) => new Date(a.deadline) - new Date(b.deadline);

export default function SortedActivity() { // create sorted activity screen
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const { tasks } = useTasks();

  const [sortBy, setSortBy] = useState('deadline'); // stores the selected sorting option

  // All tasks ordered by deadline.
  const deadlineList = useMemo(() => [...tasks].sort(byDeadline), [tasks]);

  // Tasks grouped by subject (subjects in A-Z order).
  const subjectGroups = useMemo(() => {
    const groups = {};
    tasks.forEach((task) => {
      if (!groups[task.subject]) {
        groups[task.subject] = [];
      }
      groups[task.subject].push(task);
    });

    return Object.keys(groups)
      .sort()
      .map((subject) => ({ subject, items: groups[subject].sort(byDeadline) }));
  }, [tasks]);

  return (
    <ScreenContainer>
      <View style={styles.taskBox}>
        <ScreenTitle title="SORTED ACTIVITIES" />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, sortBy === 'subject' && styles.activeButton]}
            activeOpacity={0.85}
            onPress={() => setSortBy('subject')}
          >
            <Text style={[styles.buttonText, sortBy === 'subject' && styles.activeButtonText]}>
              Sort by Subject
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, sortBy === 'deadline' && styles.activeButton]}
            activeOpacity={0.85}
            onPress={() => setSortBy('deadline')}
          >
            <Text style={[styles.buttonText, sortBy === 'deadline' && styles.activeButtonText]}>
              Sort by Deadline
            </Text>
          </TouchableOpacity>
        </View>

        {tasks.length === 0 && (
          <Text style={styles.emptyText}>No tasks to sort yet. Add a task first.</Text>
        )}

        {sortBy === 'subject' &&
          subjectGroups.map((group) => (
            <View key={group.subject} style={styles.subjectBox}>
              <Text style={styles.subjectTitle}>{group.subject}</Text>

              {group.items.map((task) => (
                <View key={task.id} style={styles.activityBox}>
                  <View style={styles.rowHeader}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                    <StatusBadge task={task} />
                  </View>
                  <Text style={styles.text}>Activity Type: {task.type}</Text>
                  <Text style={styles.text}>Deadline: {formatDate(task.deadline)}</Text>
                </View>
              ))}
            </View>
          ))}

        {sortBy === 'deadline' &&
          deadlineList.map((task) => (
            <View key={task.id} style={styles.deadlineBox}>
              <View style={styles.rowHeader}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <StatusBadge task={task} />
              </View>
              <Text style={styles.deadline}>Deadline: {formatDate(task.deadline)}</Text>
              <Text style={styles.subject}>Subject: {task.subject}</Text>
            </View>
          ))}

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

    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },

    button: {
      width: '48%',
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: colors.border,
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: 'center',
    },

    activeButton: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },

    buttonText: {
      fontFamily: fonts.semiBold,
      color: colors.muted,
      fontSize: 13,
    },

    activeButtonText: {
      color: colors.onPrimary,
    },

    emptyText: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.muted,
      textAlign: 'center',
      paddingVertical: 12,
    },

    subjectBox: {
      width: '100%',
      padding: 15,
      backgroundColor: colors.surfaceAlt,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      marginBottom: 15,
    },

    subjectTitle: {
      fontFamily: fonts.semiBold,
      fontSize: 16,
      color: colors.gold,
      marginBottom: 10,
    },

    activityBox: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 12,
      marginTop: 5,
      marginBottom: 10,
    },

    rowHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6,
    },

    taskTitle: {
      flex: 1,
      fontFamily: fonts.semiBold,
      fontSize: 16,
      color: colors.text,
      marginRight: 10,
    },

    text: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.muted,
      marginBottom: 4,
    },

    deadlineBox: {
      width: '100%',
      padding: 15,
      backgroundColor: colors.surfaceAlt,
      borderWidth: 1,
      borderColor: colors.border,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
      borderRadius: 12,
      marginBottom: 15,
    },

    deadline: {
      fontFamily: fonts.medium,
      fontSize: 14,
      color: colors.gold,
      marginBottom: 4,
    },

    subject: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.muted,
    },
  });