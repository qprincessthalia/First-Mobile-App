import React, { useMemo, useState } from 'react';
import {
  StyleSheet, // allow customized design
  View, // hold the entire page
  Text, // display text
  TouchableOpacity, // allow buttons to be clickable
} from 'react-native';

import { fonts, useTheme } from '../theme/ThemeContext';
import ScreenContainer from '../components/ScreenContainer';
import ScreenTitle from '../components/ScreenTitle';

export default function SortedActivity() { // create sorted activity screen
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [sortBy, setSortBy] = useState(''); // stores the selected sorting option

  return (
    <ScreenContainer> {/* makes the page scrollable */}
      <View style={styles.taskBox}>{/* holds the sorted activities */}
        <ScreenTitle title="SORTED ACTIVITIES" />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, sortBy === 'subject' && styles.activeButton]}
            activeOpacity={0.85}
            onPress={() => setSortBy('subject')} // sets sorting to subject
          >
            <Text style={[styles.buttonText, sortBy === 'subject' && styles.activeButtonText]}>
              Sort by Subject
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, sortBy === 'deadline' && styles.activeButton]}
            activeOpacity={0.85}
            onPress={() => setSortBy('deadline')} // sets sorting to deadline
          >
            <Text style={[styles.buttonText, sortBy === 'deadline' && styles.activeButtonText]}>
              Sort by Deadline
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setSortBy('deadline')}
        >
          <Text style={styles.buttonText}>Sort by Deadline</Text>
        </TouchableOpacity>
      </View>

            <View style={styles.subjectBox}>
              <Text style={styles.subjectTitle}>Mobile Programming</Text>

              {/* first activity */}
              <View style={styles.activityBox}>
                <Text style={styles.taskTitle}>First Mobile App</Text>
                <Text style={styles.text}>Activity Type: MCO1</Text>
                <Text style={styles.text}>Deadline: September 30, 2026</Text>
              </View>

              {/* second activity */}
              <View style={styles.activityBox}>
                <Text style={styles.taskTitle}>Second Mobile App</Text>
                <Text style={styles.text}>Activity Type: MCO2</Text>
                <Text style={styles.text}>Deadline: December 5, 2026</Text>
              </View>
            </View>

            <View style={styles.subjectBox}>
              <Text style={styles.subjectTitle}>Reading Visual Art</Text>

              {/* third activity */}
              <View style={styles.activityBox}>
                <Text style={styles.taskTitle}>Learning Application</Text>
                <Text style={styles.text}>Activity Type: MCO1</Text>
                <Text style={styles.text}>Description: Analyze 5 Filipino artwork</Text>
                <Text style={styles.text}>Deadline: September 30, 2026</Text>
              </View>
            </View>

          </View>
        )}

        {/* displays the activities sorted by deadline */}
        {sortBy === 'deadline' && (
          <View>

            {/* first activity */}
            <View style={styles.deadlineBox}>
              <Text style={styles.taskTitle}>First Mobile App</Text>
              <Text style={styles.deadline}>Deadline: September 30, 2026</Text>
              <Text style={styles.subject}>Subject: Mobile Programming</Text>
            </View>

            {/* second activity */}
            <View style={styles.deadlineBox}>
              <Text style={styles.taskTitle}>Learning Application</Text>
              <Text style={styles.deadline}>Deadline: September 30, 2026</Text>
              <Text style={styles.subject}>Subject: Reading Visual Art</Text>
            </View>

            {/* third activity */}
            <View style={styles.deadlineBox}>
              <Text style={styles.taskTitle}>Second Mobile App</Text>
              <Text style={styles.deadline}>Deadline: December 5, 2026</Text>
              <Text style={styles.subject}>Subject: Mobile Programming</Text>
            </View>
          </View>

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

    taskTitle: {
      fontFamily: fonts.semiBold,
      fontSize: 16,
      color: colors.text,
      marginBottom: 6,
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