import {
  StyleSheet, // for styling
  View, // hold the part of the page
  Text, // display text
  TextInput, //where you can type
  TouchableOpacity, // make the buttons clickable
} from 'react-native';

export default function LogIn({ navigation }) { // makes the login page
  return (
    <View style={styles.container}> {/* Holds the whole page */}

      <Text style={styles.title}>STUDENT LOGIN</Text> 
      <View style={styles.line} />

      <View style={styles.loginBox}>
        <Text style={styles.label}>Student Number</Text>
        <TextInput style={styles.input} placeholder="Enter Student Number" placeholderTextColor="#abbac2" />

        <Text style={styles.label}>Student Password</Text>
        <TextInput style={styles.input} placeholder="Enter Password" placeholderTextColor="#abbac2"  />

        <Text style={styles.label}>Student Username</Text>
        <TextInput style={styles.input} placeholder="Enter Preferred Username" placeholderTextColor="#abbac2"/>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Activity')}> {/* goes to activity page */}
          <Text style={styles.buttonText}>LOG IN</Text> {/* Display Button name*/}
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

  loginBox: {
    width: '100%',
    padding: 20,
    borderWidth: 1,
    borderColor: '#B8D5E1',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },

  label: {
    fontSize: 16,
    color: '#527589',
    marginBottom: 5,
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#B8D5E1',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#F8FBFC',
  },

  button: {
    backgroundColor: '#8ABDD3',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },

  buttonText: {
    color: '#527589',
    fontWeight: 'bold',
    fontSize: 14,
  },
});