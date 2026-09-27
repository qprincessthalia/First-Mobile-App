import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function LogIn({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <Text style={styles.title}>STUDENT LOGIN</Text>

        <View style={styles.line} />

        <Text style={styles.text}>Student Number</Text>
        <TextInput style={styles.input} placeholder="Enter Student Number:" />

        <Text style={styles.text}>Student Password</Text>
        <TextInput style={styles.input} placeholder="Enter Password:" />

        <Text style={styles.text}>Student Username</Text>
        <TextInput style={styles.input} placeholder="Enter Preferred Username:" />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Activity')} >
          <Text style={styles.buttonText}>LOG IN</Text>
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

card: {
  width: '100%',
  backgroundColor: '#FFFFFF',
  borderRadius: 22,
  padding: 25,
  borderWidth: 1,
  borderColor: '#D5E8F0',
},

  title: {
    fontSize: 27,
    fontWeight: '800',
    color: '#527589',
    marginBottom: 12,
  },

  line: {
    height: 2,
    backgroundColor: '#C7E0EA',
    marginBottom: 25,
  },

  text: {
    fontSize: 18,
    fontWeight: '700',
    color: '#527589',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1.5,
    borderColor: '#B8D5E1',
    backgroundColor: '#F8FCFE',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#8ABDD3',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});