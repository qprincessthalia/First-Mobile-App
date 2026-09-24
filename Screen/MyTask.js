import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function MyTask({ route, navigation }) {
  const { tasks = [] } = route.params || {};

  return (
    <View style={styles.container}>

      <Text style={styles.title}>MY TASKS</Text>

      <View style={styles.line} />

      {tasks.length > 0 && (
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {tasks.map((item, index) => (
            <View
              key={item.id || index}
              style={styles.taskBox}
            >
              <Text style={styles.taskTitle}>
                Title: {item.title}
              </Text>

              <Text style={styles.subject}>
                Subject: {item.subject}
              </Text>

              <Text style={styles.activityType}>
                Activity Type: {item.activityType}
              </Text>

              <Text style={styles.description}>
                Description: {item.description}
              </Text>

              <Text style={styles.deadline}>
                Deadline: {item.deadline}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}

      <View style={styles.buttonRow}>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('Enter Task', {
              tasks: tasks,
            })
          }
        >
          <Text style={styles.buttonText}>ADD TASK</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('Sorted Activity', {
              tasks: tasks,
            })
          }
        >
          <Text style={styles.buttonText}>SORT ACTIVITY</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B1F3A',
  },

  line: {
    width: '85%',
    height: 1,
    backgroundColor: '#D5DCE5',
    marginTop: 10,
    marginBottom: 10,
  },

  scrollContainer: {
    width: '85%',
    maxHeight: 350,
  },

  taskBox: {
    width: '100%',
    backgroundColor: '#F5F7FA',
    borderWidth: 2,
    borderColor: '#377979',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },

  taskTitle: {
    fontSize: 18,
    color: '#0B1F3A',
    marginBottom: 5,
  },

  subject: {
    fontSize: 18,
    color: '#0B1F3A',
    marginBottom: 5,
  },

  activityType: {
    fontSize: 18,
    color: '#0B1F3A',
    marginBottom: 5,
  },

  description: {
    fontSize: 18,
    color: '#0B1F3A',
    marginBottom: 5,
  },

  deadline: {
    fontSize: 18,
    color: '#0B1F3A',
  },

  buttonRow: {
    flexDirection: 'row',
    width: '85%',
    marginTop: 5,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#377979',
    paddingVertical: 12,
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#f6fafa',
    fontWeight: 'bold',
    fontSize: 12,
  },
});