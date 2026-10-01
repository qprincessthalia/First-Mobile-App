import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';

export default function MenuBar({ navigation }) {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setMenuOpen(true)}
      >
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>

      <Modal
        visible={menuOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
      >
        <View style={styles.overlay}>

          <View style={styles.menuBox}>

            <Text style={styles.menuTitle}>MENU</Text>

            <View style={styles.line} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuOpen(false);
                navigation.navigate('Home');
              }}
            >
              <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuOpen(false);
                navigation.navigate('Sorted Activity');
              }}
            >
              <Text style={styles.menuText}>Sorted Activity</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuOpen(false);
                navigation.navigate('Status');
              }}
            >
              <Text style={styles.menuText}>Status</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setMenuOpen(false)}
            >
              <Text style={styles.closeText}>CLOSE</Text>
            </TouchableOpacity>

          </View>

        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({

  menuButton: {
    padding: 8,
    marginRight: 10,
  },

  menuIcon: {
    fontSize: 25,
    color: '#527589',
    fontWeight: 'bold',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'flex-end',
    paddingTop: 55,
    paddingRight: 15,
  },

  menuBox: {
    width: 220,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#C7E0EA',
  },

  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#527589',
    textAlign: 'center',
  },

  line: {
    height: 1,
    backgroundColor: '#C7E0EA',
    marginVertical: 15,
  },

  menuItem: {
    backgroundColor: '#F8FCFE',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },

  menuText: {
    fontSize: 15,
    color: '#527589',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  closeButton: {
    backgroundColor: '#8ABDD3',
    padding: 12,
    borderRadius: 8,
    marginTop: 5,
  },

  closeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },

});