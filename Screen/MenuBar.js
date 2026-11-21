import React, { useMemo, useState } from 'react';

import {
  View, // hold entire page
  Text, // display text
  TouchableOpacity, // makes buttons clickable
  ScrollView, // lets the menu scroll on small phones
  StyleSheet, // allows to customize design
  Modal, // allow a screen to appear to another screen
} from 'react-native';

import { fonts, useTheme } from '../theme/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function MenuBar({ navigation }) { // create the menu bar
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const { logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false); // check if the menu is open

  const closeMenu = () => {
    setMenuOpen(false); // closes the menu
  };

  // Opens a screen with Activity as the screen underneath, so the stack stays small.
  const goTo = (screen) => {
    closeMenu();

    if (screen === 'Activity') {
      navigation.reset({ index: 0, routes: [{ name: 'Activity' }] });
    } else {
      navigation.reset({
        index: 1,
        routes: [{ name: 'Activity' }, { name: screen }],
      });
    }
  };

  // Logs out and goes back to the Home screen.
  const handleLogout = async () => {
    closeMenu();
    await logout();
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  };

  // The menu options, in order.
  const options = [
    { label: 'Home', screen: 'Activity' },
    { label: 'Pending', screen: 'Pending Tasks' },
    { label: 'Completed', screen: 'Completed Tasks' },
    { label: 'Favorites', screen: 'Favorites' },
    { label: 'Subjects', screen: 'Manage Subjects' },
  ];

  return (
    <View>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setMenuOpen(true)}
      >
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>

      <Modal
        visible={menuOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={closeMenu}
      >

        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeMenu}
        >

          <View style={styles.menuBox} onStartShouldSetResponder={() => true}>

            <Text style={styles.menuTitle}>MENU</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.label}
                  style={styles.menuOption}
                  onPress={() => goTo(option.screen)}
                >
                  <Text style={styles.menuOptionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={[styles.menuOption, styles.logoutOption]}
                onPress={handleLogout}
              >
                <Text style={[styles.menuOptionText, { color: colors.danger }]}>Log Out</Text>
              </TouchableOpacity>
            </ScrollView>

          </View>

        </TouchableOpacity>

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
      paddingBottom: 20,
    },

    menuBox: {
      width: 220,
      maxHeight: '100%',
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
      paddingVertical: 12,
      paddingHorizontal: 15,
      marginBottom: 8,
    },

    logoutOption: {
      marginBottom: 0,
      marginTop: 4,
    },

    menuOptionText: {
      fontFamily: fonts.medium,
      fontSize: 15,
      color: colors.text,
      textAlign: 'center',
    },
  });