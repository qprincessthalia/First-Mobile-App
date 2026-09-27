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

        <Text style={styles.title}>Confirm Tasks</Text>

        <View style={styles.line} />

              <Text style={styles.taskTitle}>
                Title: First Mobile App
              </Text>

              <Text style={styles.subject}>
                Subject: Mobile Programming
              </Text>

              <Text style={styles.subject}>
                Activity Type: MCO 1
              </Text>

              <Text style={styles.description}>
                Description: Create a Static Mobile App  
              </Text>

              <Text style={styles.deadline}>
                Deadline: September 30, 2026
              </Text>

        <TouchableOpacity
        style={styles.saveButton}
        onPress={() => navigation.navigate('My Tasks')}
        >

        <Text style={styles.saveButtonText}>
          SAVE TASKS
        </Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
        >

        <Text style={styles.cancelButtonText}>
          CANCEL
        </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30, 
  },
  taskBox: {
    width: '90%',
    maxHeight: '85%',
    backgroundColor: '#eaf5f5',
    borderWidth: 7,
    borderColor: '#377979',
    borderRadius: 35,
    padding: 23,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#20487b',
    marginTop: 20,
    marginBottom: 15,
  },

 
  taskTitle: {
    fontSize: 18,
    color: '#0B1F3A',
    marginBottom: 5,
  },
  subject: {
    fontSize: 16,
    color: '#253142',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#18202c',
    marginBottom: 5,
  },
  deadline: {
    fontSize: 16,
    color: '#253142',
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#377979',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: '10',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D5DCE5',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#253142',
    fontSize: 16,
  },
});