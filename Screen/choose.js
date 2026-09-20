import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function logInScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.taskBox}>

        <Text style={styles.title}> MY TASK </Text>

        <View style={styles.line} />

        <TouchableOpacity style={styles.option}>
          <Image source={require('../assets/view.png')} style={styles.icon} />
          <Text style={styles.optionText}> View My Tasks </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('EnterTask')}>
          <Image source={require('../assets/add.png')} style={styles.icon} />
          <Text style={styles.optionText}> Add New Task </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Image source={require('../assets/completed.png')} style={styles.icon} />
          <Text style={styles.optionText}> Completed Tasks </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({

    container: {
       flex: 1,
       backgroundColor: '#fff',
       alignItems: 'center',
       justifyContent: 'flex-start',
       paddingTop: 50,
    },

  taskBox: {
    width: '90%',
    backgroundColor: '#F5F7FA',
    borderWidth: 8,
    borderColor: '#377979',
    borderRadius: 35,
    padding: 22,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0B1F3A',
    marginBottom: 15,
  },

  line: {
    height: 1,
    backgroundColor: '#D5DCE5',
    width: '100%',
    marginBottom: 22,
  },

  option: {
    width: '100%',
    height: 70,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D5DCE5',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  icon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },

  optionText: {
    fontSize: 15,
    color: '#253142',
  },



});