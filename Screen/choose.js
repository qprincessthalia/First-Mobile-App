import { useMemo } from 'react';
import {
  StyleSheet, // help style the page
  View, // hold parts of page
  Text, // displays texts
  TouchableOpacity, // makes buttons clickable
  Image, // display images
} from 'react-native';

import { fonts, useTheme } from '../theme/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TasksContext';
import ScreenContainer from '../components/ScreenContainer';
import ScreenTitle from '../components/ScreenTitle';

export default function Choose({ navigation }) { // makes task menu
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const { user } = useAuth();
  const { tasks } = useTasks();

  const completedCount = tasks.filter((task) => task.status === 'Completed').length;
  const pendingCount = tasks.length - completedCount;

  return (
    <ScreenContainer>

      <ScreenTitle title="MY TASK" />

      <Text style={styles.greeting}>Hi, {user?.username}!</Text>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: colors.pending }]}>{pendingCount}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: colors.done }]}>{completedCount}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      <View style={styles.taskBox}>

        <TouchableOpacity
          style={styles.option}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Enter Task')}
        >
          <View style={styles.iconWrap}>
            <Image source={require('../assets/add.png')} style={styles.icon} />
          </View>
          <Text style={styles.optionText}>Add New Task</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('My Tasks')}
        >
          <View style={styles.iconWrap}>
            <Image source={require('../assets/view.png')} style={styles.icon} />
          </View>
          <Text style={styles.optionText}>My Tasks</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, styles.lastOption]}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Status')}
        >
          <View style={styles.iconWrap}>
            <Image source={require('../assets/completed.png')} style={styles.icon} />
          </View>
          <Text style={styles.optionText}>Status</Text>
        </TouchableOpacity>

      </View>
    </ScreenContainer>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    greeting: {
      fontFamily: fonts.medium,
      fontSize: 16,
      color: colors.muted,
      textAlign: 'center',
      marginBottom: 16,
    },

    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },

    statBox: {
      width: '48%',
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 14,
      paddingVertical: 14,
      alignItems: 'center',
    },

    statNumber: {
      fontFamily: fonts.bold,
      fontSize: 28,
    },

    statLabel: {
      fontFamily: fonts.medium,
      fontSize: 13,
      color: colors.muted,
    },

    taskBox: {
      width: '100%',
      padding: 20,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 16,
      backgroundColor: colors.surface,
    },

    option: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      marginBottom: 12,
      backgroundColor: colors.surfaceAlt,
    },

    lastOption: {
      marginBottom: 0,
    },

    iconWrap: {
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: colors.iconBg,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 15,
    },

    icon: {
      width: 28,
      height: 28,
    },

    optionText: {
      fontFamily: fonts.semiBold,
      fontSize: 16,
      color: colors.text,
    },
  });