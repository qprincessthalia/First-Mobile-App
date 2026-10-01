import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StyleSheet, // allows customized design
  View, // holds the page elements
  Text, // displays text
  TouchableOpacity, // allows buttons to be clickable
  ScrollView, // allows scrolling
} from 'react-native';

export default function ActivityStatus({ navigation }) { // creates the ActivityStatus screen

  const [activities, setActivities] = useState([ // stores the list of activities

    {
      id: 1, // unique ID for the activity
      subject: 'Mobile Programming', // stores the subject
      title: 'First Mobile App', // stores the activity title
      status: 'Completed', // stores the activity status
    },

    {
      id: 2,
      subject: 'Mobile Programming',
      title: 'Second Mobile App',
      status: 'Pending',
    },

    {
      id: 3,
      subject: 'Reading Visual Art',
      title: 'Learning Application',
      status: 'Pending',
    },

  ]);

  const [openId, setOpenId] = useState(null); // stores which activity dropdown is open

  const changeStatus = (id, status) => { // changes the status of an activity

    setActivities( // updates the activities list

      activities.map((activity) => // goes through each activity

        activity.id === id // checks if the activity matches the selected ID

          ? { ...activity, status: status } // updates the selected activity's status

          : activity // keeps the other activities unchanged

      )
    );

    setOpenId(null); // closes the dropdown after changing the status
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
      >

        <View style={styles.taskBox}>

          <Text style={styles.title}>TASK STATUS</Text>

          <View style={styles.line} />

          <Text style={styles.sectionHeader}>Pending Activities</Text>

          <View style={styles.activityBox}>

            <Text style={styles.subjectLabel}>
              Subject: Mobile Programming
            </Text>

            <Text style={styles.taskTitle}>
              Title: Second Mobile App
            </Text>

            <Text style={styles.deadline}>
              Deadline: December 5, 2026
            </Text>

            <TouchableOpacity
              style={styles.statusButton}
              onPress={() => setOpenId(openId === 2 ? null : 2)}
            >
              <Text
                style={
                  activities[1].status === 'Completed'
                    ? styles.completed
                    : styles.pending
                }
              >
                {activities[1].status}
              </Text>

              <Text style={styles.arrow}>▼</Text>
            </TouchableOpacity>

            {openId === 2 && (
              <View style={styles.dropdown}>

                <TouchableOpacity
                  style={styles.option}
                  onPress={() => changeStatus(2, 'Completed')}
                >
                  <Text style={styles.completed}>Completed</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.option}
                  onPress={() => changeStatus(2, 'Pending')}
                >
                  <Text style={styles.pending}>Pending</Text>
                </TouchableOpacity>

              </View>
            )}

          </View>

          <Text style={styles.sectionHeader}>Completed Activities</Text>

          <View style={styles.activityBox}>

            <Text style={styles.subjectLabel}>
              Subject: Mobile Programming
            </Text>

            <Text style={styles.taskTitle}>
              Title: First Mobile App
            </Text>

            <Text style={styles.deadline}>
              Deadline: September 30, 2026
            </Text>

            <TouchableOpacity
              style={styles.statusButton}
              onPress={() => setOpenId(openId === 1 ? null : 1)}
            >
              <Text
                style={
                  activities[0].status === 'Completed'
                    ? styles.completed
                    : styles.pending
                }
              >
                {activities[0].status}
              </Text>

              <Text style={styles.arrow}>▼</Text>
            </TouchableOpacity>

            {openId === 1 && (
              <View style={styles.dropdown}>

                <TouchableOpacity
                  style={styles.option}
                  onPress={() => changeStatus(1, 'Completed')}
                >
                  <Text style={styles.completed}>Completed</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.option}
                  onPress={() => changeStatus(1, 'Pending')}
                >
                  <Text style={styles.pending}>Pending</Text>
                </TouchableOpacity>

              </View>
            )}

          </View>

          <View style={styles.activityBox}>

            <Text style={styles.subjectLabel}>
              Subject: Reading Visual Art
            </Text>

            <Text style={styles.taskTitle}>
              Title: Learning Application
            </Text>

            <Text style={styles.deadline}>
              Deadline: September 30, 2026
            </Text>

            <TouchableOpacity
              style={styles.statusButton}
              onPress={() => setOpenId(openId === 3 ? null : 3)}
            >
              <Text
                style={
                  activities[2].status === 'Completed'
                    ? styles.completed
                    : styles.pending
                }
              >
                {activities[2].status}
              </Text>

              <Text style={styles.arrow}>▼</Text>
            </TouchableOpacity>

            {openId === 3 && (
              <View style={styles.dropdown}>

                <TouchableOpacity
                  style={styles.option}
                  onPress={() => changeStatus(3, 'Completed')}
                >
                  <Text style={styles.completed}>Completed</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.option}
                  onPress={() => changeStatus(3, 'Pending')}
                >
                  <Text style={styles.pending}>Pending</Text>
                </TouchableOpacity>

              </View>
            )}

          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => navigation.navigate('Status')}
          >
            <Text style={styles.saveText}>SAVE UPDATE</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#D5E8F0',
  },

  container: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 80,
  },

  taskBox: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#527589',
    textAlign: 'center',
  },

  line: {
    height: 1,
    backgroundColor: '#C7E0EA',
    marginVertical: 15,
  },

  sectionHeader: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#527589',
    marginBottom: 10,
  },

  activityBox: {
    backgroundColor: '#F8FCFE',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },

  subjectLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#527589',
    marginBottom: 5,
  },

  taskTitle: {
    fontSize: 14,
    color: '#8A9DA8',
    marginBottom: 12,
  },

  deadline: {
    fontSize: 14,
    color: '#8A9DA8',
    marginBottom: 10,
  },

  statusButton: {
    backgroundColor: '#FFFFFF',
    padding: 9,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  completed: {
    color: '#4F8A70',
    fontWeight: 'bold',
  },

  pending: {
    color: '#C76B78',
    fontWeight: 'bold',
  },

  arrow: {
    color: '#527589',
  },

  dropdown: {
    backgroundColor: '#FFFFFF',
    marginTop: 5,
    borderRadius: 8,
  },

  option: {
    padding: 10,
  },

  saveButton: {
    backgroundColor: '#8ABDD3',
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 3,
  },

  saveText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

});