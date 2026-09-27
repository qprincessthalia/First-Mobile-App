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
        <Text style={styles.description}>Description: Create a Static Mobile App</Text>
        <Text style={styles.deadline}>Deadline: September 30, 2026</Text>
      </View>

      <View style={styles.taskBox}>
        <Text style={styles.taskTitle}>Title: Second Mobile App</Text>
        <Text style={styles.subject}>Subject: Mobile Programming</Text>
        <Text style={styles.activityType}>Activity Type: MCO2</Text>
        <Text style={styles.description}>Description: Create a Dynamic Mobile App</Text>
        <Text style={styles.deadline}>Deadline: December 5, 2026</Text>
      </View>

      <View style={styles.taskBox}>
        <Text style={styles.taskTitle}>Title: Learning Application</Text>
        <Text style={styles.subject}>Subject: Reading Visual Art</Text>
        <Text style={styles.activityType}>Activity Type: MCO1</Text>
        <Text style={styles.description}>Description: Analyze 5 Filipino Artwork</Text>
        <Text style={styles.deadline}>Deadline: Sept 30, 2026</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}onPress={() => navigation.navigate('Enter Task')}>
          <Text style={styles.buttonText}>ADD TASK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}onPress={() => navigation.navigate('Sorted Activity')}>
          <Text style={styles.buttonText}>SORT ACTIVITY</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#D5E8F0',
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#527589',
    textAlign: 'center',
  },

  line: {
    height: 1,
    backgroundColor: '#527589',
    marginVertical: 15,
  },

  taskBox: {
    width: '100%',
    padding: 20,
    borderWidth: 1,
    borderColor: '#B8D5E1',
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },

  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#527589',
    marginBottom: 8,
  },

  subject: {
    fontSize: 16,
    color: '#527589',
    marginBottom: 5,
  },

  activityType: {
    fontSize: 16,
    color: '#527589',
    marginBottom: 5,
  },

  description: {
    fontSize: 16,
    color: '#527589',
    marginBottom: 5,
  },

  deadline: {
    fontSize: 16,
    color: '#527589',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 1,
  },

  button: {
    backgroundColor: '#8ABDD3',
    paddingVertical: 12,
    width: '48%',
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#527589',
    fontWeight: 'bold',
    fontSize: 14,
  },

});