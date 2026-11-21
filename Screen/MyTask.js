import { useMemo } from 'react';
import {
  StyleSheet, // design the app
  View, // hold the entire page
  Text, // display text
  TouchableOpacity, // allows buttons to be clickable
  Alert, // asks "are you sure?" before deleting
} from 'react-native';

import { fonts, useTheme } from '../theme/ThemeContext';
import { useTasks } from '../context/TasksContext';
import { formatDate } from '../utils/dates';
import ScreenContainer from '../components/ScreenContainer';
import ScreenTitle from '../components/ScreenTitle';
import AppButton from '../components/AppButton';
import StatusBadge from '../components/StatusBadge';
import HeartButton from '../components/HeartButton';

// One line inside a task card: muted label + value.
function Info({ label, value }) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

export default function MyTask({ navigation }) { // create the my task screen
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const { tasks, updateTask, deleteTask } = useTasks();

  // Tasks with the nearest deadline first.
  const sortedTasks = useMemo(
    () => [...tasks].sort((a, b) => new Date(a.deadline) - new Date(b.deadline)),
    [tasks]
  );

  // Marks a task as done, or back to pending.
  const toggleDone = (task) => {
    updateTask(task.id, { status: task.status === 'Completed' ? 'Pending' : 'Completed' });
  };

  // Adds a task to favorites, or removes it.
  const toggleFavorite = (task) => {
    updateTask(task.id, { favorite: !task.favorite });
  };

  // Asks before deleting a task.
  const confirmDelete = (task) => {
    Alert.alert('Delete task', `Delete "${task.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteTask(task.id) },
    ]);
  };

  return (
    <ScreenContainer>
      <ScreenTitle title="MY TASKS" />

      {sortedTasks.length === 0 && (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>No tasks yet</Text>
          <Text style={styles.emptyText}>Tap ADD TASK to create your first one.</Text>
        </View>
      )}

      {sortedTasks.map((task) => {
        const done = task.status === 'Completed';

        return (
          <View key={task.id} style={styles.taskBox}>
            <View style={styles.cardHeader}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <HeartButton active={!!task.favorite} onPress={() => toggleFavorite(task)} />
              <StatusBadge task={task} />
            </View>

            <Info label="Subject" value={task.subject} />
            <Info label="Activity Type" value={task.type} />
            {!!task.description && <Info label="Description" value={task.description} />}
            <Info label="Deadline" value={formatDate(task.deadline)} />

            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton} onPress={() => toggleDone(task)}>
                <Text style={[styles.actionText, { color: done ? colors.pending : colors.done }]}>
                  {done ? 'MARK PENDING' : 'MARK DONE'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate('Enter Task', { task })}
              >
                <Text style={styles.actionText}>EDIT</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={() => confirmDelete(task)}>
                <Text style={[styles.actionText, { color: colors.danger }]}>DELETE</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}

      <View style={styles.buttonRow}>
        <AppButton
          title="ADD TASK"
          style={styles.half}
          onPress={() => navigation.navigate('Enter Task')}
        />
        <AppButton
          title="SORT ACTIVITY"
          variant="outline"
          style={styles.half}
          onPress={() => navigation.navigate('Sorted Activity')}
        />
      </View>
    </ScreenContainer>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
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
      borderLeftColor: colors.primary,
      borderRadius: 14,
      marginBottom: 12,
      backgroundColor: colors.surface,
    },

    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },

    taskTitle: {
      flex: 1,
      fontFamily: fonts.semiBold,
      fontSize: 18,
      color: colors.gold,
      marginRight: 10,
    },

    infoRow: {
      marginBottom: 6,
    },

    infoLabel: {
      fontFamily: fonts.medium,
      fontSize: 12,
      color: colors.muted,
    },

    infoValue: {
      fontFamily: fonts.regular,
      fontSize: 15,
      color: colors.text,
    },

    actions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      flexWrap: 'wrap',
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
      color: colors.primary,
    },

    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },

    half: {
      width: '48%',
    },
  });