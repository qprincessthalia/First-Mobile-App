import { useMemo } from 'react';
import {
  StyleSheet, // help style the page
  View, // hold parts of page
  Text, // displays texts
  TouchableOpacity, // makes buttons clickable
  Image, // display images
} from 'react-native';

import { fonts, useTheme } from '../theme/ThemeContext';
import ScreenContainer from '../components/ScreenContainer';
import ScreenTitle from '../components/ScreenTitle';

export default function Choose({ navigation }) { // makes task menu
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <ScreenContainer> {/* Holds the whole page */}

      <ScreenTitle title="MY TASK" />

      <View style={styles.taskBox}>

        {/* open the "Enter Task" */}
        <TouchableOpacity
          style={styles.option}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Enter Task')} // open the "Enter Task"
        >
          <View style={styles.iconWrap}>
            <Image
              source={require('../assets/add.png')} // display image (its location)
              style={styles.icon}
            />
          </View>
          <Text style={styles.optionText}>Add New Task</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('My Tasks')} // open the "My Task"
        >
          <View style={styles.iconWrap}>
            <Image
              source={require('../assets/view.png')} // display image (its location)
              style={styles.icon}
            />
          </View>
          <Text style={styles.optionText}>My Tasks</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, styles.lastOption]}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Status')} // open the "Status"
        >
          <View style={styles.iconWrap}>
            <Image
              source={require('../assets/completed.png')} // display image (its location)
              style={styles.icon}
            />
          </View>
          <Text style={styles.optionText}>Status</Text>
        </TouchableOpacity>

      </View>
    </ScreenContainer>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    taskBox: {
      width: '100%',
      padding: 20,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 16,
      backgroundColor: colors.surface,
    },

    option: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      padding: 14,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      marginBottom: 12,
      backgroundColor: colors.surfaceAlt,
    },

    lastOption: {
      marginBottom: 0,
    },

    // Light circle behind each icon so dark icons stay visible in dark mode.
    iconWrap: {
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: colors.iconBg,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 15,
    },

    icon: {
      width: 28,
      height: 28,
    },

    optionText: {
      fontFamily: fonts.semiBold,
      fontSize: 16,
      color: colors.text,
    },
  });
// components used : StyleSheet
//View
//Text
//TouchableOpacity
//Image
//Choose