import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import { useFonts } from 'expo-font';

import logo_pic from '../assets/task.png';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <Image
        source={logo_pic}
        style={styles.logo}
      />

      <Text style={styles.title}>
        T A S K S P H E R E
      </Text>

      <Text style={styles.subtitle}>
        Welcome to your Task and Assignment Planner!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('START')}
      >
        <Text style={styles.buttonText}>
          START
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },

  title: {
    fontFamily: 'League Spartan Bold',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#008080',
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#377979',
    paddingVertical: 12,
    paddingHorizontal: 150,
    borderRadius: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});