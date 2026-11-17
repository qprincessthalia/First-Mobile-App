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
  </View>
);
}

export default function ConfirmTask({ navigation }) { // creates the ConfirmTask screen
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <ScreenContainer> {/* holds the entire page */}
      <View style={styles.taskBox}> {/* holds the task details */}

        <ScreenTitle title="CONFIRM TASK" /> {/* displays the page title */}

        <Text style={styles.taskTitle}>First Mobile App</Text> {/* displays the task title */}

        <Detail label="Subject" value="Mobile Programming" /> {/* displays the subject */}
        <Detail label="Activity Type" value="MCO 1" /> {/* displays the activity type */}
        <Detail label="Description" value="Create a Static Mobile App" /> {/* displays the description */}
        <Detail label="Deadline" value="September 30, 2026" /> {/* displays the deadline */}

        <View style={styles.buttons}>
          <AppButton title="SAVE TASK" onPress={() => navigation.navigate('My Tasks')} /> {/* navigates to the My Tasks screen */}
          <View style={styles.gap} />
          <AppButton title="CANCEL" variant="ghost" onPress={() => navigation.goBack()} /> {/* goes back to the previous screen */}
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