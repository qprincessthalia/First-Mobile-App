import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

export default function logInScreen({ navigation }) {

  const [subject, setSubject] = useState('');

  return (
    <View style={styles.container}>

      <Text style={styles.title}>NEW TASK</Text>

      <Text style={styles.badis}>
        ______________________________________________________
      </Text>

      {/* TITLE */}
      <Text style={styles.text}>Title</Text>

      <TextInput
        style={styles.input}
        placeholder="Title of your Activity:"
      />

      {/* SUBJECT */}
      <Text style={styles.text}>Subject</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={subject}
          onValueChange={(itemValue) => setSubject(itemValue)}
        >
          <Picker.Item
            label="Select Subject"
            value=""
          />

          <Picker.Item
            label="JavaScript"
            value="JavaScript"
          />

          <Picker.Item
            label="PHP"
            value="PHP"
          />

          <Picker.Item
            label="Python"
            value="Python"
          />

          <Picker.Item
            label="Java"
            value="Java"
          />

          <Picker.Item
            label="Information Management"
            value="Information Management"
          />
        </Picker>
      </View>

      {/* DESCRIPTION */}
      <Text style={styles.text}>Description</Text>

      <TextInput
        style={styles.input}
        placeholder="Short Description:"
      />

      {/* DEADLINE */}
      <Text style={styles.text}>Deadline</Text>

      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        keyboardType="numeric"
      />

      {/* SAVE BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('LOG IN')}
      >
        <Text style={styles.buttonText}>
          SAVE TASK
        </Text>
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
    paddingTop: 25,
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
    fontSize: 25,
    fontWeight: 'bold',
    color: '#2a5050',
    marginBottom: 10,
  },

  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: '#377979',
    padding: 10,
    borderRadius: 8,
    marginBottom: 30,
  },

  pickerContainer: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: '#377979',
    borderRadius: 8,
    marginBottom: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: '#377979',
    paddingVertical: 12,
    paddingHorizontal: 120,
    borderRadius: 10,
    marginTop: 5,
  },

  buttonText: {
    color: '#f6fafa',
    fontWeight: 'bold',
  },

});