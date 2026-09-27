import React, { useState } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export default function SortedActivity() {

  const [sortBy, setSortBy] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sorted Activities</Text>
      <Text style={styles.line}>___________________________________________________________</Text>
      <View style={styles.buttonRow}>

        <TouchableOpacity
          style={[styles.button,sortBy === 'subject' && styles.activeButton]} onPress={() => setSortBy('subject')}>
        
          <Text style={styles.buttonText}>Sort by Subject</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button,sortBy === 'deadline' && styles.activeButton ]}onPress={() => setSortBy('deadline')}>
          <Text style={styles.buttonText}>Sort by Deadline</Text>
        </TouchableOpacity>

      </View>

    {sortBy === 'subject' && (

  <View>

    <View style={styles.taskBox}>
      <Text style={styles.subjectTitle}>Subject: Mobile Programming</Text>

      <View style={styles.activityBox}>
        <Text style={styles.taskTitle}>Title: First Mobile App</Text>
        <Text style={styles.activityType}>Activity Type: MCO1</Text>
        <Text style={styles.description}>Description: Create a Static Mobile App</Text>
        <Text style={styles.deadline}>Deadline: September 30, 2026</Text>
      </View>

      <View style={styles.activityBox}>
        <Text style={styles.taskTitle}>Title: Second Mobile App</Text>
        <Text style={styles.activityType}>Activity Type: MCO2</Text>
        <Text style={styles.description}>Description: Create a Dynamic Mobile App</Text>
        <Text style={styles.deadline}>Deadline: December 5, 2026</Text>
      </View>

    </View>

    <View style={styles.taskBox}>
      <Text style={styles.subjectTitle}>Subject: Reading Visual Art</Text>

      <View style={styles.activityBox}>
        <Text style={styles.taskTitle}>Title: Learning Application</Text>
        <Text style={styles.activityType}>Activity Type: MCO1</Text>
        <Text style={styles.description}>Description: Analyze 5 Filipino artwork</Text>
        <Text style={styles.deadline}>Deadline: September 30, 2026</Text>
      </View>

    </View>

  </View>
)}


      {sortBy === 'deadline' && (
        <View>

          <View style={styles.taskBox}>
            <Text style={styles.taskTitle}>Title: First Mobile App</Text>
            <Text style={styles.deadline}>Deadline: September 30, 2026</Text>
            <Text style={styles.subject}>Subject: Mobile Programming</Text>
          </View>

          <View style={styles.taskBox}>
            <Text style={styles.taskTitle}>Title: Learning Application</Text>
            <Text style={styles.deadline}>Deadline: September 30, 2026</Text>
            <Text style={styles.subject}>Subject: Reading Visual Art</Text>
        </View>

          <View style={styles.taskBox}>
            <Text style={styles.taskTitle}>Title: Second Mobile App</Text>
            <Text style={styles.deadline}>Deadline: December 5, 2026</Text>
            <Text style={styles.subject}>Subject: Mobile Programming</Text>
            
          </View>

        
        
 
      </View>

      )}

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#008080',
    marginBottom: 5,
  },

  line: {
    color: '#008080',
    marginBottom: 15,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#377979',
    paddingVertical: 12,
    width: '48%',
    borderRadius: 10,
    alignItems: 'center',
  },

  activeButton: {
    backgroundColor: '#2a5050',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  taskBox: {
    width: '95%',
    padding: 15,
    borderWidth: 2,
    borderColor: '#377979',
    borderRadius: 15,
    backgroundColor: '#F5F7FA',
    marginBottom: 15,
  },

  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  subject: {
    fontSize: 16,
    marginBottom: 5,
  },

  subjectTitle: { fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 10, }, 
  
  activityBox: { 
      borderTopWidth: 1, 
      borderTopColor: '#377979', 
      paddingTop: 12, 
      marginTop: 5, 
      marginBottom: 10, 
  },

  activityType: {
    fontSize: 16,
    marginBottom: 5,
  },

  description: {
    fontSize: 16,
    marginBottom: 5,
  },

  deadline: {
    fontSize: 16,
  },

});
