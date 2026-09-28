import React, { useState } from 'react'; 

import {
  StyleSheet, // allows customized design
  View, // holds the page elements
  Text, // displays text
  TouchableOpacity, // allows buttons to be clickable
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

    <View style={styles.container}> {/* holds the entire page */}
      <View style={styles.box}> {/* holds the activity status content */}
        <Text style={styles.title}>ACTIVITY STATUS</Text> {/* displays the page title */}
        <View style={styles.line} /> {/* creates a line under the title */}
        {activities.map((item) => ( // displays each activity

          <View key={item.id} style={styles.card}> {/* creates a card for each activity */}

            <Text style={styles.subject}>
              Subject: {item.subject}
            </Text> {/* displays the subject */}

            <Text style={styles.titleText}>
              Title: {item.title}
            </Text> {/* displays the activity title */}

            <TouchableOpacity
              style={styles.statusButton}
              onPress={() => setOpenId(openId === item.id ? null : item.id)}
            >
              {/* opens or closes the status dropdown */}

              <Text
                style={item.status === 'Completed' ? styles.completed : styles.pending}
              >
                {item.status}
              </Text> {/* displays the current status */}

              <Text style={styles.arrow}>⌄</Text> {/* displays the dropdown arrow */}

            </TouchableOpacity>

            {openId === item.id && ( // displays the dropdown when this activity is selected

              <View style={styles.dropdown}> {/* holds the status options */}

                <TouchableOpacity
                  style={styles.option}
                  onPress={() => changeStatus(item.id, 'Pending')}
                >
                  {/* changes the activity status to Pending */}

                  <Text style={styles.pending}>Pending</Text> {/* displays Pending option */}

                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.option}
                  onPress={() => changeStatus(item.id, 'Completed')}
                >
                  {/* changes the activity status to Completed */}

                  <Text style={styles.completed}>Completed</Text> {/* displays Completed option */}
                </TouchableOpacity>

              </View>
            )}

          </View>
        ))}

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => navigation.navigate('Status')}
        >
          {/* navigates to the Status screen */}

          <Text style={styles.saveText}>SAVE UPDATE</Text> {/* displays the save button text */}

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

  box: {
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

  card: {
    backgroundColor: '#F8FCFE',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },

  subject: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#527589',
    marginBottom: 5,
  },

  titleText: {
    fontSize: 14,
    color: '#8A9DA8',
    marginBottom: 12,
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