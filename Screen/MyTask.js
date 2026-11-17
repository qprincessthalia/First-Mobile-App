import { useMemo } from 'react';
import {
  StyleSheet, // design the app
  View, // hold the entire page
  Text, // display text
} from 'react-native';

import { fonts, useTheme } from '../theme/ThemeContext';
import ScreenContainer from '../components/ScreenContainer';
import ScreenTitle from '../components/ScreenTitle';
import AppButton from '../components/AppButton';

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

  return (
    <ScreenContainer>
      {/* hold the entire screen */}
      <ScreenTitle title="MY TASKS" />

      {/* hold the first task */}
      <View style={styles.taskBox}>
        <Text style={styles.taskTitle}>First Mobile App</Text>
        <Info label="Subject" value="Mobile Programming" />
        <Info label="Activity Type" value="MCO1" />
        <Info label="Description" value="Create a Static Mobile App" />
        <Info label="Deadline" value="September 30, 2026" />
      </View>

      {/* hold the second task */}
      <View style={styles.taskBox}>
        <Text style={styles.taskTitle}>Second Mobile App</Text>
        <Info label="Subject" value="Mobile Programming" />
        <Info label="Activity Type" value="MCO2" />
        <Info label="Description" value="Create a Dynamic Mobile App" />
        <Info label="Deadline" value="December 5, 2026" />
      </View>

      {/* hold the third task */}
      <View style={styles.taskBox}>
        <Text style={styles.taskTitle}>Learning Application</Text>
        <Info label="Subject" value="Reading Visual Art" />
        <Info label="Activity Type" value="MCO1" />
        <Info label="Description" value="Analyze 5 Filipino Artwork" />
        <Info label="Deadline" value="Sept 30, 2026" />
      </View>

      {/* holds the buttons in one row */}
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

    taskTitle: {
      fontFamily: fonts.semiBold,
      fontSize: 18,
      color: colors.gold,
      marginBottom: 10,
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

    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },

    half: {
      width: '48%',
    },
  });