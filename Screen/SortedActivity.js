import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

export default function SortedActivity({ route }) {
  
  const { tasks = [] } = route.params || {};
  
  const [sortBy, setSortBy] = useState('subject');
  
  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === 'subject') {
     
      const subjectA = a.subject ? a.subject.toLowerCase() : '';
      const subjectB = b.subject ? b.subject.toLowerCase() : '';
      return subjectA.localeCompare(subjectB);
    } else if (sortBy === 'deadline') {
  
      const dateA = a.deadline ? new Date(a.deadline) : new Date(0);
      const dateB = b.deadline ? new Date(b.deadline) : new Date(0);
      return dateA - dateB;
    }
    return 0;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sorted Activities</Text>

      
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={[styles.button, sortBy === 'subject' && styles.activeButton]} 
          onPress={() => setSortBy('subject')}
        >
          <Text style={styles.buttonText}>Sort by Subject</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, sortBy === 'deadline' && styles.activeButton]} 
          onPress={() => setSortBy('deadline')}
        >
          <Text style={styles.buttonText}>Sort by Deadline</Text>
        </TouchableOpacity>
      </View>

      
      <FlatList
        data={sortedTasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>Title: {item.title}</Text>
            <Text style={styles.text}>Subject: {item.subject}</Text>
            <Text style={styles.text}>Activity Type: {item.activityType}</Text>
            <Text style={styles.text}>Deadline: {item.deadline}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',          
    justifyContent: 'space-between', 
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  button: {
    backgroundColor: '#377979',
    paddingVertical: 12,
    paddingHorizontal: 12,
    flex: 1,                       
    marginHorizontal: 5,          
    borderRadius: 10,
    alignItems: 'center',       
  },
  activeButton: {
    backgroundColor: '#234e4e',    
  },
  buttonText: {
    color: '#f6fafa',
    fontWeight: 'bold',
    fontSize: 12,
  },
  taskCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#377979',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});