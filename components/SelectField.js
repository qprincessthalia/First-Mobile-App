import { useMemo, useState } from 'react';
import {
  Modal, // shows the list on top of the screen
  ScrollView, // lets a long list scroll
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { fonts, useTheme } from '../theme/ThemeContext';

// A text field that opens a list of choices when tapped.
// options: array of strings, selected: the chosen string (or null),
// onSelect: runs with the chosen string.
export default function SelectField({ label, placeholder, options, selected, onSelect }) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [open, setOpen] = useState(false); // shows or hides the list

  // Saves the choice and closes the list.
  const choose = (option) => {
    onSelect(option);
    setOpen(false);
  };

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>

      {/* The field the student taps */}
      <TouchableOpacity
        style={[styles.box, open && styles.boxOpen]}
        activeOpacity={0.85}
        onPress={() => setOpen(true)}
      >
        <Text style={selected ? styles.value : styles.placeholder}>
          {selected || placeholder}
        </Text>
        <Text style={styles.arrow}>⌄</Text>
      </TouchableOpacity>

      {/* The list of choices */}
      <Modal
        visible={open}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setOpen(false)} // tapping outside closes the list
        >
          <View style={styles.sheet} onStartShouldSetResponder={() => true}>
            <Text style={styles.sheetTitle}>{label.toUpperCase()}</Text>

            <ScrollView>
              {options.map((option) => {
                const active = option === selected;

                return (
                  <TouchableOpacity
                    key={option}
                    style={[styles.option, active && styles.optionActive]}
                    activeOpacity={0.85}
                    onPress={() => choose(option)}
                  >
                    <Text style={[styles.optionText, active && styles.optionTextActive]}>
                      {option}
                    </Text>
                    {active && <Text style={styles.check}>✓</Text>}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

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

    box: {
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

    boxOpen: {
      borderColor: colors.primary,
    },

    value: {
      fontFamily: fonts.regular,
      fontSize: 15,
      color: colors.text,
    },

    placeholder: {
      fontFamily: fonts.regular,
      fontSize: 15,
      color: colors.muted,
    },

    arrow: {
      color: colors.muted,
      fontSize: 16,
    },

    overlay: {
      flex: 1,
      backgroundColor: colors.overlay,
      justifyContent: 'center',
      padding: 24,
    },

    sheet: {
      maxHeight: '70%',
      backgroundColor: colors.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 14,
    },

    sheetTitle: {
      fontFamily: fonts.semiBold,
      fontSize: 12,
      letterSpacing: 2,
      color: colors.gold,
      paddingHorizontal: 6,
      paddingVertical: 8,
    },

    option: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.surfaceAlt,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingVertical: 14,
      paddingHorizontal: 16,
      marginBottom: 8,
    },

    optionActive: {
      borderColor: colors.primary,
    },

    optionText: {
      fontFamily: fonts.medium,
      fontSize: 15,
      color: colors.text,
    },

    optionTextActive: {
      color: colors.primary,
    },

    check: {
      fontFamily: fonts.bold,
      fontSize: 16,
      color: colors.primary,
    },
  });