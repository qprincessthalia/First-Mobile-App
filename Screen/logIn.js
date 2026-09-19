import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { useFonts } from 'expo-font';

export default function logInScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>STUDENT LOGIN </Text>

      <Text style={styles.badis}> __________________________________________________________</Text>

      <Text style={styles.text}>Student Number</Text>
      <TextInput style={styles.input} placeholder="Enter Student Number:"/>

      <Text style={styles.text}>Student Password </Text>
      <TextInput style={styles.input} placeholder="Enter Password :"/>

      <Text style={styles.text}>Student Username </Text>
      <TextInput style={styles.input} placeholder="Enter Prefered UserName:"/>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LOG IN')}   >
      <Text style={styles.buttonText}> LOG IN </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    paddingTop: 25,
    paddingLeft: 15,
     justifyContent: 'flex-start',
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    alignItems: 'right',
    color: '#008080',
  },

  badis: {
    marginBottom: 20,
    color:'#2a5050',
    fontWeight: '900',
  },

   text: {
    fontSize: 25,
    fontWeight: 'bold',
    alignItems: 'right',
    color: '#2a5050',
  },

  input: {
  width: 300,
  borderWidth: 1,
  borderColor: '#377979',
  padding: 10,
  borderRadius: 8,
  marginBottom: 30,
},

  button: {
    backgroundColor: '#377979',
    paddingVertical: 12,
    paddingHorizontal: 150,
    borderRadius: 10,
    paddingRight: 140,
},

  buttonText: {
  color: '#f6fafa',
  fontWeight: 'bold',
},
});

