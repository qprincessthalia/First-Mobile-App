import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function SortedActivity() {
  const [sortBy, setSortBy] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.taskBox}>

        <Text style={styles.title}>SORTED ACTIVITIES</Text>
        <View style={styles.line} />

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[ styles.button, sortBy === 'subject' && styles.activeButton ]} onPress={() => setSortBy('subject')}>
            <Text style={styles.buttonText}>Sort by Subject</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, sortBy === 'deadline' && styles.activeButton ]} onPress={() => setSortBy('deadline')}>
            <Text style={styles.buttonText}>Sort by Deadline</Text>
          </TouchableOpacity>
        </View>

        {sortBy === 'subject' && (
          <View>

            <View style={styles.subjectBox}>
              <Text style={styles.subjectTitle}>Subject: Mobile Programming</Text>

              <View style={styles.activityBox}>
                <Text style={styles.taskTitle}>Title: First Mobile App</Text>
                <Text style={styles.text}>Activity Type: MCO1</Text>
                <Text style={styles.text}>Deadline: September 30, 2026</Text>
              </View>

              <View style={styles.activityBox}>
                <Text style={styles.taskTitle}>Title: Second Mobile App</Text>
                <Text style={styles.text}>Activity Type: MCO2</Text>
                <Text style={styles.text}>Deadline: December 5, 2026</Text>
              </View>
            </View>

            <View style={styles.subjectBox}>
              <Text style={styles.subjectTitle}>Subject: Reading Visual Art</Text>

              <View style={styles.activityBox}>
                <Text style={styles.taskTitle}>Title: Learning Application</Text>
                <Text style={styles.text}>Activity Type: MCO1</Text>
                <Text style={styles.text}>Description: Analyze 5 Filipino artwork</Text>
                <Text style={styles.text}>Deadline: September 30, 2026</Text>
              </View>
            </View>

          </View>
        )}

        {sortBy === 'deadline' && (
          <View>

            <View style={styles.deadlineBox}>
              <Text style={styles.taskTitle}>Title: First Mobile App</Text>
              <Text style={styles.deadline}>Deadline: September 30, 2026</Text>
              <Text style={styles.subject}>Subject: Mobile Programming</Text>
            </View>

            <View style={styles.deadlineBox}>
              <Text style={styles.taskTitle}>Title: Learning Application</Text>
              <Text style={styles.deadline}>Deadline: September 30, 2026</Text>
              <Text style={styles.subject}>Subject: Reading Visual Art
              </Text>
            </View>

            <View style={styles.deadlineBox}>
              <Text style={styles.taskTitle}>Title: Second Mobile App</Text>
              <Text style={styles.deadline}>Deadline: December 5, 2026</Text>
              <Text style={styles.subject}>Subject: Mobile Programming</Text>
            </View>

          </View>
        )}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D5E8F0',
  },

  content: {
    padding: 20,
  },

  taskBox: {
    width: '100%',
    padding: 25,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C7E0EA',
    borderRadius: 22,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#527589',
    textAlign: 'center',
  },

  line: {
    height: 1,
    backgroundColor: '#C7E0EA',
    marginTop: 15,
    marginBottom: 20,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  button: {
    width: '48%',
    backgroundColor: '#8ABDD3',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  activeButton: {
    backgroundColor: '#527589',
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },

  subjectBox: {
    width: '100%',
    padding: 15,
    backgroundColor: '#F8FCFE',
    borderWidth: 1,
    borderColor: '#B8D5E1',
    borderRadius: 12,
    marginBottom: 15,
  },

  subjectTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#527589',
    marginBottom: 10,
  },

  activityBox: {
    borderTopWidth: 1,
    borderTopColor: '#C7E0EA',
    paddingTop: 12,
    marginTop: 5,
    marginBottom: 10,
  },

  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#527589',
    marginBottom: 7,
  },

  text: {
    fontSize: 14,
    color: '#527589',
    marginBottom: 5,
  },

  deadlineBox: {
    width: '100%',
    padding: 15,
    backgroundColor: '#F8FCFE',
    borderWidth: 1,
    borderColor: '#B8D5E1',
    borderRadius: 12,
    marginBottom: 15,
  },

  deadline: {
    fontSize: 14,
    fontWeight: '600',
    color: '#527589',
    marginBottom: 5,
  },

  subject: {
    fontSize: 14,
    color: '#527589',
  },
});