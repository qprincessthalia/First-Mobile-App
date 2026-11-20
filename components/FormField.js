import { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { fonts, useTheme } from '../theme/ThemeContext';

// Small eye icon drawn with plain shapes. A slash through it means "hidden".
function EyeIcon({ open, color }) {
  return (
    <View style={eyeStyles.box}>
      <View style={[eyeStyles.outline, { borderColor: color }]}>
        <View style={[eyeStyles.pupil, { backgroundColor: color }]} />
      </View>
      {!open && <View style={[eyeStyles.slash, { backgroundColor: color }]} />}
    </View>
  );
}

// Label + text box + error message. Highlights the border while typing.
// Password fields get an eye button inside the box to show or hide the text.
export default function FormField({ label, multiline, error, secureTextEntry, ...inputProps }) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true); // true = password is hidden

  const isPassword = !!secureTextEntry;

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>

      <View
        style={[
          styles.inputWrap,
          multiline && styles.multilineWrap,
          focused && styles.inputFocused,
          !!error && styles.inputError,
        ]}
      >
        <TextInput
          style={[styles.input, multiline && styles.multiline]}
          placeholderTextColor={colors.muted}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          secureTextEntry={isPassword && hidden}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...inputProps}
        />

        {isPassword && (
          <TouchableOpacity
            style={styles.eyeButton}
            activeOpacity={0.7}
            onPress={() => setHidden((previous) => !previous)}
            accessibilityLabel={hidden ? 'Show password' : 'Hide password'}
          >
            <EyeIcon open={!hidden} color={colors.muted} />
          </TouchableOpacity>
        )}
      </View>

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const eyeStyles = StyleSheet.create({
  box: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },

  outline: {
    width: 24,
    height: 14,
    borderWidth: 2,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pupil: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  slash: {
    position: 'absolute',
    width: 28,
    height: 2,
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }],
  },
});

const makeStyles = (colors) =>
  StyleSheet.create({
    field: {
      marginBottom: 20,
    },

    label: {
      fontFamily: fonts.medium,
      fontSize: 14,
      color: colors.muted,
      marginBottom: 8,
    },

    inputWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surfaceAlt,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 16,
    },

    multilineWrap: {
      alignItems: 'flex-start',
    },

    input: {
      flex: 1,
      fontFamily: fonts.regular,
      fontSize: 15,
      color: colors.text,
      paddingVertical: 12,
    },

    multiline: {
      minHeight: 100,
    },

    eyeButton: {
      paddingLeft: 10,
      paddingVertical: 8,
    },

    inputFocused: {
      borderColor: colors.primary,
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
  });