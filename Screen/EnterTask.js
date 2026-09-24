import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

export default function EnterTask({ route, navigation }) {

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [activityType, setActivityType] = useState('');
  const [deadline, setDeadline] = useState('');

  // Get previous tasks
  const existingTasks = route.params?.tasks || [];

  const saveTask = () => {

    const newTask = {
      id: Date.now().toString(),
      title,
      subject,
      activityType,
      description,
      deadline,
    };

    // Add new task to previous tasks
    const updatedTasks = [...existingTasks, newTask];

    navigation.navigate('Confirm Task', {
      tasks: updatedTasks,
    });
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>NEW TASK</Text>

      <Text style={styles.badis}>
        __________________________________________
      </Text>

      <Text style={styles.text}>Title</Text>

      <TextInput
        style={styles.input}
        placeholder="Title of your Activity:"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.text}>Subject</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={subject}
          onValueChange={(itemValue) => setSubject(itemValue)}
        >
          <Picker.Item label="Mobile Programming" value="Mobile Programming" />
          <Picker.Item label="Programming Language" value="Programming Language" />
          <Picker.Item label="Software Engineering" value="Software Engineering" />
          <Picker.Item label="Automata Theory" value="Automata Theory" />
          <Picker.Item label="Reading Visual Art" value="Reading Visual Art" />
        </Picker>
      </View>

      <Text style={styles.text}>Activity Type</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={activityType}
          onValueChange={(itemValue) => setActivityType(itemValue)}
        >
          <Picker.Item label="Task" value="Task" />
          <Picker.Item label="Assignment" value="Assignment" />
        </Picker>
      </View>

      <Text style={styles.text}>Description</Text>

      <TextInput
        style={styles.input}
        placeholder="Short Description:"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.text}>Deadline</Text>

      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        keyboardType="numeric"
        value={deadline}
        onChangeText={setDeadline}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={saveTask}
      >
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

  pickerContainer: {
    width: 300,
    borderWidth: 1,
    borderColor: '#377979',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },

  button: {
    backgroundColor: '#377979',
    paddingVertical: 12,
    alignItems: 'center',
    width: 300,
    borderRadius: 10,
    marginTop: 10,
  },

  buttonText: {
    color: '#f6fafa',
    fontWeight: 'bold',
    fontSize: 16,
  },

});