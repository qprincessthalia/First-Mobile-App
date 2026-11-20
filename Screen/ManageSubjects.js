import { useMemo, useState } from 'react';
import {
  StyleSheet, // design the page
  View, // hold the page elements
  Text, // display text
  TextInput, // where you can type
  TouchableOpacity, // allows buttons to be clickable
  Alert, // asks "are you sure?" before removing
} from 'react-native';

import { fonts, useTheme } from '../theme/ThemeContext';
import { useTasks } from '../context/TasksContext';
import ScreenContainer from '../components/ScreenContainer';
import ScreenTitle from '../components/ScreenTitle';
import AppButton from '../components/AppButton';

export default function ManageSubjects({ navigation }) { // creates the Manage Subjects screen
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const { tasks, subjects, addSubject, renameSubject, removeSubject } = useTasks();

  const [newName, setNewName] = useState(''); // text in the add box
  const [addError, setAddError] = useState('');

  const [editingName, setEditingName] = useState(null); // the subject being renamed
  const [editText, setEditText] = useState('');
  const [editError, setEditError] = useState('');

  // How many tasks use a subject.
  const taskCount = (name) => tasks.filter((task) => task.subject === name).length;

  // Adds a new subject.
  const handleAdd = () => {
    const clean = newName.trim();

    if (!clean) {
      setAddError('Please type a subject name.');
      return;
    }
    if (subjects.some((subject) => subject.toLowerCase() === clean.toLowerCase())) {
      setAddError('You already have this subject.');
      return;
    }

    addSubject(clean);
    setNewName('');
    setAddError('');
  };

  // Starts renaming a subject.
  const startEdit = (name) => {
    setEditingName(name);
    setEditText(name);
    setEditError('');
  };

  // Stops renaming without saving.
  const cancelEdit = () => {
    setEditingName(null);
    setEditText('');
    setEditError('');
  };

  // Saves the new name (it also changes the tasks that use it).
  const saveEdit = () => {
    const result = renameSubject(editingName, editText);

    if (!result.ok) {
      setEditError(result.error);
      return;
    }

    cancelEdit();
  };

  // Asks before removing a subject. The tasks under it stay.
  const confirmRemove = (name) => {
    const count = taskCount(name);
    const message =
      count > 0
        ? `Remove "${name}" from your list? Your ${count} task${count === 1 ? '' : 's'} under it will stay.`
        : `Remove "${name}" from your list?`;

    Alert.alert('Remove subject', message, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          removeSubject(name);
          if (editingName === name) {
            cancelEdit();
          }
        },
      },
    ]);
  };

  return (
    <ScreenContainer>
      <ScreenTitle title="MY SUBJECTS" />

      {/* Add a subject */}
      <View style={styles.card}>
        <Text style={styles.label}>Add a subject</Text>

        <View style={styles.addRow}>
          <TextInput
            style={[styles.input, !!addError && styles.inputError]}
            placeholder="Type a subject name"
            placeholderTextColor={colors.muted}
            value={newName}
            onChangeText={setNewName}
            onSubmitEditing={handleAdd}
          />
          <TouchableOpacity style={styles.addButton} activeOpacity={0.85} onPress={handleAdd}>
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
        </View>

        {!!addError && <Text style={styles.errorText}>{addError}</Text>}
      </View>

      {/* The list */}
      {subjects.length === 0 && (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>No subjects yet</Text>
          <Text style={styles.emptyText}>Add your first subject above.</Text>
        </View>
      )}

      {subjects.map((name) => {
        const count = taskCount(name);
        const editing = editingName === name;

        return (
          <View key={name} style={styles.subjectCard}>
            {editing ? (
              <View>
                <TextInput
                  style={[styles.input, styles.editInput, !!editError && styles.inputError]}
                  value={editText}
                  onChangeText={setEditText}
                  onSubmitEditing={saveEdit}
                  autoFocus
                />
                {!!editError && <Text style={styles.errorText}>{editError}</Text>}

                <View style={styles.actions}>
                  <TouchableOpacity style={styles.actionButton} onPress={saveEdit}>
                    <Text style={[styles.actionText, { color: colors.done }]}>SAVE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton} onPress={cancelEdit}>
                    <Text style={[styles.actionText, { color: colors.muted }]}>CANCEL</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.subjectRow}>
                <View style={styles.subjectInfo}>
                  <Text style={styles.subjectName}>{name}</Text>
                  <Text style={styles.subjectCount}>
                    {count} {count === 1 ? 'task' : 'tasks'}
                  </Text>
                </View>

                <View style={styles.actions}>
                  <TouchableOpacity style={styles.actionButton} onPress={() => startEdit(name)}>
                    <Text style={styles.actionText}>EDIT</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton} onPress={() => confirmRemove(name)}>
                    <Text style={[styles.actionText, { color: colors.danger }]}>REMOVE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        );
      })}

      <View style={styles.doneButton}>
        <AppButton title="DONE" onPress={() => navigation.goBack()} />
      </View>
    </ScreenContainer>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 16,
      padding: 18,
      marginBottom: 14,
    },

    label: {
      fontFamily: fonts.medium,
      fontSize: 14,
      color: colors.muted,
      marginBottom: 8,
    },

    addRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    input: {
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

    editInput: {
      marginRight: 0,
    },

    inputError: {
      borderColor: colors.danger,
    },

    errorText: {
      fontFamily: fonts.regular,
      fontSize: 12,
      color: colors.danger,
      marginTop: 6,
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

    emptyBox: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 14,
      padding: 24,
      alignItems: 'center',
      marginBottom: 14,
    },

    emptyTitle: {
      fontFamily: fonts.semiBold,
      fontSize: 16,
      color: colors.text,
      marginBottom: 4,
    },

    emptyText: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.muted,
      textAlign: 'center',
    },

    subjectCard: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
      borderRadius: 14,
      padding: 14,
      marginBottom: 10,
    },

    subjectRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    subjectInfo: {
      flex: 1,
      marginRight: 8,
    },

    subjectName: {
      fontFamily: fonts.semiBold,
      fontSize: 16,
      color: colors.text,
    },

    subjectCount: {
      fontFamily: fonts.regular,
      fontSize: 13,
      color: colors.muted,
      marginTop: 2,
    },

    actions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },

    actionButton: {
      paddingVertical: 6,
      paddingHorizontal: 10,
    },

    actionText: {
      fontFamily: fonts.semiBold,
      fontSize: 13,
      letterSpacing: 0.5,
      color: colors.primary,
    },

    doneButton: {
      marginTop: 8,
    },
  });