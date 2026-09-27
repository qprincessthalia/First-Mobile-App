import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

export default function ActivityStatus({ navigation }) {
  const [status1, setStatus1] = useState('Completed');
  const [status2, setStatus2] = useState('Pending');
  const [status3, setStatus3] = useState('Pending');

  const [open, setOpen] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.mainBox}>
          <Text style={styles.title}>Activity Status</Text>
          <View style={styles.divider} />

          {/* Subject 1 Card */}
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.subjectText}>
                Subject: <Text style={styles.subjectVal}>Subject 1</Text>
              </Text>
              <TouchableOpacity
                style={styles.statusButton}
                onPress={() => setOpen(open === 'one' ? '' : 'one')}
              >
                <Text
                  style={[
                    styles.statusText,
                    status1 === 'Completed'
                      ? styles.completedColor
                      : styles.pendingColor,
                  ]}
                >
                  {status1 || 'Select'}
                </Text>
                <Text style={styles.arrow}> ⌄</Text>
              </TouchableOpacity>
            </View>

            {open === 'one' && (
              <View style={styles.dropdown}>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setStatus1('Pending');
                    setOpen('');
                  }}
                >
                  <Text style={styles.pendingColor}>Pending</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setStatus1('Completed');
                    setOpen('');
                  }}
                >
                  <Text style={styles.completedColor}>Completed</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Subject 2 Card */}
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.subjectText}>
                Subject: <Text style={styles.subjectVal}>Subject 2</Text>
              </Text>
              <TouchableOpacity
                style={styles.statusButton}
                onPress={() => setOpen(open === 'two' ? '' : 'two')}
              >
                <Text
                  style={[
                    styles.statusText,
                    status2 === 'Completed'
                      ? styles.completedColor
                      : styles.pendingColor,
                  ]}
                >
                  {status2 || 'Select'}
                </Text>
                <Text style={styles.arrow}> ⌄</Text>
              </TouchableOpacity>
            </View>

            {open === 'two' && (
              <View style={styles.dropdown}>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setStatus2('Pending');
                    setOpen('');
                  }}
                >
                  <Text style={styles.pendingColor}>Pending</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setStatus2('Completed');
                    setOpen('');
                  }}
                >
                  <Text style={styles.completedColor}>Completed</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Subject 3 Card */}
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.subjectText}>
                Subject: <Text style={styles.subjectVal}>Subject 3</Text>
              </Text>
              <TouchableOpacity
                style={styles.statusButton}
                onPress={() => setOpen(open === 'three' ? '' : 'three')}
              >
                <Text
                  style={[
                    styles.statusText,
                    status3 === 'Completed'
                      ? styles.completedColor
                      : styles.pendingColor,
                  ]}
                >
                  {status3 || 'Select'}
                </Text>
                <Text style={styles.arrow}> ⌄</Text>
              </TouchableOpacity>
            </View>

            {open === 'three' && (
              <View style={styles.dropdown}>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setStatus3('Pending');
                    setOpen('');
                  }}
                >
                  <Text style={styles.pendingColor}>Pending</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setStatus3('Completed');
                    setOpen('');
                  }}
                >
                  <Text style={styles.completedColor}>Completed</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => navigation?.navigate('My Tasks')}
          >
            <Text style={styles.saveButtonText}>SAVE TASKS</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  mainBox: {
    width: '100%',
    maxWidth: 400,
    borderWidth: 3,
    borderColor: '#307172',
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#F3F9F8',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#000000',
    marginBottom: 16,
  },
  divider: {
    height: 1.5,
    backgroundColor: '#A2C2C1',
    marginBottom: 20,
  },
  card: {
    borderWidth: 1.5,
    borderColor: '#416368',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectText: {
    fontSize: 15,
    color: '#4A5568',
    fontWeight: '400',
  },
  subjectVal: {
    fontSize: 15,
    color: '#1A202C',
    fontWeight: '500',
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F9F8',
    borderWidth: 1,
    borderColor: '#416368',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  arrow: {
    fontSize: 14,
    marginLeft: 4,
    color: '#416368',
  },
  dropdown: {
    marginTop: 10,
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: '#416368',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    minWidth: 120,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  completedColor: {
    color: '#2D8A60',
    fontSize: 14,
    fontWeight: '600',
  },
  pendingColor: {
    color: '#D92846',
    fontSize: 14,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#307172',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

