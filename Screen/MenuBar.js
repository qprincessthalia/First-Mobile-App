import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';

export default function MenuBar({ navigation }) {

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <View>

      {/* TOGGLE BUTTON */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setMenuOpen(true)}
      >
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>

      {/* MENU */}
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

          <View style={styles.menuBox}>

            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                closeMenu();
                navigation.navigate('Home');
              }}
            >
              <Text style={styles.menuOptionText}>
                Home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                closeMenu();
                navigation.navigate('My Tasks');
              }}
            >
              <Text style={styles.menuOptionText}>
                My Tasks
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                closeMenu();
                navigation.navigate('Sorted Activity');
              }}
            >
              <Text style={styles.menuOptionText}>
                Sorted Activity
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                closeMenu();
                navigation.navigate('Status');
              }}
            >
              <Text style={styles.menuOptionText}>
                Status
              </Text>
            </TouchableOpacity>

          </View>

        </TouchableOpacity>

      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({

  menuButton: {

    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  menuText: {
    color: '#000000',
    fontSize: 25,
  },

  overlay: {
    flex: 1,
    alignItems: 'flex-end',
    paddingTop: 80,
    paddingRight: 15,
  },

  menuBox: {
    width: 180,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  menuOption: {
    padding: 15,
  },

  menuOptionText: {
    fontSize: 16,
    color: '#0B1F3A',
  },

});