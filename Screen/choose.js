import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function LogIn({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.taskBox}>

        <Text style={styles.title}>MY TASK</Text>

        <View style={styles.line} />

          <TouchableOpacity style={styles.option}onPress={() => navigation.navigate('Enter Task')}>
          <Image source={require('../assets/add.png')}style={styles.icon}/>
          <Text style={styles.optionText}>Add New Task</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('My Tasks')}>
          <Image source={require('../assets/view.png')} style={styles.icon}/>
          <Text style={styles.optionText}>My Tasks</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}onPress={() => navigation.navigate('Status')}>
          <Image source={require('../assets/completed.png')}style={styles.icon}/>
          <Text style={styles.optionText}>Status</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#D5E8F0',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },

  taskBox: {
    width: '100%',
    padding: 25,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C7E0EA',
    borderRadius: 22,
    marginTop: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#527589',
    textAlign: 'center',
  },

  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#C7E0EA',
    marginTop: 15,
    marginBottom: 20,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F8FB',
    borderWidth: 1,
    borderColor: '#B8D5E1',
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
    fontSize: 18,
    fontWeight: '700',
    color: '#527589',
  },

});