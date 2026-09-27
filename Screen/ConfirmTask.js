import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export default function ConfirmTask({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.taskBox}>
        <Text style={styles.title}>CONFIRM TASK</Text>
        <View style={styles.line} />

        <Text style={styles.taskTitle}>Title: First Mobile App</Text>
        <Text style={styles.subject}>Subject: Mobile Programming</Text>
        <Text style={styles.subject}>Activity Type: MCO 1</Text>
        <Text style={styles.description}>Description: Create a Static Mobile App</Text>
        <Text style={styles.deadline}>Deadline: September 30, 2026</Text>

        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('My Tasks')}>
          <Text style={styles.saveButtonText}>SAVE TASK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>CANCEL</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#D5E8F0',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },

  taskBox: {
    width: '100%',
    padding: 25,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C7E0EA',
    borderRadius: 22,
    marginTop: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#527589',
    textAlign: 'center',
  },

  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#C7E0EA',
    marginTop: 15,
    marginBottom: 20,
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
    marginBottom: 6,
  },

  description: {
    fontSize: 16,
    color: '#527589',
    marginBottom: 6,
  },

  deadline: {
    fontSize: 16,
    color: '#527589',
    marginBottom: 15,
  },

  saveButton: {
    width: '100%',
    backgroundColor: '#8ABDD3',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  cancelButton: {
    width: '100%',
    backgroundColor: '#F1F8FB',
    borderWidth: 1,
    borderColor: '#B8D5E1',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },

  cancelButtonText: {
    color: '#527589',
    fontSize: 16,
    fontWeight: 'bold',
  },

});