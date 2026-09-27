import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';


export default function EnterTask({navigation }) {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>NEW TASK</Text>
      <Text style={styles.badis}>__________________________________________</Text>

      <Text style={styles.text}>Title</Text>
      <TextInput style={styles.input} placeholder="Title of your Activity:"/>
      
      <Text style={styles.text}>Subject</Text>
      <TextInput style={styles.input} placeholder="Select Subject:"/>

      <Text style={styles.text}>Task Type</Text>
      <TextInput style={styles.input} placeholder="Select Task Type:"/>
      

      <Text style={styles.text}>Description</Text>
      <TextInput style={styles.input} placeholder="Type Description:"/>
      
      <Text style={styles.text}>Deadline</Text>
      <TextInput style={styles.input} placeholder=" Enter Deadline:"/>
      
      <TouchableOpacity style={styles.button}onPress={() => navigation.navigate('Confirm Task')}>
      <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingLeft: 15,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#008080',
  },

  badis: {
    marginBottom: 20,
    color: '#2a5050',
    fontWeight: '900',
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2a5050',
    marginBottom: 5,
  },

  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#377979',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#377979',
    paddingVertical: 12,
    alignItems: 'center',
    width: 330,
    borderRadius: 10,
    marginTop: 10,
  },

  buttonText: {
    color: '#f6fafa',
    fontWeight: 'bold',
    fontSize: 16,
  },

});