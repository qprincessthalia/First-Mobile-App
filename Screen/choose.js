import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import MenuBar from './MenuBar';

export default function LogIn({ navigation }) {

  return (
    <View style={styles.container}>

    

      <View style={styles.taskBox}>

        <Text style={styles.title}>MY TASK</Text>

        <View style={styles.line} />

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('My Tasks')}
        >
          <Image
            source={require('../assets/view.png')}
            style={styles.icon}
          />

          <Text style={styles.optionText}>
            My Tasks
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('Enter Task')}
        >
          <Image
            source={require('../assets/add.png')}
            style={styles.icon}
          />

          <Text style={styles.optionText}>
            Add New Task
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('Status')}
        >
          <Image
            source={require('../assets/completed.png')}
            style={styles.icon}
          />

          <Text style={styles.optionText}>
            Tasks Status
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
},
taskBox: {
  width: '90%',
  padding: 20,
  backgroundColor: '#F5F7FA',
  borderWidth: 2,
  borderColor: '#377979',
  borderRadius: 15,
  marginTop: 20,
  marginLeft: 15,
},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B1F3A',
    textAlign: 'center',
  },

  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#D5DCE5',
    marginTop: 15,
    marginBottom: 20,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#377979',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },

  icon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },

  optionText: {
    fontSize: 17,
    color: '#0B1F3A',
    fontWeight: 'bold',
  },

});