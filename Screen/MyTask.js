import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'; 

export default function MyTask({ navigation }) {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>MY TASKS</Text>
      <View style={styles.line} />

        <View style={styles.taskBox}>
          <Text style={styles.taskTitle}>Title: First Mobile App</Text>
          <Text style={styles.subject}>Subject: Mobile Programming</Text>
          <Text style={styles.activityType}>Activity Type: MCO1</Text>
          <Text style={styles.description}>Description: Create a Static Mobile App </Text>
          <Text style={styles.deadline}>Deadline: September 30, 2026</Text>
        </View>

        <View style={styles.taskBox}>
          <Text style={styles.taskTitle}>Title: Second Mobile App</Text>
          <Text style={styles.subject}>Subject: Mobile Programming</Text>
          <Text style={styles.activityType}>Activity Type: MCO2</Text>
          <Text style={styles.description}>Description: Create a Dynamic Mobile App </Text>
          <Text style={styles.deadline}>Deadline:   December 5, 2026</Text>
        </View>


      <View style={styles.buttonRow}>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Enter Task')}
        >
          <Text style={styles.buttonText}>ADD TASK</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Sorted Activity')}
        >
          <Text style={styles.buttonText}>SORT ACTIVITY</Text>
        </TouchableOpacity>

      </View>

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
  },

  line: {
    height: 2,
    backgroundColor: '#2a5050',
    marginVertical: 15,
  },

  taskContainer: {
    flex: 1,
  },

  taskBox: {
    width: '95%',
    padding: 15,
    borderWidth: 2,
    borderColor: '#377979',
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: '#F5F7FA',
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

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  button: {
    backgroundColor: '#377979',
    paddingVertical: 12,
    width: '48%',
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

});