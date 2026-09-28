import React, { useState } from 'react';

import {
  View, // hold entire page
  Text, // display text
  TouchableOpacity, // makes buttons clickable
  StyleSheet, // allows to customize design
  Modal, // allow a screen to appear to another screen
} from 'react-native';

export default function MenuBar({ navigation }) { // create the menu bar

  const [menuOpen, setMenuOpen] = useState(false); // check if the menu is open

  const closeMenu = () => {
    setMenuOpen(false); // closes the menu
  };

  return (

    <View> {/* holds the menu button and modal */}

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setMenuOpen(true)}
      >

        {/* opens the menu when user clicked */}

        <Text style={styles.menuText}>☰</Text> {/* shows menu icon */}

      </TouchableOpacity>

      <Modal
        visible={menuOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={closeMenu}
      >

        {/* creates the menu popup */}

        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeMenu}
        >

          {/* closes the menu when the outside area is pressed */}

          <View style={styles.menuBox}>

            {/* holds the menu options */}

            <Text style={styles.menuTitle}>MENU</Text>

            {/* Menu Title */}

            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                closeMenu();
                navigation.navigate('My Tasks');
              }}
            >

              {/* go to my task screen */}

              <Text style={styles.menuOptionText}>My Tasks</Text>

              {/* display my task */}

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                closeMenu();
                navigation.navigate('Sorted Activity');
              }}
            >

              {/* go to Sorted Activity */}

              <Text style={styles.menuOptionText}>Sorted Activity</Text>

              {/* display my Sorted Activity */}

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuOption}
              onPress={() => {
                closeMenu();
                navigation.navigate('Status');
              }}
            >

              {/* go to status screen */}

              <Text style={styles.menuOptionText}>Status</Text>

              {/* display my status */}

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
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },

  menuText: {
    color: '#527589',
    fontSize: 25,
    fontWeight: 'bold',
  },

  overlay: {
    flex: 1,
    alignItems: 'flex-end',
    paddingTop: 65,
    paddingRight: 15,
  },

  menuBox: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#C7E0EA',
    elevation: 8,
    shadowColor: '#527589',
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },

  menuTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#527589',
    paddingHorizontal: 5,
    paddingVertical: 8,
  },

  menuOption: {
    backgroundColor: '#F8FCFE',
    borderWidth: 1,
    borderColor: '#C7E0EA',
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 15,
    marginBottom: 8,
  },

  menuOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#527589',
    textAlign: 'center',
  },
});