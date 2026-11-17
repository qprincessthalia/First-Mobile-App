import { useMemo, useState } from 'react';
import {
  StyleSheet, // for styling
  View, // hold the part of the page
  Text, // display text
  TextInput, // where you can type
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

import { fonts, useTheme } from '../theme/ThemeContext';
import AppButton from '../components/AppButton';

// Label + text box. Highlights the border in blue while the user is typing.
function Field({ label, ...inputProps }) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, focused && styles.inputFocused]}
        placeholderTextColor={colors.muted}
        autoCapitalize="none"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...inputProps}
      />
    </View>
  );
}

export default function LogIn({ navigation }) { // makes the login page
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.eyebrow}>STUDENT PORTAL</Text>
          <Text style={styles.title}>Student Login</Text>
          <View style={styles.goldLine} />
          <Text style={styles.subtitle}>Sign in to manage your tasks</Text>
        </View>

        {/* Form card */}
        <View style={styles.card}>
          <Field
            label="Student Number"
            placeholder="Enter student number"
            keyboardType="number-pad"
          />

          <Field
            label="Student Password"
            placeholder="Enter password"
            secureTextEntry
          />

          <Field
            label="Student Username"
            placeholder="Enter preferred username"
          />

          {/* goes to activity page */}
          <AppButton title="LOG IN" onPress={() => navigation.navigate('Activity')} />
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
      padding: 24,
    },

    header: {
      marginTop: 12,
      marginBottom: 28,
    },

    eyebrow: {
      fontFamily: fonts.semiBold,
      fontSize: 12,
      letterSpacing: 2,
      color: colors.gold,
      marginBottom: 6,
    },

    title: {
      fontFamily: fonts.bold,
      fontSize: 30,
      color: colors.text,
    },

    goldLine: {
      width: 48,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.gold,
      marginTop: 10,
      marginBottom: 12,
    },

    subtitle: {
      fontFamily: fonts.regular,
      fontSize: 15,
      color: colors.muted,
    },

    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 24,
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

    inputFocused: {
      borderColor: colors.primary,
    },
  });