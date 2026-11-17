import React, { useMemo, useState } from 'react';

import {
  StyleSheet, // allows customized design
  View, // holds the page elements
  Text, // displays text
  TouchableOpacity, // allows buttons to be clickable
  ScrollView, // allows scrolling
} from 'react-native';

import { fonts, useTheme } from '../theme/ThemeContext';
import ScreenContainer from '../components/ScreenContainer';
import ScreenTitle from '../components/ScreenTitle';
import AppButton from '../components/AppButton';

export default function StatusUpdate({ navigation }) { // creates the status update screen
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

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

  // Returns the color that matches a status.
  const statusColor = (status) => (status === 'Completed' ? colors.done : colors.pending);

  return (
    <SafeAreaView style={styles.safeArea}>

    <ScreenContainer> {/* holds the entire page */}
      <View style={styles.box}> {/* holds the activity status content */}
        <ScreenTitle title="ACTIVITY STATUS" /> {/* displays the page title */}

        {activities.map((item) => ( // displays each activity

          <View
            key={item.id}
            style={[styles.card, { borderLeftColor: statusColor(item.status) }]}
          > {/* creates a card for each activity */}

            <Text style={styles.subject}>{item.subject}</Text> {/* displays the subject */}

            <Text style={styles.titleText}>{item.title}</Text> {/* displays the activity title */}

            <TouchableOpacity
              style={styles.statusButton}
              activeOpacity={0.85}
              onPress={() => setOpenId(openId === item.id ? null : item.id)} // opens or closes the status dropdown
            >
              <Text style={[styles.statusText, { color: statusColor(item.status) }]}>
                {item.status}
              </Text> {/* displays the current status */}

              <Text style={styles.arrow}>⌄</Text> {/* displays the dropdown arrow */}
            </TouchableOpacity>

            {openId === 2 && (
              <View style={styles.dropdown}>

                <TouchableOpacity
                  style={styles.option}
                  onPress={() => changeStatus(item.id, 'Pending')} // changes the activity status to Pending
                >
                  <Text style={[styles.statusText, { color: colors.pending }]}>Pending</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.option}
                  onPress={() => changeStatus(item.id, 'Completed')} // changes the activity status to Completed
                >
                  <Text style={[styles.statusText, { color: colors.done }]}>Completed</Text>
                </TouchableOpacity>

              </View>
            )}

          </View>

        <AppButton title="SAVE UPDATE" onPress={() => navigation.navigate('Status')} /> {/* navigates to the Status screen */}
      </View>
    </ScreenContainer>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    box: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 22,
      borderRadius: 18,
    },

    card: {
      backgroundColor: colors.surfaceAlt,
      borderWidth: 1,
      borderColor: colors.border,
      borderLeftWidth: 4,
      padding: 14,
      borderRadius: 12,
      marginBottom: 12,
    },

    subject: {
      fontFamily: fonts.medium,
      fontSize: 13,
      color: colors.muted,
      marginBottom: 4,
    },

    titleText: {
      fontFamily: fonts.semiBold,
      fontSize: 16,
      color: colors.text,
      marginBottom: 12,
    },

    statusButton: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    statusText: {
      fontFamily: fonts.semiBold,
      fontSize: 14,
    },

    arrow: {
      color: colors.muted,
      fontSize: 16,
    },

    dropdown: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      marginTop: 6,
      borderRadius: 8,
    },

    option: {
      padding: 12,
    },
  });