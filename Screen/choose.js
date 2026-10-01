import {
  StyleSheet, // help style the page
  View, // hold parts of page
  Text, // displays texts
  TouchableOpacity, // makes buttons clickable
  Image, // display images
} from 'react-native';

export default function Choose({ navigation }) { // makes task menu

  return (
    <View style={styles.container}> 
      {/* Holds the whole page */}

      <Text style={styles.title}>MY TASK</Text>

      <View style={styles.line} />

      <View style={styles.taskBox}>

        {/* open the "Enter Task" */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('Enter Task')} 
        >
           {/* // display image (its location) */}
          <Image
            source={require('../assets/add.png')} 
            style={styles.icon}
          />

          <Text style={styles.optionText}>
            Add New Task
          </Text>

        </TouchableOpacity>

        
        {/* // open the "My Task" */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('My Tasks')} 
        >
          
        {/* // display image (its location) */}  
          <Image
            source={require('../assets/view.png')} 
            style={styles.icon}
          />

          <Text style={styles.optionText}>
            My Tasks
          </Text>

        </TouchableOpacity>

        {/* // open the "Status" */}
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('Status')} 
        >
          {/* // display image (its location) */}  
          <Image
            source={require('../assets/completed.png')} 
            style={styles.icon}
          />

          <Text style={styles.optionText}>
            Status
          </Text>

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

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#527589',
    textAlign: 'center',
  },

  line: {
    height: 1,
    backgroundColor: '#527589',
    marginVertical: 15,
  },

  taskBox: {
    width: '100%',
    padding: 20,
    borderWidth: 1,
    borderColor: '#B8D5E1',
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 14,
    borderWidth: 1,
    borderColor: '#B8D5E1',
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: '#F8FBFC',
  },

  icon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },

  optionText: {
    fontSize: 16,
    color: '#527589',
    fontWeight: 'bold',
  },

});
// components used : StyleSheet
//View
//Text
//TouchableOpacity
//Image
//Choose