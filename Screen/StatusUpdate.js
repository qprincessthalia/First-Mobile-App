import React, { useState } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

export default function ActivityStatus({ navigation }) {
  const [activities, setActivities] = useState([
    {
      id: 1,
      subject: 'Mobile Programming',
      title: 'First Mobile App',
      status: 'Completed',
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

  const [openId, setOpenId] = useState(null);

  const changeStatus = (id, status) => {
    setActivities(
      activities.map((activity) =>
        activity.id === id
          ? { ...activity, status: status }
          : activity
      )
    );

    setOpenId(null);
  };

  return (
    <View style={styles.container}>

      <View style={styles.box}>
        <Text style={styles.title}>ACTIVITY STATUS</Text>
        <View style={styles.line} />

        {activities.map((item) => (<View key={item.id} style={styles.card}>

            <Text style={styles.subject}> Subject: {item.subject}</Text>
            <Text style={styles.titleText}>Title: {item.title}</Text>

            <TouchableOpacity style={styles.statusButton} onPress={() => setOpenId(openId === item.id ? null : item.id)}>
              <Text style={item.status === 'Completed' ? styles.completed: styles.pending}>{item.status}</Text>
              <Text style={styles.arrow}>⌄</Text>
            </TouchableOpacity>

            {openId === item.id && (<View style={styles.dropdown}>

                <TouchableOpacity style={styles.option} onPress={() => changeStatus(item.id, 'Pending')}>
                  <Text style={styles.pending}>Pending</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option} onPress={() => changeStatus(item.id, 'Completed')}>
                  <Text style={styles.completed}>Completed</Text>
                </TouchableOpacity>

              </View>
            )}

          </View>
        ))}

        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('Status')}>
          <Text style={styles.saveText}> SAVE UPDATE </Text>
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