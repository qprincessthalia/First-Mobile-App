import { useMemo } from 'react';
import {
  StyleSheet, // design the page
  View, // hold the page elements
  Text, // display text
  TouchableOpacity, // allows buttons to be clickable
} from 'react-native';

import { fonts, useTheme } from '../theme/ThemeContext';
import { useTasks } from '../context/TasksContext';
import { formatDate } from '../utils/dates';
import ScreenContainer from '../components/ScreenContainer';
import ScreenTitle from '../components/ScreenTitle';
import StatusBadge from '../components/StatusBadge';
import HeartButton from '../components/HeartButton';

// Orders tasks by deadline, nearest first.
const byDeadline = (a, b) => new Date(a.deadline) - new Date(b.deadline);

// One screen used for both lists. The menu opens it as "Pending Tasks" or "Completed Tasks".
export default function TaskList({ route }) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const { tasks, updateTask } = useTasks();

  const completedMode = route.name === 'Completed Tasks';

  // The tasks that belong in this list.
  const list = useMemo(
    () =>
      tasks
        .filter((task) => (completedMode ? task.status === 'Completed' : task.status !== 'Completed'))
        .sort(byDeadline),
    [tasks, completedMode]
  );

  // Marks a task as done, or back to pending. It moves to the other list.
  const toggleDone = (task) => {
    updateTask(task.id, { status: task.status === 'Completed' ? 'Pending' : 'Completed' });
  };

  // Adds a task to favorites, or removes it.
  const toggleFavorite = (task) => {
    updateTask(task.id, { favorite: !task.favorite });
  };

  return (
    <ScreenContainer>
      <ScreenTitle title={completedMode ? 'COMPLETED TASKS' : 'PENDING TASKS'} />

      <Text style={styles.count}>
        {list.length} {list.length === 1 ? 'task' : 'tasks'}
      </Text>

      {list.length === 0 && (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>
            {completedMode ? 'No completed tasks yet' : 'Nothing pending'}
          </Text>
          <Text style={styles.emptyText}>
            {completedMode
              ? 'Mark a task as done and it will show up here.'
              : 'Every task is done. Nice work!'}
          </Text>
        </View>
      )}

      {list.map((task) => (
        <View
          key={task.id}
          style={[
            styles.taskBox,
            { borderLeftColor: completedMode ? colors.done : colors.pending },
          ]}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.taskTitle}>{task.title}</Text>
            <HeartButton active={!!task.favorite} onPress={() => toggleFavorite(task)} />
            <StatusBadge task={task} />
          </View>

          <Text style={styles.detail}>Subject: {task.subject}</Text>
          <Text style={styles.detail}>Activity Type: {task.type}</Text>
          <Text style={styles.deadline}>Deadline: {formatDate(task.deadline)}</Text>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={() => toggleDone(task)}>
              <Text
                style={[
                  styles.actionText,
                  { color: completedMode ? colors.pending : colors.done },
                ]}
              >
                {completedMode ? 'MARK PENDING' : 'MARK DONE'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScreenContainer>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    count: {
      fontFamily: fonts.medium,
      fontSize: 14,
      color: colors.muted,
      textAlign: 'center',
      marginTop: -8,
      marginBottom: 16,
    },

    emptyBox: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 14,
      padding: 24,
      alignItems: 'center',
      marginBottom: 12,
    },

    emptyTitle: {
      fontFamily: fonts.semiBold,
      fontSize: 16,
      color: colors.text,
      marginBottom: 4,
    },

    emptyText: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.muted,
      textAlign: 'center',
    },

    taskBox: {
      width: '100%',
      padding: 18,
      borderWidth: 1,
      borderColor: colors.border,
      borderLeftWidth: 4,
      borderRadius: 14,
      marginBottom: 12,
      backgroundColor: colors.surface,
    },

    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },

    taskTitle: {
      flex: 1,
      fontFamily: fonts.semiBold,
      fontSize: 17,
      color: colors.gold,
      marginRight: 6,
    },

    detail: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.muted,
      marginBottom: 3,
    },

    deadline: {
      fontFamily: fonts.medium,
      fontSize: 14,
      color: colors.text,
      marginTop: 2,
    },

    actions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 8,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 8,
    },

    actionButton: {
      paddingVertical: 6,
      paddingHorizontal: 10,
    },

    actionText: {
      fontFamily: fonts.semiBold,
      fontSize: 13,
      letterSpacing: 0.5,
    },
  });