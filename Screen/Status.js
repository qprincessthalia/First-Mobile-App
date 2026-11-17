import { useMemo } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { fonts, useTheme } from '../theme/ThemeContext';
import ScreenContainer from '../components/ScreenContainer';
import ScreenTitle from '../components/ScreenTitle';
import AppButton from '../components/AppButton';

export default function Status({ navigation }) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <ScreenContainer>
      <View style={styles.taskBox}>

        <ScreenTitle title="TASK STATUS" />

        {/* Pending section */}
        <View style={styles.sectionRow}>
          <View style={[styles.dot, { backgroundColor: colors.pending }]} />
          <Text style={styles.sectionHeader}>Pending Activities</Text>
        </View>

        <View style={[styles.activityBox, { borderLeftColor: colors.pending }]}>
          <Text style={styles.subjectLabel}>Subject: Mobile Programming</Text>
          <Text style={styles.taskTitle}>Second Mobile App</Text>
          <Text style={styles.deadline}>Deadline: December 5, 2026</Text>
        </View>

        {/* Completed section */}
        <View style={styles.sectionRow}>
          <View style={[styles.dot, { backgroundColor: colors.done }]} />
          <Text style={styles.sectionHeader}>Completed Activities</Text>
        </View>

        <View style={[styles.activityBox, { borderLeftColor: colors.done }]}>
          <Text style={styles.subjectLabel}>Subject: Mobile Programming</Text>
          <Text style={styles.taskTitle}>First Mobile App</Text>
          <Text style={styles.deadline}>Deadline: September 30, 2026</Text>
        </View>

        <View style={[styles.activityBox, { borderLeftColor: colors.done }]}>
          <Text style={styles.subjectLabel}>Subject: Reading Visual Art</Text>
          <Text style={styles.taskTitle}>Learning Application</Text>
          <Text style={styles.deadline}>Deadline: September 30, 2026</Text>
        </View>

        <AppButton title="EDIT" onPress={() => navigation.navigate('Status Update')} />

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

    subjectLabel: {
      fontFamily: fonts.medium,
      fontSize: 13,
      color: colors.muted,
      marginBottom: 4,
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