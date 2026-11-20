import { useMemo, useState } from 'react';
import {
  StyleSheet, // for styling
  View, // hold the part of the page
  Text, // display text
  TouchableOpacity, // makes the link clickable
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

import { fonts, useTheme } from '../theme/ThemeContext';
import { useAuth } from '../context/AuthContext';
import FormField from '../components/FormField';
import AppButton from '../components/AppButton';

export default function LogIn({ navigation }) { // makes the login page
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const { login, register } = useAuth();

  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [studentNumber, setStudentNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(''); // message from the login attempt
  const [busy, setBusy] = useState(false); // stops double taps

  const isRegister = mode === 'register';

  // Switches between Log In and Create Account.
  const switchMode = () => {
    setMode(isRegister ? 'login' : 'register');
    setErrors({});
    setFormError('');
  };

  // Checks the fields and returns true when everything is filled in correctly.
  const validate = () => {
    const found = {};

    if (!studentNumber.trim()) {
      found.studentNumber = 'Please enter your student number.';
    }
    if (isRegister && username.trim().length < 2) {
      found.username = 'Please enter your name.';
    }
    if (password.length < 6) {
      found.password = 'Password must be at least 6 characters.';
    }

    setErrors(found);
    return Object.keys(found).length === 0;
  };

  // Logs in (or creates the account), then opens the dashboard.
  const handleSubmit = async () => {
    if (busy || !validate()) {
      return;
    }

    setBusy(true);
    setFormError('');

    const result = isRegister
      ? await register({ studentNumber, username, password })
      : await login({ studentNumber, password });

    if (!result.ok) {
      setFormError(result.error);
      setBusy(false);
      return;
    }

    navigation.reset({ index: 0, routes: [{ name: 'Activity' }] });
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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.eyebrow}>STUDENT PORTAL</Text>
          <Text style={styles.title}>{isRegister ? 'Create Account' : 'Student Login'}</Text>
          <View style={styles.goldLine} />
          <Text style={styles.subtitle}>
            {isRegister ? 'Set up your account once' : 'Sign in to see your tasks'}
          </Text>
        </View>

        {/* Form card */}
        <View style={styles.card}>
          <FormField
            label="Student Number"
            placeholder="Enter student number"
            autoCapitalize="none"
            value={studentNumber}
            onChangeText={setStudentNumber}
            error={errors.studentNumber}
          />

          {isRegister && (
            <FormField
              label="Your Name"
              placeholder="Enter your name"
              value={username}
              onChangeText={setUsername}
              error={errors.username}
            />
          )}

          <FormField
            label="Password"
            placeholder="Enter password"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
            error={errors.password}
          />

          {!!formError && <Text style={styles.formError}>{formError}</Text>}

          <AppButton title={isRegister ? 'CREATE ACCOUNT' : 'LOG IN'} onPress={handleSubmit} />

          <TouchableOpacity style={styles.switchRow} onPress={switchMode}>
            <Text style={styles.switchText}>
              {isRegister ? 'Already have an account? ' : 'New here? '}
              <Text style={styles.switchLink}>
                {isRegister ? 'Log in' : 'Create account'}
              </Text>
            </Text>
          </TouchableOpacity>
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

    formError: {
      fontFamily: fonts.medium,
      fontSize: 13,
      color: colors.danger,
      marginBottom: 14,
    },

    switchRow: {
      alignItems: 'center',
      marginTop: 18,
    },

    switchText: {
      fontFamily: fonts.regular,
      fontSize: 14,
      color: colors.muted,
    },

    switchLink: {
      fontFamily: fonts.semiBold,
      color: colors.primary,
    },
  });