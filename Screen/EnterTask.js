import { useEffect, useMemo, useState } from 'react';
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
import { useTasks } from '../context/TasksContext';
import { formatDate } from '../utils/dates';
import ScreenTitle from '../components/ScreenTitle';
import AppButton from '../components/AppButton';
import FormField from '../components/FormField';
import SelectField from '../components/SelectField';

const ACTIVITY_TYPES = ['Project', 'Assignment', 'Activity']; // activity type choices

export default function EnterTask({ navigation, route }) { // creates the Enter Task screen
  const { isDark, colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const { subjects, addSubject } = useTasks();

  // When the student taps EDIT on My Tasks, the task comes in here.
  const editing = route.params?.task;

  const [title, setTitle] = useState(editing?.title ?? '');
  const [subject, setSubject] = useState(editing?.subject ?? null);
  const [activityType, setActivityType] = useState(editing?.type ?? null);
  const [description, setDescription] = useState(editing?.description ?? '');
  const [deadline, setDeadline] = useState(editing ? new Date(editing.deadline) : new Date());
  const [showPicker, setShowPicker] = useState(false); // shows or hides the date picker
  const [errors, setErrors] = useState({});

  const [addingSubject, setAddingSubject] = useState(false); // shows the add-subject box
  const [newSubject, setNewSubject] = useState('');

  // The add-subject box is always open while the student has no subjects yet.
  const showAddBox = addingSubject || subjects.length === 0;

  // If the chosen subject was renamed or removed on the Manage Subjects screen,
  // clear it so the student picks again (the task being edited keeps its own subject).
  useEffect(() => {
    if (subject && !subjects.includes(subject) && subject !== editing?.subject) {
      setSubject(null);
    }
  }, [subjects]);

  // Runs when the user picks a date.
  const onChangeDate = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios'); // Android closes after picking, iOS stays open
    if (selectedDate) {
      setDeadline(selectedDate);
    }
  };

  // Adds a new subject to the list and selects it.
  const handleAddSubject = () => {
    const name = addSubject(newSubject);
    if (name) {
      setSubject(name);
      setNewSubject('');
      setAddingSubject(false);
      setErrors((previous) => ({ ...previous, subject: undefined }));
    }
  };

  // Checks the form, then opens the Confirm Task screen.
  const handleContinue = () => {
    const found = {};

    if (!title.trim()) {
      found.title = 'Please enter a title.';
    }
    if (!subject) {
      found.subject =
        subjects.length === 0
          ? 'Add your first subject below, then select it.'
          : 'Please select a subject.';
    }
    if (!activityType) {
      found.activityType = 'Please select an activity type.';
    }

    setErrors(found);
    if (Object.keys(found).length > 0) {
      return;
    }

    // The deadline counts until the end of the chosen day.
    const endOfDay = new Date(deadline);
    endOfDay.setHours(23, 59, 59, 999);

    navigation.navigate('Confirm Task', {
      task: {
        ...editing,
        title: title.trim(),
        subject,
        type: activityType,
        description: description.trim(),
        deadline: endOfDay.toISOString(),
      },
    });
  };

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
        <View style={styles.card}>

          <ScreenTitle title={editing ? 'EDIT TASK' : 'ENTER TASK'} />

          <FormField
            label="Title"
            placeholder="Title of your Activity"
            value={title}
            onChangeText={setTitle}
            error={errors.title}
          />

          <SelectField
            label="Subject"
            placeholder={subjects.length === 0 ? 'No subjects yet' : 'Select subject'}
            options={subjects}
            selected={subject}
            onSelect={setSubject}
            emptyText="You have no subjects yet. Add one using the box below the field."
            error={errors.subject}
          />

          <View style={styles.subjectExtra}>
            {showAddBox && (
              <View style={styles.addRow}>
                <TextInput
                  style={styles.addInput}
                  placeholder="Type a subject name"
                  placeholderTextColor={colors.muted}
                  value={newSubject}
                  onChangeText={setNewSubject}
                  onSubmitEditing={handleAddSubject}
                />
                <TouchableOpacity
                  style={styles.addButton}
                  activeOpacity={0.85}
                  onPress={handleAddSubject}
                >
                  <Text style={styles.addButtonText}>ADD</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={[styles.pillRow, showAddBox && styles.pillRowSpaced]}>
              {!showAddBox && (
                <TouchableOpacity
                  style={styles.pillButton}
                  activeOpacity={0.85}
                  onPress={() => setAddingSubject(true)}
                >
                  <Text style={styles.pillText}>+ Add subject</Text>
                </TouchableOpacity>
              )}

              {subjects.length > 0 && (
                <TouchableOpacity
                  style={styles.pillButton}
                  activeOpacity={0.85}
                  onPress={() => navigation.navigate('Manage Subjects')}
                >
                  <Text style={styles.pillText}>Manage</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <SelectField
            label="Activity Type"
            placeholder="Select activity type"
            options={ACTIVITY_TYPES}
            selected={activityType}
            onSelect={setActivityType}
            error={errors.activityType}
          />

          <FormField
            label="Description"
            placeholder="Describe your activity (optional)"
            multiline
            value={description}
            onChangeText={setDescription}
          />

          {/* Deadline */}
          <View style={styles.field}>
            <Text style={styles.label}>Deadline</Text>

            <TouchableOpacity
              style={styles.dateButton}
              activeOpacity={0.85}
              onPress={() => setShowPicker(true)}
            >
              <Text style={styles.dateText}>{formatDate(deadline.toISOString())}</Text>
              <Text style={styles.dateIcon}>📅</Text>
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={deadline}
                mode="date"
                display="default"
                minimumDate={editing ? undefined : new Date()}
                themeVariant={isDark ? 'dark' : 'light'}
                onChange={onChangeDate}
              />
            )}
          </View>

          <AppButton title="CONTINUE" onPress={handleContinue} />

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

    subjectExtra: {
      marginTop: -8,
      marginBottom: 20,
    },

    pillRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },

    pillRowSpaced: {
      marginTop: 10,
    },

    pillButton: {
      borderWidth: 1.5,
      borderColor: colors.primary,
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 14,
      marginRight: 10,
    },

    pillText: {
      fontFamily: fonts.semiBold,
      fontSize: 13,
      color: colors.primary,
    },

    addRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    addInput: {
      flex: 1,
      fontFamily: fonts.regular,
      backgroundColor: colors.surfaceAlt,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 14,
      fontSize: 15,
      color: colors.text,
      marginRight: 8,
    },

    addButton: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 16,
    },

    addButtonText: {
      fontFamily: fonts.semiBold,
      fontSize: 13,
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