import { useMemo } from 'react';
import {
  StyleSheet, // allows customized design
  View, // holds the entire page
  Text, // displays text
} from 'react-native';

import { fonts, useTheme } from '../theme/ThemeContext';
import { useTasks } from '../context/TasksContext';
import { formatDate } from '../utils/dates';
import ScreenContainer from '../components/ScreenContainer';
import ScreenTitle from '../components/ScreenTitle';
import AppButton from '../components/AppButton';

// One detail row: small muted label on top, value below.
function Detail({ label, value }) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.detail}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

export default function ConfirmTask({ navigation, route }) { // creates the ConfirmTask screen
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const { addTask, updateTask } = useTasks();

  // The task that was filled in on the Enter Task screen.
  const task = route.params?.task;

  if (!task) {
    return (
      <ScreenContainer>
        <Text style={styles.detailValue}>Nothing to confirm yet.</Text>
      </ScreenContainer>
    );
  }

  // Saves the task, then shows My Tasks.
  const handleSave = () => {
    if (task.id) {
      updateTask(task.id, task);
    } else {
      addTask(task);
    }

    navigation.reset({
      index: 1,
      routes: [{ name: 'Activity' }, { name: 'My Tasks' }],
    });
  };

  return (
    <ScreenContainer>
      <View style={styles.taskBox}>

        <ScreenTitle title="CONFIRM TASK" />

        <Text style={styles.taskTitle}>{task.title}</Text>

        <Detail label="Subject" value={task.subject} />
        <Detail label="Activity Type" value={task.type} />
        {!!task.description && <Detail label="Description" value={task.description} />}
        <Detail label="Deadline" value={formatDate(task.deadline)} />

        <View style={styles.buttons}>
          <AppButton title="SAVE TASK" onPress={handleSave} />

          <View style={styles.gap} />

          <AppButton title="CANCEL" variant="ghost" onPress={() => navigation.goBack()} />
        </View>

      </View>
    </ScreenContainer>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    taskBox: {
      width: '100%',
      padding: 24,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 18,
    },

    taskTitle: {
      fontFamily: fonts.semiBold,
      fontSize: 20,
      color: colors.gold,
      marginBottom: 14,
    },

    detail: {
      backgroundColor: colors.surfaceAlt,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 14,
      marginBottom: 10,
    },

    detailLabel: {
      fontFamily: fonts.medium,
      fontSize: 12,
      color: colors.muted,
      marginBottom: 2,
    },

    detailValue: {
      fontFamily: fonts.regular,
      fontSize: 15,
      color: colors.text,
    },

    buttons: {
      marginTop: 10,
    },

    gap: {
      height: 10,
    },
  });