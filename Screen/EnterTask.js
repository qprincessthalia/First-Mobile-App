import { useMemo, useState } from 'react';
import {
  StyleSheet, // allows customized design
  View, // holds the page elements
  Text, // displays text
  TextInput, // where you can type
  TouchableOpacity, // allows buttons to be clickable
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { fonts, useTheme } from '../theme/ThemeContext';
import ScreenTitle from '../components/ScreenTitle';
import AppButton from '../components/AppButton';

const SUBJECTS = ['Mobile Programming', 'Reading Visual Art']; // subject choices
const ACTIVITY_TYPES = ['MCO1', 'MCO2']; // activity type choices

// Label + text box. Highlights the border in blue while the user is typing.
function Field({ label, multiline, ...inputProps }) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.multiline, focused && styles.inputFocused]}
        placeholderTextColor={colors.muted}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...inputProps}
      />
    </View>
  </View>
);
}

// Row of tappable choices. The selected one is filled in blue.
function Choices({ label, options, selected, onSelect }) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.chipRow}>
        {options.map((option) => {
          const active = option === selected;
          return (
            <TouchableOpacity
              key={option}
              style={[styles.chip, active && styles.chipActive]}
              activeOpacity={0.85}
              onPress={() => onSelect(option)}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function EnterTask({ navigation }) { // creates the Enter Task screen
  const { isDark, colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [subject, setSubject] = useState(SUBJECTS[0]); // stores the chosen subject
  const [activityType, setActivityType] = useState(ACTIVITY_TYPES[0]); // stores the chosen type
  const [deadline, setDeadline] = useState(new Date()); // stores the chosen deadline
  const [showPicker, setShowPicker] = useState(false); // shows or hides the date picker

  // Runs when the user picks a date.
  const onChangeDate = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios'); // Android closes after picking, iOS stays open
    if (selectedDate) {
      setDeadline(selectedDate);
    }
  };

  // Shows the date as "September 30, 2026".
  const deadlineText = deadline.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}> {/* holds the form */}

          <ScreenTitle title="ENTER TASK" />

          <Field label="Title" placeholder="Title of your Activity" />

          <Choices
            label="Subject"
            options={SUBJECTS}
            selected={subject}
            onSelect={setSubject}
          />

          <Choices
            label="Activity Type"
            options={ACTIVITY_TYPES}
            selected={activityType}
            onSelect={setActivityType}
          />

          <Field
            label="Description"
            placeholder="Describe your activity"
            multiline
          />

          {/* Deadline */}
          <View style={styles.field}>
            <Text style={styles.label}>Deadline</Text>

            <TouchableOpacity
              style={styles.dateButton}
              activeOpacity={0.85}
              onPress={() => setShowPicker(true)} // opens the date picker
            >
              <Text style={styles.dateText}>{deadlineText}</Text>
              <Text style={styles.dateIcon}>📅</Text>
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={deadline}
                mode="date"
                display="default"
                minimumDate={new Date()}
                themeVariant={isDark ? 'dark' : 'light'}
                onChange={onChangeDate}
              />
            )}
          </View>

          <AppButton title="CONTINUE" onPress={() => navigation.navigate('Confirm Task')} /> {/* goes to the Confirm Task screen */}

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: colors.background,
    },

    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    content: {
      flexGrow: 1,
      padding: 20,
    },

    card: {
      backgroundColor: colors.surface,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 22,
    },

    field: {
      marginBottom: 20,
    },

    label: {
      fontFamily: fonts.medium,
      fontSize: 14,
      color: colors.muted,
      marginBottom: 8,
    },

    input: {
      fontFamily: fonts.regular,
      backgroundColor: colors.surfaceAlt,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 16,
      fontSize: 15,
      color: colors.text,
    },

    multiline: {
      minHeight: 100,
    },

    inputFocused: {
      borderColor: colors.primary,
    },

    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },

    chip: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: colors.border,
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginRight: 8,
      marginBottom: 8,
    },

    chipActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },

    chipText: {
      fontFamily: fonts.medium,
      fontSize: 14,
      color: colors.muted,
    },

    chipTextActive: {
      color: colors.onPrimary,
    },

    dateButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.surfaceAlt,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 16,
    },

    dateText: {
      fontFamily: fonts.regular,
      fontSize: 15,
      color: colors.text,
    },

    dateIcon: {
      fontSize: 18,
    },
  });