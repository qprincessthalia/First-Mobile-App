import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function EnterTask({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.taskBox}>

        <Text style={styles.title}>NEW TASK</Text>

        <View style={styles.line} />

        <Text style={styles.text}>Title</Text>
        <TextInput style={styles.input} placeholder="Title of your Activity:" />

        <Text style={styles.text}>Subject</Text>
        <TextInput style={styles.input} placeholder="Select Subject:"/>

        <Text style={styles.text}>Task Type</Text>
        <TextInput style={styles.input} placeholder="Select Task Type:" />

        <Text style={styles.text}>Description</Text>
        <TextInput style={styles.input} placeholder="Type Description:" />

        <Text style={styles.text}>Deadline</Text>
        <TextInput style={styles.input} placeholder="Enter Deadline:"/>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Confirm Task')}>
          <Text style={styles.buttonText}>DONE</Text>
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

  text: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#527589',
    marginBottom: 7,
  },

  input: {
    width: '100%',
    height: 42,
    borderWidth: 1,
    borderColor: '#B8D5E1',
    backgroundColor: '#F8FCFE',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#8ABDD3',
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    marginTop: 5,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

});