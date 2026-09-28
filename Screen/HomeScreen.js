import {
  StyleSheet, // design page
  Text, // display text
  View, // hold the entire page
  TouchableOpacity, // makes buttons clickable
  Image, // displays images
} from 'react-native';

import logo_pic from '../assets/task.png'; // get the app logo

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}> {/*holds the whole page*/}

      <Image source={logo_pic} style={styles.logo}/>

      <Text style={styles.title}>
        <Text style={styles.task}>TASK</Text>
        <Text style={styles.sphere}>SPHERE</Text>
      </Text>

      <Text style={styles.subtitle}> Welcome to your Task and Assignment Planner!</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Start')}> {/*open the start page*/}
        <Text style={styles.buttonText}>START</Text> {/*buttons name*/}
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'center',
  },

  task: {
    color: '#527589',
  },

  sphere: {
    color: '#8ABDD3',
  },

  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8A9DA8',
    marginBottom: 20,
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#8ABDD3',
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
});

//components name 
// StyleSheet 
//Text – shows words
//View – holds the page parts
//TouchableOpacity – makes a clickable button
//Image – shows the logo
//HomeScreen – your home page component
//navigation – moves to another page