import React, { useMemo, useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';

import { fonts, useTheme } from '../theme/ThemeContext';

export default function MenuBar({ navigation }) { // create the menu bar
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setMenuOpen(true)} // opens the menu when user clicked
      >
        <Text style={styles.menuText}>☰</Text> {/* shows menu icon */}
      </TouchableOpacity>

      <Modal
        visible={menuOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
      >

        {/* creates the menu popup */}

        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeMenu} // closes the menu when the outside area is pressed
        >

          <View style={styles.menuBox}> {/* holds the menu options */}

            <Text style={styles.menuTitle}>MENU</Text> {/* Menu Title */}

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                closeMenu();
                navigation.navigate('My Tasks'); // go to my task screen
              }}
            >
              <Text style={styles.menuOptionText}>My Tasks</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                closeMenu();
                navigation.navigate('Sorted Activity'); // go to Sorted Activity
              }}
            >
              <Text style={styles.menuOptionText}>Sorted Activity</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuOption, styles.lastOption]}
              onPress={() => {
                closeMenu();
                navigation.navigate('Status'); // go to status screen
              }}
            >
              <Text style={styles.menuOptionText}>Status</Text>
            </TouchableOpacity>

          </View>

        </View>
      </Modal>
    </View>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    menuButton: {
      width: 42,
      height: 42,
      justifyContent: 'center',
      alignItems: 'center',
    },

    menuText: {
      color: colors.text,
      fontSize: 25,
    },

    overlay: {
      flex: 1,
      backgroundColor: colors.overlay,
      alignItems: 'flex-end',
      paddingTop: 65,
      paddingRight: 15,
    },

    menuBox: {
      width: 210,
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 12,
      borderWidth: 1,
      borderColor: colors.border,
      elevation: 8,
      shadowColor: colors.shadow,
      shadowOpacity: 0.25,
      shadowRadius: 8,
    },

    menuTitle: {
      fontFamily: fonts.semiBold,
      fontSize: 12,
      letterSpacing: 2,
      color: colors.gold,
      paddingHorizontal: 5,
      paddingVertical: 8,
    },

    menuOption: {
      backgroundColor: colors.surfaceAlt,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingVertical: 13,
      paddingHorizontal: 15,
      marginBottom: 8,
    },

    lastOption: {
      marginBottom: 0,
    },

    menuOptionText: {
      fontFamily: fonts.medium,
      fontSize: 15,
      color: colors.text,
      textAlign: 'center',
    },
  });