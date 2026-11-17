import { useMemo } from 'react';
import {
  StyleSheet, // allows customized design
  View, // holds the entire page
  Text, // displays text
} from 'react-native';

import { fonts, useTheme } from '../theme/ThemeContext';
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

export default function ConfirmTask({ navigation }) { // creates the ConfirmTask screen
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <ScreenContainer>
      {/* holds the entire page */}
      <View style={styles.taskBox}>
        {/* holds the task details */}

        {/* displays the page title */}
        <ScreenTitle title="CONFIRM TASK" />

        {/* displays the task title */}
        <Text style={styles.taskTitle}>First Mobile App</Text>

        {/* displays the subject, activity type, description and deadline */}
        <Detail label="Subject" value="Mobile Programming" />
        <Detail label="Activity Type" value="MCO 1" />
        <Detail label="Description" value="Create a Static Mobile App" />
        <Detail label="Deadline" value="September 30, 2026" />

        <View style={styles.buttons}>
          {/* navigates to the My Tasks screen */}
          <AppButton title="SAVE TASK" onPress={() => navigation.navigate('My Tasks')} />

          <View style={styles.gap} />

          {/* goes back to the previous screen */}
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