import React, { useMemo, useState } from 'react';

import {
  StyleSheet, // allows customized design
  View, // holds the page elements
  Text, // displays text
  TouchableOpacity, // allows buttons to be clickable
} from 'react-native';

import { fonts, useTheme } from '../theme/ThemeContext';
import { useTasks } from '../context/TasksContext';
import ScreenContainer from '../components/ScreenContainer';
import ScreenTitle from '../components/ScreenTitle';
import AppButton from '../components/AppButton';

export default function StatusUpdate({ navigation }) { // creates the status update screen
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const { tasks, setStatuses } = useTasks();

  const [changes, setChanges] = useState({}); // new statuses picked but not saved yet
  const [openId, setOpenId] = useState(null); // stores which task dropdown is open

  // Tasks with the nearest deadline first.
  const sortedTasks = useMemo(
    () => [...tasks].sort((a, b) => new Date(a.deadline) - new Date(b.deadline)),
    [tasks]
  );

  // The status to show: the new pick if there is one, otherwise the saved one.
  const currentStatus = (task) => changes[task.id] ?? task.status;

  // Returns the color that matches a status.
  const statusColor = (status) => (status === 'Completed' ? colors.done : colors.pending);

  // Remembers the picked status and closes the dropdown.
  const chooseStatus = (id, status) => {
    setChanges((previous) => ({ ...previous, [id]: status }));
    setOpenId(null);
  };

  // Saves all the changes and shows the Status screen.
  const handleSave = () => {
    setStatuses(changes);
    navigation.reset({
      index: 1,
      routes: [{ name: 'Activity' }, { name: 'Status' }],
    });
  };

  return (
    <ScreenContainer>
      <View style={styles.box}>

        <ScreenTitle title="ACTIVITY STATUS" />

        {sortedTasks.length === 0 && (
          <Text style={styles.emptyText}>No tasks to update yet.</Text>
        )}

        {sortedTasks.map((task) => {
          const status = currentStatus(task);

          return (
            <View
              key={task.id}
              style={[styles.card, { borderLeftColor: statusColor(status) }]}
            >
              <Text style={styles.subject}>{task.subject}</Text>

              <Text style={styles.titleText}>{task.title}</Text>

              <TouchableOpacity
                style={styles.statusButton}
                activeOpacity={0.85}
                onPress={() => setOpenId(openId === task.id ? null : task.id)}
              >
                <Text style={[styles.statusText, { color: statusColor(status) }]}>{status}</Text>
                <Text style={styles.arrow}>⌄</Text>
              </TouchableOpacity>

              {openId === task.id && (
                <View style={styles.dropdown}>

                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => chooseStatus(task.id, 'Pending')}
                  >
                    <Text style={[styles.statusText, { color: colors.pending }]}>Pending</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => chooseStatus(task.id, 'Completed')}
                  >
                    <Text style={[styles.statusText, { color: colors.done }]}>Completed</Text>
                  </TouchableOpacity>

                </View>
              )}
            </View>
          );
        })}

        {sortedTasks.length > 0 && <AppButton title="SAVE UPDATE" onPress={handleSave} />}
      </View>
    </ScreenContainer>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    box: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 22,
      borderRadius: 18,
    },

    emptyText: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.muted,
      textAlign: 'center',
      paddingVertical: 12,
    },

    card: {
      backgroundColor: colors.surfaceAlt,
      borderWidth: 1,
      borderColor: colors.border,
      borderLeftWidth: 4,
      padding: 14,
      borderRadius: 12,
      marginBottom: 12,
    },

    subject: {
      fontFamily: fonts.medium,
      fontSize: 13,
      color: colors.muted,
      marginBottom: 4,
    },

    titleText: {
      fontFamily: fonts.semiBold,
      fontSize: 16,
      color: colors.text,
      marginBottom: 12,
    },

    statusButton: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    statusText: {
      fontFamily: fonts.semiBold,
      fontSize: 14,
    },

    arrow: {
      color: colors.muted,
      fontSize: 16,
    },

    dropdown: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      marginTop: 6,
      borderRadius: 8,
    },

    option: {
      padding: 12,
    },
  });