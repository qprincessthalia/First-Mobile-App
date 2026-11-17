import { useMemo } from 'react';
import {
  StyleSheet, // design page
  Text, // display text
  View, // hold the entire page
  Image, // displays images
} from 'react-native';

import logo_pic from '../assets/task.png'; // get the app logo

import { fonts, useTheme } from '../theme/ThemeContext';
import AppButton from '../components/AppButton';

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.container}> {/* holds the whole page */}

      <Image source={logo_pic} style={styles.logo} />

      <Text style={styles.title}>

        <Text style={styles.task}>TASK</Text>

        <Text style={styles.sphere}>SPHERE</Text>

      </Text>

      <View style={styles.goldLine} />

      <Text style={styles.subtitle}>Welcome to your Task and Assignment Planner!</Text>

      <AppButton title="START" onPress={() => navigation.navigate('Start')} /> {/* open the start page */}

    </View>

  );

}

const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 32,
    },

    logo: {
      width: 110,
      height: 110,
      marginBottom: 12,
    },

    title: {
      fontFamily: fonts.bold,
      fontSize: 36,
      textAlign: 'center',
      letterSpacing: 1,
    },

    task: {
      color: colors.text,
    },

    sphere: {
      color: colors.gold,
    },

    goldLine: {
      width: 48,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.gold,
      marginTop: 10,
      marginBottom: 16,
    },

    subtitle: {
      fontFamily: fonts.regular,
      fontSize: 15,
      color: colors.muted,
      textAlign: 'center',
      marginBottom: 32,
    },
  });