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
      <TouchableOpacity style={styles.menuButton} onPress={() => setMenuOpen(true)}>
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>

      <Modal visible={menuOpen} transparent={true} animationType="fade" onRequestClose={closeMenu} >
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closeMenu}>
          <View style={styles.menuBox}>

            <Text style={styles.menuTitle}>MENU</Text>

            <TouchableOpacity style={styles.menuOption} onPress={() => { closeMenu(); navigation.navigate('My Tasks'); }}>
              <Text style={styles.menuOptionText}>My Tasks</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuOption} onPress={() => { closeMenu(); navigation.navigate('Sorted Activity'); }}>
              <Text style={styles.menuOptionText}> Sorted Activity</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuOption} onPress={() => {closeMenu(); navigation.navigate('Status');}}>
              <Text style={styles.menuOptionText}> Status</Text>
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